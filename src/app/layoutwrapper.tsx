"use client";

import { NextUIProviders } from "./nextuiproviders";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const headerDisabled = ["/login"];

export default function RootLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <NextUIProviders>
        {!headerDisabled.includes(pathname) && <Header />}
        {children}
      </NextUIProviders>
    </SessionProvider>
  );
}
