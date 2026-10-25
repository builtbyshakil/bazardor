"use client";
// BetterAuth client (runs in the browser). No baseURL needed - it uses the same site.
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();
export const { useSession, signIn, signUp, signOut } = authClient;
