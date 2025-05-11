"use client";
import { useConnectModal } from "@xellar/kit";
import { useAccount, useBalance } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import IDRXBalance from "./IDRXBalance";

export default function ConnectModal() {
  const { open: openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const router = useRouter();

  const { data: balance } = useBalance({
    address: "0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661",
    token: "0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661",
    chainId: 4202,
  });

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <div className="flex flex-col gap-2">
      {isConnected ? (
        <Button
          onPress={() => router.push("/dashboard")}
          className="rounded-full bg-indigo-100 text-indigo-800 font-semibold font-lg w-fit hover:bg-indigo-800 hover:text-indigo-50"
        >
          {<IDRXBalance />}
        </Button>
      ) : (
        <Button
          onClick={() => openConnectModal()}
          className="rounded-full bg-indigo-100 text-indigo-800 font-semibold font-lg w-fit hover:bg-indigo-800 hover:text-indigo-50"
        >
          Connect
        </Button>
      )}
    </div>
  );
}
