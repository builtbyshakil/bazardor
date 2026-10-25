// BetterAuth server config (runs only on the server)
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// The client only connects when the first auth request arrives,
// so a missing MONGODB_URI will not break `next build`.
const client = new MongoClient(process.env.MONGODB_URI ?? "mongodb://localhost:27017/bazardor", {
  serverSelectionTimeoutMS: 5000, // fail fast instead of hanging for 30 seconds
});
const db = client.db();

// Only turn on a social provider if its keys exist in .env
const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false, // after sign up we send the user to the sign in page
  },
  socialProviders,
});
