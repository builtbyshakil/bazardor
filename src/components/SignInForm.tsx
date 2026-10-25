"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { AuthShell, Field } from "./AuthShell";
import { SocialButtons } from "./SocialButtons";

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/";
  // only allow redirects inside our own site
  const safeRedirect = redirectTo.startsWith("/") && !redirectTo.startsWith("//") ? redirectTo : "/";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // A protected page sent the user here -> tell them why
  useEffect(() => {
    if (params.get("reason") === "protected") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      const message = "ইমেইল ও পাসওয়ার্ড দুটিই দিন";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const message = error.message || "সাইন ইন করা যায়নি। ইমেইল বা পাসওয়ার্ড ঠিক আছে কিনা দেখুন।";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(safeRedirect);
    router.refresh();
  }

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field label="ইমেইল" id="email" type="email" placeholder="you@example.com" autoComplete="email" />
        <Field
          label="পাসওয়ার্ড"
          id="password"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete="current-password"
        />

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
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>

        <p className="text-center text-xs">অথবা</p>
        <SocialButtons callbackURL={safeRedirect} />

        <p className="pt-1 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-[#05893e] hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
