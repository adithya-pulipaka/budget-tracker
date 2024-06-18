import { signIn } from "next-auth/react";
import React from "react";

const LandingPage = () => {
  return (
    <div className="text-center mt-8 max-w-md mx-auto">
      <p>
        Welcome to BudgetTracker. Please signin/signup with one of the supported
        providers below.
        <p className="font-bold">
          Note: This is a test account! Data is not reliable
        </p>
      </p>
      <div className="mt-4">
        <button className="btn btn-accent" onClick={() => signIn()}>
          SignIn
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
