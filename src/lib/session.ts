import { headers } from "next/headers";
import { auth } from "./auth";

export async function getServerSession() {

  const requestHeaders = await headers();
  try {
    return await auth.api.getSession({ headers: requestHeaders });
  } catch (error) {
    console.error("[BazarDor] could not read session:", error);
    return null;
  }
}
