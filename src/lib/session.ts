// Used by protected pages (server side): returns the logged in session or null
import { headers } from "next/headers";
import { auth } from "./auth";

export async function getServerSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("[BazarDor] could not read session:", error);
    return null;
  }
}
