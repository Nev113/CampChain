import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import idrxLogo from "@/public/idrxLogo.svg";
import { Button } from "@heroui/button";

export default function CampaignCard({
  id,
  title,
  isRunning,
  currentAmount,
  organization,
  image,
}: {
  id: string;
  title: string;
  isRunning: boolean;
  currentAmount: number;
  organization: string;
  image: string;
}) {
  const router = useRouter();
  return (
    <div className="flex gap-5 w-full">
      <div className="object-cover">
        <img
          src={image || "https://picsum.photos/1280/1720"}
          alt={title}
          className="rounded-xl min-w-[380px] max-w-[380px] max-h-[200px] object-cover min-h-[200px]"
        />
      </div>
      <div className="flex flex-col w-full h-full flex-grow">
        <h1 className="text-slate-700 text-lg font-bold font-notoSans">
          {title}
        </h1>
        <p className="text-md text-slate-500">{organization}</p>
        <div
          className={`mt-2 w-fit font-semibold flex flex-row items-center gap-1 text-[12px] ${isRunning ? "text-green-800" : "text-amber-800"}`}
        >
          <div
            className={`size-[5px] rounded-full ${isRunning ? "bg-green-800" : "bg-amber-800"}`}
          ></div>
          {isRunning ? "Sedang Berjalan" : "Selesai"}
        </div>
        <div className="mt-2 px-2 py-1 bg-indigo-100 rounded-full flex flex-row gap-1 items-center w-fit text-[14px] text-indigo-700 font-semibold">
          <div className="size-[15px] flex items-center h-full">
            <Image src={idrxLogo} alt="IDRX" />
          </div>
          {currentAmount} IDRX
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <Link href={`/campaigns/${id}`}>
            <Button className="rounded-full bg-indigo-100 text-indigo-800 font-semibold font-lg w-fit hover:bg-indigo-800 hover:text-indigo-50">
              Lihat Selengkapnya
            </Button>
          </Link>
          <Link href={`/campaigns/${id}?donate=true`}>
            <Button className="rounded-full bg-rose-100 text-rose-800 font-semibold font-lg w-fit hover:bg-rose-800 hover:text-rose-50">
              Donasi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
