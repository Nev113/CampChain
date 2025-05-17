"use client";

import { Button } from "@heroui/button";
import { useCreatorAccess } from "@/hooks/useCreatorAccess";
import { useRouter } from "next/navigation";
import CreatorCampaigns from "@/components/CreatorCampaigns";
import Link from "next/link";

export default function Creator() {
  const { loading, isAuthorized, creatorName, creatorAddress } =
    useCreatorAccess();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-600">Memeriksa status creator...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center mt-5">
      <h1 className="text-2xl font-bold mb-1">Creator Dashboard</h1>
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
        <p className="text-indigo-800 font-medium">
          Selamat Datang di Creator Dashboard!
        </p>
        {creatorAddress && (
          <p className="text-gray-600 text-sm mt-1">
            Alamat: {creatorAddress.substring(0, 6)}...
            {creatorAddress.substring(creatorAddress.length - 4)}
          </p>
        )}
      </div>
      <div className="mt-8">
        <CreatorCampaigns />
      </div>

      {/* Add Campaign Button */}
      <div className="mt-8 flex justify-end">
        <Link
          href="/dashboard/creator/create"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Buat Kampanye Baru
        </Link>
      </div>
    </div>
  );
}
