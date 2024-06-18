import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <>
      <div className="mx-auto">
        <header className="navbar bg-neutral text-neutral-content px-8">
          <div className="text-xl mx-auto">
            <button onClick={() => router.push("/")}>Budget Tracker</button>
          </div>
          <div>
            {status === "unauthenticated" && (
              <button onClick={() => signIn()}>SignIn</button>
            )}
            {status === "authenticated" && (
              <button onClick={() => signOut()}>SignOut</button>
            )}
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
