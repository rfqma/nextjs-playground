import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutWrapper from "./layoutwrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Simulator by @rfqma",
  description: "Made with next-auth, nextjs, and nextui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
