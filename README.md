# SLIIQQUE Real Estate

A real estate website with a built-in content management system. Visitors browse listings, agents and articles, and send enquiries. Your team manages everything from an admin panel at `/admin`, with no code changes and no redeploys.

- **Website:** Next.js 16 (App Router), React 19, Tailwind CSS 3.4
- **CMS and admin:** Payload CMS 3.90, running inside the same Next.js app
- **Database:** PostgreSQL on Neon
- **File storage:** local disk in development, Vercel Blob in production
- **Language:** TypeScript (strict)

> **Status:** feature-complete in code and pushed to GitHub, but **not yet deployed**. The content is demo data. Read [Before you go live](#before-you-go-live) first.

---

## Contents

1. [What the site does](#what-the-site-does)
2. [Quick start](#quick-start)
3. [Environment variables](#environment-variables)
4. [Scripts](#scripts)
5. [Project structure](#project-structure)
6. [Routes](#routes)
7. [Content model](#content-model)
8. [Managing content (for editors)](#managing-content-for-editors)
9. [How data flows](#how-data-flows)
10. [Search and filters](#search-and-filters)
11. [Forms and enquiries](#forms-and-enquiries)
12. [Caching and instant updates](#caching-and-instant-updates)
13. [Design system](#design-system)
14. [Branding and logos](#branding-and-logos)
15. [Admin panel theme](#admin-panel-theme)
16. [Code standards](#code-standards)
17. [Database migrations](#database-migrations)
18. [Deploying to production](#deploying-to-production)
19. [Before you go live](#before-you-go-live)
20. [Security notes](#security-notes)
21. [Troubleshooting](#troubleshooting)
22. [Known limitations](#known-limitations)
23. [Roadmap](#roadmap)

---

## What the site does

**For visitors**

- Home page with a hero search, featured listings, property types, neighborhoods, agents, articles, testimonials and a contact form.
- **Properties:** search homes for sale or rent by location, type, price band and neighborhood, with sorting and pages. Each listing has a photo gallery, facts, description, agent card and a viewing-request form.
- **About:** company story, values, live statistics and the team.
- **Agents:** all agents, filterable by specialty. Each agent has a profile with bio, rating, experience, contact details, their current listings and a message form.
- **Insights:** articles with search, category filters, pagination, share buttons and related reading.
- **Contact:** address, email, phone, WhatsApp, opening hours, social links, a form and an FAQ.
- A **Sell** option that collects valuation requests, and a **newsletter** signup in the footer.

**For your team**

- A themed admin panel to manage listings, agents, neighborhoods, articles, testimonials, photos, site settings and the About page.
- All enquiries land in the admin under **Leads → Inquiries**.
- Changes appear on the live site within seconds.

---

## Quick start

### Requirements

- **Node.js 20.9 or newer** (developed on 20.20)
- **npm**
- A **PostgreSQL** database. A free [Neon](https://neon.tech) project works well.

### 1. Install

```bash
git clone https://github.com/SLIIQQUE/sliiqque-real-estate.git
cd sliiqque-real-estate
npm install
```

### 2. Configure

```bash
cp .env.example .env.local
```

Edit `.env.local` and set `DATABASE_URL` and `PAYLOAD_SECRET` (see [Environment variables](#environment-variables)). Generate a secret with:

```bash
openssl rand -hex 32
```

### 3. Create the tables and load demo content

In development Payload creates and updates the database tables automatically the first time the app starts ("push mode"). Then load the demo content:

```bash
npm run seed         # listings, agents, neighborhoods, testimonials, article stubs
npm run seed:pages   # About page, site settings, agent bios, full article bodies
```

Both scripts upload the demo photos from Unsplash, so they need internet access. `npm run seed` skips itself if listings already exist.

### 4. Run

```bash
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin (the first visit asks you to create the first admin user)

---

## Environment variables

Set these in `.env.local` for development and in your host's settings for production. **Never commit real values.** `.env*.local` and `.env` are git-ignored.

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string. With Neon use the **pooled** string and `sslmode=verify-full`. |
| `PAYLOAD_SECRET` | Yes | Signs admin sessions and tokens. Use a long random value, and a **different** one in production. |
| `BLOB_READ_WRITE_TOKEN` | Production | Turns on Vercel Blob for uploaded photos. When empty, uploads are saved to the local `media/` folder, which does not persist on serverless hosts. |

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server. Database tables sync automatically. |
| `npm run build` | Run the length check, then build for production. |
| `npm run start` | Serve the production build. |
| `npm run check` | The 300-line check plus the TypeScript check. Run before every commit. |
| `npm run check:length` | Only the 300-line check. |
| `npm run typecheck` | Only `tsc --noEmit`. |
| `npm run seed` | Load demo listings, agents, neighborhoods, testimonials. |
| `npm run seed:pages` | Load About, settings, agent bios and full articles. Safe to re-run. |
| `npm run generate:types` | Rewrite `payload-types.ts` after changing a collection or global. |
| `npm run generate:importmap` | Rebuild the admin import map after adding admin components. |
| `npm run payload migrate:create <name>` | Create a database migration from schema changes. |
| `npm run payload migrate` | Apply pending migrations to the database in `DATABASE_URL`. |
| `node scripts/make-logo-variants.mjs [folder]` | Rebuild logos, favicons and the share image from the source logo folder. |

---

## Project structure

```
sliiqque-real-estate/
├─ app/
│  ├─ (site)/                  The public website
│  │  ├─ layout.tsx            Root layout, metadata, icons, theme colour
│  │  ├─ page.tsx              Home
│  │  ├─ about/  agents/  insights/  contact/  properties/
│  │  ├─ api/contact/route.ts  Receives every form
│  │  ├─ not-found.tsx         Branded 404
│  │  └─ globals.css           Tailwind layers, font import, base rules
│  ├─ (payload)/               Admin and API routes (generated by Payload)
│  │  ├─ custom.scss           Admin theme entry (the one file here meant for editing)
│  │  └─ admin-theme/          Admin theme partials
│  ├─ favicon.ico
│  └─ manifest.ts              Web app manifest
├─ collections/                One file per Payload collection, plus access.ts and hooks.ts
├─ globals/                    SiteSettings and AboutPage
├─ components/
│  ├─ layout/                  Sidebar, MobileHeader, Footer, PageShell, InnerPage
│  ├─ sections/                Home page sections, one per file
│  ├─ search/ property/ agents/ insights/ contact/ forms/   Feature components
│  ├─ admin/                   Admin logo, icon and dashboard welcome panel
│  └─ ui/                      Shared pieces: ListingCard, skeletons, icons, BrandLogo, RichBody…
├─ lib/
│  ├─ payload.ts               Cached Payload client
│  ├─ queries/                 Database reads (properties, agents, articles, content, globals)
│  ├─ filters.ts  articleFilters.ts  priceBands.ts  propertyTypes.ts   Validated search inputs
│  ├─ format.ts                Price formatting, media URLs, card mapping
│  ├─ inquiry.ts  rateLimit.ts Form validation and rate limiting
│  └─ nav.ts  brand.ts  slug.ts
├─ hooks/useInquiry.ts         Client hook that posts a form
├─ scripts/                    Seed scripts, logo builder, length checker
├─ migrations/                 Generated database migrations
├─ public/brand/               Logos, favicons, share image
├─ payload.config.ts           Payload configuration
├─ next.config.mjs  tailwind.config.cjs  postcss.config.mjs  tsconfig.json
├─ CLAUDE.md                   Rules for contributors and AI assistants
└─ _legacy-static/             The original exported page, kept for reference only
```

`(site)` and `(payload)` are Next.js **route groups**: they organise files without changing URLs. Files under `app/(payload)` are generated by Payload, so edit only `custom.scss` and `admin-theme/`.

---

## Routes

| URL | Description | Rendering |
|---|---|---|
| `/` | Home | Static, refreshed on every content change and at least daily |
| `/properties` | Search results with filters | Dynamic |
| `/properties/[slug]` | Listing detail | Dynamic |
| `/about` | About page | Static, refreshed on change |
| `/agents` | Agent list with specialty filter | Dynamic |
| `/agents/[slug]` | Agent profile | Dynamic |
| `/insights` | Article list with search and filters | Dynamic |
| `/insights/[slug]` | Article | Dynamic |
| `/contact` | Contact details, form and FAQ | Static, refreshed on change |
| `/api/contact` | Receives forms (POST) | Dynamic |
| `/admin` | Admin panel | Dynamic |
| `/api/*` | Payload REST API | Dynamic |
| `/api/graphql` | Payload GraphQL API | Dynamic |

Unknown listings, agents and articles return a real HTTP 404 with a branded page.

---

## Content model

### Collections

| Collection | Holds | Public read |
|---|---|---|
| **Properties** | Title, slug, sale or rent, status (active / pending / sold), type, price and currency (USD or NGN), beds, baths, area, city, region, address, neighborhood, agent, featured flag, photos, description, coordinates | Active listings only |
| **Agents** | Name, slug, role, photo, bio, years of experience, specialties, email, phone, rating, review count | Yes |
| **Neighborhoods** | Name, tagline, image. Listing counts are computed. | Yes |
| **Articles** | Title, slug, category, excerpt, author, cover, published date, reading minutes, rich-text body | Yes |
| **Testimonials** | Quote, author name and role, photo, rating | Yes |
| **Inquiries** | Name, email, phone, message, type, status, related property and agent | **No**. Visitors can only create. |
| **Media** | Uploaded images with `card`, `hero` and `avatar` sizes. Alt text is required. | Yes |
| **Users** | Admin accounts | No |

Property types: House, Apartment, Villa, Townhouse, Condo, Land.
Article categories: Market Trends, Buying Guide, Selling Tips, Renting, Investment.
Inquiry types: Contact, Sell enquiry, Viewing request, Newsletter signup.

### Globals (single documents)

- **Site settings:** company name, tagline, email, phone, WhatsApp number (digits only, international format), address, opening hours, social links and FAQs. Used by the footer, the contact page and the home contact section.
- **About page:** headline, intro, hero image, story, extra statistics, values and the closing call to action.

### Access rules

- Anyone may **read** public content. Properties are limited to `status = active`.
- Creating, editing and deleting content requires a signed-in admin.
- Inquiries: anyone may **create**; only signed-in admins may read, edit or delete.

---

## Managing content (for editors)

1. Go to `/admin` and sign in.
2. **Add a listing:** Listings → Properties → Create New. Fill in the required fields (marked with a red star), add photos (the first photo is the card image), tick **Featured** to show it in Featured Listings, set **Status** to Active, then Save. It appears on the site within seconds.
3. **Hide a listing:** set Status to Pending or Sold. It disappears from the site and its page returns a 404.
4. **Change contact details:** Site → Site settings.
5. **Edit About:** Site → About page.
6. **Write an article:** Content → Articles. Choose a category, add a cover, write the body with headings and lists, set the published date.
7. **Read enquiries:** Leads → Inquiries. Set the status as you handle each one.
8. **Slugs:** the web address of a listing, agent or article. Agents generate theirs from the name. Use lowercase words separated by hyphens and do not change a slug after it is public.

The dashboard shows live counts and shortcuts for adding a property, reviewing inquiries and viewing the site.

---

## How data flows

```
Visitor ──► Server Components ──► Payload Local API ──► Neon Postgres
   │                                  ▲
   └─ forms ─► /api/contact ─► validation, honeypot, rate limit ─┘

Editor ──► /admin ──► Payload ──► Postgres ──► revalidate hook ──► site refreshes
```

Public pages read the database **directly** through Payload's Local API (`lib/payload.ts`), with no extra HTTP request. Queries live in `lib/queries/`. Raw documents are mapped to card shapes in `lib/format.ts`.

---

## Search and filters

Filters travel in the URL, so every search can be bookmarked and shared:

```
/properties?mode=rent&location=Austin&type=House&price=p2&neighborhood=3&sort=price-asc&page=2
```

| Parameter | Values |
|---|---|
| `mode` | `buy`, `rent`, `sell` |
| `location` | A city or region. `City, ST` matches both. Letters, numbers, spaces and basic punctuation only. |
| `type` | One of the six property types |
| `price` | `p1`, `p2`, `p3`. Sale bands: $500k–$1M, $1M–$3M, $3M+. Rent bands: under $2k, $2k–$5k, $5k+ per month. |
| `neighborhood` | A neighborhood id |
| `sort` | `newest`, `price-asc`, `price-desc` |
| `page` | Page number (12 results per page) |

**Every value is checked against a whitelist** in `lib/filters.ts` before it reaches a database query. Anything invalid is rejected with a friendly message. Article search (`lib/articleFilters.ts`) follows the same rule.

Price bands apply to **USD** listings only.

---

## Forms and enquiries

All forms (contact, sell, viewing request, agent message and newsletter) post to `/api/contact`. The route:

1. Allows 5 requests per 10 minutes per IP address.
2. Validates name, email, message and type on the server (`lib/inquiry.ts`).
3. Silently ignores submissions that fill the hidden honeypot field.
4. Saves an **Inquiry** linked to the listing or agent when relevant.

Enquiries are **not emailed yet**. They appear in the admin only. See [Roadmap](#roadmap).

---

## Caching and instant updates

- The home, About and Contact pages are generated ahead of time and revalidated at least once a day.
- Every collection and global has an `afterChange` hook (`collections/hooks.ts`) that calls `revalidatePath`. When an editor saves, the public pages refresh within seconds, with no redeploy.
- Listing, agent, article and search pages are rendered on request.
- Loading states use skeleton components that share the real components' typography, so the layout does not jump.
- **The home page reads the database during `next build`**, so the database tables must exist before you build.

---

## Design system

The site was converted pixel for pixel from the original design and keeps its look.

| Token | Value |
|---|---|
| Deep green (sidebar, footer, primary buttons) | `#102E26` |
| Hover green | `#14352E` |
| Cream (page background) | `#FFFBF6` |
| Terracotta (accent, eyebrows) | `#C26A4A` |
| Warm border | `#F0E9DE` |
| Ink | `#1A1A1A` |
| Muted text | `#6B6B6B` |
| Body font | Inter |
| Heading font | Playfair Display (class `serif`) |

Conventions: pill-shaped buttons, rounded 24px cards, uppercase labels with wide letter spacing, and eyebrow text above headings.

**Icons:** import from `@/components/ui/icons`, never straight from `iconsax-react`. React 19 ignores the library's default props, so raw icons render without a colour. The wrapper restores size and `currentColor`. To use a new icon, add `export const Name = withDefaults(Iconsax.Name);` to that file.

---

## Branding and logos

- The **QQ icon** is the default mark: sidebar, mobile header, footer and admin.
- The **Product & Engineering lockup** is available for larger placements and is used on the share image.
- Creative Studio and Studio variants are **not used**.

Render logos with `components/ui/BrandLogo.tsx` (`variant="icon" | "product"`, `tone="light" | "dark"`). Use `light` on dark backgrounds.

Assets in `public/brand/` are generated from the source folder:

```bash
node scripts/make-logo-variants.mjs ~/Downloads/SLIIQQUE_LOGO
```

It produces dark and light versions, the favicons, `app/favicon.ico`, an Apple touch icon, a 512px app icon and a 1200×630 share image. Favicons sit on a green tile so they stay visible on dark browser tabs.

---

## Admin panel theme

The admin is themed to match the site. Colours, fonts, buttons, tables, the sidebar and the dashboard panel live in `app/(payload)/admin-theme/`, imported by `app/(payload)/custom.scss`. Both light and dark themes are supported. Branding components are in `components/admin/`, and the name shown in the admin comes from `lib/brand.ts`.

After changing anything here, check the login screen, dashboard, a list view and an edit view in both themes.

---

## Code standards

These rules are enforced by tooling and written in `CLAUDE.md`.

- **No source file may exceed 300 lines** (`.ts .tsx .js .jsx .mjs .css`). `npm run check` fails otherwise, `npm run build` runs the check first, and a Claude Code hook runs it after every edit. Excluded: `node_modules`, `.next`, `_legacy-static`, `migrations`, `media`, `payload-types.ts`.
- Pages compose components and hold no large markup.
- Mark a component `"use client"` only when it needs state, effects or event handlers.
- Do not hard-code content in components; it belongs in Payload.
- Validate every user-supplied filter against a whitelist before building a query.
- Styling uses Tailwind. Do not hand-edit generated CSS.
- Commit messages follow the conventional style (`feat:`, `fix:`, `docs:`).

---

## Database migrations

Development uses **push mode**: Payload changes the tables automatically. **Production never does.** It needs migrations.

```bash
# After changing a collection or global:
npm run generate:types
npm run payload migrate:create describe_the_change   # commit the new files in migrations/

# On the production database:
npm run payload migrate
```

Two migrations exist: `initial` and `pages`. Both must run on a fresh production database.

**Do not mix push and migrations on one database.** A database created in development has push markers, and running migrations against it makes Payload warn that data may be lost. Use a separate production database.

---

## Deploying to production

These steps assume **Vercel**, **Neon** and **Vercel Blob**.

1. **Database:** create a new Neon project or branch for production. Copy the pooled connection string.
2. **Blob storage:** create a Vercel Blob store and copy its read/write token.
3. **Vercel project:** import `SLIIQQUE/sliiqque-real-estate`. Framework preset: Next.js. Node 20.9 or newer. Choose a region near the database (Neon is in us-east-2).
4. **Environment variables:** set `DATABASE_URL`, `PAYLOAD_SECRET` (a new value) and `BLOB_READ_WRITE_TOKEN`.
5. **Migrate first:** run `npm run payload migrate` against the production `DATABASE_URL`. The home page queries the database during the build, so this must happen before the first build. In CI, run it as a step before `next build`.
6. **Deploy.**
7. **Create the first admin user** at `/admin` on the live URL.
8. **Add real content** (listings, agents, photos, settings). Delete the demo content.
9. **Point your domain** at the project and confirm HTTPS.

---

## Before you go live

Complete these first. The full, tickable version is in the project status report.

- [ ] Rotate the Neon database password (it was displayed during setup).
- [ ] Use a **separate production database** and run both migrations on it.
- [ ] Set a new `PAYLOAD_SECRET` and the Blob token in the host.
- [ ] Create your admin account and delete the demo listings, agents and testimonials.
- [ ] Replace the placeholder **address**, **opening hours** and **social links** in Site settings.
- [ ] Remove or replace the hard-coded figures: "Trusted by 10k+ clients • 15+ cities" (hero), "98%" and "4,200+" (stats), "4.9/5 from 2,847 reviews" (testimonials), "Join 4,200+ happy clients" (agents).
- [ ] Add Privacy Policy and Terms pages and link them in the footer.
- [ ] Set up email notifications for new enquiries.
- [ ] Add durable rate limiting and a CAPTCHA if spam appears.
- [ ] Add a sitemap, robots file and analytics.
- [ ] Test on real phones, Safari and the production URL.

---

## Security notes

- Secrets live only in environment variables and are never sent to the browser. Nothing sensitive is bundled into client code.
- The admin is a public URL. Use strong, unique passwords and a separate account per editor. Payload locks an account after repeated failed sign-ins.
- Inquiries can be created by anyone but read only by signed-in admins. This was tested from a signed-out session.
- Search inputs are validated against whitelists; content text is escaped by React.
- Forms have a honeypot and a per-IP rate limit. The limiter is in memory, so on serverless hosting it resets per instance. Use Redis for a real limit.
- Not configured yet: security headers (CSP, frame and referrer policies) and explicit allowed origins for the REST API.
- Personal data (names, emails, phone numbers) is stored in Inquiries. Publish a privacy notice and decide how long you keep it.

---

## Troubleshooting

| Problem | Cause and fix |
|---|---|
| Icons are invisible | Icons were imported from `iconsax-react` directly. Import from `@/components/ui/icons` instead. |
| `npm run seed` finishes instantly and loads nothing | `payload run` exits as soon as the script is imported. Seed scripts must end with top-level `await`, as the existing ones do. |
| `payload migrate` asks about "dev mode" and data loss | The database was created with push mode. Use a fresh database for production. |
| Build hangs or fails on the home page | The database is unreachable or has no tables. Check `DATABASE_URL`, run migrations, then build. |
| Pages show old content after an edit | Revalidation runs inside the Next.js server. If you edited the database another way, restart or redeploy. |
| `Cannot find module` after pulling | Run `npm install`. |
| Port already in use | Run on another port: `npm run dev -- -p 3001`. |
| Photos disappear after deploying | `BLOB_READ_WRITE_TOKEN` is not set, so uploads went to local disk. Set it and re-upload. |
| Seed images are missing on a new machine | `media/` is not in git. Run the seed again or upload photos in the admin. |
| "File length limit exceeded" | Split the named file into smaller components or modules. Do not raise the limit. |
| TypeScript errors after changing a collection | Run `npm run generate:types`. |
| Admin shows an unknown component error | Run `npm run generate:importmap`. |
| A mistyped URL shows a plain 404 | Expected: the branded page appears for missing listings, agents and articles only. |

---

## Known limitations

- All content is demo content until you replace it.
- Enquiries are stored but not emailed.
- Price filters apply to USD listings only.
- Some controls look clickable but do nothing yet: the hero "Watch Story" button and "Advanced Filters" label, listing-card hearts and the featured-listings arrows.
- All agents share one phone number and email.
- No automated tests and no CI pipeline yet.
- No Privacy or Terms pages.
- The in-memory rate limiter is per server instance.

---

## Roadmap

**Before launch:** production database and migrations, Blob storage, real content, branding clean-up, legal pages, enquiry emails.

**Soon after:** sitemap and robots, CAPTCHA, Redis rate limiting, security headers, error monitoring, tests and CI, individual agent details, a currency decision (USD, NGN or both).

**Later:** working wishlist, featured-listing carousel, neighborhood pages, bedroom filter and map view, gallery lightbox, CSV import for listings, a branded global 404, formatted prices in admin lists, accessibility audit.

---

## Contact

SLIIQQUE Real Estate: sliiqque.space@gmail.com · +234 704 100 0085 (also WhatsApp)
