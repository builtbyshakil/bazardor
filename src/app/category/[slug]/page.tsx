import { CategoryView } from "@/components/CategoryView";
import { safeDecode } from "@/lib/session";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryView slug={safeDecode(slug)} />;
}
