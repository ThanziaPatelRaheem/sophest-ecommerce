import mongoose from "mongoose";

const paymentFailureSchema = new mongoose.Schema(
  {
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentIntentId: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("PaymentFailure", paymentFailureSchema);
