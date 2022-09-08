import React, { useState } from "react";

const BudgetList = ({ data, onPlanSelect }) => {
  const [planId, setPlanId] = useState("");

  const updateVisibility = (id) => {
    setPlanId((prev) => {
      if (id === planId) {
        return "";
      }
      return id;
    });
  };

  const viewTransaction = (plan) => {
    onPlanSelect(plan);
  };

  return (
    <>
      <div className="bg-slate-100 p-10 pt-6 basis-[500px] self-start">
        <h1 className="text-3xl mb-4">Existing Plans</h1>
        {data.map((plan) => {
          return (
            <div
              key={plan.id}
              className="border-b border-b-black max-w-[500px] mx-auto"
            >
              <div className="flex justify-between my-4 cursor-pointer">
                <p
                  onClick={() => updateVisibility(plan.id)}
                  className="hover:underline hover:bg-blue-500 hover:text-white"
                >
                  {plan.period.month},{plan.period.year}
                </p>
                <div>
                  <button onClick={(e) => viewTransaction(plan)}>
                    {" "}
                    View Transactions
                  </button>
                </div>
              </div>
              {planId === plan.id && (
                <div>
                  <div className="flex text-black font-bold border-b border-b-black w-[175px] auto">
                    <p className="p-2 basis-[100px] text-left">Category</p>
                    <p className="p-2 basis-[75px] text-right">Budget</p>
                  </div>
                  {plan.categories.map((cat) => {
                    return (
                      <div key={cat.category} className="flex w-[175px]">
                        <p className="p-2 text-left basis-[100px]">
                          {cat.category}
                        </p>
                        <p className="p-2 text-right basis-[75px]">
                          {cat.amount}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BudgetList;
