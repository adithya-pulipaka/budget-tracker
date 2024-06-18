import { AppProps } from "next/app";
import Layout from "@/components/core/Layout";
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Signin from "@/components/core/Signin";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
