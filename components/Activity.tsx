export default function Activity() {
  return (
    <div className="min-h-screen px-4">
      <div>
        <div className="min-h-[600px]">
          <h1 className="mt-20 mb-6 text-2xl text-slate-800 font-bold font-almarai">
            Aktivitas IDRX Terbaru
          </h1>
          <div className="w-full flex flex-col">
            <p className="text-slate-600 mb-6">
              Berikut adalah daftar transaksi IDRX terbaru yang tercatat di
              blockchain.
            </p>
            <div className="w-full max-w-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
