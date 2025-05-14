"use client";

import IDRXBalance from "@/components/IDRXBalance";
import DepositModal from "@/components/DepositModal";
import TransferModal from "@/components/TransferModel";
import Activity from "@/components/Activity";

export default function DashboardPage() {
  const balance = IDRXBalance();
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
      </div>
      <div>
        <Activity />
      </div>
    </div>
  );
}
