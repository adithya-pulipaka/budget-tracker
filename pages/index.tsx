import Head from "next/head";
import { useEffect, useState } from "react";
import AddBudget from "@/components/budget/AddBudget";
import BudgetList from "../components/budget/BudgetList";
// import { getAllPlans } from "@/lib/ApiClient";
import { useRouter } from "next/router";
import {
  getAllCategories,
  getAllPlans,
  getTransactionsForPlan,
} from "@/firebase/db";
import TransactionsList from "@/components/budget/TransactionsList";
import AddTransaction from "@/components/budget/AddTransaction";

export default function Home() {
  const [planList, setPlanList] = useState([]);
  const [isNewPlan, setIsNewPlan] = useState(false);
  const [isNewTransaction, setIsNewTransaction] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getAllPlans();
      const cats = await getAllCategories();
      setCategories(cats);
      setPlanList(data);
      setSelectedPlan(data[0].planId);
      const txns: Array<any> = await getTransactionsForPlan(data[0].planId);
      setTransactions([...txns]);
    })();
  }, []);

  const onPlanAdd = (id) => {
    setIsNewPlan(false);
    router.push(`plan/${id}`);
  };

  const addTransaction = async (tran) => {
    console.log(tran);
    await addTransaction({ ...tran, plan_id: selectedPlan });
    // e.preventDefault();
    // const payload = {
    //   planId,
    //   tranDate: formatAsHTMLDate(transactionData.date),
    //   description: transactionData.desc,
    //   catId: planInfo.categories.find(
    //     (cat) => cat.name === transactionData.category
    //   ).catId,
    //   amount: transactionData.amount,
    // };
    // console.log(payload);
    // onAdd(payload);
    // const id = await addPlanTransaction(payload);
    // setAdd(false);
    // setTrans((prev) => {
    //   [...prev, { id, ...payload }];
    // });
  };

  return (
    <>
      <Head>
        <title>Budget Tracker</title>
        <meta name="description" content="Manage and Track your Budgets" />
      </Head>

      <div className="flex flex-col h-[85vh] mx-20 p-8 gap-8 border border-black">
        <div className="max-h-[30vh] text-center">
          {!isNewPlan && (
            <button
              className="bg-black text-white p-2 rounded-2xl mx-auto text-sm"
              onClick={() => setIsNewPlan(true)}
            >
              New Plan
            </button>
          )}
          {!isNewTransaction && (
            <button
              className="bg-black text-white p-2 rounded-2xl mx-auto text-sm ml-2"
              onClick={() => setIsNewTransaction(true)}
            >
              New Transaction
            </button>
          )}
          {isNewTransaction && (
            <AddTransaction
              categories={categories}
              onAdd={addTransaction}
            ></AddTransaction>
          )}
          <div>
            {isNewPlan && (
              <AddBudget
                onSuccess={(plan) => onPlanAdd(plan["planId"])}
                onCancel={() => setIsNewPlan(false)}
              ></AddBudget>
            )}
          </div>
        </div>
        <div className="flex p-4 gap-8">
          <div className="flex-1 text-center border border-red-500">
            <BudgetList data={planList}></BudgetList>
          </div>
          <div className="flex-1 border border-blue-500">
            <TransactionsList
              planInfo={planList[0]}
              transactions={transactions}
              // onAdd={(payload) => addTransaction(payload)}
            ></TransactionsList>
            {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            necessitatibus doloremque at veritatis maxime harum nostrum
            architecto exercitationem. Eius accusamus maxime rerum in ut
            asperiores veritatis pariatur, sint molestias! Ullam? Possimus
            quisquam sapiente ipsa rerum? Modi natus perspiciatis obcaecati rem
            culpa, voluptatem dicta eos sapiente autem sunt a consequuntur
            aliquid dolore aperiam porro quam nulla quisquam illum debitis!
            Nesciunt, quis? Inventore, dolorum. Quidem fugit voluptates sint
            eveniet deleniti nulla neque! Quo, fuga necessitatibus culpa nam,
            harum incidunt ratione numquam odio obcaecati at corporis vitae
            neque laborum ea tempora! Explicabo, suscipit. */}
          </div>
        </div>
      </div>
    </>
  );
}
