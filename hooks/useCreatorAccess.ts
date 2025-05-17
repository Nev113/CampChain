"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { isCreator, getCreatorInfo } from "@/utils/checkCreator";

interface UseCreatorAccessResult {
  loading: boolean;
  isAuthorized: boolean;
  creatorName: string | null;
  creatorAddress: string | null;
  checkingAccess: boolean;
}

export function useCreatorAccess(
  redirectOnFailure: boolean = true
): UseCreatorAccessResult {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [creatorName, setCreatorName] = useState<string | null>(null);
  const [creatorAddress, setCreatorAddress] = useState<string | null>(null);
  const [checkingAccess, setCheckingAccess] = useState<boolean>(true);

  useEffect(() => {
    const checkCreatorAccess = async () => {
      if (!isConnected || !address) {
        if (redirectOnFailure) {
          router.push("/dashboard");
        }
        setLoading(false);
        setCheckingAccess(false);
        return;
      }

      try {
        // Check if the address is a creator
        const authorized = await isCreator(address);
        setIsAuthorized(authorized);

        if (authorized) {
          // If authorized, get the creator info
          const creatorInfo = await getCreatorInfo(address);
          if (creatorInfo) {
            setCreatorName(creatorInfo.name);
            setCreatorAddress(creatorInfo.address);
          }
        } else if (redirectOnFailure) {
          // If not authorized and redirectOnFailure is true, redirect to dashboard
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking creator access:", error);
        if (redirectOnFailure) {
          router.push("/dashboard");
        }
      } finally {
        setLoading(false);
        setCheckingAccess(false);
      }
    };

    checkCreatorAccess();
  }, [address, isConnected, redirectOnFailure, router]);

  return {
    loading,
    isAuthorized,
    creatorName,
    creatorAddress,
    checkingAccess,
  };
}
