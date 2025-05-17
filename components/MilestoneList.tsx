"use client";

import { useState } from "react";
import Image from "next/image";
import idrxLogo from "@/public/idrxLogo.svg";
import { Button } from "@heroui/button";
import { useAccount } from "wagmi";

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  order: number;
  completed: boolean;
  completedAt?: string;
  campaignId: string;
}

interface MilestoneListProps {
  milestones: Milestone[];
  campaignId: string;
  creatorAddress: string;
  onMilestoneUpdate?: () => void;
}

export default function MilestoneList({
  milestones,
  campaignId,
  creatorAddress,
  onMilestoneUpdate,
}: MilestoneListProps) {
  const { address } = useAccount();
  const isCreator = address === creatorAddress;
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMilestoneUpdate = async (
    milestoneId: string,
    completed: boolean
  ) => {
    if (!isCreator) return;

    try {
      setUpdating(milestoneId);
      setError(null);

      const response = await fetch(
        `/api/campaigns/${campaignId}/milestones/${milestoneId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-wallet-address": address || "",
          },
          body: JSON.stringify({ completed }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update milestone status");
      }

      // Call the onMilestoneUpdate callback to refresh campaign data
      if (onMilestoneUpdate) {
        onMilestoneUpdate();
      }
    } catch (err: any) {
      console.error("Error updating milestone:", err);
      setError(err.message || "Failed to update milestone");
    } finally {
      setUpdating(null);
    }
  };

  if (milestones.length === 0) {
    return (
      <p className="text-gray-500 italic">
        No milestones found for this campaign
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 border-l-4 border-red-500 rounded">
          {error}
          <button
            className="ml-2 text-sm underline"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      {milestones.map((milestone, index) => (
        <div
          key={milestone.id}
          className={`p-4 rounded-lg border ${
            milestone.completed
              ? "bg-green-50 border-green-200"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium">
              {index + 1}. {milestone.title}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="size-[16px]">
                  <Image src={idrxLogo} alt="IDRX" />
                </div>
                <span className="font-semibold">{milestone.amount} IDRX</span>
              </div>
              {milestone.completed && (
                <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
                  Completed{" "}
                  {milestone.completedAt &&
                    new Date(milestone.completedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>

          {isCreator && (
            <div className="mt-3 flex justify-end">
              <Button
                size="sm"
                color={milestone.completed ? "secondary" : "primary"}
                onClick={() =>
                  handleMilestoneUpdate(milestone.id, !milestone.completed)
                }
                isLoading={updating === milestone.id}
                disabled={updating !== null}
                className="text-xs"
              >
                {milestone.completed
                  ? "Mark as Incomplete"
                  : "Mark as Complete"}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
