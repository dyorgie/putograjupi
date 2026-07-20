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

5. Database
### Database Connectivity (Prisma v7)
- **Singleton Pattern:** We use a Prisma Client singleton in `src/lib/prisma.ts` to prevent exhausting Supabase's database connection limits during Next.js hot-reloads.
- **Driver Adapter:** Because we are using Prisma v7, we initialize the client using the `@prisma/adapter-pg` driver adapter rather than the legacy built-in engine. 
- **Connection Strings:** The runtime adapter utilizes the `DATABASE_URL` (which points to the Supabase pooled connection on port 6543).

6. Notes July 20, 2026
## Current Project State
- **Completed Features:** Server-side image gallery, URL-based category filtering (Issue #7), and dynamic image detail pages (Issue #8).
- **Prisma Schema Reality:** `portfolioImage` contains `id`, `cloudinaryUrl`, `title`, and `category`. **It does NOT contain a `description` field.** Do not attempt to render one.

## Next.js 15 Constraints (CRITICAL)
- **Params & SearchParams:** Both `params` and `searchParams` in page components are Promises in Next.js 15. They **must** be `await`ed before their properties are accessed.
- Example: `const resolvedParams = await params; const id = resolvedParams.id;`

## UI/UX Standards
- Component styling relies on Tailwind CSS.
- Next.js `<Image>` is mandatory for rendering images.
- Use Next.js `<Link>` for all internal routing.