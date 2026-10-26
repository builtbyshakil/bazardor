import Image from "next/image";

export function Hero({ today }: { today: string }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[#e1e8e1] bg-[#fafcfa]">
      <div className="flex flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between md:px-4 md:py-[9px]">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block min-h-7 rounded-full bg-[#05893e]/10 px-3 py-1 text-sm font-medium text-[#05893e]">
            {today}
          </span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="btn btn-sm sm:btn-md sm:px-[17px] mt-5 border-[#047f39] bg-[#05893e] font-semibold text-[#f3fbf4] hover:bg-[#047f39]"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="সবজি ও ফলের ঝুড়ি"
          width={315}
          height={263}
          priority
          className="h-auto w-56 md:w-[315px]"
        />
      </div>
    </section>
  );
}
