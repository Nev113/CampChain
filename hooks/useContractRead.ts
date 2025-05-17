"use client";

import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { liskSepolia } from "viem/chains";

export function useContractRead<T = any>(
  contractAddress: string,
  abi: any[],
  functionName: string,
  args?: any[]
) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    data: contractData,
    isLoading: contractIsLoading,
    error: contractError,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName,
    args,
    chainId: liskSepolia.id,
  });

  useEffect(() => {
    if (!contractIsLoading) {
      if (contractError) {
        setError(contractError as Error);
      } else {
        setData(contractData as T);
      }
      setIsLoading(false);
    }
  }, [contractData, contractIsLoading, contractError]);

  return { data, isLoading, error };
}

export function useCreatorAddress(contractAddress: string, creatorId: number) {
  const creatorAddressesABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "creatorAddresses",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  return useContractRead<`0x${string}`>(
    contractAddress,
    creatorAddressesABI,
    "creatorAddresses",
    [BigInt(creatorId)]
  );
}

export function useAllCreatorAddresses(
  contractAddress: string,
  limit: number = 10
) {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Create the ABI here, outside of the useEffect
  const creatorAddressesABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "creatorAddresses",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      try {
        const fetchedAddresses: string[] = [];

        // Create a client to read from the contract directly
        for (let i = 0; i < limit; i++) {
          try {
            // Use a direct contract read instead of a hook
            const address = await readCreatorAddressById(contractAddress, i);

            if (
              address &&
              address !== "0x0000000000000000000000000000000000000000"
            ) {
              fetchedAddresses.push(address);
            } else {
              // If we get a null or zero address, break the loop
              break;
            }
          } catch (readError) {
            // Just log the error and stop fetching more addresses
            // This is expected behavior when we've reached the end of existing creators
            console.warn(
              `Likely reached end of creators at index ${i}:`,
              readError
            );
            break;
          }
        }

        setAddresses(fetchedAddresses);
        setIsLoading(false);
      } catch (err) {
        console.error("Error in useAllCreatorAddresses:", err);
        // Even on error, we should return any addresses we've managed to collect
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [contractAddress, limit]);

  return { addresses, isLoading, error };
}

// Helper function to read creator addresses directly without using hooks
async function readCreatorAddressById(
  contractAddress: string,
  creatorId: number
): Promise<string | null> {
  try {
    // Use viem to create a public client for reading from the contract
    const { createPublicClient, http } = await import("viem");
    const { liskSepolia } = await import("viem/chains");

    const client = createPublicClient({
      chain: liskSepolia,
      transport: http(),
    });

    const creatorAddressesABI = [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "creatorAddresses",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    try {
      const creatorAddress = (await client.readContract({
        address: contractAddress as `0x${string}`,
        abi: creatorAddressesABI,
        functionName: "creatorAddresses",
        args: [BigInt(creatorId)],
      })) as `0x${string}`;

      return creatorAddress;
    } catch (contractError) {
      // This likely means that the creator at this index doesn't exist
      // (e.g., array index out of bounds or similar contract revert)
      console.warn(`No creator found at index ${creatorId}`);
      return null;
    }
  } catch (error) {
    console.error(
      "Error setting up client for fetching creator address:",
      error
    );
    return null;
  }
}

export function useIsCreator(contractAddress: string, address: string) {
  // We'll use useState to store the result of our manual check
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [creatorInfo, setCreatorInfo] = useState<{
    name: string;
    isApproved: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use useEffect to fetch the creator addresses
  useEffect(() => {
    async function checkCreatorStatus() {
      try {
        setIsLoading(true);

        // Import our helper functions
        const { isCreator: checkIsCreator, getCreatorInfo: fetchCreatorInfo } =
          await import("../utils/checkCreator");

        // Check if the address is a creator
        const creatorStatus = await checkIsCreator(address);
        setIsCreator(creatorStatus);

        if (creatorStatus) {
          // If it is a creator, get more info
          const info = await fetchCreatorInfo(address);
          setCreatorInfo(info);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error checking creator status:", err);
        setError(err as Error);
        setIsLoading(false);
      }
    }

    checkCreatorStatus();
  }, [address, contractAddress]); // Return the values directly from our state
  return {
    isCreator,
    creatorInfo,
    isLoading,
    error,
  };
}
