// Basic site details used across the app. Edit here, not in each page.
export const siteConfig = {
  name: "HunarCo",
  tagline:
    "Original work from Pakistani fashion designers, artists, and craftspeople.",
  description:
    "HunarCo helps Pakistani designers, artists, and craftspeople show their original work to buyers who can register interest in it.",
};

export type NavLink = { label: string; href: string };

// Main navigation. Links starting with "/#" point to sections of the home
// page; switch them to real routes once those pages exist.
export const mainNav: NavLink[] = [
  { label: "Discover", href: "/discover" },
  { label: "Creators", href: "/creators" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Join as a creator", href: "/join-as-creator" },
];

// The main call to action shown in the header.
export const primaryAction: NavLink = {
  label: "Explore designs",
  href: "/discover",
};

// Footer link groups.
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Discover designs", href: "/discover" },
      { label: "Creators", href: "/creators" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Creators",
    links: [
      { label: "Why HunarCo", href: "/#for-creators" },
      { label: "Apply to join", href: "/join-as-creator" },
    ],
  },
];
