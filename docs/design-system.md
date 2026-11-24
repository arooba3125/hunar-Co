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

## Form controls (`src/components/ui/form-fields.tsx`)

- `TextField`, `TextAreaField`, `SelectField`, `CheckboxField`: each takes `id`, `label`, optional `hint` and `error`, and links them for screen readers.
- `FormAlert`: `tone="error"` for the "Please fix N fields" summary, `tone="success"` for confirmations.
- Pattern used by both forms: validate on submit, show a summary plus per-field messages, move focus to the first invalid field, and clear a field's error as soon as it is edited.

## Product components (`src/features/products/`)

- `ProductCard`: a design in a grid.
- `InterestProgress`: progress bar with "current of target" text. Turns sage green at 100%.
- `StatusBadge`: launch status pill (Collecting interest, Closing soon, Target reached, Closed).
- `CategoryButtons`, `SearchField`, `SortSelect`: catalogue controls.
- `SampleNotice`: the yellow "Sample" note for placeholder content.
- Prices always go through `formatPrice()` in `src/lib/format.ts` (e.g. "Rs 14,000"), and dates through `formatDate()`.

## Breakpoints

Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px (the full navigation appears here; below it the header shows a menu button).
