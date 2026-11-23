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

**`src/features/`**: Code tied to one HunarCo area. `home/` holds the home page sections and `sample-content.ts`, which is temporary placeholder data. Planned folders are `products/` (designs and interest counts), `creators/` (creator profiles), and `applications/` (creator application form). Create each one when you start that area.

**`src/lib/`**: Helpers and configuration that aren't UI. `site-config.ts` holds the site name and tagline. The Supabase client will go here later.

**`src/types/`**: TypeScript types shared across the app, such as `Creator` and `Design`. They are drafts and will change as the data model is decided.

**`public/images/`**: Static images. A file at `public/images/logo.png` is available at `/images/logo.png`.

**`docs/`**: Written notes for the team: page plans, content drafts, decisions.

## Import shortcut

`@/` points to `src/`, so `import { siteConfig } from "@/lib/site-config"` works from any file.
