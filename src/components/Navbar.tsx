"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { banglaToday } from "@/lib/bn";
import { useSession } from "@/lib/auth-client";
import { useMarket } from "./MarketProvider";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  const pathname = usePathname();
  const { categories } = useMarket();
  const { data: session, isPending } = useSession();

  // The date is calculated in the browser (not on the server) to avoid a mismatch warning
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(banglaToday());
  }, []);

  return (
    <header className="border-b border-[#e1e8e1] bg-[#fafcfa]">
      {/* Row 1: logo + date on the left, auth on the right */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#05893e] text-lg">🛒</span>
          <span className="flex flex-col leading-tight">
            <span className="text-xl font-bold">বাজার দর</span>
            <span className="min-h-4 text-xs">{today}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-10 w-28 rounded-lg" />
          ) : session ? (
            <UserMenu name={session.user.name} image={session.user.image} />
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-sm sm:btn-md sm:px-[17px] border-transparent bg-transparent font-semibold text-[#1d271f] shadow-none hover:bg-[#f0f5f0]"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm sm:btn-md sm:px-[17px] border-[#047f39] bg-[#05893e] font-semibold text-[#f3fbf4] hover:bg-[#047f39]"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Row 2: category links (scrolls sideways on small screens) */}
      <nav className="border-t border-[#f0f5f0]">
        <ul className="no-scrollbar mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2">
          {categories.map((category) => {
            const href = `/category/${encodeURIComponent(category.slug)}`;
            const active = decodeURIComponent(pathname) === `/category/${category.slug}`;
            return (
              <li key={category.slug} className="shrink-0">
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 rounded-lg px-[13px] py-2 text-xs font-semibold transition ${
                    active ? "bg-[#05893e] text-[#f3fbf4]" : "hover:bg-[#f0f5f0]"
                  }`}
                >
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
