"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import idrxLogo from "@/public/idrxLogo.svg";
import { Button } from "@heroui/button";

interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  currentAmount: number;
  isActive: boolean;
}

export default function FeaturedCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns?limit=3");

        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }

        const data = await response.json();
        setCampaigns(data.campaigns);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError(err.message || "Failed to load featured campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return null; // Don't show errors on home page, just hide the section
  }

  if (campaigns.length === 0) {
    return null; // Hide if no campaigns
  }

  return (
    <div className="py-12 mt-8">
      <h2 className="text-2xl font-bold text-center mb-2">
        Featured Campaigns
      </h2>
      <p className="text-slate-500 text-center mb-8">
        Support these worthy causes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => {
          const progressPercentage =
            (campaign.currentAmount / campaign.goal) * 100;

          return (
            <div
              key={campaign.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={campaign.imageUrl}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div
                  className={`w-fit text-xs font-semibold flex flex-row items-center gap-1 mb-2 ${campaign.isActive ? "text-green-700" : "text-amber-700"}`}
                >
                  <div
                    className={`size-[4px] rounded-full ${campaign.isActive ? "bg-green-700" : "bg-amber-700"}`}
                  ></div>
                  {campaign.isActive ? "Active" : "Completed"}
                </div>

                <h3 className="font-bold text-gray-800 mb-1 truncate">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {campaign.description}
                </p>

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="size-[14px]">
                        <Image src={idrxLogo} alt="IDRX" />
                      </div>
                      <span className="font-semibold">
                        {campaign.currentAmount} / {campaign.goal} IDRX
                      </span>
                    </div>
                    <span className="text-indigo-600">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <Link href={`/campaigns/${campaign.id}`}>
                  <Button size="sm" color="primary" className="w-full">
                    View Campaign
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Link href="/campaigns">
          <Button color="secondary">View All Campaigns</Button>
        </Link>
      </div>
    </div>
  );
}
