# Design system

All tokens live in `src/app/globals.css` inside `@theme`. Tailwind turns each one into utility classes, so change a value there and it updates across the site.

## Direction

Warm, editorial, and focused on the makers. The palette draws on block-printed textiles and terracotta: ivory paper, dark ink, terracotta red, and indigo, with turmeric used sparingly for highlights. Headings use an editorial serif and body text a clean sans-serif.

## Colours

| Token | Class examples | Use |
| --- | --- | --- |
| `paper` | `bg-paper` | Page background |
| `surface` | `bg-surface` | Cards |
| `sand` | `bg-sand` | Soft section backgrounds |
| `line` | `border-line` | Borders, dividers |
| `ink` | `text-ink` | Main text |
| `muted` | `text-muted` | Secondary text |
| `brand` / `brand-dark` | `bg-brand`, `hover:bg-brand-dark` | Primary actions, emphasis |
| `deep` | `bg-deep` | Dark sections (footer, calls to action) |
| `accent` | `text-accent` | Small highlights only (not body text on light backgrounds; contrast is too low) |
| `sage` | `bg-sage` | Supporting accent |

## Typography

- `font-display` (Fraunces) for headings. `h1`–`h3` use it automatically.
- `font-sans` (Inter) for everything else.
- `text-display` is the hero headline size and `text-title` is for section titles. Both scale with screen width.
- Eyebrow labels are small uppercase text with wide letter spacing (see `SectionHeading`).

## Spacing and layout

- `py-section`: vertical space between page sections (grows on larger screens).
- `px-gutter`: side padding for page content.
- `max-w-site`: maximum content width.
- Wrap section content in `<Container>` to apply the width and gutters.

## Radii

- `rounded-control`: pill shape for buttons and tags.
- `rounded-card`: cards and panels.
- `rounded-media`: images and placeholders.

## Shared components (`src/components/ui/`)

- `ButtonLink` / `buttonClasses()`: variants `primary`, `secondary`, `ghost`, `light`; sizes `md`, `lg`.
- `Container`: centred, width-limited wrapper.
- `SectionHeading`: eyebrow, title, and description, with `align` and `tone` options.
- `ImagePlaceholder`: patterned stand-in for photos. Replace with `next/image` once real images are in `public/images/`.

## Breakpoints

Tailwind defaults: `sm` 640px, `md` 768px (the full navigation appears here), `lg` 1024px.
