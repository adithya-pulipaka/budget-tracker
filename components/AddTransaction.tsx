import { formatAsHTMLDate, parseDateAsSelected } from "@/utils/date-fns";
import React, { useRef, useState } from "react";
import { addNewCategory } from "@/lib/ApiClient";

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

const AddTransaction = ({ onAdd, categories, onCatAdd }) => {
  const [transactionData, setTransactionData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const catModal = useRef(null);
  const catText = useRef(null);

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

  const modal = (
    <>
      <dialog className="modal" ref={catModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Category</h3>
          <div className="mt-4 text-left">
            <label htmlFor="cat">Category: </label>
            <input
              type="text"
              name="cat"
              id="cat"
              className="border rounded-lg mx-4 pl-2 py-1"
              ref={catText}
            />
            <button className="btn btn-sm" onClick={(e) => addCategory(e)}>
              Add
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    catModal.current.showModal();
  };

  const addCategory = async (e) => {
    e.preventDefault();
    catModal.current.close();
    onCatAdd(catText.current.value);
    catText.current.value = "";
  };

  return (
    <>
      {modal}
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
                <div className="flex items-center justify-between gap-4">
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
                  <div>
                    <button className="btn btn-sm" onClick={openModal}>
                      Add
                    </button>
                  </div>
                </div>
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
