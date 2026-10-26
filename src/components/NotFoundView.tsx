import Link from "next/link";

export function NotFoundView({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-6 py-12 text-center">
      <p className="text-6xl font-bold text-[#05893e]">৪০৪</p>
      <h1 className="mt-4 text-xl font-bold">{title}</h1>
      <p className="mt-2 text-sm">{message}</p>
      <Link
        href="/"
        className="btn btn-sm sm:btn-md mt-6 border-[#047f39] bg-[#05893e] text-[#f3fbf4] hover:bg-[#047f39]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
