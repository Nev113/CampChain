"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import idrxLogo from "@/public/idrxLogo.svg";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  order: number;
  isCompleted: boolean;
  campaignId: string;
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
  milestones: Milestone[];
  createdAt: string;
  creatorName?: string;
}

export default function CampaignPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const showDonateForm = searchParams.get("donate") === "true";

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [donateAmount, setDonateAmount] = useState<number>(0);
  const [isDonating, setIsDonating] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        if (!slug) return;

        const response = await fetch(`/api/campaigns/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch campaign details");
        }

        const data = await response.json();
        setCampaign(data.campaign);
      } catch (err: any) {
        console.error("Error fetching campaign:", err);
        setError(err.message || "Failed to load campaign details");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [slug]);

  const handleDonate = async () => {
    if (!campaign || donateAmount <= 0) return;

    try {
      setIsDonating(true);

      const response = await fetch(`/api/campaigns/${campaign.id}/donate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: donateAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process donation");
      }

      // Reload the campaign data to reflect the new donation
      const updatedCampaignResponse = await fetch(`/api/campaigns/${slug}`);
      const updatedCampaignData = await updatedCampaignResponse.json();
      setCampaign(updatedCampaignData.campaign);

      // Reset donation form
      setDonateAmount(0);
      alert("Thank you for your donation!");
    } catch (err: any) {
      console.error("Donation error:", err);
      alert(`Donation failed: ${err.message}`);
    } finally {
      setIsDonating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg">
        <p>{error || "Campaign not found"}</p>
        <button
          className="mt-2 text-indigo-600 underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  const progressPercentage = (campaign.currentAmount / campaign.goal) * 100;

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-5">
      <div className="p-0 m-0">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="rounded-xl w-full max-h-[400px] object-cover"
        />
      </div>
      <div className="bg-indigo-50 p-6 rounded-xl">
        <div
          className={`w-fit font-semibold flex flex-row items-center gap-1 text-sm mb-2 ${campaign.isActive ? "text-green-800" : "text-amber-800"}`}
        >
          <div
            className={`size-[5px] rounded-full ${campaign.isActive ? "bg-green-800" : "bg-amber-800"}`}
          ></div>
          {campaign.isActive ? "Campaign Aktif" : "Campaign Selesai"}
        </div>

        <h1 className="text-slate-800 font-bold text-2xl">{campaign.title}</h1>
        <p className="text-gray-700 mt-2">{campaign.description}</p>

        <div className="mt-3 text-sm text-gray-600">
          <p>
            Created by: {campaign.creatorAddress.substring(0, 6)}...
            {campaign.creatorAddress.substring(
              campaign.creatorAddress.length - 4
            )}
          </p>
          <p>Date: {new Date(campaign.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="mt-4 px-3 py-2 bg-indigo-100 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1">
              <div className="size-[18px]">
                <Image src={idrxLogo} alt="IDRX" />
              </div>
              <span className="font-semibold">
                {campaign.currentAmount} / {campaign.goal} IDRX
              </span>
            </div>
            <span className="text-sm text-indigo-700">
              {Math.round(progressPercentage)}% funded
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {showDonateForm && (
          <div className="mt-4 border border-indigo-200 rounded-lg p-4 bg-white">
            <h3 className="font-medium text-lg mb-2">
              Donate to This Campaign
            </h3>
            <div className="mb-3">
              <label className="block text-sm mb-1">Amount (IDRX)</label>
              <Input
                type="number"
                min="1"
                step="0.01"
                value={donateAmount ? donateAmount.toString() : ""}
                onChange={(e) => setDonateAmount(Number(e.target.value))}
                className="w-full"
                placeholder="Enter amount to donate"
              />
            </div>
            <Button
              color="primary"
              className="w-full"
              onClick={handleDonate}
              disabled={isDonating || donateAmount <= 0}
              isLoading={isDonating}
            >
              {isDonating ? "Processing..." : "Donate Now"}
            </Button>
          </div>
        )}

        {!showDonateForm && (
          <div className="mt-4">
            <Button
              color="primary"
              className="w-full"
              onClick={() => (window.location.href = `?donate=true`)}
            >
              Donate to This Campaign
            </Button>
          </div>
        )}
      </div>
      <div className="md:col-span-2 mt-2">
        <h2 className="text-xl font-bold mb-4">Campaign Milestones</h2>
        <div className="space-y-4">
          {campaign.milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={`p-4 rounded-lg border ${
                milestone.isCompleted
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">
                  {index + 1}. {milestone.title}
                </h3>
                <div className="flex items-center">
                  <div className="flex items-center gap-1">
                    <div className="size-[16px]">
                      <Image src={idrxLogo} alt="IDRX" />
                    </div>
                    <span className="font-semibold">
                      {milestone.amount} IDRX
                    </span>
                  </div>
                  {milestone.isCompleted && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
                      Completed
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">About this Campaign</h2>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-700">{campaign.description}</p>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="font-medium text-gray-800 mb-2">
                What happens to my donation?
              </h3>
              <p className="text-gray-700 text-sm">
                Your donation will support the campaign creator to achieve the
                milestones listed above. Funds are held in escrow until
                milestones are completed and verified. The project updates will
                be visible on this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
