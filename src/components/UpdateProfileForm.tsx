"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { Field } from "./AuthShell";

export function UpdateProfileForm() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const name = String(new FormData(e.currentTarget).get("name") || "").trim();

    if (!name) {
      const message = "নাম খালি রাখা যাবে না";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    // BetterAuth "update user": https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) {
      const message = error.message || "তথ্য আপডেট করা যায়নি";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  if (isPending || !session) {
    return <div className="skeleton mx-auto h-60 w-full max-w-104 rounded-2xl" />;
  }

  return (
    <div className="mx-auto w-full max-w-104 py-4">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mb-5 mt-1 text-sm">আপনার নাম পরিবর্তন করুন।</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">
        {/* key makes the input start with the current name */}
        <Field label="নাম" id="name" type="text" defaultValue={session.user.name} key={session.user.id} autoComplete="name" />

        {error && (
          <p role="alert" className="rounded-lg bg-[#d03739]/10 px-3 py-2 text-sm text-[#d03739]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-sm sm:btn-md w-full border-[#047f39] bg-[#05893e] font-semibold text-[#f3fbf4] hover:bg-[#047f39]"
        >
          {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
        </button>
      </form>

      <Link href="/profile" className="mt-5 inline-block text-sm hover:text-[#05893e]">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
