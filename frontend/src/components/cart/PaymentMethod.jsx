import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import MetaData from "../Layout/MetaData";
import { calculateOrderCost } from "../../helpers/helper";

import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../redux/api/orderApi";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const { shippingInfo, cartItems = [] } = useSelector((state) => state.cart);

  const [
    createNewOrder,
    { isSuccess, error: orderError, isLoading: isCreatingOrder },
  ] = useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading: isStartingCheckout },
  ] = useStripeCheckoutSessionMutation();

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateOrderCost(cartItems);

  const formatPrice = (value) => `S$${Number(value ?? 0).toFixed(2)}`;

  const isProcessing = isCreatingOrder || isStartingCheckout;

  useEffect(() => {
    if (checkoutData?.url) {
      window.location.assign(checkoutData.url);
    }
  }, [checkoutData]);

  useEffect(() => {
    if (checkoutError) {
      toast.error(checkoutError?.data?.message || "Failed to start checkout");
    }
  }, [checkoutError]);

  useEffect(() => {
    if (orderError) {
      toast.error(orderError?.data?.message || "Failed to place your order");
    }
  }, [orderError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your order has been placed!");
      navigate("/me/orders?order_success=true");
    }
  }, [isSuccess, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!method) {
      toast.error("Please select a payment method");
      return;
    }

    if (!cartItems.length || !shippingInfo?.address) {
      toast.error("Please complete your order details");
      return;
    }

    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice,
      shippingAmount: shippingPrice,
      taxAmount: taxPrice,
      totalAmount: totalPrice,
    };

    try {
      if (method === "COD") {
        await createNewOrder({
          ...orderData,
          paymentInfo: {
            status: "Not Paid",
          },
          paymentMethod: "COD",
        }).unwrap();
      } else if (method === "Card") {
        await stripeCheckoutSession(orderData).unwrap();
      }
    } catch {
      // Mutation errors are displayed by the effects above.
    }
  };

  return (
    <>
      <MetaData title="Payment Method | Sophest" />

      <main className="sophest-payment-page">
        <div className="sophest-payment-container">
          <Link to="/confirm-order" className="payment-back-link">
            ← Back to Order Review
          </Link>

          <div className="payment-page-header">
            <h1>Payment Method</h1>
            <p>Choose how you'd like to pay for your Sophest essentials.</p>
          </div>

          <div className="payment-layout">
            <section className="payment-selection-card">
              <h2>Choose Your Payment Method</h2>

              <form className="sophest-payment-form" onSubmit={submitHandler}>
                <label
                  className={`payment-option ${
                    method === "COD" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={method === "COD"}
                    onChange={(e) => setMethod(e.target.value)}
                  />

                  <span className="payment-option-content">
                    <strong>Cash on Delivery</strong>
                    <small>Pay when your order is delivered.</small>
                  </span>
                </label>

                <label
                  className={`payment-option ${
                    method === "Card" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={method === "Card"}
                    onChange={(e) => setMethod(e.target.value)}
                  />

                  <span className="payment-option-content">
                    <strong>Credit or Debit Card</strong>
                    <small>Pay securely through Stripe.</small>
                  </span>
                </label>

                <button
                  type="submit"
                  className="payment-submit-btn"
                  disabled={!method || isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : method === "COD"
                      ? "Place Order"
                      : method === "Card"
                        ? "Continue to Secure Payment"
                        : "Select a Payment Method"}

                  {!isProcessing && <span>→</span>}
                </button>

                <p className="payment-security-note">
                  Card payments are processed through Stripe.
                </p>
              </form>
            </section>

            <aside className="payment-summary-card">
              <h2>Order Summary</h2>

              <div className="payment-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(itemsPrice)}</span>
              </div>

              <div className="payment-summary-row">
                <span>Shipping</span>
                <span>{formatPrice(shippingPrice)}</span>
              </div>

              <div className="payment-summary-row">
                <span>Tax</span>
                <span>{formatPrice(taxPrice)}</span>
              </div>

              <div className="payment-summary-divider" />

              <div className="payment-summary-total">
                <span>Total to Pay</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default PaymentMethod;
