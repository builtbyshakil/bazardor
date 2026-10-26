import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-104 py-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mb-5 mt-1 text-sm">{subtitle}</p>
      <div className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">{children}</div>
      <Link href="/" className="mt-5 inline-block text-sm hover:text-[#05893e]">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

export function Field({
  label,
  id,
  ...inputProps
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...inputProps}
        className="h-10 w-full rounded-lg border border-[#e1e8e1] bg-white px-3 text-sm outline-none focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20"
      />
    </div>
  );
}
