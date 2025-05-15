import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useAccount, useBalance } from "wagmi";
import { useRef, useState } from "react";

export default function TransferModal() {
  const { address } = useAccount();
  const [isCopy, setIsCopy] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const { data: balance } = useBalance({
    address,
    token: "0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661",
    chainId: 4202,
  });

  const idrxContract = {
    address: "0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661",
    abi: [
      {
        constant: false,
        inputs: [
          { name: "to", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "success", type: "bool" }],
        type: "function",
      },
    ],
  };

  const handleTransfer = async () => {
    if (input1.current) {
      const amount = parseFloat(input1.current.value);
      const toAddress = input2.current?.value;
      if (!toAddress || !/^0x[a-fA-F0-9]{40}$/.test(toAddress)) {
        alert("Invalid destination address");
        return;
      }
      console.log(toAddress);
      if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount");
        return;
      }
      await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: toAddress,
          from: address,
          amount,
          txHash: "",
          type: "TRANSFER",
        }),
      });
    }
  };

  return (
    <>
      <Button
        onPress={() => onOpen()}
        className="size-[100px] bg-indigo-100 rounded-xl flex flex-col justify-center items-center font-semibold text-[14px] text-indigo-800 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
        </svg>
        Transfer
      </Button>
      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-slate-800 font-bold text-2xl text-center">
                  Transfer
                </h1>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2 rounded-xl p-5 mx-5">
                <h1 className="text-almarai -mt-2 text-slate-700 text-left">
                  Jumlah{" "}
                  <span className="text-slate-400">(Minimal 2 IDRX)</span>
                </h1>
                <div className="flex flex-row gap-2 items-center">
                  <input
                    type="number"
                    placeholder="0.00"
                    ref={input1}
                    className="bg-indigo-100 border-none border-indigo-300 rounded-lg p-2 w-full text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-bold placeholder:text-indigo-500"
                  />
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => {
                      if (input1.current) {
                        input1.current.value = "2";
                      }
                    }}
                    className="bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded hover:bg-indigo-300"
                  >
                    Min
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => {
                      if (input1.current) {
                        input1.current.value = String(balance?.formatted);
                      }
                    }}
                    className="bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded hover:bg-indigo-300"
                  >
                    Max
                  </Button>
                </div>{" "}
                <h1 className="text-almarai text-slate-700 text-left">
                  Alamat Tujuan
                </h1>
                <input
                  type="text"
                  placeholder="0x..."
                  ref={input2}
                  className="bg-indigo-100 border-none border-indigo-300 rounded-lg p-2 w-full text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-bold placeholder:text-indigo-500"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleTransfer()}
                  disabled={isCopy}
                  className="flex flex-row gap-2 items-center"
                >
                  Konfirmasi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
