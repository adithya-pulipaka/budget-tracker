import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addPlanTransaction,
  getCategoriesByPlan,
  getTransactionsforPeriod,
} from "../../lib/ApiClient";
import TransactionsList from "../../components/budget/TransactionsList";
import { MONTHS } from "../../utils/constants";
import AddTransaction from "@/components/budget/AddTransaction";
import {
  getAllCategories,
  getPlanById,
  getTransactionsForPlan,
} from "@/firebase/db";

const PlanDetails = () => {
  const router = useRouter();
  const { planId } = router.query;
  const [planInfo, setPlanInfo] = useState<any>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (planId) {
      (async () => {
        //type the transactions
        const txns: Array<any> = await getTransactionsForPlan(planId);
        const plan = await getPlanById(planId);
        setPlanInfo(plan);
        setTransactions([...txns]);
        const cats = await getAllCategories();
        setCategories(cats);
      })();
    }
  }, [planId]);

  const addTransaction = async (payload) => {
    const tran = await addPlanTransaction({ ...payload, planId });
    setTransactions((prev) => {
      return [...prev, tran];
    });
  };

  const formatPeriod = (period) => {
    const date = new Date(period);
    return `${MONTHS[date.getUTCMonth() + 1]}, ${date.getUTCFullYear()}`;
  };

  return (
    <div className="flex flex-col h-[85vh] mx-20 p-8 gap-8 border border-black">
      <div className="-mb-4">
        <button
          className="p-2 bg-black text-white rounded-lg text-xs"
          onClick={() => router.push("/")}
        >
          Back to Dashboard
        </button>
      </div>
      <div className="max-h-[30vh] text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nemo sequi
        nihil ducimus minima distinctio perspiciatis debitis maxime modi, facere
        accusantium blanditiis minus impedit atque excepturi itaque quisquam,
        soluta dolor.
      </div>
      <div className="flex p-4 gap-8">
        <div className="flex-1 border border-red-500">
          <TransactionsList
            planInfo={planInfo}
            transactions={transactions}
            planId={Number(planId)}
            onAdd={(payload) => addTransaction(payload)}
          ></TransactionsList>
        </div>
        <div className="flex-1 border border-blue-500">
          {/* {planInfo && (
            <AddTransaction
              categories={categories}
              onAdd={addTransaction}
            ></AddTransaction>
          )} */}
        </div>
      </div>
    </div>
    // <div className="flex max-w-4xl mx-auto justify-between">
    //   <div className="flex-1 pt-6 p-10">
    //     <h2 className="text-3xl mb-4">
    //       Plan Info -{" "}
    //       {planInfo && (
    //         <span className="text-blue-500 font-bold">{`${formatPeriod(
    //           planInfo["period"]
    //         )}`}</span>
    //       )}
    //     </h2>
    //     {/* <div className="text-xl">Categories</div>
    //     <div className="w-[60%]">
    //       <div className="flex font-bold justify-between">
    //         <p className="p-2 text-center">Category</p>
    //         <p className="p-2 text-center">Budget</p>
    //       </div>
    //       {planInfo?.categories?.map((cat) => {
    //         return (
    //           <div className="flex justify-between" key={cat.catId}>
    //             <p className="p-2 text-center">{cat.name}</p>
    //             <p className="p-2 text-center">{cat.amount}</p>
    //           </div>
    //         );
    //       })}
    //     </div> */}
    //   </div>
    //   <div className="flex-2 pt-6 p-10 text-center">
    //     <TransactionsList
    //       planInfo={planInfo}
    //       transactions={transactions}
    //       planId={Number(planId)}
    //       onAdd={(payload) => addTransaction(payload)}
    //     ></TransactionsList>
    //   </div>
    // </div>
  );
};

export default PlanDetails;
