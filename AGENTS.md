You are an AI coding agent assisting with "Putograjupi", a full-stack photography portfolio, booking, and e-commerce platform.

1. Project Context & Architecture

Framework: Next.js (App Router) + React

Backend: Next.js REST API Routes (Do NOT use Server Actions for this project)

Database: PostgreSQL

ORM: Prisma

Authentication: NextAuth.js

Payments: Stripe

Media Storage: Cloudinary

Styling: Tailwind CSS

Testing: Vitest (Unit), Playwright (E2E)

2. Core Coding Directives

Next.js App Router: Always use App Router conventions (/app directory, page.tsx, layout.tsx). Default to Server Components unless client-side interactivity (hooks, state) is strictly required, in which case use "use client". Do not use the legacy /pages router.

Financial Math: Prices and financial calculations MUST ALWAYS be stored and processed in cents (Integers) to avoid floating-point errors. Only format to decimals when rendering the UI.

Media Handling: Do not attempt to save images to the local filesystem. All image uploads must be routed through Cloudinary APIs, and only the resulting secure URLs and public IDs are saved to the PostgreSQL database.

Testing Philosophy: Tests are written after feature implementation. Do not initiate Test-Driven Development (TDD) unless explicitly instructed by the user.

3. Key Development Commands

Start Dev Server: npm run dev

Database Sync: npx prisma db push

Run Unit Tests: npm run test (Vitest)

Run E2E Tests: npx playwright test

4. Documentation

If you are generating Next.js code, please prioritize reading the local version-matched Next.js documentation (if available in node_modules/next/dist/docs/) before writing code to ensure you do not use deprecated Next.js 13/14 patterns.