import Head from "next/head";
import { useEffect, useState } from "react";
import AddBudget from "@/components/budget/AddBudget";
import BudgetList from "../components/budget/BudgetList";
import { getAllPlans } from "@/lib/ApiClient";
import { useRouter } from "next/router";

export default function Home() {
  const [planList, setPlanList] = useState([]);
  const [isNewPlan, setIsNewPlan] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getAllPlans();
      console.log(data);
      setPlanList(data);
    })();
  }, []);

  const onPlanAdd = (id) => {
    setIsNewPlan(false);
    router.push(`plan/${id}`);
  };

  return (
    <>
      <Head>
        <title>Budget Tracker</title>
        <meta name="description" content="Manage and Track your Budgets" />
      </Head>

      <div className="text-center">
        {!isNewPlan && (
          <button
            className="bg-black text-white p-2 rounded-2xl mx-auto text-sm"
            onClick={() => setIsNewPlan(true)}
          >
            New Plan
          </button>
        )}

        <div>
          {isNewPlan && (
            <AddBudget
              onSuccess={(plan) => onPlanAdd(plan["planId"])}
              onCancel={() => setIsNewPlan(false)}
            ></AddBudget>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center my-12 p-6 gap-16 max-w-[1200px] mx-auto">
          {planList.length > 0 ? (
            <BudgetList data={planList}></BudgetList>
          ) : (
            <p>No Plans yet. Add one now!</p>
          )}
        </div>
      </div>
    </>
  );
}
