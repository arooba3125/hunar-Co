// Basic site details used across the app. Edit here, not in each page.
export const siteConfig = {
  name: "HunarCo",
  tagline:
    "Original work from Pakistani fashion designers, artists, and craftspeople.",
  description:
    "HunarCo helps Pakistani designers, artists, and craftspeople show their original work to buyers who can register interest in it.",
};

export type NavLink = { label: string; href: string };

// Main navigation. These point to sections of the home page for now;
// switch them to real routes (e.g. "/designs") once those pages exist.
export const mainNav: NavLink[] = [
  { label: "Designs", href: "/#featured-designs" },
  { label: "Creators", href: "/#featured-creators" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For creators", href: "/#for-creators" },
];

// The main call to action shown in the header.
export const primaryAction: NavLink = {
  label: "Explore designs",
  href: "/#featured-designs",
};

// Footer link groups.
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Designs", href: "/#featured-designs" },
      { label: "Creators", href: "/#featured-creators" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Creators",
    links: [
      { label: "Why HunarCo", href: "/#for-creators" },
      { label: "Apply to join", href: "/#for-creators" },
    ],
  },
];
