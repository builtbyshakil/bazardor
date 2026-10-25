// Loading placeholders (DaisyUI "skeleton" class)

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-24" />
        </div>
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-36 w-full rounded-2xl" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="skeleton h-28 rounded-2xl" />
        <div className="skeleton h-28 rounded-2xl" />
        <div className="skeleton h-28 rounded-2xl" />
      </div>
      <div className="skeleton h-80 w-full rounded-2xl" />
    </div>
  );
}
