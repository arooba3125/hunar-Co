# HunarCo

HunarCo is a platform where Pakistani fashion designers, artists, and craftspeople showcase original work. Buyers discover creators and register interest in designs. When a design reaches its interest threshold, HunarCo may coordinate production.

This repository is the website for a student marketing project. It currently holds only the project foundation, not the full site.

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

Then open <http://localhost:3000>.

Other scripts:

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run build` | Builds the production version    |
| `npm run start` | Runs the built production server |
| `npm run lint`  | Checks the code with ESLint      |

## Project structure

See [docs/project-structure.md](docs/project-structure.md).
