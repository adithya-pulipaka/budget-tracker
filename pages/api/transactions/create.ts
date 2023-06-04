// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from "@/lib/models/Category";
import { Plan } from "@/lib/models/Plan";
import { PlanInfo } from "@/lib/models/PlanInfo";
import { Transaction } from "@/lib/models/Transaction";
import connect from "@/lib/mysql";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== `POST`) {
    res.status(405).json({ payload: null, error: `Method Not Supported` });
    return;
  }

  const db = await connect();
  const tranRepo = db.getRepository(Transaction);
  const payload: TransactionRequest = req.body;
  const catRepo = db.getRepository(Category);
  const planRepo = db.getRepository(Plan);
  const cat = await catRepo.findOne({ where: { catId: payload.catId } });
  const plan = await planRepo.findOne({ where: { planId: payload.planId } });
  const transaction = new Transaction();
  const { tranDate, description, amount } = payload;
  transaction.tranDate = tranDate;
  transaction.description = description;
  transaction.amount = amount;
  transaction.category = cat;
  transaction.plan = plan;
  await tranRepo.save(transaction);
  const response = await tranRepo.findOne({
    where: { tranId: transaction.tranId },
    relations: { category: true },
  });
  res.status(200).json({ payload: response, error: null });
}
