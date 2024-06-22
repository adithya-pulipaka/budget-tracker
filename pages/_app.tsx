import { AppProps } from "next/app";
import Layout from "@/components/core/Layout";
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { ToastContextProvider } from "@/components/core/AppContexts";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <ToastContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
