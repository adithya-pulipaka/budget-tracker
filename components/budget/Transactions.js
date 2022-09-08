import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { convertTimestampToDate, formatDate } from "../../utils/date-fns";
import { addPlanTransaction } from "../../lib/db";

const Transactions = ({ data }) => {
  const { plan } = data;
  // const [transactionData, setTransactionData] = useState(data);
  const [transactionData, setTransactionData] = useState("");
  const [add, setAdd] = useState(false);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    console.log(add);
    setTransactionData(data);
    setAdd(false);
    setDate("");
    setCategory("");
    setAmount("");
    setDesc("");
  }, [data]);

  const addTransaction = async (e) => {
    e.preventDefault();
    const payload = {
      date,
      desc,
      category,
      amount,
      planId: transactionData.plan.id,
    };
    const id = await addPlanTransaction(payload);
    console.log(payload);
    setAdd(false);
    setTransactionData((prev) => {
      const { plan, transactions } = prev;
      return { plan, transactions: [...transactions, { id, ...payload }] };
    });
  };

  const cancelTransaction = (e) => {
    e.preventDefault();
    setAdd(false);
  };
  return (
    <>
      <div className="p-10 pt-6 basis-[600px]">
        <h1 className="text-3xl mb-4">
          Transactions for{" "}
          <span className="text-blue-500 font-bold">
            {plan.period.month}, {plan.period.year}
          </span>
        </h1>
        {!add && transactionData?.transactions?.length > 0 ? (
          <div>
            <div className="grid grid-cols-4 gap-2 place-content-center border-b-2 border-blue-500 py-5 font-bold">
              <p>Date</p>
              <p>Description</p>
              <p>Category</p>
              <p>Amount</p>
            </div>
            {transactionData.transactions.map((transaction) => {
              return (
                <div
                  key={transaction.id}
                  className="grid grid-cols-4 gap-2 place-content-center"
                >
                  <p className="my-4">{formatDate(transaction.date)}</p>
                  <p className="my-4">{transaction.desc}</p>
                  <p className="my-4">{transaction.category}</p>
                  <p className="my-4">{transaction.amount}</p>
                </div>
              );
            })}
          </div>
        ) : !add ? (
          <p className="my-4 text-gray-500">No Transactions Yet!</p>
        ) : (
          ""
        )}

        {add && (
          <div>
            <form>
              <div className="flex justify-around p-2">
                <p className="w-[25%] text-right">
                  <label htmlFor="date">Date</label>
                </p>
                <p className="w-[75%] text-left pl-12">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="border border-black p-1 rounded-md"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />{" "}
                </p>
              </div>
              <div className="flex justify-evenly p-2">
                <p className="w-[25%] text-right">
                  <label htmlFor="description">Description</label>
                </p>
                <p className="w-[75%] text-left pl-12">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="border border-black p-1 rounded-md"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </p>
              </div>
              <div className="flex justify-evenly p-2">
                <p className="w-[25%] text-right">
                  <label htmlFor="category">Category</label>
                </p>
                <p className="w-[75%] text-left pl-12">
                  <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-black p-1 rounded-md"
                  >
                    {plan.categories.map((cat) => {
                      return (
                        <option value={cat.category} key={cat.category}>
                          {cat.category}
                        </option>
                      );
                    })}
                  </select>
                  {/* <input
                    type="text"
                    name="category"
                    id="category"
                    className="border border-black p-1 rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  /> */}
                </p>
              </div>
              <div className="flex justify-evenly p-2">
                <p className="w-[25%] text-right">
                  <label htmlFor="amount">Amount</label>
                </p>
                <p className="w-[75%] text-left pl-12">
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="border border-black p-1 rounded-md"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                  />
                </p>
              </div>
              <div>
                <button
                  className="p-2 bg-black text-white rounded-lg m-4"
                  onClick={addTransaction}
                >
                  Add
                </button>
                <button
                  className="p-2 bg-black text-white rounded-lg m-4"
                  onClick={(e) => cancelTransaction(e)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        {!add && (
          <button
            className="p-2 bg-black text-white rounded-lg"
            onClick={() => setAdd(true)}
          >
            New Transaction
          </button>
        )}
      </div>
    </>
  );
};

export default Transactions;
