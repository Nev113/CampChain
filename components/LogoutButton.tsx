"use client";

import { Button } from "@heroui/button";
import { useDisconnect } from "wagmi";

export default function LogoutButton() {
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
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
