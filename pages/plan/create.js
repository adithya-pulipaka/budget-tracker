import React from "react";
import AddBudget from "../../components/budget/AddBudget";
import { useRouter } from "next/router";

const CreateBudgetPlan = () => {
  const router = useRouter();

  const navigateHome = () => {
    router.push("/");
  };
  return (
    <div>
      <AddBudget
        onSuccess={() => navigateHome()}
        onCancel={() => navigateHome()}
      ></AddBudget>
    </div>
  );
};

export default CreateBudgetPlan;
