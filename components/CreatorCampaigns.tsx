"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

interface Campaign {
  id: string;
  title: string;
  status: "active" | "completed" | "pending";
  currentAmount: number;
  targetAmount: number;
  milestoneCompleted: number;
  totalMilestones: number;
}

export default function CreatorCampaigns() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // This is a placeholder. In a real application, you would fetch campaigns from your backend or smart contract.
  useEffect(() => {
    if (!isConnected || !address) {
      setLoading(false);
      return;
    }

    // Simulate fetching campaigns for the creator
    const fetchCampaigns = async () => {
      try {
        // In a real application, you would fetch the campaigns from your backend or smart contract
        // For now, we'll use some dummy data
        const dummyCampaigns: Campaign[] = [
          {
            id: "1",
            title: "Membantu untuk biaya pengobatan",
            status: "active",
            currentAmount: 2000000,
            targetAmount: 5000000,
            milestoneCompleted: 1,
            totalMilestones: 2,
          },
          {
            id: "2",
            title: "Perbaikan sekolah desa",
            status: "active",
            currentAmount: 3500000,
            targetAmount: 10000000,
            milestoneCompleted: 2,
            totalMilestones: 4,
          },
        ];

        setCampaigns(dummyCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [address, isConnected]);

  if (loading) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-4">Kampanye Anda</h2>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-32 rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Kampanye Anda</h2>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
          <p className="text-indigo-800 mb-4">
            Anda belum memiliki kampanye aktif.
          </p>
          <Link
            href="/dashboard/creator/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Buat Kampanye Baru
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Kampanye Anda</h2>
        <Link
          href="/dashboard/creator/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm rounded-md"
        >
          + Buat Baru
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-indigo-100 rounded-xl p-4 flex flex-col justify-between"
          >
            <h3 className="text-slate-800 text-[16px] font-bold mb-2">
              {campaign.title}
            </h3>
            <div className="gap-2 flex flex-col">
              <p
                className={`px-2 text-${campaign.status === "active" ? "green" : "orange"}-800 bg-${campaign.status === "active" ? "green" : "orange"}-200 rounded-full text-[12px] w-fit`}
              >
                {campaign.status === "active"
                  ? "Sedang Berjalan"
                  : campaign.status === "completed"
                    ? "Selesai"
                    : "Menunggu Persetujuan"}
              </p>
              <div className="text-slate-800 text-[12px] flex flex-row justify-between">
                <p>{campaign.currentAmount.toLocaleString()} IDRX</p>
                <p className="text-slate-500">
                  {campaign.milestoneCompleted}/{campaign.totalMilestones}{" "}
                  Milestone Tercapai
                </p>
              </div>
              <div className="flex space-x-2 mt-2">
                <Link
                  href={`/dashboard/creator/campaigns/${campaign.id}`}
                  className="bg-indigo-300 hover:bg-indigo-400 text-indigo-800 px-3 py-1 rounded text-sm flex-1 text-center"
                >
                  Detail
                </Link>
                <button className="bg-indigo-300 hover:bg-indigo-400 text-indigo-800 px-3 py-1 rounded text-sm flex-1 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
