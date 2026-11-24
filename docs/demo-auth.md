# Demo accounts, roles and admin panel

> **This is a frontend demonstration, not real authentication or security.**
> Anyone can open the browser's developer tools, edit `sessionStorage`, and
> "become" any role. Never put real data behind these checks.

## Try each role

Go to `/login`. Either use a one-click **Demo** button under the form, or
type a demo email with **any password of 8 or more characters**.

| Role | Email | Lands on |
| --- | --- | --- |
| Buyer | `buyer@demo.hunarco.test` | `/buyer/dashboard` |
| Creator | `creator@demo.hunarco.test` | `/creator/dashboard` |
| Admin | `admin@demo.hunarco.test` | `/admin/dashboard` |

`/signup` lets you join as a **Buyer** or **Creator** (never Admin). It signs
you in to an empty "New buyer" or "New creator" demo account, so you can see
the empty states. The name you type is shown until you reload.

All emails use the reserved `.test` domain, so they can't belong to anyone.

## How the mock works

| File | What it does |
| --- | --- |
| `src/features/auth/demo-session.ts` | Remembers `{ userId, role }` in `sessionStorage` (cleared when the tab closes). No names, emails or passwords are stored. |
| `src/features/auth/use-demo-auth.ts` | React hook that reads the demo session. |
| `src/features/auth/role-gate.tsx` | Wraps `/buyer`, `/creator` and `/admin`. Logged out: redirect to `/login?next=…`. Wrong role: "Access denied". |
| `src/features/demo/demo-data.ts` | Fictional users, interests, design submissions, creator applications and default settings. |
| `src/features/dashboard/creator-demo-context.tsx` | Creator area state (profile edits, new submissions). |
| `src/features/admin/admin-demo-context.tsx` | Admin state (approvals, review decisions, launch statuses, settings). |

Dashboard and admin changes live in React state only: they carry across pages
within an area but reset when you reload. Admin changes don't affect the public
`/discover` pages.

## What is simulated

- Sign-in, sign-up and password reset. Passwords are only checked for length on
  login and for strength on sign-up. They are never compared, stored or sent.
- "Forgot password" shows the same message for every email and sends nothing.
- Role checks happen in the browser.
- Design submissions: the image preview is a temporary browser-only URL; nothing
  is uploaded.
- Admin decisions (approve, reject, request changes, launch status, settings).

## What production needs (with a backend such as Supabase)

1. **Real authentication**: hashed passwords handled by an auth provider, email
   verification, a working reset flow, rate limiting, and secure HTTP-only
   session cookies instead of `sessionStorage`.
2. **Server-side authorization**: check the user's role on the server for every
   page, server action and API route (for example in `proxy`/middleware and in
   server components), and never send another role's data to the browser.
3. **Database rules**: e.g. Supabase Row Level Security so buyers only read their
   own interests, creators only edit their own designs, and only admins change
   statuses. Admin roles should be assigned in the database, never chosen at sign-up.
4. **Audit trail** for admin actions, and confirmation emails/notifications.
5. **File uploads** to storage with type and size checks on the server, and
   moderation before images are published.
6. **Privacy**: a privacy notice, consent records, and a way to delete accounts.
