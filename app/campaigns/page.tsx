import contohGmbr from "@/public/example-image.png";
import Image from "next/image";
import idrxLogo from "@/public/idrxLogo.png";
import { Button } from "@heroui/button";
import Footer from "@/components/footer";

export default function CampaignsPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mt-10">Kampanye</h1>
      <p className="text-slate-500">Cari Kampanye yang ingin kamu bantu</p>
      <div className="mt-4 flex flex-row gap-1">
        <input
          type="text"
          aria-placeholder="Cari Kampanye"
          placeholder="Cari Kampanye"
          className="bg-indigo-100 border-0 text-indigo-800 rounded-full flex items-center font-semibold px-5 py-2 placeholder:flex placeholder:items-center w-full placeholder:font-semibold placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        />
        <div className="cursor-pointer size-[42px] rounded-full bg-indigo-100 flex justify-center items-center hover:bg-indigo-500 transition-all delay-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="size-5 text-indigo-600 hover:text-indigo-200 transition-all delay-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 w-full">
        <div className="flex gap-5 w-full">
          <div className="w-fit object-cover">
            <Image src={contohGmbr} alt="Image Test" className="rounded-xl" />
          </div>
          <div className="flex flex-col w-full h-full flex-grow">
            <h1 className="text-slate-700 text-lg font-bold font-notoSans">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repudiandae, quia.
            </h1>
            <p className="text-md text-slate-500">Lembaga Lembaga</p>
            <div className="mt-2 w-fit font-semibold flex flex-row items-center gap-1  text-green-800 text-[12px]">
              <div className="size-[5px] rounded-full bg-green-800"></div>{" "}
              Sedang Berlangsung
            </div>
            <div className="mt-2 px-3 py-1 bg-indigo-100 rounded-full flex flex-row items-center w-fit text-[14px] text-indigo-700 font-semibold">
              <div className="size-[20px] flex items-center h-full">
                <Image src={idrxLogo} alt="IDRX" />
              </div>
              12.098.987 IDRX
            </div>
            <div className="flex flex-row gap-2 mt-2">
              <Button className="rounded-full bg-indigo-100 text-indigo-800 font-semibold font-lg w-fit hover:bg-indigo-800 hover:text-indigo-50">
                Lihat Selengkapnya
              </Button>
              <Button className="rounded-full bg-rose-100 text-rose-800 font-semibold font-lg w-fit hover:bg-rose-800 hover:text-rose-50">
                Donasi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
