import Head from "next/head";
import { useEffect, useState } from "react";
import AddBudget from "@/components/budget/AddBudget";
import BudgetList from "../components/budget/BudgetList";
import { addPlanTransaction, getTransactionsforPeriod } from "@/lib/ApiClient";
import { useRouter } from "next/router";
import AddTransaction from "@/components/AddTransaction";
import { Tab } from "@headlessui/react";
import TransactionsList from "@/components/budget/TransactionsList";
import connect from "@/lib/mysql";
import * as mysql from "mysql2/promise";
import { parse } from "date-fns";
import Reports from "@/components/budget/Reports";

const list = [
  {
    tranId: 1,
    tranDate: new Date(),
    description: "desc-1",
    amount: 4.5,
    category: { catId: 1, name: "Cat-1" },
  },
  {
    tranId: 2,
    tranDate: new Date(),
    description: "desc-2",
    amount: 54.2,
    category: { catId: 2, name: "Cat-2" },
  },
];

export default function Home({ categories }) {
  const [planList, setPlanList] = useState([]);
  const [tranList, setTranList] = useState([]);
  const [isNewPlan, setIsNewPlan] = useState(false);
  const [activeTabFlag, setActiveTabFlag] = useState({
    add: true,
    list: false,
    reports: false,
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getTransactionsforPeriod(1);
      console.log(data);
      setTranList(data);
    })();
  }, []);

  const onPlanAdd = (id) => {
    setIsNewPlan(false);
    router.push(`plan/${id}`);
  };

  const addTransaction = async (transaction) => {
    const insertedTran = await addPlanTransaction(transaction);
    setTranList([
      ...tranList,
      {
        ...insertedTran,
        category: categories.find((c) => c.cat_id === insertedTran.cat_id),
      },
    ]);
    setActiveTabFlag({ add: false, list: true, reports: false });
  };

  return (
    <>
      <Head>
        <title>Budget Tracker</title>
        <meta name="description" content="Manage and Track your Budgets" />
      </Head>

      <div className="text-center mt-8">
        <div className="flex items-center justify-center gap-6">
          <button
            className="btn"
            onClick={() =>
              setActiveTabFlag({ add: true, list: false, reports: false })
            }
          >
            New Transaction
          </button>
          <button
            className="btn"
            onClick={() =>
              setActiveTabFlag({ add: false, list: true, reports: false })
            }
          >
            Transactions
          </button>
          <button
            className="btn"
            onClick={() =>
              setActiveTabFlag({ add: false, list: false, reports: true })
            }
          >
            Reports
          </button>
        </div>
        {activeTabFlag.add && (
          <div className="mt-2">
            <AddTransaction
              onAdd={addTransaction}
              categories={categories}
            ></AddTransaction>
          </div>
        )}
        {activeTabFlag.list && (
          <div className="mt-2">
            <TransactionsList transactions={tranList}></TransactionsList>
          </div>
        )}
        {activeTabFlag.reports && (
          <div className="mt-2">
            <Reports></Reports>
          </div>
        )}
        {/* {!isNewPlan && (
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
        </div> */}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const connection = await connect();
  let [rows] = await connection.query<mysql.RowDataPacket[]>(
    "SELECT cat_id, name FROM `category`"
  );
  let response = [];
  rows.forEach((row) => {
    response.push({ catId: row["cat_id"], name: row["name"] });
  });
  return { props: { categories: response } };
};
