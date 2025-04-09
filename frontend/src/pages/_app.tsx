import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import "../styles/globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import MainLayout from "@/components/layout/MainLayout";
import React from "react";

// Extend AppProps to support getLayout
export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the page's getLayout() if defined, otherwise wrap with MainLayout by default
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
