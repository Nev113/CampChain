import CampaignCard from "@/components/CampaignCard";

export default function CampaignsPage() {
  // berikan aku contoh data kampanye aktual umum panjang
  const campaigns = [
    {
      id: 1,
      title: "Makan Untuk Anak Yatim",
      organization: "Organisasi A",
      isRunning: true,
      currentAmount: 1000,
      image: "/path/to/image1.jpg",
    },
    {
      id: 2,
      title: "Merenovasi Sekolah yang terlantar 4 tahun di desa",
      organization: "Organisasi B",
      isRunning: false,
      currentAmount: 2000,
      image: "/path/to/image2.jpg",
    },
    // Tambahkan lebih banyak kampanye sesuai kebutuhan
  ];
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
      <div className="mt-5 flex flex-col gap-5 w-full">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            title={campaign.title}
            organization={campaign.organization}
            isRunning={campaign.isRunning}
            currentAmount={campaign.currentAmount}
            image={campaign.image}
          />
        ))}
      </div>
    </div>
  );
}
