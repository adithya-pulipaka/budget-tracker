// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from "@/lib/models/Category";
import { Plan } from "@/lib/models/Plan";
import { PlanInfo } from "@/lib/models/PlanInfo";
import { Transaction } from "@/lib/models/Transaction";
import connect from "@/lib/mysql";
import { NextApiRequest, NextApiResponse } from "next";
import * as mysql from "mysql2/promise";
import { parseDateAsSelected } from "@/utils/date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const db: mysql.Connection = await connect();

  let response = [];
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    `select t.*,c.name,DATE_FORMAT(t.tran_date,'%Y-%m-%d') as formattedDate from transaction t left join category c on t.cat_id = c.cat_id order by t.tran_date desc`
  );
  rows.forEach((row) => {
    response.push({
      tranId: row["tran_id"],
      tranDate: row["formattedDate"],
      description: row["description"],
      category: { catId: row["cat_id"], name: row["name"] },
      planId: row["plan_id"],
      amount: Number(row["amount"]),
    });
  });

  res.status(200).json({ payload: response, error: null });
}
