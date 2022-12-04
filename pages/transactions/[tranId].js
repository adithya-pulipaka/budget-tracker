import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPlanById, getTransactionsforPeriod } from "../../lib/db";
import TransactionsList from "../../components/budget/TransactionsList";

const Transactions = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState(null);
  const { tranId } = router.query;

  useEffect(() => {
    if (tranId) {
      (async () => {
        const txns = await getTransactionsforPeriod(tranId);
        const plan = await getPlanById(tranId);
        console.log(plan);
        // console.log([...txns]);
        setTransactions(() => {
          return { plan, transactions: [...txns] };
        });
      })();
    }
  }, [tranId]);

  console.log(transactions);

  //   useEffect(() => {
  //     const { tranId } = router.query;
  //     console.log(tranId + "fasd");
  //     (async () => {
  //       const txns = await getTransactionsforPeriod(tranId);
  //       console.log(txns);
  //       setTransactions(() => {
  //         return [...txns];
  //       });
  //     })(tranId);
  //   }, [router.query]);

  return (
    <div>
      {transactions && (
        <TransactionsList data={transactions}></TransactionsList>
      )}
    </div>
  );
};

export default Transactions;
