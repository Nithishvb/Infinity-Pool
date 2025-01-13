"use client";

import React, { type ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { solana } from "@reown/appkit/networks";
import { ThemeProvider } from "next-themes";
import { solanaAdapter, projectId, networks } from "@/config/config";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const appKitMetadata = {
  name: "AppKit Next.js Solana",
  description: "AppKit Next.js App Router Solana Example",
  url: "https://github.com/0xonerb/next-reown-appkit-ssr",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export const modal = createAppKit({
  adapters: [solanaAdapter],
  projectId,
  networks,
  defaultNetwork: solana,
  metadata: appKitMetadata,
  themeMode: "light",
  features: {
    analytics: true,
  },
});

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

export default ContextProvider;
