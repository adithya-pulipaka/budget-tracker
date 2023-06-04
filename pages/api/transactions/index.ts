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
  const db = await connect();
  const { planId } = req.query;
  const tranRepo = db.getRepository(Transaction);
  const response = await tranRepo.find({
    where: { plan: { planId: Number(planId) } },
    relations: { plan: true, category: true },
  });
  res.status(200).json({ payload: response, error: null });
}
