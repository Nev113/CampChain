"use client";
import { useAccount, useBalance } from "wagmi";

export default function IDRXBalance() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: "0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661",
    chainId: 4202,
  });
  return (
    <div>
      <p>
        {balance?.formatted
          ? parseFloat(balance.formatted).toLocaleString("id-ID", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          : "0"}{" "}
        IDRX
      </p>
    </div>
  );
}
