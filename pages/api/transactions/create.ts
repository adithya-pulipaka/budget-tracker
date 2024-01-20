// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "@/lib/mysql";
import { NextApiRequest, NextApiResponse } from "next";
import * as mysql from "mysql2/promise";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== `POST`) {
    res.status(405).json({ payload: null, error: `Method Not Supported` });
    return;
  }

  const db: mysql.Connection = await connect();
  const payload: TransactionRequest = req.body;

  const record = {
    tran_date: payload.tranDate,
    description: payload.description,
    cat_id: payload.catId,
    plan_id: payload.planId,
    amount: payload.amount,
  };

  const [insertedRow] = await db.query<mysql.ResultSetHeader>(
    `INSERT INTO transaction SET ?`,
    record
  );
  const response = { ...payload, tranId: insertedRow.insertId };
  res.status(200).json({ payload: response, error: null });
}
