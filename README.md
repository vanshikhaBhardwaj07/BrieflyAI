# BrieflyAI

AI-powered PDF summarization SaaS that transforms lengthy PDFs into clear, structured, easy-to-read summaries in seconds.

**Live:** https://briefly-ai-project.vercel.app
**Repo:** https://github.com/vanshikhaBhardwaj07/BrieflyAI

<!--
  TODO: add a screenshot of the app (upload flow or a generated summary) here.
  Easiest way: open this file on github.com, click the pencil to edit,
  and drag-and-drop an image straight into the text box — GitHub hosts
  it automatically and writes the markdown link for you.
-->

## Features

- **PDF upload** — direct-to-storage uploads via UploadThing, supporting files up to 32MB.
- **AI summarization** — extracted PDF text is sent to Google's Gemini API (`gemini-2.5-flash`) with a structured prompt, returning a markdown-formatted summary with contextual emojis.
- **Authentication** — sign-in and sign-up handled by Clerk.
- **Payments** — subscription/upgrade flow via Razorpay.
- **Serverless Postgres** — summaries and user data stored in Neon.

## Tech Stack

**Frontend:** TypeScript, Next.js 16 (App Router), React 19, Tailwind CSS v4
**Backend:** Next.js Server Actions, PDF parsing (`pdf-parse`)
**AI:** Google Gemini API, LangChain
**Database:** PostgreSQL (Neon, serverless)
**Auth:** Clerk
**Payments:** Razorpay
**File uploads:** UploadThing
**Deployment:** Vercel

## Getting Started

### Prerequisites

You'll need accounts/API keys for: Neon (Postgres), Clerk, Google AI Studio (Gemini), Razorpay, and UploadThing.

### Setup

```bash
npm install
```

Create a `.env.local` file with:

```
DATABASE_URL=
GEMINI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
UPLOADTHING_TOKEN=
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` to deploy.
