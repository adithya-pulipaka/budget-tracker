// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from "../../lib/mysql";

export default async function handler(req, res) {
  const connection = await conn();
  const [rows, fields] = await connection.query(`select * from category`);
  console.log(rows);
  // console.log("adi");
  console.log(fields.length);
  res.status(200).json({ name: "John Doe" });
}
