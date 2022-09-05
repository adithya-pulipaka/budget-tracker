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
  const [dataChanged, setDataChanged] = useState(false);
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    (async () => {
      await getPlanData();
    })();
  }, [dataChanged]);

  const getPlanData = async () => {
    const data = await getAllPlans();
    const latest = data[0];
    const transactions = await getTransactionsforPeriod(latest.id);
    setTransactions(transactions);
    setPlanList(data);
  };

  const onBudgetAdd = () => {
    getPlanData();
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
        {/* {planList && <BudgetList data={planList}></BudgetList>} */}
        <div className="flex justify-center my-12 p-6 gap-16 max-w-[1200px] mx-auto">
          {planList && <BudgetList data={planList}></BudgetList>}

          {transactions && <Transactions data={transactions}></Transactions>}
        </div>
      </main>
    </>
  );
}
