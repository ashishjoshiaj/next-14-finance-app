"use client";

import { CookiesProvider } from "react-cookie";

export default function ClientCookiesProvider({ children }) {
  return (
    <CookiesProvider>
      {children}
    </CookiesProvider>
  );
}
