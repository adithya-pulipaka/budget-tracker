import mongoose from "mongoose";
import connect from "./mongo_client";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

const tranSchema = new Schema(
  {
    tranDate: Date,
    description: String,
    catId: mongoose.Types.ObjectId,
    planId: Number,
    amount: Number,
  },
  { timestamps: true }
);

export const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", tranSchema);
