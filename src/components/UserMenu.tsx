"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export function UserMenu({ name, image }: { name: string; image?: string | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const initial = name?.trim().charAt(0).toUpperCase() || "U";

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#f0f5f0]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {image ? (

          <img src={image} alt={name} className="h-9 w-9 rounded-[10px] object-cover" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#05893e] font-semibold text-[#f3fbf4]">
            {initial}
          </span>
        )}
        <span className="hidden max-w-32 truncate text-sm font-medium sm:block">{name}</span>
        <span className="text-xs">▾</span>
      </button>

      {open && (
        <>

          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-[#e1e8e1] bg-[#fafcfa] p-1 shadow-lg">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-[#f0f5f0]"
            >
              👤 আমার প্রোফাইল
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[#d03739] hover:bg-[#f0f5f0]"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </>
      )}
    </div>
  );
}
