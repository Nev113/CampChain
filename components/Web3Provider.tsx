"use client";

import { WagmiProvider, Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, lightTheme } from "@xellar/kit";
import { liskSepolia } from "viem/chains";

let config: Config | undefined;
console.log("Initializing Web3 configuration...");
console.log(
  "WALLET_CONNECT_PROJECT_ID:",
  process.env.WALLET_CONNECT_PROJECT_ID
);
console.log("XELLAR_APP_ID:", process.env.XELLAR_APP_ID);

try {
  config = defaultConfig({
    appName: "Xellar",
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID || "",
    xellarAppId: process.env.XELLAR_APP_ID,
    xellarEnv: "sandbox",
    chains: [liskSepolia],
    ssr: true,
  }) as Config;
} catch (error) {
  console.error("Error initializing defaultConfig:", error);
}

if (!config) {
  throw new Error("Failed to initialize Web3 configuration.");
}

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
