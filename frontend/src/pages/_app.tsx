import { CartProvider } from "@/context/CartContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
