"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/button";
import MilestoneList from "@/components/MilestoneList";
import RefundButton from "@/components/RefundButton";

interface Donor {
  id: string;
  address: string;
}

interface Donation {
  id: string;
  amount: number;
  donor: Donor;
  txHash: string;
  refundTxHash?: string;
  status: string;
  createdAt: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  completed: boolean;
  order: number;
  completedAt?: string;
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
  createdAt: string;
  updatedAt: string;
  milestones: Milestone[];
  donations: Donation[];
}

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = params?.id as string;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/campaigns/${campaignId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch campaign");
        }
        const data = await response.json();
        setCampaign(data);
      } catch (err: any) {
        setError(err.message || "Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };
    if (campaignId) fetchCampaign();
  }, [campaignId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-600">Loading campaign details...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-700 mb-4">{error || "Campaign not found."}</p>
        <Link href="/dashboard/creator/campaigns">
          <Button color="primary">Back to Campaigns</Button>
        </Link>
      </div>
    );
  }

  const progress = Math.min(
    Math.round((campaign.currentAmount / campaign.goal) * 100),
    100
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Progress</span>
              <span className="text-indigo-600 font-medium">
                {campaign.currentAmount.toLocaleString()} /{" "}
                {campaign.goal.toLocaleString()} IDRX
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: progress + "%" }}
              ></div>
            </div>
          </div>
        </div>{" "}
        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Milestones</h2>
          <div className="mb-6">
            <MilestoneList
              milestones={campaign.milestones}
              campaignId={campaign.id}
              creatorAddress={campaign.creatorAddress}
              onMilestoneUpdate={() => {
                // Refetch campaign data when a milestone is updated
                const fetchCampaign = async () => {
                  try {
                    const response = await fetch(
                      `/api/campaigns/${campaignId}`
                    );
                    if (response.ok) {
                      const data = await response.json();
                      setCampaign(data);
                    }
                  } catch (err) {
                    console.error("Failed to refresh campaign data:", err);
                  }
                };
                fetchCampaign();
              }}
            />
          </div>{" "}
          <h2 className="text-xl font-semibold mb-2">Donors</h2>
          {campaign.donations.length === 0 ? (
            <p className="text-gray-500">No donors yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {campaign.donations.map((donation) => (
                <li
                  key={donation.id}
                  className="py-2 flex items-center flex-wrap"
                >
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded mr-2">
                    {donation.donor.address.substring(0, 6)}...
                    {donation.donor.address.substring(
                      donation.donor.address.length - 4
                    )}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {donation.amount} IDRX
                  </span>
                  <span
                    className={
                      "ml-2 text-xs px-2 py-1 rounded-full " +
                      (donation.status === "REFUNDED"
                        ? "bg-red-100 text-red-600"
                        : donation.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700")
                    }
                  >
                    {donation.status}
                  </span>
                  <div className="ml-auto">
                    <RefundButton
                      donation={donation}
                      onRefundComplete={() => {
                        // Refetch campaign data after refund
                        const fetchCampaign = async () => {
                          try {
                            const response = await fetch(
                              `/api/campaigns/${campaignId}`
                            );
                            if (response.ok) {
                              const data = await response.json();
                              setCampaign(data);
                            }
                          } catch (err) {
                            console.error(
                              "Failed to refresh campaign data:",
                              err
                            );
                          }
                        };
                        fetchCampaign();
                      }}
                    />
                  </div>
                  {donation.refundTxHash && (
                    <div className="w-full mt-1 text-xs text-gray-500">
                      Refund TX: {donation.refundTxHash.substring(0, 10)}...
                      {donation.refundTxHash.substring(
                        donation.refundTxHash.length - 8
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-8">
        <Link href="/dashboard/creator/campaigns">
          <Button color="secondary">Back to Campaigns</Button>
        </Link>
      </div>
    </div>
  );
}
