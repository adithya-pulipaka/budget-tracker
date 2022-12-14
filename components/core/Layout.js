import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="mx-auto">
        <h1 className="text-5xl my-5 text-center font-bold">Budget Tracker</h1>
        <main className="">{children}</main>
      </div>
    </>
  );
};

export default Layout;
