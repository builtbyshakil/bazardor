<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে** — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর, বাজারভিত্তিক তুলনাসহ।

[Live Demo](#) · [GitHub Repository](#)

</div>

---

## 📌 About

BazarDor is a Bengali grocery price tracker built for **Assignment-07 (B14-A7)**.
It shows today's price of everyday items, how much each price changed (▲ up / ▼ down),
and a market-by-market price table for every product.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 16** (App Router) | Pages, routing, protected routes |
| **TypeScript** | Safer code |
| **Tailwind CSS v4** + **DaisyUI** | Styling, responsive layout, skeleton loaders |
| **BetterAuth** | Email/password, Google & GitHub login, update user |
| **MongoDB** | BetterAuth database |
| **react-hot-toast** | Toast notifications |

## ✨ Key Features

1. **Live price ticker** – an infinite scrolling strip under the navbar with `emoji + name + price/unit + ▲/▼ %` (pauses on hover).
2. **Home page sections** – Hero with a smooth-scroll CTA, *Top 6 risers*, *Top 6 fallers* and the full product grid.
3. **Product details (protected)** – min / max / average price and a market-wise price table; visitors who are not logged in are redirected to sign in with a toast.
4. **Category pages with sorting** – sort by default, price low → high or high → low. Sorting uses real numbers, so Bengali digits (`১,২৯০`) are handled correctly.
5. **Authentication** – sign up, sign in, Google & GitHub login, sign out, and toasts for every success/error.
6. **Update profile** – the *My Profile* page links to a separate page where the user can change their name (BetterAuth `updateUser`).
7. **Fully responsive** – works on mobile, tablet and desktop; skeleton loaders while data loads; friendly 404 pages.

## 🚀 Run it locally

```bash
git clone <your-repo-url>
cd bazardor
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000

### Environment variables

| Name | What it is |
| --- | --- |
| `BETTER_AUTH_SECRET` | any long random string |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` locally, your Vercel URL in production |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth keys (callback: `/api/auth/callback/google`) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth keys (callback: `/api/auth/callback/github`) |

## 🌐 Deploy on Vercel

1. Push the project to GitHub and import it in Vercel.
2. Add all the environment variables above (use your Vercel URL for `BETTER_AUTH_URL`).
3. Add the Vercel URL to the Google / GitHub OAuth callback settings.
4. Deploy. Dynamic routes such as `/product/[slug]` and `/category/[slug]` work on refresh.

## 📁 Project structure

```
src/
├─ app/            pages (home, category/[slug], product/[slug], signin, signup, profile, 404, api/auth)
├─ components/     Navbar, Ticker, Hero, ProductCard, SortSelect, forms, skeletons ...
└─ lib/            api.ts (fetching), normalize.ts (API → app shape), bn.ts (Bengali helpers), auth.ts
```

## 🔌 API

Data comes from `https://openapi.programming-hero.com/api/bazardor` (with the two backup URLs as fallbacks):
`/products`, `/products?category=chal`, `/products/1`, `/categories`, `/categories/chal`.
If the API cannot be reached, the app shows built-in backup data so the page is never empty.

## 📝 Commit history

The project was built step by step with meaningful commits: setup → data layer → auth → navbar/ticker → home → category → product details → sign in/up → profile.
