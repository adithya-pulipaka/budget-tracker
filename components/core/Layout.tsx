import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto">
        <h1 className="text-4xl my-5 text-center font-bold">Budget Tracker</h1>
        <main className="">{children}</main>
      </div>
    </>
  );
};

export default Layout;
