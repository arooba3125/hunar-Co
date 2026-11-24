# HunarCo

HunarCo is a platform where Pakistani fashion designers, artists, and craftspeople showcase original work. Buyers discover creators and register interest in designs. When a design reaches its interest threshold, HunarCo may coordinate production.

This repository is the website for a student marketing project. It is a frontend prototype: all creators, designs and accounts are fictional sample data, and nothing is connected to a backend yet.

> **Demo sign-in only.** The login, buyer, creator and admin screens use a mock
> that runs in the browser. It is not real authentication or security. See
> [docs/demo-auth.md](docs/demo-auth.md) for the demo accounts and what a real
> launch would need.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) with TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Supabase for data and form submissions (planned, not connected yet)
- Vercel for hosting (planned, not deployed yet)

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer (includes npm)
- Git (optional, for version control)

## Setup

```bash
npm install
```

To prepare for Supabase later, copy the example environment file and leave the values blank for now:

```bash
cp .env.example .env.local
```

On Windows PowerShell use `Copy-Item .env.example .env.local`.

## Development

```bash
npm run dev
```

Then open <http://localhost:3000>. To try the account areas, go to
<http://localhost:3000/login> and press **Demo Buyer**, **Demo Creator** or **Demo Admin**.

Other scripts:

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run build` | Builds the production version    |
| `npm run start` | Runs the built production server |
| `npm run lint`  | Checks the code with ESLint      |

## Project structure

See [docs/project-structure.md](docs/project-structure.md).
