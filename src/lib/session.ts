// Used by protected pages (server side): returns the logged in session or null
import { headers } from "next/headers";
import { auth } from "./auth";

export async function getServerSession() {
  // headers() must stay OUTSIDE try/catch: Next.js uses an internal error from it
  // to learn that this page is dynamic (per-user), and catching it would hide that.
  const requestHeaders = await headers();
  try {
    return await auth.api.getSession({ headers: requestHeaders });
  } catch (error) {
    console.error("[BazarDor] could not read session:", error);
    return null;
  }
}
