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
    `select c.name,sum(amount) as total from transaction t join category c on t.cat_id = c.cat_id group by c.cat_id;`
  );
  res.status(200).json({ payload: response, error: null });
}
