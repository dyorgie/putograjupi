Putograjupi - Photography Portfolio & Store

A full-stack photography portfolio, booking system, and e-commerce platform built with Next.js.

Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS
Backend: Next.js REST API Routes
Database: PostgreSQL (Supabase)
ORM: Prisma
Media: Cloudinary
Payments: Stripe
Testing: Vitest & Playwright

Documentation
Architectural decisions and system designs can be found in the /docs folder:
routing_architecture.md - URL structures and API endpoints.
schema.prisma - Database design.

Getting Started
Clone the repository.
Run npm install to install dependencies.
Copy .env.example to .env and fill in your keys.
Run npx prisma db push to sync the database schema.
Run npm run dev to start the development server on localhost:3000.