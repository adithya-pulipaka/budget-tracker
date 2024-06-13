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
  if (req.method !== `GET`) {
    res.status(405).json({ payload: null, error: `Method Not Supported` });
    return;
  }

  await connect();
  const today = new Date();
  const results = await Transaction.find({
    tranDate: {
      $gte: `${getYear(today)}-${getMonth(today) + 1}-01`,
      $lte: `${getYear(today)}-${getMonth(today) + 1}-31`,
    },
  }).sort("-tranDate");
  const categories = await Category.find();
  const final_results = results.map((result) => ({
    ...result.toJSON(),
    category: { name: categories.find((a) => a._id === result.catId) },
    tranId: result._id,
  }));
  const response = final_results;
  res.status(200).json({ payload: response, error: null });
}
