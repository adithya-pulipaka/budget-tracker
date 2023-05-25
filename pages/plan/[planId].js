import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addPlanTransaction,
  getPlanById,
  getTransactionsforPeriod,
} from "../../lib/db";
import TransactionsList from "../../components/budget/TransactionsList";
import { MONTHS } from "../../utils/constants";

const PlanDetails = () => {
  const router = useRouter();
  const { planId } = router.query;
  const [planInfo, setPlanInfo] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (planId) {
      (async () => {
        const txns = await getTransactionsforPeriod(planId);
        const plan = await getPlanById(planId);
        setPlanInfo(plan);
        setTransactions([...txns]);
      })();
    }
  }, [planId]);

  const addTransaction = async (payload) => {
    const id = await addPlanTransaction(payload);
    setTransactions((prev) => {
      [...prev, { id, ...payload }];
    });
  };

  return (
    <div className="flex max-w-4xl mx-auto justify-between">
      <div className="flex-1 pt-6 p-10">
        <h2 className="text-3xl mb-4">
          Plan Info -{" "}
          {planInfo && (
            <span className="text-blue-500 font-bold">{`${
              MONTHS[planInfo.period.month]
            }, ${planInfo.period.year}`}</span>
          )}
        </h2>
        <div className="text-xl">Categories</div>
        <div className="w-[60%]">
          <div className="flex font-bold justify-between">
            <p className="p-2 text-center">Category</p>
            <p className="p-2 text-center">Budget</p>
          </div>
          {planInfo?.categories?.map((cat) => {
            return (
              <div className="flex justify-between" key={cat.category}>
                <p className="p-2 text-center">{cat.category}</p>
                <p className="p-2 text-center">{cat.amount}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-2 pt-6 p-10 text-center">
        <TransactionsList
          planInfo={planInfo}
          transactions={transactions}
          planId={planId}
          onAdd={(payload) => addTransaction(payload)}
        ></TransactionsList>
      </div>
    </div>
  );
};

export default PlanDetails;
