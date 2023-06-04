// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from "@/lib/models/Category";
import { Plan } from "@/lib/models/Plan";
import { PlanInfo } from "@/lib/models/PlanInfo";
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
  console.log("res");
  const db = await connect();
  const payload: PlanRequest = req.body;
  const planRepo = db.getRepository(Plan);
  const plan = new Plan();
  plan.period = new Date(payload.period.year, payload.period.month - 1, 1);
  const planInfos = payload.categories.map((category) => {
    const cat = new Category();
    cat.name = category.name;
    const planInfo = new PlanInfo();
    planInfo.amount = category.amount;
    planInfo.category = cat;
    planInfo.plan = plan;
    return planInfo;
  });
  plan.planInfo = planInfos;
  await planRepo.save(plan);
  const response = await planRepo.findOne({
    where: { planId: 6 },
    relations: { planInfo: { category: true } },
  });
  res.status(200).json({ payload: response, error: null });
}
