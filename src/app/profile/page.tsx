import { redirect } from "next/navigation";
import { ProfileView } from "@/components/ProfileView";
import { getServerSession } from "@/lib/session";

// PROTECTED ROUTE
export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/signin?reason=protected&redirect=%2Fprofile");
  return <ProfileView />;
}
