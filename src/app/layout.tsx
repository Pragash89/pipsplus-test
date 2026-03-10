import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PipsPlus — Trading Education & Broker Reviews",
  description:
    "Learn trading from A-Z, find trusted brokers rated by 3.72M+ traders, and recover lost funds with PipsPlus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
