import DonateCard from "./DonateCard";
import TransferCard from "./TransferCard";
// Hapus import yang tidak digunakan karena kita sudah memiliki komponen terpisah
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchIDRXTransactions } from "@/utils/idrxTransaction";

export default function Activity() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );
  const [transactions, setTransactions] = useState<any[]>([]);
  useEffect(() => {
    const loadTransactions = async () => {
      if (!address) return;

      try {
        setIsLoading(true);
        setError(null);
        const txData = await fetchIDRXTransactions(address);
        console.log("txData", txData);
        setTransactions(txData);
      } catch (err) {
        console.error("Failed to fetch IDRX transactions:", err);
        setError("Gagal memuat riwayat transaksi IDRX");
      } finally {
        setIsLoading(false);
      }
    };
    loadTransactions();
  }, [address]);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600">
        {error}
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div>
        <div className="min-h-[600px]">
          <h1 className="mt-20 mb-5 text-2xl text-slate-800 font-bold font-almarai">
            Aktivitas
          </h1>
          <div className="w-full flex flex-col">
            <div className="w-full max-w-3xl *:mt-2">
              {transactions.map((tx, index) => (
                <TransferCard
                  key={index}
                  fromAddress={formatAddress(tx.from)}
                  type={tx.type}
                  amount={tx.amount}
                  txHash={tx.txHash}
                  date={formatDate(tx.timestamp)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
