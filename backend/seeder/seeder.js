import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import products from "./data.js";

dotenv.config({ path: "./backend/.env" });

const seedProducts = async () => {
  try {
    const dbUri = process.env.DB_LOCAL_URI;

    if (!dbUri) {
      throw new Error("DB_LOCAL_URI is missing");
    }

    const connection = await mongoose.connect(dbUri);

    if (connection.connection.name !== "honey_store") {
      throw new Error("Seeder stopped: database is not honey_store");
    }

    console.log("Connected to:", connection.connection.name);

    // Get the new Laundry products
    const laundryProducts = products.filter(
      (product) => product.category === "Laundry",
    );

    if (laundryProducts.length !== 12) {
      throw new Error(
        `Expected 12 Laundry products, found ${laundryProducts.length}. No products deleted.`,
      );
    }

    // Update existing Laundry products without deleting them
    for (const product of laundryProducts) {
      const result = await Product.updateOne(
        {
          name: product.name,
          category: "Laundry",
          weight: product.weight,
        },
        {
          $set: {
            images: product.images,
          },
        },
      );

      console.log(
        `${product.name} (${product.weight}): matched ${result.matchedCount}, modified ${result.modifiedCount}`,
      );
    }

    console.log("Laundry images updated successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();
