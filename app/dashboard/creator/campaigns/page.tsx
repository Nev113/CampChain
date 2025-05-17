"use client";

import { useEffect, useState } from "react";
import { useCreatorAccess } from "@/hooks/useCreatorAccess";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Button } from "@heroui/button";

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  completed: boolean;
  order: number;
  campaignId: string;
  completedAt?: string;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  currentAmount: number;
  isActive: boolean;
  creatorAddress: string;
  createdAt: string;
  updatedAt: string;
  milestones: Milestone[];
}

export default function CreatorCampaigns() {
  const { address } = useAccount();
  const {
    loading: creatorLoading,
    isAuthorized,
    creatorName,
  } = useCreatorAccess();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!address) return;

      try {
        setLoading(true);
        const response = await fetch("/api/campaigns");

        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }

        const data = await response.json();
        // Filter campaigns by creator address
        const creatorCampaigns = data.filter(
          (campaign: Campaign) =>
            campaign.creatorAddress.toLowerCase() === address.toLowerCase()
        );

        setCampaigns(creatorCampaigns);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError(err.message || "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    if (!creatorLoading && isAuthorized) {
      fetchCampaigns();
    }
  }, [address, creatorLoading, isAuthorized]);

  if (creatorLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-600">Memeriksa status creator...</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateProgress = (currentAmount: number, goal: number) => {
    return Math.min(Math.round((currentAmount / goal) * 100), 100);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Your Campaigns</h1>
          <p className="text-gray-600">Manage your fundraising campaigns</p>
        </div>
        <Link href="/dashboard/creator/create">
          <Button color="primary">Create New Campaign</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No campaigns yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't created any fundraising campaigns yet. Start your first
            campaign to begin raising funds.
          </p>
          <Link href="/dashboard/creator/create">
            <Button color="primary">Create Your First Campaign</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/dashboard/creator/campaigns/${campaign.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={campaign.imageUrl}
                      alt={campaign.title}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {campaign.title}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          campaign.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {campaign.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      Created on {formatDate(campaign.createdAt)}
                    </p>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-indigo-600 font-medium">
                          {campaign.currentAmount.toLocaleString()} /{" "}
                          {campaign.goal.toLocaleString()} IDRX
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{
                            width: `${calculateProgress(campaign.currentAmount, campaign.goal)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-500">
                          {
                            campaign.milestones.filter((m) => m.completed)
                              .length
                          }{" "}
                          of {campaign.milestones.length} milestones completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
