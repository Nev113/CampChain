"use client";

import IDRXBalance from "@/components/IDRXBalance";
import DepositModal from "@/components/DepositModal";
import TransferModal from "@/components/TransferModel";
import Activity from "@/components/Activity";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  const balance = IDRXBalance();
  useEffect(() => {
    async function fetchOrCreateUser() {
      try {
        if (!address) return;

        const response = await fetch(`/api/user?address=${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 404) {
          try {
            const createResponse = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                address,
              }),
            });
            if (!createResponse.ok) {
              throw new Error("Failed to create user");
            }
            await createResponse.json();
          } catch (error) {
            console.error("Error creating user:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching or creating user:", error);
      }
    }
    if (isConnected && address) {
      fetchOrCreateUser();
    }
  }, [isConnected, address]);
  return (
    <div className="min-h-screen">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-xl font-bold mt-10 text-slate-500">
            Selamat Datang, Donatur Baik!
          </h1>
          <div className="mt-3 text-slate-800 font-notoSans font-bold text-4xl">
            {balance}
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center mt-5">
          <DepositModal />
          <TransferModal />
        </div>
      </div>{" "}
      <div>
        <Activity />
      </div>
    </div>
  );
}
