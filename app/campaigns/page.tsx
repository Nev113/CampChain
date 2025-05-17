"use client";

import { useState, useEffect } from "react";
import CampaignCard from "@/components/CampaignCard";

interface Campaign {
  id: string;
  title: string;
  imageUrl: string;
  currentAmount: number;
  goal: number;
  isActive: boolean;
  creatorAddress: string;
  creatorName?: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns");

        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }

        const data = await response.json();
        setCampaigns(data.campaigns);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError(err.message || "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mt-10">Kampanye</h1>
      <p className="text-slate-500">Cari Kampanye yang ingin kamu bantu</p>
      <div className="mt-4 flex flex-row gap-1">
        <input
          type="text"
          aria-placeholder="Cari Kampanye"
          placeholder="Cari Kampanye"
          className="bg-indigo-100 border-0 text-indigo-800 rounded-full flex items-center font-semibold px-5 py-2 placeholder:flex placeholder:items-center w-full placeholder:font-semibold placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        />
        <div className="cursor-pointer size-[42px] rounded-full bg-indigo-100 flex justify-center items-center hover:bg-indigo-500 transition-all delay-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="size-5 text-indigo-600 hover:text-indigo-200 transition-all delay-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg">
          <p>{error}</p>
          <button
            className="mt-2 text-indigo-600 underline"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="mt-10 text-center p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">
            No campaigns found
          </h3>
          <p className="text-gray-500 mt-2">
            Be the first to create a campaign!
          </p>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-5 w-full">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              title={campaign.title}
              organization={
                campaign.creatorName ||
                campaign.creatorAddress.substring(0, 6) + "..."
              }
              isRunning={campaign.isActive}
              currentAmount={campaign.currentAmount}
              image={campaign.imageUrl}
              id={campaign.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
