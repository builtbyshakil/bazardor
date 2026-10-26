import { redirect } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getServerSession } from "@/lib/session";
import { safeDecode } from "@/lib/url";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decoded = safeDecode(slug);

  const session = await getServerSession();
  if (!session) {

    redirect(`/signin?reason=protected&redirect=${encodeURIComponent(`/product/${slug}`)}`);
  }

  return <ProductDetail slug={decoded} />;
}
