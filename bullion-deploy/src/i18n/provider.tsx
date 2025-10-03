"use client";

import { NextIntlClientProvider } from "next-intl";
import en from "./messages/en.json";

// Simple provider for MVP: English only, extensible later for locale routing
export default function IntlProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={en}>
      {children}
    </NextIntlClientProvider>
  );
}
