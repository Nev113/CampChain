"use client";
import { useConnectModal } from "@xellar/kit";
import { useAccount } from "wagmi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import IDRXBalance from "./IDRXBalance";
import LogoutButton from "./LogoutButton";
export default function ConnectModal() {
  const { open: openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="relative flex flex-col gap-2">
      {isConnected ? (
        <div
          className="relative"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={(e) => {
            const relatedTarget = e.relatedTarget as HTMLElement;
            if (
              !relatedTarget ||
              !(relatedTarget && relatedTarget.closest(".dropdown-container"))
            ) {
              setDropdownVisible(false);
            }
          }}
        >
          <Button
            onPress={() => router.push("/dashboard")}
            className="rounded-full bg-indigo-100 text-indigo-800 font-semibold font-lg w-fit hover:bg-indigo-800 hover:text-indigo-50"
          >
            {<IDRXBalance />}
          </Button>
          {isDropdownVisible && (
            <div
              className="absolute top-full mt-1 w-fit bg-white shadow-lg rounded-lg p-2 dropdown-container"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <LogoutButton />
            </div>
          )}
        </div>
      ) : (
        <Button
          onPress={() => openConnectModal()}
          className="rounded-full bg-indigo-100 text-indigo-800 font-semibold font-lg w-fit hover:bg-indigo-800 hover:text-indigo-50"
        >
          Connect
        </Button>
      )}
    </div>
  );
}
