"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

// "Google দিয়ে চালিয়ে যান" and "GitHub দিয়ে চালিয়ে যান"
export function SocialButtons({ callbackURL }: { callbackURL: string }) {
  const [busy, setBusy] = useState<"google" | "github" | null>(null);

  async function handle(provider: "google" | "github") {
    setBusy(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    // On success the browser leaves for Google/GitHub, so this only runs on an error
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
      setBusy(null);
    }
  }

  const btn =
    "btn btn-sm sm:btn-md flex-1 border-[#e1e8e1] bg-[#fafcfa] font-semibold text-[#1d271f] shadow-none hover:bg-[#f0f5f0]";

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button type="button" className={btn} disabled={busy !== null} onClick={() => handle("google")}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
          <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
          <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
          <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9z" />
        </svg>
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" className={btn} disabled={busy !== null} onClick={() => handle("github")}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
        </svg>
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
