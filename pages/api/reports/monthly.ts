// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "@/lib/mysql";
import { NextApiRequest, NextApiResponse } from "next";
import * as mysql from "mysql2/promise";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== `GET`) {
    res.status(405).json({ payload: null, error: `Method Not Supported` });
    return;
  }
  const db: mysql.Connection = await connect();
  const [response] = await db.query<mysql.RowDataPacket[]>(
    `select year(tran_date) as year,month(tran_date) as month, sum(amount) as amount from transaction group by year(tran_date),month(tran_date)
    order by year(tran_date) desc, month(tran_date) desc;`
  );
  res.status(200).json({ payload: response, error: null });
}
