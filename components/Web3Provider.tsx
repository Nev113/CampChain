"use client";

import { WagmiProvider, Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, lightTheme } from "@xellar/kit";
import { liskSepolia } from "viem/chains";

export const config = defaultConfig({
  appName: "Xellar",
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
  xellarAppId: process.env.NEXT_PUBLIC_XELLAR_APP_ID,
  xellarEnv: "sandbox",
  chains: [liskSepolia],
  ssr: true,
}) as Config;

const queryClient = new QueryClient();

import React, { useState, useEffect } from "react";

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isXellarFailed, setIsXellarFailed] = useState(false);

  // Check for Xellar failures when component mounts
  useEffect(() => {
    try {
      const xellarFailedInStorage =
        localStorage.getItem("xellarFailed") === "true";
      if (xellarFailedInStorage) {
        setIsXellarFailed(true);
      }
    } catch (error) {
      console.error("Error checking Xellar status:", error);
    }
  }, []);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes("Failed to fetch app config")) {
        setIsXellarFailed(true);
        localStorage.setItem("xellarFailed", "true");
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);
  const renderChildren = () => children;
  if (isXellarFailed) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {renderChildren()}
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // Normal mode with full functionality
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={lightTheme}>
          {renderChildren()}
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
