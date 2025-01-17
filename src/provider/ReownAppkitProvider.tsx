"use client";

import React, { type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { projectId } from "@/config/config";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const appKitMetadata = {
  name: "AppKit Next.js Solana",
  description: "AppKit Next.js App Router Solana Example",
  url: "https://github.com/0xonerb/next-reown-appkit-ssr",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

export default ContextProvider;
