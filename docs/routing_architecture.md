Photography Portfolio - Routing & UI Architecture

This document outlines the folder structure, URL routes, and API endpoints for the Next.js App Router application.

1. Route Groups & Layouts

In Next.js, we use Route Groups (folders in parentheses) to share UI layouts without changing the URL.

(public): Shares a standard Header (Navbar) and Footer. Accessible to everyone.

(auth): Minimal layout (maybe just a logo and a clean background) for login/register pages.

(admin): Shares a Sidebar navigation menu instead of a top navbar. Protected by authentication.

(client): Shares a standard Header but includes a client-specific sub-navigation menu. Protected by authentication.

2. Page Map (Frontend URLs)

Public Routes (SEO Optimized, Fast Loading)

/ (Home): Hero image, featured portfolio shots, quick call-to-action (CTA) to book.

/portfolio: Full grid of images.

UI Feature: Client-side filtering by category (Wedding, Portrait, etc.) without reloading the page.

/about: Your bio, gear list, and FAQ.

/store: E-commerce storefront listing all active products.

/store/[id]: Individual product detail page (e.g., /store/lightroom-preset-pack-1).

/cart: The shopping cart.

Logic: Users can add items here without being logged in (using LocalStorage). They are prompted to log in when they click "Checkout".

Authentication Routes

/login: Sign in with email/password (or Google/OAuth later).

/register: Create a new client account.

Client Routes (Requires Auth: CLIENT)

/book: The calendar UI. Select a service, pick a date/time, and submit.

/checkout: Stripe payment page for the cart contents.

/dashboard: Client portal home.

/dashboard/bookings: List of their upcoming and past bookings.

/dashboard/orders: Order history.

Logic: This is where the "Download" button appears for digital products after successful payment.

Admin Routes (Requires Auth: ADMIN)

/admin: Dashboard summary (Upcoming bookings this week, total sales, etc.).

/admin/portfolio: Grid of all images. Buttons to Upload (via Cloudinary), Delete, and toggle isFeatured.

/admin/bookings: Kanban board or list view to move bookings from PENDING to CONFIRMED or CANCELED.

/admin/products: Form to add/edit/delete store items.

/admin/orders: List of all customer purchases (useful for tracking which physical prints you need to ship).

3. Core API Endpoints (REST)

Since we are doing REST APIs, our Next.js backend (/app/api/...) will look like this:

Auth & Users

Handled mostly by NextAuth.js automatically (e.g., /api/auth/[...nextauth]).

Media

GET /api/portfolio (Fetch images)

POST /api/portfolio (Upload new image URL to DB)

DELETE /api/portfolio/[id] (Remove image)

Bookings

GET /api/bookings (Fetch bookings for admin calendar, or specific client bookings)

POST /api/bookings (Create new booking)

PATCH /api/bookings/[id] (Admin approves/cancels booking)

Store & Payments

GET /api/products (Fetch active products)

POST /api/checkout (Generates the Stripe checkout session URL)

POST /api/webhooks/stripe (CRITICAL: Stripe secretly talks to this endpoint to tell your database "Payment Successful! Mark order as PAID.")