import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import {
  convertTimestampToDate,
  formatDate,
  formatAsHTMLDate,
  convertTimestampToDateStr,
} from "../../utils/date-fns";
import {
  addPlanTransaction,
  getPlanById,
  getTransactionsforPeriod,
} from "../../lib/db";

const TransactionsList = ({ planId, planInfo, transactions, onAdd }) => {
  const [add, setAdd] = useState(false);
  // const [trans, setTrans] = useState(transactions);
  console.log(transactions);
  // const { plan } = data;
  // // const [transactionData, setTransactionData] = useState(data);
  // const [transactionData, setTransactionData] = useState("");
  const [transactionData, setTransactionData] = useState({
    desc: "",
    amount: "",
    category: "",
    date: new Date(),
  });

  useEffect(() => {
    console.log(planInfo);
    if (planInfo.categories.length == 1) {
      setTransactionData({
        ...transactionData,
        category: planInfo.categories[0].category,
      });
    }
  }, [planInfo]);

  const addTransaction = async (e) => {
    e.preventDefault();
    const payload = {
      planId,
      ...transactionData,
    };
    console.log(payload);
    // onAdd(payload);
    // const id = await addPlanTransaction(payload);
    setAdd(false);
    // setTrans((prev) => {
    //   [...prev, { id, ...payload }];
    // });
  };

  const cancelTransaction = (e) => {
    e.preventDefault();
    setAdd(false);
  };
  return (
    <>
      <div>
        <h1 className="text-3xl mb-4">Transactions</h1>
        {!add && transactions?.length > 0 ? (
          <div>
            <div className="grid grid-cols-4 gap-2 place-content-center border-b-2 border-blue-500 py-5 font-bold">
              <p>Date</p>
              <p>Description</p>
              <p>Category</p>
              <p>Amount</p>
            </div>
            {transactions?.map((transaction) => {
              return (
                <div
                  key={transaction.id}
                  className="grid grid-cols-4 gap-2 place-content-center"
                >
                  <p className="my-4">
                    {convertTimestampToDateStr(transaction.date)}
                  </p>
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
                    value={formatAsHTMLDate(transactionData.date)}
                    onChange={(e) =>
                      setTransactionData({
                        ...transactionData,
                        date: e.target.value,
                      })
                    }
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
                    value={transactionData.desc}
                    onChange={(e) =>
                      setTransactionData({
                        ...transactionData,
                        desc: e.target.value,
                      })
                    }
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
                    value={transactionData.category}
                    onChange={(e) =>
                      setTransactionData({
                        ...transactionData,
                        category: e.target.value,
                      })
                    }
                    className="border border-black p-1 rounded-md"
                  >
                    {planInfo.categories.map((cat) => {
                      return (
                        <option value={cat.category} key={cat.category}>
                          {cat.category}
                        </option>
                      );
                    })}
                  </select>
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
                    value={transactionData.amount}
                    onChange={(e) =>
                      setTransactionData({
                        ...transactionData,
                        amount: parseFloat(e.target.value),
                      })
                    }
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

export default TransactionsList;
