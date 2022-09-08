import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddBudget from "../components/budget/AddBudget";
import BudgetList from "../components/budget/BudgetList";
import Transactions from "../components/budget/Transactions";
import {
  addData,
  getAllPlans,
  getBudgetInfo,
  getTransactionsforPeriod,
} from "../lib/db";

export default function Home() {
  const [add, setAdd] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    (async () => {
      await getPlanData();
    })();
  }, []);

  const getPlanData = async () => {
    const data = await getAllPlans();
    console.log(data);
    setPlanList(data);
  };

  const onBudgetAdd = () => {
    getPlanData();
    setAdd(false);
  };

  const getTransactions = async (plan) => {
    console.log(plan);
    const transactions = await getTransactionsforPeriod(plan.id);
    setTransactions({ plan, transactions });
  };

  return (
    <>
      <Head>
        <title>Budget Tracker</title>
        <meta name="description" content="Manage and Track your Budgets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-5xl my-5 text-center font-bold">Budget Tracker</h1>

        {!add && (
          <button
            onClick={() => setAdd(true)}
            className="p-2 bg-black rounded-2xl mx-auto text-white"
          >
            Create a New Plan
          </button>
        )}

        {add && (
          <>
            <AddBudget
              onSuccess={() => onBudgetAdd()}
              onCancel={() => setAdd(false)}
            ></AddBudget>
          </>
        )}
        <div className="flex flex-col md:flex-row justify-center my-12 p-6 gap-16 max-w-[1200px] mx-auto">
          {planList.length > 0 ? (
            <BudgetList
              data={planList}
              onPlanSelect={(e) => getTransactions(e)}
            ></BudgetList>
          ) : (
            <p>No Plans yet. Add one now!</p>
          )}

          {transactions && <Transactions data={transactions}></Transactions>}
        </div>
      </main>
    </>
  );
}
