import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
import Order from "../models/order.js";
import { deductStock } from "../utils/deductStock.js";
import mongoose from "mongoose";
import { validateOrderItems } from "../utils/validateOrderItems.js";
import PaymentFailure from "../models/paymentFailure.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

//Create stripe checkout session => /api/payment/checkout-session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;
    const shippingInfo = body?.shippingInfo;

    const validatedItems = await validateOrderItems(body?.orderItems);

    const itemsPriceInCents = validatedItems.reduce(
      (total, item) => total + Math.round(item.price * 100) * item.quantity,
      0,
    );

    const itemsPrice = itemsPriceInCents / 100;

    const isValidStripeImageUrl = (url) =>
      typeof url === "string" &&
      url.startsWith("http") &&
      !url.startsWith("http://localhost");

    const line_items = validatedItems.map((item) => {
      const imageUrl = isValidStripeImageUrl(item?.image) ? item.image : null;

      const unitAmountInCents = Math.round(Number(item?.price) * 100);

      return {
        price_data: {
          currency: "sgd",
          product_data: {
            name: item?.name,
            ...(imageUrl ? { images: [imageUrl] } : {}),
            metadata: { productId: item?.product },
          },
          unit_amount: unitAmountInCents,
        },
        tax_rates: ["txr_1UcMwtBEif5Bl6zu3KggOI68"],
        quantity: item?.quantity,
      };
    });

    const shipping_rate =
      itemsPrice >= 200
        ? "shr_1UcMrvBEif5Bl6zumM4VfnK6"
        : "shr_1UcMpuBEif5Bl6zut0SeOGzb";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${FRONTEND_URL}/me/orders?order_success=true`,
      cancel_url: `${FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      metadata: { ...shippingInfo, itemsPrice: itemsPrice.toFixed(2) },
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items,
    });

    res.status(200).json({
      url: session.url,
    });
  },
);
const getOrderItems = async (line_items) => {
  const cartItems = await Promise.all(
    line_items.data.map(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);

      return {
        product: product.metadata.productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images[0] || "",
      };
    }),
  );

  return cartItems;
};

export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status !== "paid") {
        return res.status(200).json({
          received: true,
          message: "Payment not completed",
        });
      }

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id,
      );

      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;

      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const itemsPrice = Number(session.metadata.itemsPrice);

      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNo: session.metadata.phoneNo,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
        stripeSessionId: session.id,
      };

      const dbSession = await mongoose.startSession();

      try {
        await dbSession.withTransaction(async () => {
          await deductStock(orderItems, dbSession);

          await Order.create([orderData], {
            session: dbSession,
          });
        });
      } catch (error) {
        // 1. Handle insufficient stock after successful payment
        if (error.code === "INSUFFICIENT_STOCK") {
          await PaymentFailure.findOneAndUpdate(
            { stripeSessionId: session.id },
            {
              $setOnInsert: {
                stripeSessionId: session.id,
                paymentIntentId: session.payment_intent,
                user: session.client_reference_id,
                reason: error.message,
                status: "Pending",
              },
            },
            {
              upsert: true,
              new: true,
            },
          );

          console.error(
            `Paid order requires attention: ${session.id}`,
            error.message,
          );

          return res.status(200).json({
            received: true,
            message: "Payment recorded for manual resolution",
          });
        }

        // 2. Handle duplicate Stripe orders
        if (error.code === 11000) {
          const existingOrder = await Order.findOne({
            stripeSessionId: session.id,
          });

          if (existingOrder) {
            return res.status(200).json({
              success: true,
              message: "Order already processed",
            });
          }
        }

        // 3. Forward unexpected errors
        throw error;
      } finally {
        await dbSession.endSession();
      }

      return res.status(200).json({ success: true });
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error =>", error);
    throw error;
  }
});
