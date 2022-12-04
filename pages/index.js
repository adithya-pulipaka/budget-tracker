import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddBudget from "../components/budget/AddBudget";
import BudgetList from "../components/budget/BudgetList";
import Transactions from "../components/budget/TransactionsList";
import {
  addData,
  getAllPlans,
  getBudgetInfo,
  getTransactionsforPeriod,
} from "../lib/db";
import Link from "next/link";

export default function Home() {
  const [planList, setPlanList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllPlans();
      setPlanList(data);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Budget Tracker</title>
        <meta name="description" content="Manage and Track your Budgets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center">
        <Link href={"/plan/create"}>
          <a className="p-3 bg-black rounded-2xl mx-auto text-white">
            {" "}
            Create a New Plan
          </a>
        </Link>

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
