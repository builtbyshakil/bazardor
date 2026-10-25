import { redirect } from "next/navigation";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { getServerSession } from "@/lib/session";

// PROTECTED ROUTE
export default async function UpdateProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/signin?reason=protected&redirect=%2Fprofile%2Fupdate");
  return <UpdateProfileForm />;
}
