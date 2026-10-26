"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

export function ProfileView() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-28 w-full rounded-2xl" />
        <div className="skeleton h-40 w-full rounded-2xl" />
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {image ? (

            <img src={image} alt={name} className="h-16 w-16 rounded-2xl object-cover" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#05893e] text-2xl font-semibold text-[#f3fbf4]">
              {name?.trim().charAt(0).toUpperCase() || "U"}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-xl">{name}</p>
            <p className="truncate text-base">{email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-sm sm:btn-md border-[#d03739] bg-transparent font-semibold text-[#d03739] shadow-none hover:bg-[#d03739]/10"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">তথ্য</h2>
        <div className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5">
          <dl className="space-y-3 text-sm">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <dt className="w-24 shrink-0 font-medium">নাম</dt>
              <dd>{name}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <dt className="w-24 shrink-0 font-medium">ইমেইল</dt>
              <dd className="break-all">{email}</dd>
            </div>
          </dl>

          <Link
            href="/profile/update"
            className="btn btn-sm sm:btn-md mt-5 w-full border-[#047f39] bg-[#05893e] font-semibold text-[#f3fbf4] hover:bg-[#047f39]"
          >
            আপডেট
          </Link>
        </div>
      </div>
    </div>
  );
}
