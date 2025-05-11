"use client";

import IDRXBalance from "@/components/IDRXBalance";
import DepositModal from "@/components/DepositModal";

export default function DashboardPage() {
  const balance = IDRXBalance();
  function handleCopyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Text copied to clipboard");
    });
  }
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
          <div className="size-[100px] bg-indigo-100 rounded-xl flex flex-col justify-center items-center font-semibold text-[14px] text-indigo-800 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
            </svg>
            Withdraw
          </div>
        </div>
      </div>
      <div>
        <div className="min-h-[400px]">
          <h1 className="mt-20 text-2xl text-slate-800 font-bold font-almarai">
            Aktivitas Anda
          </h1>
          <div className="w-full h-[200px] flex justify-center items-center">
            <p className="text-center text-slate-500 text-[18px]">
              Tidak Ada Data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
