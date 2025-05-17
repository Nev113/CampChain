"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import {
  isCreator,
  getCreatorInfo,
  CampChainCreator,
} from "@/utils/checkCreator";

export default function CreatorStatusDisplay() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [creatorInfo, setCreatorInfo] = useState<CampChainCreator | null>(null);
  const [isCreatorAddress, setIsCreatorAddress] = useState<boolean>(false);

  useEffect(() => {
    const checkCreatorStatus = async () => {
      if (!isConnected || !address) {
        setLoading(false);
        return;
      }

      try {
        const isCreatorResult = await isCreator(address);
        setIsCreatorAddress(isCreatorResult);

        if (isCreatorResult) {
          const info = await getCreatorInfo(address);
          setCreatorInfo(info);
        }
      } catch (error) {
        console.error("Error checking creator status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkCreatorStatus();
  }, [address, isConnected]);

  if (!isConnected || loading) {
    return (
      <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 mt-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (isCreatorAddress && creatorInfo) {
    return (
      <div className="border border-green-200 bg-green-50 rounded-lg p-4 mt-4">
        <h3 className="font-semibold text-green-800">Status Creator</h3>
        <p className="text-green-700 mt-1">
          Anda terdaftar sebagai Creator dengan nama:{" "}
          <strong>{creatorInfo.name}</strong>
        </p>
        <div className="mt-3">
          <Link
            href="/dashboard/creator"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Creator Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <div></div>;
}
