import { formatAsHTMLDate, parseDateAsSelected } from "@/utils/date-fns";
import React, { useState } from "react";

const initialData = {
  tranDate: new Date(),
  desc: "",
  category: "",
  amount: 0.0,
};

const categories = [
  { name: "one", catId: 1 },
  { name: "two", catId: 2 },
  { name: "three", catId: 1 },
];

const AddTransaction = ({ onAdd, categories }) => {
  const [transactionData, setTransactionData] = useState(initialData);

  const addTransaction = (e) => {
    e.preventDefault();
    // console.log(categories);
    // console.log(transactionData.category);
    const transaction = {
      tranDate: formatAsHTMLDate(transactionData.tranDate),
      description: transactionData.desc,
      catId: categories.find((c) => c.name === transactionData.category).catId,
      amount: transactionData.amount,
      planId: 1,
    };
    onAdd(transaction);
  };

  const resetTransaction = (e) => {
    e.preventDefault();
    setTransactionData(initialData);
  };

  return (
    <>
      <section>
        <div className=" inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                      onChange={(e) => {
                        // console.log(e.target.value);
                        // console.log(
                        //   parseDateAsSelected(new Date(e.target.value))
                        // );
                        // console.log(new Date(e.target.value));
                        // }
                        setTransactionData({
                          ...transactionData,
                          tranDate: parseDateAsSelected(
                            new Date(e.target.value)
                          ),
                        });
                      }}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTransaction;
