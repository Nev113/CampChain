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

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={lightTheme}>{children}</XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
