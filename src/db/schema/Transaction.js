// models/Transaction.js
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: mongoose.Decimal128, required: true },
    type: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: true,
    },
    description: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Only createdAt
  }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
