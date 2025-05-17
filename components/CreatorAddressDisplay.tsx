"use client";

import { useState } from "react";
import { useCreatorAddress } from "../hooks/useContractRead";

interface CreatorDisplayProps {
  contractAddress: string;
  creatorId: number;
  showFullAddress?: boolean;
}

export default function CreatorAddressDisplay({
  contractAddress,
  creatorId,
  showFullAddress = false,
}: CreatorDisplayProps) {
  const {
    data: creatorAddress,
    isLoading,
    error,
  } = useCreatorAddress(contractAddress, creatorId);

  const formatAddress = (address: string) => {
    if (!address) return "";
    if (showFullAddress) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-6 w-28 rounded"></div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">Error loading creator address</div>
    );
  }

  if (
    !creatorAddress ||
    creatorAddress === "0x0000000000000000000000000000000000000000"
  ) {
    return <div className="text-gray-500 italic">No creator found</div>;
  }

  return (
    <div className="font-mono text-gray-800">
      {formatAddress(creatorAddress)}
      {!showFullAddress && (
        <button
          onClick={() => navigator.clipboard.writeText(creatorAddress)}
          className="ml-2 p-1 text-indigo-600 hover:text-indigo-800"
          title="Copy full address"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
      )}
    </div>
  );
}
