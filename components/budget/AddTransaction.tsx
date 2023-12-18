import { formatAsHTMLDate } from "@/utils/date-fns";
import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";

type AddTranProps = {
  categories: any;
  onAdd: (transaction: any) => void;
};
const initialData = {
  tranDate: new Date(),
  desc: "",
  category: "",
  amount: 0.0,
};

const AddTransaction = ({ categories, onAdd }: AddTranProps) => {
  console.log(categories);
  const [transactionData, setTransactionData] = useState(initialData);

  const closeModal = () => {
    console.log("first");
  };

  const addTransaction = (e) => {
    e.preventDefault();
    const tran = {
      // tranDate: formatAsHTMLDate(transactionData.tranDate),
      tranDate: transactionData.tranDate,
      description: transactionData.desc,
      category: transactionData.category,
      amount: transactionData.amount,
    };
    // console.log(tran);
    onAdd(tran);
    // setTransactionData(initialData);
  };

  const resetTransaction = (e) => {
    e.preventDefault();
    setTransactionData(initialData);
  };

  return (
    <section className="py-2 text-center">
      <h1 className="text-3xl mb-4">New Transaction</h1>

      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal}
        open={true}
      >
        <div className="fixed inset-0 bg-black/25" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-xl font-medium leading-8 text-gray-900"
              >
                New Transaction
              </Dialog.Title>

              <div className="mt-4">
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
                        // value={"2023-06-10"}
                        value={formatAsHTMLDate(transactionData.tranDate)}
                        onChange={(e) =>
                          setTransactionData({
                            ...transactionData,
                            tranDate: new Date(e.target.value),
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
                        <option disabled value="">
                          - select a Category -{" "}
                        </option>
                        {categories.map((cat) => {
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
                  <div className="flex justify-center">
                    <button
                      className="p-2 bg-black text-white rounded-lg m-4"
                      onClick={addTransaction}
                    >
                      Add
                    </button>
                    <button
                      className="p-2 bg-black text-white rounded-lg m-4"
                      onClick={(e) => resetTransaction(e)}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default AddTransaction;
