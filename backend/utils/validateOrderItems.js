import Product from "../models/product.js";
import mongoose from "mongoose";
import HttpError from "./httpError.js";

export const validateOrderItems = async (orderItems) => {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new HttpError(400, "Your cart is empty");
  }

  const validatedItems = [];
  const seenProductIds = new Set();

  for (const item of orderItems) {
    // 1. Validate MongoDB product ID
    if (
      typeof item?.product !== "string" ||
      !mongoose.isObjectIdOrHexString(item.product)
    ) {
      throw new HttpError(400, "Invalid product ID");
    }

    const productId = item.product.toLowerCase();

    if (seenProductIds.has(productId)) {
      throw new HttpError(400, "Duplicate product found in cart");
    }

    seenProductIds.add(productId);

    // 2. Validate quantity
    const quantity = item.quantity;

    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      throw new HttpError(400, "Invalid product quantity");
    }

    // 3. Fetch actual product from MongoDB
    const product = await Product.findById(item.product);

    if (!product) {
      throw new HttpError(404, "Product not found");
    }

    // 4. Validate available stock
    if (quantity > product.stock) {
      throw new HttpError(
        400,
        `Only ${product.stock} units available for ${product.name}`,
      );
    }
    // 5. Validate database price
    if (!Number.isFinite(product.price) || product.price < 0) {
      throw new HttpError(400, "Invalid product price");
    }

    // 6. Use trusted product information
    validatedItems.push({
      product: product._id.toString(),
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0]?.url || "",
    });
  }

  return validatedItems;
};
