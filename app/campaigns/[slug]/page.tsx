"use client";
import { useParams } from "next/navigation";

export default function CampaignPage() {
  const { slug } = useParams();

  return (
    <div className="grid grid-cols-2 gap-3 *:rounded-xl mt-5">
      <div className="p-0 m-0">
        <img
          src={"https://picsum.photos/1028/720"}
          alt="Donations Image"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>
      <div className="bg-indigo-100 p-4">
        <h1 className="text-slate-800 font-bold text-lg">
          Pembangunan Rumah-Rumahan
        </h1>
      </div>
    </div>
  );
}
