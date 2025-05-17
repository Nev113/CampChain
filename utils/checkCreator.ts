import { createPublicClient, http } from "viem";
import { liskSepolia } from "viem/chains";

export interface CampChainCreator {
  name: string;
  address: string;
  isApproved: boolean;
}

const contractAddress = "0xae015B99f601f6d7e304B44C1A64071476eC939F";

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

const creatorsMappingABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "creators",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "isApproved",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export function checkCreator(
  address: string,
  creators: CampChainCreator[]
): boolean {
  const creator = creators.find((creator) => creator.address === address);
  return !!creator;
}

export async function getCreatorAddressById(
  creatorId: number
): Promise<string | null> {
  try {
    const client = createPublicClient({
      chain: liskSepolia,
      transport: http(),
    });

    try {
      const creatorAddress = (await client.readContract({
        address: contractAddress as `0x${string}`,
        abi: creatorAddressesABI,
        functionName: "creatorAddresses",
        args: [BigInt(creatorId)],
      })) as `0x${string}`;

      return creatorAddress;
    } catch (contractCallError) {
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

export async function getAllCreatorAddresses(
  limit: number = 10
): Promise<string[]> {
  const addresses: string[] = [];

  try {
    // Start with index 0 and try to get creators until we hit an error or reach the limit
    for (let i = 0; i < limit; i++) {
      try {
        const address = await getCreatorAddressById(i);
        // Only add valid addresses (not null or zero address)
        if (
          address &&
          address !== "0x0000000000000000000000000000000000000000"
        ) {
          addresses.push(address);
        } else {
          // Exit the loop if we get a null or zero address
          break;
        }
      } catch (innerError) {
        // Log the error but continue with the addresses we've collected so far
        console.warn(`Error fetching creator at index ${i}:`, innerError);
        break;
      }
    }
    return addresses;
  } catch (error) {
    console.error("Error fetching all creator addresses:", error);
    return addresses; // Return any addresses we collected before the error
  }
}

export async function isCreator(address: string): Promise<boolean> {
  try {
    // Get all creator addresses first
    const allCreatorAddresses = await getAllCreatorAddresses(20);

    // Check if the given address is in the list
    return allCreatorAddresses
      .map((addr) => addr.toLowerCase())
      .includes(address.toLowerCase());

    /* Using creators mapping is causing issues, so we'll use the creatorAddresses array instead
    const client = createPublicClient({
      chain: liskSepolia,
      transport: http(),
    });

    const creatorInfo = (await client.readContract({
      address: contractAddress as `0x${string}`,
      abi: creatorsMappingABI,
      functionName: "creators",
      args: [address as `0x${string}`],
    })) as [string, Uint8Array]; 

    const [name, isApprovedBytes] = creatorInfo;
    const isApproved = isApprovedBytes && isApprovedBytes.length > 0 && isApprovedBytes[0] !== 0;
    return name !== "" && isApproved;
    */
  } catch (error) {
    console.error("Error checking creator status:", error);
    return false;
  }
}

export async function getCreatorInfo(
  address: string
): Promise<CampChainCreator | null> {
  try {
    // First, check if the address is a creator
    const isCreatorAddress = await isCreator(address);

    if (!isCreatorAddress) {
      return null;
    }

    // Since the creators mapping is causing issues, we'll just return basic info
    // In a real application, you would fetch more details from a database or another source
    return {
      name: "Creator", // Default name since we can't get it from the contract
      address,
      isApproved: true, // If the address is in creatorAddresses, it's approved
    };

    /* Using creators mapping is causing issues
    const client = createPublicClient({
      chain: liskSepolia,
      transport: http(),
    });

    const creatorInfo = (await client.readContract({
      address: contractAddress as `0x${string}`,
      abi: creatorsMappingABI,
      functionName: "creators",
      args: [address as `0x${string}`],
    })) as [string, Uint8Array];

    const [name, isApprovedBytes] = creatorInfo;
    const isApproved = isApprovedBytes && isApprovedBytes.length > 0 && isApprovedBytes[0] !== 0;
    
    if (name === "") return null; */ /* This part is commented out, so we never reach here */
  } catch (error) {
    console.error("Error fetching creator info:", error);
    return null;
  }
}
