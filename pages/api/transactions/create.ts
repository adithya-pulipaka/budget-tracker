// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "@/lib/mongo_client";
import { NextApiRequest, NextApiResponse } from "next";
import * as mysql from "mysql2/promise";
import mongoose from "mongoose";
import { Category, Transaction } from "@/lib/mongoose_schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== `POST`) {
    res.status(405).json({ payload: null, error: `Method Not Supported` });
    return;
  }

  await connect();
  const payload: TransactionRequest = req.body;
  const txn: mongoose.Document = new Transaction({ ...payload });
  await txn.save();
  const response = { ...txn.toJSON(), tranId: txn._id };
  res.status(200).json({ payload: response, error: null });
}
