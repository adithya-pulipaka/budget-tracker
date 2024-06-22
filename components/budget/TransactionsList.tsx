import React, { useContext, useEffect, useRef, useState } from "react";
import {
  convertTimestampToDate,
  formatDate,
  formatAsHTMLDate,
  convertTimestampToDateStr,
} from "../../utils/date-fns";
import {
  addPlanTransaction,
  deleteTransaction,
  getPlanById,
  getTransactionsforPeriod,
} from "../../lib/ApiClient";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Toast from "../core/Toast";
import { ToastContext } from "@/components/core/AppContexts";

type TransactionDetails = {
  // planId: number;
  // planInfo: any;
  transactions: Array<Transaction>;
  // onAdd: any;
};

const TransactionsList = ({ transactions, onChange, onEdit }) => {
  const [add, setAdd] = useState(false);
  const deleteModal = useRef(null);
  const [selectedTran, setSelectedTran] = useState(null);
  const { prop, setProp } = useContext(ToastContext);
  // const [trans, setTrans] = useState(transactions);
  // console.log(transactions);
  // const { plan } = data;
  // // const [transactionData, setTransactionData] = useState(data);
  // const [transactionData, setTransactionData] = useState("");
  const [transactionData, setTransactionData] = useState({
    desc: "",
    amount: 0.0,
    category: "",
    date: new Date(),
  });

  const modal = (
    <>
      <dialog className="modal" ref={deleteModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this Transaction?
          </h3>
          <div className="mt-4 gap-2 flex justify-center">
            <button
              className="btn btn-sm"
              onClick={() => delModalSubmit("Yes")}
            >
              Yes
            </button>
            <button
              className="btn btn-sm btn-neutral"
              onClick={() => delModalSubmit("Cancel")}
            >
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );

  const delModalSubmit = async (resp) => {
    if ("Cancel" === resp) {
      deleteModal.current.close();
    } else {
      const result = await deleteTransaction(selectedTran);
      if (result) {
        deleteModal.current.close();
        setProp({ display: true, msg: "Transaction Deleted" });
        onChange();
      }
    }
  };

  // useEffect(() => {
  // if (planInfo.categories.length == 1) {
  //   setTransactionData({
  //     ...transactionData,
  //     category: planInfo.categories[0].category,
  //   });
  // }
  // }, [planInfo]);

  // const addTransaction = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     planId,
  //     tranDate: formatAsHTMLDate(transactionData.date),
  //     description: transactionData.desc,
  //     catId: planInfo.categories.find(
  //       (cat) => cat.name === transactionData.category
  //     ).catId,
  //     amount: transactionData.amount,
  //   };
  //   console.log(payload);
  //   onAdd(payload);
  //   // const id = await addPlanTransaction(payload);
  //   setAdd(false);
  //   // setTrans((prev) => {
  //   //   [...prev, { id, ...payload }];
  //   // });
  // };

  const cancelTransaction = (e) => {
    e.preventDefault();
    setAdd(false);
  };

  const openDeleteModal = (tranId, e) => {
    e.preventDefault();
    setSelectedTran(tranId);
    deleteModal.current.showModal();
  };

  return (
    <>
      {modal}
      {<Toast></Toast>}
      <div>
        {!add && transactions?.length > 0 ? (
          <div className="p-2 md:p-4 w-full md:max-w-5xl mx-auto text-left">
            <div className="grid grid-cols-5 gap-2 place-content-center border-b-2 border-blue-500 py-5 font-bold">
              <p>Date</p>
              <p>Description</p>
              <p>Category</p>
              <p className="text-right">Amount</p>
              <p></p>
            </div>
            {transactions?.map((transaction) => {
              return (
                <div
                  key={transaction.tranId}
                  className="grid grid-cols-5 gap-2 place-content-center"
                >
                  <p className="my-4">
                    {convertTimestampToDateStr(transaction.tranDate)}
                  </p>
                  <p className="my-4">{transaction.description}</p>
                  <p className="my-4">{transaction.category.name}</p>
                  <p className="my-4 text-right">{transaction.amount}</p>
                  <p className="my-4 mx-auto flex gap-2">
                    <PencilSquareIcon
                      className="h-5 w-5 cursor-pointer hover:text-blue-500"
                      onClick={() => onEdit(transaction)}
                    ></PencilSquareIcon>
                    <TrashIcon
                      className="h-5 w-5 cursor-pointer hover:text-red-500"
                      onClick={(e) => openDeleteModal(transaction.tranId, e)}
                    ></TrashIcon>
                  </p>
                </div>
              );
            })}
          </div>
        ) : !add ? (
          <p className="my-4 text-gray-500">No Transactions Yet!</p>
        ) : (
          ""
        )}

        {/* {add && (
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
                        date: new Date(e.target.value),
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
                        <option value={cat.name} key={cat.catId}>
                          {cat.name}
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
            </form>
          </div>
        )} */}
      </div>
    </>
  );
};

export default TransactionsList;
