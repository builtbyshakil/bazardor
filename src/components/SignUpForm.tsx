"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import { AuthShell, Field } from "./AuthShell";
import { SocialButtons } from "./SocialButtons";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (!name) return fail("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মেলেনি");

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) return fail(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field label="নাম" id="name" type="text" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" />
        <Field label="ইমেইল" id="email" type="email" placeholder="you@example.com" autoComplete="email" />
        <Field
          label="পাসওয়ার্ড"
          id="password"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete="new-password"
        />
        <Field
          label="পাসওয়ার্ড নিশ্চিত করুন"
          id="confirm"
          type="password"
          placeholder="আবার লিখুন"
          autoComplete="new-password"
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
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <p className="text-center text-xs">অথবা</p>
        <SocialButtons callbackURL="/" />

        <p className="pt-1 text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-[#05893e] hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
