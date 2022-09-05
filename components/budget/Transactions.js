import React from "react";
import { Timestamp } from "firebase/firestore";
import { convertTimestampToDate, formatDate } from "../../utils/date-fns";

const Transactions = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="p-10 pt-6 basis-[600px]">
        <h1 className="text-3xl mb-4">Transactions</h1>
        <div>
          <div className="grid grid-cols-4 gap-2 place-content-center border-b-2 border-blue-500 py-5 font-bold">
            <p>Date</p>
            <p>Description</p>
            <p>Category</p>
            <p>Amount</p>
          </div>
          {data.map((transaction) => {
            return (
              <div
                key={transaction.id}
                className="grid grid-cols-4 gap-2 place-content-center"
              >
                <p className="my-4">
                  {formatDate(convertTimestampToDate(transaction.date))}
                </p>
                <p className="my-4">{transaction.description}</p>
                <p className="my-4">{transaction.category}</p>
                <p className="my-4">{transaction.amount}</p>
              </div>
            );
          })}
          {/* {data.map((transaction) => {
            return (
              <>
                <div className="flex justify-center items-center">
                  <p className="p-2">
                    {convertTimestampToDate(transaction.date)}
                  </p>
                  <p className="p-2">{transaction.description}</p>
                  <p className="p-2">{transaction.category}</p>
                  <p className="p-2">{transaction.amount}</p>
                </div>
              </>
            );
          })} */}
        </div>
      </div>
    </>
  );
};

export default Transactions;
