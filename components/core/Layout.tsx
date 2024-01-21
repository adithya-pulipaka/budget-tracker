import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <div className="mx-auto">
        <header className="navbar bg-neutral text-neutral-content px-8">
          <div className="text-xl mx-auto">
            <button onClick={() => router.push("/")}>Budget Tracker</button>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
