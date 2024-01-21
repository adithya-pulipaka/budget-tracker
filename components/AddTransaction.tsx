import { formatAsHTMLDate, parseDateAsSelected } from "@/utils/date-fns";
import React, { useState } from "react";

const initialData = {
  tranDate: new Date(),
  desc: "",
  category: "",
  amount: 0,
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
        <div>
          <div className="flex justify-center p-4 w-full mx-auto mt-4 md:max-w-sm">
            <form className="w-full">
              <div>
                <label htmlFor="date" className="label font-bold">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="input input-bordered input-sm w-full"
                  value={formatAsHTMLDate(transactionData.tranDate)}
                  onChange={(e) => {
                    setTransactionData({
                      ...transactionData,
                      tranDate: parseDateAsSelected(new Date(e.target.value)),
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="description" className="label font-bold">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="input input-bordered input-sm w-full"
                  value={transactionData.desc}
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      desc: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="category" className="label font-bold">
                  Category
                </label>
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
                  className="select select-bordered select-sm w-full"
                >
                  <option disabled value="">
                    -- Pick a Category --
                  </option>
                  {categories.map((cat) => {
                    return (
                      <option value={cat.name} key={cat.catId}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="label font-bold">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="input input-bordered input-sm w-full"
                  value={transactionData.amount}
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex mt-8 justify-center gap-4">
                <button className="btn" onClick={addTransaction}>
                  Add
                </button>
                <button
                  className="btn btn-neutral"
                  onClick={(e) => resetTransaction(e)}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTransaction;
