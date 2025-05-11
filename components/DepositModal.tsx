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

export default function DepositModal() {
  const { address } = useAccount();
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
                  onPress={() => address && copyToClipboard(address)}
                >
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
