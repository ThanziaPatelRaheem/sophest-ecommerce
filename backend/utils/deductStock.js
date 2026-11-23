import Product from "../models/product.js";
import HttpError from "./httpError.js";

export const deductStock = async (orderItems, session) => {
  for (const item of orderItems) {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: item.product,
        stock: { $gte: item.quantity },
      },
      {
        $inc: { stock: -item.quantity },
      },
      {
        new: true,
        session,
      },
    );

    if (!updatedProduct) {
      const error = new HttpError(409, `Insufficient stock for ${item.name}`);

      error.code = "INSUFFICIENT_STOCK";

      throw error;
    }
  }
};
