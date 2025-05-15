"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";

export default function LogoutButton() {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  // 0xe3df0dc69EAa17541843De5d03C3D1aD81593390

  const handleLogout = async () => {
    disconnect();
    await router.push("/");
    console.log("Logged out from Xellar Wallet");
  };

  return (
    <Button
      onPress={handleLogout}
      variant="solid"
      className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </Button>
  );
}
