import React, { useState } from "react";
import { useRouter } from "next/router";
import { MONTHS } from "../../utils/constants";
import Link from "next/link";

type BudgetListProps = {
  data: Array<Plan>;
};
const BudgetList = ({ data }: BudgetListProps) => {
  if (data.length === 0) {
    return (
      <p className="mt-4 text-xl text-slate-500">No Plans yet. Add one now!</p>
    );
  }
  const formatPeriod = (period) => {
    const date = new Date(period);
    return `${MONTHS[date.getUTCMonth() + 1]}, ${date.getUTCFullYear()}`;
  };

  return (
    <>
      <div className="bg-slate-100 p-10 pt-6 h-full">
        <h1 className="text-3xl mb-4">Existing Plans</h1>
        {data.map((plan) => {
          return (
            <div
              key={plan.planId}
              className="border-b border-b-black max-w-[500px] mx-auto"
            >
              <div className="flex justify-between my-4">
                <p>{`${formatPeriod(plan.period)}`}</p>
                <div>
                  <Link href={`plan/${plan.planId}`} className="text-red">
                    <a className="hover:underline hover:bg-black hover:text-white hover:rounded-md hover:p-1">
                      View Plan
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BudgetList;
