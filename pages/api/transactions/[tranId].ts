// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "@/lib/mongo_client";
import { NextApiRequest, NextApiResponse } from "next";
import * as mysql from "mysql2/promise";
import { parseDateAsSelected } from "@/utils/date-fns";
import { Category, Transaction } from "@/lib/mongoose_schema";
import { getMonth, getYear } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== `DELETE`) {
    res.status(405).json({ payload: null, error: `Method Not Supported` });
    return;
  }

  await connect();
  const { tranId } = req.query;

  const results = await Transaction.deleteOne({
    _id: tranId,
  });
  if (results.deletedCount == 1) {
    res.status(200).json({ payload: "Deleted Transaction", error: null });
  } else {
    res
      .status(400)
      .json({ payload: null, error: "unable to delete the transaction" });
  }
}
