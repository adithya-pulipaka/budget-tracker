import Head from "next/head";
import { useEffect, useState } from "react";
import {
  addNewCategory,
  addPlanTransaction,
  getCategories,
  getTransactionsforPeriod,
} from "@/lib/ApiClient";
import { useRouter } from "next/router";
import AddTransaction from "@/components/AddTransaction";
import TransactionsList from "@/components/budget/TransactionsList";
import { CSVLink, CSVDownload } from "react-csv";
import Reports from "@/components/budget/Reports";
import { useSession } from "next-auth/react";
import LandingPage from "@/components/core/LandingPage";

export default function Home() {
  const [tranList, setTranList] = useState([]);
  const [isNewPlan, setIsNewPlan] = useState(false);
  const [activeTabFlag, setActiveTabFlag] = useState({
    add: false,
    list: true,
    reports: false,
  });
  const [cats, setCats] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentTxn, setCurrentTxn] = useState(null);

  useEffect(() => {
    (async () => {
      if (status === "authenticated") {
        const categories = await getCategories();
        const data = await getTransactionsforPeriod(1);
        const txns = data.map((txn) => ({
          ...txn,
          category: {
            name: categories.find((cat) => cat.catId === txn.catId).name,
          },
        }));
        setCats(categories);
        setTranList(txns);
      }
    })();
  }, [session]);

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
        category: cats.find((c) => c.catId === insertedTran.catId),
      },
    ]);
    setActiveTabFlag({ add: false, list: true, reports: false });
  };

  const addCategory = async (name) => {
    const cat = await addNewCategory({ name });
    setCats([...cats, { name: cat.name, catId: cat.catId }]);
  };

  const reloadTxns = async () => {
    const data = await getTransactionsforPeriod(1);
    const txns = data.map((txn) => ({
      ...txn,
      category: {
        name: cats.find((cat) => cat.catId === txn.catId).name,
      },
    }));
    setTranList(txns);
  };

  const editTxn = async (tran) => {
    setActiveTabFlag({ add: true, list: false, reports: false });
    setCurrentTxn(tran);
  };

  return (
    <>
      <Head>
        <title>Budget Tracker</title>
        <meta name="description" content="Manage and Track your Budgets" />
      </Head>
      {status === "authenticated" && (
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-6">
            <button
              className="btn"
              onClick={() => {
                setActiveTabFlag({ add: false, list: true, reports: false });
                setCurrentTxn(null);
              }}
            >
              Transactions
            </button>
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
              onClick={() => {
                setActiveTabFlag({ add: false, list: false, reports: true });
                setCurrentTxn(null);
              }}
            >
              Reports
            </button>
          </div>
          {activeTabFlag.add && (
            <div className="mt-2">
              <AddTransaction
                onAdd={addTransaction}
                categories={cats}
                onCatAdd={addCategory}
                tran={currentTxn}
                onCancel={() => {
                  setActiveTabFlag({ add: false, list: true, reports: false });
                  setCurrentTxn(null);
                }}
              ></AddTransaction>
            </div>
          )}
          {activeTabFlag.list && (
            <div className="mt-2">
              <TransactionsList
                transactions={tranList}
                onChange={reloadTxns}
                onEdit={editTxn}
              ></TransactionsList>
            </div>
          )}
          {activeTabFlag.reports && (
            <div className="mt-2">
              <Reports></Reports>
            </div>
          )}
        </div>
      )}
      {status === "unauthenticated" && <LandingPage />}
    </>
  );
}

export const getServerSideProps = async () => {
  return { props: { categories: "response" } };
};
