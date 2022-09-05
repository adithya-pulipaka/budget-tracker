import React, { useState } from "react";
import { addBudgetPlan, getBudgetInfo } from "../../lib/db";
import { MONTHS, YEARS } from "../../utils/date-fns";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

const AddBudget = ({ onSuccess, onCancel }) => {
  const today = new Date();
  const month = MONTHS[today.getMonth()];
  const year = today.getFullYear();
  const [period, setPeriod] = useState({ month, year });
  const [index, setIndex] = useState(0);
  const [categories, setCategories] = useState([
    { category: "", amount: "", index: index },
  ]);

  const updatePeriod = (type, e) => {
    setPeriod((prev) => {
      return { ...prev, [type]: e.target.value };
    });
  };

  const addPlan = async (e) => {
    e.preventDefault();
    const plan = {
      period,
      categories: categories.map(({ index, ...rest }) => rest),
    };
    const id = await addBudgetPlan(plan);
    if (id) {
      onSuccess();
    }
  };

  const updateCategory = (type, index, value) => {
    const updated = categories.map((cat) => {
      if (cat.index === index) {
        return { ...cat, [type]: value };
      }
      return cat;
    });
    setCategories(updated);
  };

  const addCategory = (e) => {
    e.preventDefault();
    setCategories((existing) => {
      return [...existing, { category: "", amount: "", index: index + 1 }];
    });
    setIndex((value) => value + 1);
  };

  const deleteCategory = (index) => {
    setCategories((existing) => {
      return existing.filter((a) => a.index !== index);
    });
  };

  const cancelPlan = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <>
      <div className="border-b border-b-black p-12 m-4">
        <p className="text-2xl text-bold mb-2">Plan Details</p>
        <form>
          <div className="flex flex-col justify-center items-center max-w-[500px] mx-auto">
            <div className="w-[540px] flex items-center">
              <div className="w-[15%] text-right">
                <label htmlFor="period">Period:</label>
              </div>
              <div className="w-[85%] text-left">
                <select
                  name="period"
                  id="period"
                  value={period.month}
                  onChange={(e) => updatePeriod("month", e)}
                  className="mx-4 my-4 p-2 border border-black rounded-lg pr-4 mr-2"
                >
                  {MONTHS.map((month) => {
                    return (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="period"
                  id="period"
                  value={period.year}
                  onChange={(e) => updatePeriod("year", e)}
                  className="mx-4 my-4 p-2 border border-black rounded-lg pr-4 mr-2"
                >
                  {YEARS.map((year) => {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="w-[540px] flex items-center">
              <div className="w-[15%] text-right">
                <label htmlFor="category">Category:</label>
              </div>
              <div className="w-[85%] text-left">
                {categories.map((cat) => {
                  return (
                    <div key={cat.index} className="flex items-center">
                      <input
                        type="text"
                        name="category"
                        id="category"
                        className="mx-4 my-4 p-2 border border-black rounded-lg pr-4 mr-2"
                        value={cat.category}
                        onChange={(e) =>
                          updateCategory("category", cat.index, e.target.value)
                        }
                        placeholder="Category Name"
                        required
                      />
                      <input
                        type={"number"}
                        name="amount"
                        id="amount"
                        className="mx-4 my-4 p-2 border border-black rounded-lg pr-4 mr-2"
                        value={cat.amount}
                        onChange={(e) =>
                          updateCategory("amount", cat.index, e.target.value)
                        }
                        placeholder="Budget Amount"
                        required
                      />
                      {cat.index > 0 && (
                        <span>
                          <MinusCircleIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={() => deleteCategory(cat.index)}
                          ></MinusCircleIcon>
                        </span>
                      )}
                      {categories.indexOf(cat) === categories.length - 1 && (
                        <span>
                          <PlusCircleIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={addCategory}
                          ></PlusCircleIcon>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={addPlan}
            className="bg-slate-500 rounded-xl p-2 text-white"
          >
            Add Plan
          </button>
          <button
            onClick={cancelPlan}
            className="bg-slate-500 rounded-xl p-2 text-white ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBudget;
