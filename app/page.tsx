"use client";

import Image from "next/image";
import imageDonate from "@/public/imgDonation.png";
import { Button } from "@heroui/button";
import logoCampChain from "@/public/CampaignChain.svg";
import { Accordion, AccordionItem } from "@heroui/accordion";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10 relative">
      <div className="relative">
        <div className="w-full h-[1px] bg-gradient-to-l from-slate-200 to-indigo-600 absolute top-[100px]"></div>
        <div className="w-full h-full relative top-[30px]">
          <div className="w-[160px] z-50 rounded-xl p-[3px] bg-gradient-to-bl from-slate-50 to-indigo-200">
            <div className="w-full h-full bg-[#F5F7FA] rounded-lg">
              <div className="w-full rounded-tl-lg rounded-tr-lg h-[32px] flex justify-center font-notoSans font-semibold text-slate-200 items-center bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-600">
                Donasi
              </div>
              <div className="flex gap-1 flex-col justify-center items-center *:font-notoSans p-1 pb-2">
                <p className="text-[12px] text-indigo-400">
                  0xaAsd673cgS6a78...
                </p>
                <p className="text-[12px] text-rose-400">200.000 IDRX</p>
                <p className="text-[12px] text-green-800 py-1 px-3 bg-green-200 rounded-full">
                  Confirmed
                </p>
              </div>
            </div>
          </div>
          <div className="w-[160px] rounded-xl p-[3px] bg-gradient-to-bl from-slate-50 to-indigo-200 absolute top-[0px] right-[0px]">
            <div className="w-full h-full bg-[#F5F7FA] rounded-lg">
              <Image
                alt="Image Donations MainPage"
                src={imageDonate}
                className="rounded-xl"
              />
              <div className="flex gap-1 flex-col *:font-notoSans p-3 pb-2">
                <p className="text-[12px] text-slate-700">Funding Donations</p>
                <p className="text-[12px] text-rose-400 p-1 bg-rose-200 rounded-full text-center">
                  200.000 IDRX
                </p>
                <div className="flex flex-row gap-3 mt-2">
                  <div className="h-[25px] w-[5px] bg-gradient-to-b from-slate-100 to-indigo-500 relative">
                    <div className="w-[10px] h-[10px] rounded-full bg-gradient-to-bl from-slate-50 to-indigo-600 absolute top-[50%] -translate-x-[50%] left-[50%] -translate-y-[50%]"></div>
                  </div>
                  <p className="font-notoSans text-[9px] text-slate-400">
                    Milestone #2 : Increasing more servers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center mt-32">
          <h1 className="text-center text-3xl font-bold font-almarai text-[#1A1A1A]">
            CampChain : Platform Donasi Milestone <br /> Berbasis Blockchain
          </h1>
          <p className="text-center text-lg font-notoSans text-slate-500">
            Cepat, Transparan dan Aman.
          </p>
          <div className="relative w-full flex flex-col gap-2 justify-center items-center mt-5">
            <div className="w-full h-1 bg-gradient-to-l from-indigo-200 via-indigo-500 to-transparent"></div>
            <Button className="absolute bg-slate-50 text-slate-800 font-semibold font-notoSans rounded-full px-5 py-2 hover:bg-slate-200 hover:text-slate-900 border-2 border-indigo-500 shadow-md shadow-indigo-300 hover:shadow-lg hover:shadow-indigo-400 hover:opacity-100 transition-all duration-300 ease-in-out">
              Jelajahi Kampanye
            </Button>
          </div>
        </div>
      </div>
      {/* -------------------------FITUR PAGE-------------------------- */}
      <div className="flex flex-col gap-0 justify-start mt-20">
        <div className="flex justify-center items-center rounded-tl-2xl rounded-tr-2xl w-fit p-3 h-[40px] bg-indigo-100 border-x-1 border-t-1 border-indigo-600 font-semibold text-indigo-800 text-[14px]">
          Mengapa berkontribusi di platform kami ?
        </div>
        <div className="w-full rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-transparent border-1 border-indigo-600 p-2 gap-2 grid-cols-2 grid *:font-notoSans">
          <div className="flex-grow bg-gradient-to-t from-transparent to-indigo-200 rounded-xl p-4">
            <h1 className="font-semibold text-indigo-700 text-[14px]">
              Transparan
            </h1>
            <p className="text-[12px] text-indigo-500">
              Semua aktivitas yang Anda lakukan di CampChain terekam di
              blockchain. Setiap donasi, pencapaian milestone, dan pelepasan
              dana dapat dilihat secara publik, sehingga Anda tahu persis ke
              mana dana Anda pergi.
            </p>
          </div>
          <div className="flex-grow bg-gradient-to-t from-transparent to-rose-200 rounded-xl p-4">
            <h1 className="font-semibold text-rose-700 text-[14px]">Aman</h1>
            <p className="text-[12px] text-rose-500">
              Smart contract kami menjamin keamanan data dan dana Anda.
              Teknologi blockchain memastikan bahwa transaksi Anda tidak dapat
              dimanipulasi, dan dana hanya dilepaskan sesuai dengan aturan yang
              telah disepakati.
            </p>
          </div>
          <div className="flex-grow bg-gradient-to-t from-transparent to-rose-200 rounded-xl p-4">
            <h1 className="font-semibold text-rose-700 text-[14px]">
              Mudah Digunakan
            </h1>
            <p className="text-[12px] text-rose-500">
              Melakukan donasi di CampChain semudah beberapa klik. Platform kami
              dirancang dengan antarmuka yang ramah pengguna, sehingga Anda
              dapat memulai donasi atau membuat kampanye kapan saja, di mana
              saja.
            </p>
          </div>
          <div className="flex-grow bg-gradient-to-t from-transparent to-indigo-200 rounded-xl p-4">
            <h1 className="font-semibold text-indigo-700 text-[14px]">
              Anonim
            </h1>
            <p className="text-[12px] text-indigo-500">
              Data Anda tetap aman dan terintegrasi dengan blockchain. Anda
              dapat memilih untuk berdonasi secara anonim tanpa khawatir data
              pribadi Anda disalahgunakan
            </p>
          </div>
        </div>
      </div>
      {/* ---------------------------STEP PAGE--------------------------------- */}
      <div className="w-full rounded-2xl border-1 border-indigo-500 flex flex-row justify-center items-center gap-5 bg-gradient-to-bl from-slate-50 via-slate-50 to-indigo-200">
        <div className="flex justify-center items-center flex-col p-10">
          <div className="w-[180px] h-[50px] bg-indigo-50 rounded-3xl border-indigo-300 border-2 -mb-10"></div>
          <div className="w-[240px] h-[50px] bg-indigo-50 rounded-3xl border-indigo-300 border-2 -mb-10"></div>
          <div className="w-[280px] h-[180px] bg-indigo-50 rounded-3xl border-2 border-indigo-300"></div>
        </div>
        <div className="flex-grow h-full p-4">
          <h1 className="font-notoSans font-semibold text-slate-800 text-[16px] mb-2">
            Langkah 1 : Cari Kampanye yang kamu inginkan
          </h1>
          <p className="font-notoSans text-slate-600 text-[14px]">
            Temukan kampanye yang sesuai dengan minat dan tujuan Anda. Anda
            dapat menjelajahi berbagai kategori kampanye, mulai dari kesehatan,
            pendidikan, hingga lingkungan.
          </p>
        </div>
      </div>
      {/* CampChain Statistic */}
      <div className="border-1 border-indigo-500 rounded-xl w-full bg-gradient-to-bl from-slate-50 via-slate-50 to-indigo-300 gap-2 rounded-b-none">
        <div className="w-full p-2 border-b border-b-indigo-500 flex flex-row justify-start items-center gap-1 bg-slate-50 rounded-t-xl">
          <Image src={logoCampChain} alt="logo CampChain" width={30} />
          <h1 className="font-almarai font-semibold text-slate-800 text-[16px]">
            CampChain Statistics
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-0 w-full h-[150px] *:border-r-1 *:border-r-indigo-600">
          <div className="flex justify-center items-end w-full h-full border">
            <div className="w-[200px] h-[120px] rounded-t-xl border bg-indigo-50 border-b-0 border-indigo-600 flex flex-col justify-center items-center">
              <h1 className="text-[32px] font-bold font-notoSans text-indigo-900">
                654.879
              </h1>
              <p className="text-[12px] font-notoSans text-indigo-500">
                IDRX Total Terkumpul
              </p>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-end">
            <div className="w-[200px] h-[120px] rounded-t-xl border bg-indigo-50 border-b-0 border-indigo-600 flex flex-col justify-center items-center">
              <h1 className="text-[32px] font-bold font-notoSans text-indigo-900">
                20
              </h1>
              <p className="text-[12px] font-notoSans text-indigo-500">
                Total Kampanye Dibuat
              </p>
            </div>
          </div>
          <div className="w-full h-full border-none flex justify-center items-end">
            <div className="w-[200px] h-[120px] rounded-t-xl border bg-indigo-50 border-b-0 border-indigo-600 flex flex-col justify-center items-center">
              <h1 className="text-[32px] font-bold font-notoSans text-indigo-900">
                100.765
              </h1>
              <p className="text-[12px] font-notoSans text-indigo-500">
                Total Donatur Terdaftar
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* RATING */}
      <div className="w-full rounded-b-xl border border-rose-500 grid grid-cols-3 gap-0 bg-gradient-to-br from-slate-50 via-slate-50 to-rose-400">
        <div className="h-full w-full border-r border-r-rose-500 flex flex-col justify-center items-center bg-transparent ">
          <p className="font-notoSans text-[12px] text-slate-700 p-4">
            “CampChain benar-benar mengubah cara saya berdonasi. Saya bisa
            melihat langsung perkembangan proyek yang saya dukung, dan saya
            merasa yakin bahwa dana saya digunakan dengan tepat.”
          </p>
          <div className="bg-slate-50 flex flex-col justify-center border-t border-rose-500 w-full p-3 rounded-bl-xl">
            <h1 className="font-semibold font-almarai text-[14px] text-slate-800">
              Alok Hamil
            </h1>
            <p className="font-almarai text-[12px] text-slate-600">
              Pengusaha Sukses
            </p>
          </div>
        </div>
        <div className="h-full w-full border-r border-r-rose-500 flex flex-col justify-center items-center bg-transparent ">
          <p className="font-notoSans text-[12px] text-slate-700 p-4">
            “CampChain benar-benar mengubah cara saya berdonasi. Saya bisa
            melihat langsung perkembangan proyek yang saya dukung, dan saya
            merasa yakin bahwa dana saya digunakan dengan tepat.”
          </p>
          <div className="bg-slate-50 flex flex-col justify-center border-t border-rose-500 w-full p-3">
            <h1 className="font-semibold font-almarai text-[14px] text-slate-800">
              Alok Hamil
            </h1>
            <p className="font-almarai text-[12px] text-slate-600">
              Pengusaha Sukses
            </p>
          </div>
        </div>
        <div className="h-full w-full flex flex-col justify-center items-center bg-transparent ">
          <p className="font-notoSans text-[12px] text-slate-700 p-4">
            “CampChain benar-benar mengubah cara saya berdonasi. Saya bisa
            melihat langsung perkembangan proyek yang saya dukung, dan saya
            merasa yakin bahwa dana saya digunakan dengan tepat.”
          </p>
          <div className="bg-slate-50 flex flex-col justify-center border-t border-rose-500 w-full p-3 rounded-br-xl">
            <h1 className="font-semibold font-almarai text-[14px] text-slate-800">
              Alok Hamil
            </h1>
            <p className="font-almarai text-[12px] text-slate-600">
              Pengusaha Sukses
            </p>
          </div>
        </div>
      </div>
      {/* FAQ's PAGE */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="font-almarai text-[18px] font-semibold text-slate-800">
          Tanya Jawab (FAQ)
        </h1>
        <p className="font-notoSans text-[14px] text-slate-500">
          Pertanyaan umum tentang platform kami
        </p>
        <Accordion className="mt-5 *:shadow-none *:border-0 first:mb-5 last:mb-0 flex flex-col">
          <AccordionItem
            variant="splitted"
            title="Apa itu CampChain?"
            className="bg-slate-50 font-semibold text-slate-800"
          >
            <p className="font-notoSans text-[12px] text-slate-700 p-4 font-normal">
              CampChain adalah platform donasi berbasis blockchain yang
              memungkinkan Anda untuk memberikan dukungan kepada berbagai
              kampanye sosial dengan cara yang transparan dan aman.
            </p>
          </AccordionItem>
          <AccordionItem
            variant="splitted"
            title="Bagaimana cara berdonasi di CampChain?"
            className="bg-slate-50 border font-semibold text-slate-800"
          >
            <p className="font-notoSans text-[12px] text-slate-700 p-4 font-normal">
              Anda dapat mencari kampanye yang ingin Anda dukung, kemudian
              mengikuti langkah-langkah yang ada di platform untuk melakukan
              donasi.
            </p>
          </AccordionItem>
          <AccordionItem
            variant="splitted"
            title="Apakah data saya aman di CampChain?"
            className="bg-slate-50 border font-semibold text-slate-800"
          >
            <p className="font-notoSans text-[12px] text-slate-700 p-4 font-normal">
              Ya, semua data Anda terenkripsi dan disimpan di blockchain,
              sehingga aman dari manipulasi.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
      {/* END PAGE */}
      <div className="flex justify-center items-center relative py-20">
        <Image
          alt="End Logo Image"
          className="z-50"
          src={logoCampChain}
          width={80}
        />
        <div className="-ml-5 z-0 w-2/3 h-5 bg-gradient-to-r from-indigo-400 via-indigo-50 to-slate-50"></div>
        <h1 className="text-slate-800 font-almarai text-[32px] font-bold -ml-10 z-50">
          CampChain
        </h1>
      </div>
      <Footer />
    </section>
  );
}
