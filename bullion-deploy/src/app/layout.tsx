import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import IntlProvider from "@/i18n/provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bullion Courier",
  description: "Reliable delivery. Real-time tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <IntlProvider>
          <Header />
          <main className="min-h-[calc(100vh-56px)]">
            <PageWrapper>{children}</PageWrapper>
          </main>
          <Footer />
        </IntlProvider>
      </body>
    </html>
  );
}
