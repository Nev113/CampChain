"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { uploadImage } from "@/utils/imageUpload";
import { isCreator } from "@/utils/checkCreator";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@/components/Textarea"; // Using our custom Textarea component
import { useCreatorAccess } from "@/hooks/useCreatorAccess";

interface Milestone {
  title: string;
  description: string;
  amount: number;
  order: number;
}

export default function CreateCampaign() {
  const router = useRouter();
  const { address } = useAccount();
  const {
    loading: creatorLoading,
    isAuthorized,
    creatorName,
  } = useCreatorAccess();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([
    { title: "", description: "", amount: 0, order: 0 },
  ]);

  const formRef = useRef<HTMLFormElement>(null);

  if (creatorLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-600">Memeriksa status creator...</p>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        title: "",
        description: "",
        amount: 0,
        order: milestones.length,
      },
    ]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      const updatedMilestones = milestones.filter((_, i) => i !== index);
      // Update order for remaining milestones
      const reorderedMilestones = updatedMilestones.map((milestone, i) => ({
        ...milestone,
        order: i,
      }));
      setMilestones(reorderedMilestones);
    }
  };

  const updateMilestone = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value,
    };
    setMilestones(updatedMilestones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError("Wallet not connected");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const creatorStatus = await isCreator(address);
      if (!creatorStatus) {
        setError("You are not authorized as a creator");
        setLoading(false);
        return;
      }

      if (!formRef.current || !imageFile) {
        setError("Please fill all required fields including campaign image");
        setLoading(false);
        return;
      }

      const formData = new FormData(formRef.current);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const goal = parseFloat(formData.get("goal") as string);

      if (!title || !description || isNaN(goal) || goal <= 0) {
        setError("Please fill all required fields with valid values");
        setLoading(false);
        return;
      }

      const milestonesTotal = milestones.reduce(
        (sum, ms) => sum + ms.amount,
        0
      );
      if (milestonesTotal !== goal) {
        setError(
          `Total milestone amounts (${milestonesTotal} IDRX) must equal campaign goal (${goal} IDRX)`
        );
        setLoading(false);
        return;
      }

      const imageUrl = await uploadImage(imageFile);

      const campaignData = {
        title,
        description,
        goal,
        imageUrl,
        creatorAddress: address,
        milestones: milestones.map((ms) => ({
          title: ms.title,
          description: ms.description,
          amount: ms.amount,
          order: ms.order,
        })),
      };

      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create campaign");
      }

      const result = await response.json();

      router.push(`/dashboard/creator/campaigns/${result.campaign.id}`);
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the campaign");
      console.error("Error creating campaign:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        Buat Kampanye Baru
      </h1>
      <p className="text-gray-600 mb-6">
        Selamat Datang di Creator Dashboard, {creatorName || "Creator"}!
      </p>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Kampanye
              </label>
              <Input
                name="title"
                type="text"
                placeholder="Enter campaign title"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi Kampanye
              </label>
              <Textarea
                name="description"
                placeholder="Describe your campaign in detail"
                className="w-full min-h-[150px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Funding Goal (IDRX)
              </label>
              <Input
                name="goal"
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter funding goal in IDRX"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Kampanye
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-[200px] rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${
                    imagePreview ? "pointer-events-none" : ""
                  }`}
                  onChange={handleImageChange}
                  accept="image/*"
                  required={!imageFile}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Kampanye Milestones
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Milestone adalah tonggak pencapaian yang harus dicapai dalam
            kampanye. Setiap milestone harus memiliki judul, deskripsi, dan
            jumlah
          </p>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 font-medium">
                    Milestone {index + 1}
                  </h3>
                  {milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMilestone(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Judul Milestone
                    </label>
                    <Input
                      value={milestone.title}
                      onChange={(e) =>
                        updateMilestone(index, "title", e.target.value)
                      }
                      placeholder="Milestone title"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (IDRX)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={
                        milestone.amount ? milestone.amount.toString() : ""
                      }
                      onChange={(e) =>
                        updateMilestone(
                          index,
                          "amount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Amount in IDRX"
                      className="w-full"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <Textarea
                      value={milestone.description}
                      onChange={(e) =>
                        updateMilestone(index, "description", e.target.value)
                      }
                      placeholder="Describe what this milestone will achieve"
                      className="w-full"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <Button
                type="button"
                onPress={addMilestone}
                variant="flat"
                color="primary"
                className="mt-2"
              >
                Tambah Milestone
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex justify-end space-x-4">
          <Button
            type="button"
            variant="flat"
            color="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            isLoading={loading}
            disabled={loading}
          >
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  );
}
