import DonateCard from "./DonateCard";
import TransferCard from "./TransferCard";

export default function Activity() {
  return (
    <div className="min-h-screen">
      <div>
        <div className="min-h-[600px]">
          <h1 className="mt-20 mb-5 text-2xl text-slate-800 font-bold font-almarai">
            Aktivitas
          </h1>
          <div className="w-full flex flex-col">
            <div className="w-full max-w-3xl *:mt-2">
              <TransferCard />
              <DonateCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
