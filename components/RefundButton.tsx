"use client";

import { useState } from "react";
import { Button } from "@heroui/button";

interface Donation {
  id: string;
  amount: number;
  txHash: string;
  refundTxHash?: string;
  status: string;
  createdAt: string;
  donor: {
    id: string;
    address: string;
  };
}

interface RefundButtonProps {
  donation: Donation;
  onRefundComplete: () => void;
}

export default function RefundButton({
  donation,
  onRefundComplete,
}: RefundButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canBeRefunded = donation.status === "COMPLETED";

  const handleRefund = async () => {
    if (!canBeRefunded) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/donations/${donation.id}/refund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process refund");
      }

      onRefundComplete();
    } catch (err: any) {
      console.error("Refund error:", err);
      setError(err.message || "Failed to process refund");
    } finally {
      setLoading(false);
    }
  };

  if (donation.status === "REFUNDED") {
    return (
      <span className="ml-auto text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
        Refunded
      </span>
    );
  }

  return (
    <>
      <Button
        size="sm"
        color="secondary"
        className="ml-auto"
        onClick={handleRefund}
        disabled={!canBeRefunded || loading}
        isLoading={loading}
      >
        Refund
      </Button>

      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </>
  );
}
