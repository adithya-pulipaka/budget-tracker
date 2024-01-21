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
  // const db = await connect();
  // const planRepo = db.getRepository(Plan);
  // const planInfoRepo = db.getRepository(PlanInfo);
  // const { planId } = req.query;
  // let response;
  // if (planId) {
  //   response = await planRepo.findOne({
  //     where: { planId: Number(planId) },
  //     relations: { planInfo: { category: true } },
  //   });
  //   const categories = response.planInfo
  //     ? response.planInfo?.map((info) => info.category)
  //     : [];
  //   response.categories = categories;
  // } else {
  //   response = await planRepo.find({
  //     select: { planId: true, period: true },
  //     order: { period: "DESC" },
  //     take: 10,
  //   });
  // }
  res.status(200).json({ payload: "response", error: null });
}
