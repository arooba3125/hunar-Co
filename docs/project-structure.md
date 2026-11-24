# Project structure

```
hunar-Co/
├── docs/                 Project notes, page plans, setup docs
├── public/
│   └── images/           Local images (logos, sample designs)
├── src/
│   ├── app/              Routes, layouts, and global styles
│   ├── components/       Shared UI pieces used on many pages
│   ├── features/         HunarCo-specific sections
│   ├── lib/              Utilities, config, future service clients
│   └── types/            Shared TypeScript types
├── .env.example          Names of planned environment variables
└── package.json          Dependencies and scripts
```

## What goes where

**`src/app/`**: Each folder here becomes a URL. `page.tsx` is the page content, `layout.tsx` wraps pages with shared parts such as the header and footer, and `globals.css` holds site-wide styles. For example, `src/app/creators/page.tsx` would become `/creators`.

**`src/components/`**: Generic, reusable building blocks that could appear on any page. The site header, footer, wordmark, and mobile menu sit at the top level. Small design-system pieces (buttons, container, section heading, image placeholder) live in `src/components/ui/`. See [design-system.md](design-system.md).

**`src/features/`**: Code tied to one HunarCo area.

- `home/`: home page sections.
- `products/`: everything for browsing and viewing designs. It holds `sample-data.ts` (the single source of sample creators and designs, linked by `creatorId`), the product card, interest progress bar, status badge, catalogue filters, gallery, and the demo interest form.
- `creators/`: creator card, directory filter, portfolio gallery, "Apply to join" banner, and the demo creator application form.
- `auth/`: the **mock** demo sign-in (session store, `useDemoAuth` hook, `RoleGate`, access-denied screen, login/sign-up/forgot-password forms, header account menu). See [demo-auth.md](demo-auth.md).
- `demo/`: fictional users, interests, submissions, applications and settings (`demo-data.ts`) plus status labels.
- `dashboard/`: buyer and creator dashboards, the new-design form, and shared dashboard pieces.
- `admin/`: the admin panel shell, its shared demo state, and one component per admin page.

Shared form controls (text field, text area, select, checkbox, radio cards, alert) live in `src/components/ui/form-fields.tsx`, with `password-field.tsx`, `confirm-dialog.tsx`, `filter-select.tsx` and `pill.tsx` beside them. Form helpers live in `src/lib/validation.ts` and `src/lib/demo-submit.ts`.

## Current pages

| URL | File | What it is |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Home page |
| `/discover` | `src/app/discover/page.tsx` | Catalogue with filters, search and sorting |
| `/discover/<slug>` | `src/app/discover/[slug]/page.tsx` | One design. `loading.tsx` and `not-found.tsx` beside it handle loading and unknown designs |
| `/creators` | `src/app/creators/page.tsx` | Creator directory with a discipline filter |
| `/creators/<slug>` | `src/app/creators/[slug]/page.tsx` | One creator's profile, portfolio and listings, with its own `loading.tsx` and `not-found.tsx` |
| `/join-as-creator` | `src/app/join-as-creator/page.tsx` | Who can apply, how review works, and the demo application form |
| `/login`, `/signup`, `/forgot-password` | `src/app/<name>/page.tsx` | Demo sign-in screens |
| `/buyer/dashboard` | `src/app/buyer/dashboard/page.tsx` | Buyer's interests and profile (Buyer role) |
| `/creator/dashboard` | `src/app/creator/dashboard/page.tsx` | Creator's submissions, profile completion and editing (Creator role) |
| `/creator/designs/new` | `src/app/creator/designs/new/page.tsx` | Demo design submission with image preview (Creator role) |
| `/admin/...` | `src/app/admin/<page>/page.tsx` | Dashboard, users, creators, designs, launches, settings (Admin role) |

The `buyer`, `creator` and `admin` folders each have a `layout.tsx` that wraps their pages in `RoleGate` (demo only, not real security).
| any other URL | `src/app/not-found.tsx` | Site-wide "page not found" |

**`src/lib/`**: Helpers and configuration that aren't UI. `site-config.ts` holds the site name and tagline. The Supabase client will go here later.

**`src/types/`**: TypeScript types shared across the app, such as `Creator` and `Design`. They are drafts and will change as the data model is decided.

**`public/images/`**: Static images. A file at `public/images/logo.png` is available at `/images/logo.png`.

**`docs/`**: Written notes for the team: page plans, content drafts, decisions.

## Import shortcut

`@/` points to `src/`, so `import { siteConfig } from "@/lib/site-config"` works from any file.
