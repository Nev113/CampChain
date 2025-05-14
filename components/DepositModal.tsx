import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function DepositModal() {
  const { address } = useAccount();
  const [isCopy, setIsCopy] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const copyToClipboard = (text: string) => {
    if (!document.hasFocus()) {
      console.warn("Document is not focused. Clipboard operation may fail.");
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard successfully.");
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
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
          <path d="M12 1.5a.75.75 0 0 1 .75.75V7.5h-1.5V2.25A.75.75 0 0 1 12 1.5ZM11.25 7.5v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
        </svg>
        Deposit
      </Button>
      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-slate-800 font-bold text-2xl text-center">
                  Deposit IDRX
                </h1>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2 justify-center items-center bg-indigo-50 rounded-xl p-5 mx-5">
                <h1 className="text-notoSans font-semibold text-indigo-700">
                  Salin Alamat Anda dan gunakan untuk deposit
                </h1>
                <p className="text-indigo-500">{address}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    address && copyToClipboard(address) && setIsCopy(true)
                  }
                  disabled={isCopy}
                  className="flex flex-row gap-2 items-center disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                    <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                  </svg>
                  Salin
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
