// ⚠️ TEMPORARY SAMPLE DATA
// Every creator and design in this file is invented placeholder content for
// building and reviewing the interface. They are NOT real people or products.
// Prices, interest counts, dates and timelines are made up for layout only.
// Replace this file with real data (from Supabase) in a later stage.

import type { Creator, Product } from "@/types";

export const sampleCreators: Creator[] = [
  {
    id: "sample-creator-1",
    slug: "sample-creator-one",
    name: "Sample Creator One",
    category: "fashion",
    city: "Lahore",
    bio: "Placeholder bio. A fashion designer working with hand embroidery and everyday cotton silhouettes.",
    biography: [
      "Placeholder biography. This paragraph stands in for the creator's own story: how they started, who taught them, and what draws them to hand embroidery.",
      "A second placeholder paragraph describing their approach to everyday clothing, the materials they prefer, and what they hope buyers feel when wearing their work.",
    ],
    tone: "brand",
  },
  {
    id: "sample-creator-2",
    slug: "sample-creator-two",
    name: "Sample Creator Two",
    category: "crafts",
    city: "Multan",
    bio: "Placeholder bio. A craftsperson working with block printing and natural dyes.",
    biography: [
      "Placeholder biography. This paragraph stands in for the creator's background in block printing and how the craft is practised in their workshop.",
      "A second placeholder paragraph about carving blocks, preparing natural dyes, and the time each piece takes to make.",
    ],
    tone: "deep",
  },
  {
    id: "sample-creator-3",
    slug: "sample-creator-three",
    name: "Sample Creator Three",
    category: "art",
    city: "Karachi",
    bio: "Placeholder bio. An artist making small-format paintings and prints.",
    biography: [
      "Placeholder biography. This paragraph stands in for the artist's training, influences, and the traditions their work draws on.",
      "A second placeholder paragraph about their process, from sketch to finished print.",
    ],
    tone: "sage",
  },
  {
    id: "sample-creator-4",
    slug: "sample-creator-four",
    name: "Sample Creator Four",
    category: "crafts",
    city: "Hyderabad",
    bio: "Placeholder bio. A craftsperson working with clay and glazed ceramics.",
    biography: [
      "Placeholder biography. This paragraph stands in for the creator's story of learning ceramics and setting up their studio.",
    ],
    tone: "accent",
  },
  {
    id: "sample-creator-5",
    slug: "sample-creator-five",
    name: "Sample Creator Five",
    category: "fashion",
    city: "Peshawar",
    bio: "Placeholder bio. A designer making accessories with traditional techniques.",
    biography: [
      "Placeholder biography. This paragraph stands in for the designer's background and the traditional techniques used in their accessories.",
    ],
    tone: "deep",
  },
  {
    // Has no listings on purpose, to show the profile page's empty state.
    id: "sample-creator-6",
    slug: "sample-creator-six",
    name: "Sample Creator Six",
    category: "art",
    city: "Islamabad",
    bio: "Placeholder bio. An illustrator preparing their first HunarCo listing.",
    biography: [
      "Placeholder biography. This creator has joined but has not listed any designs yet.",
    ],
    tone: "brand",
  },
];

export const sampleProducts: Product[] = [
  {
    id: "sample-product-1",
    slug: "embroidered-cotton-kurta",
    name: "Embroidered cotton kurta",
    category: "fashion",
    creatorId: "sample-creator-1",
    summary: "A relaxed cotton kurta with hand-embroidered neckline.",
    description:
      "Sample description. A loose-fitting kurta in breathable cotton, finished with hand embroidery around the neckline and cuffs. Designed for everyday wear in warm weather.",
    details: [
      "Material: cotton (sample)",
      "Hand-embroidered neckline and cuffs",
      "Sizes S to XL planned",
    ],
    pricePkr: 8500,
    interestCount: 18,
    interestTarget: 50,
    status: "open",
    featured: true,
    listedOn: "2026-11-02",
    closesOn: "2027-02-15",
    estimatedTimeline: "About 6–8 weeks after the target is reached (sample estimate)",
    gallery: [
      { label: "Kurta, front view", tone: "brand" },
      { label: "Embroidery close-up", tone: "accent" },
      { label: "Kurta, side view", tone: "sage" },
    ],
  },
  {
    id: "sample-product-2",
    slug: "block-printed-shawl",
    name: "Block-printed shawl",
    category: "crafts",
    creatorId: "sample-creator-2",
    summary: "A wide shawl printed by hand with carved wooden blocks.",
    description:
      "Sample description. A generous shawl hand-printed with carved wooden blocks in deep indigo and red, using layered printing for a rich repeat pattern.",
    details: [
      "Hand block-printed",
      "Approx. 100 × 220 cm (sample)",
      "Each piece varies slightly",
    ],
    pricePkr: 14000,
    interestCount: 31,
    interestTarget: 40,
    status: "closing-soon",
    featured: true,
    listedOn: "2026-10-12",
    closesOn: "2026-12-20",
    estimatedTimeline: "About 8–10 weeks after the target is reached (sample estimate)",
    gallery: [
      { label: "Shawl, folded", tone: "deep" },
      { label: "Print pattern detail", tone: "brand" },
      { label: "Printing blocks", tone: "accent" },
    ],
  },
  {
    id: "sample-product-3",
    slug: "miniature-style-print",
    name: "Miniature-style art print",
    category: "art",
    creatorId: "sample-creator-3",
    summary: "A limited art print inspired by miniature painting.",
    description:
      "Sample description. An art print that draws on the composition and fine detail of miniature painting, reproduced on heavy archival paper.",
    details: ["A4 print (sample size)", "Archival paper", "Signed by the artist"],
    pricePkr: 6000,
    interestCount: 7,
    interestTarget: 25,
    status: "open",
    featured: true,
    listedOn: "2026-11-18",
    closesOn: "2027-03-01",
    estimatedTimeline: "About 3–4 weeks after the target is reached (sample estimate)",
    gallery: [
      { label: "Framed print", tone: "accent" },
      { label: "Print detail", tone: "sage" },
    ],
  },
  {
    id: "sample-product-4",
    slug: "glazed-ceramic-bowl-set",
    name: "Glazed ceramic bowl set",
    category: "crafts",
    creatorId: "sample-creator-4",
    summary: "A set of three hand-thrown bowls in a turquoise glaze.",
    description:
      "Sample description. Three hand-thrown bowls in graduated sizes, finished with a turquoise glaze inspired by traditional tilework.",
    details: ["Set of 3 bowls", "Food-safe glaze (sample)", "Hand-thrown, sizes vary"],
    pricePkr: 9500,
    interestCount: 30,
    interestTarget: 30,
    status: "target-reached",
    featured: false,
    listedOn: "2026-09-20",
    closesOn: "2026-11-30",
    estimatedTimeline: "About 10–12 weeks after the target is reached (sample estimate)",
    gallery: [
      { label: "Bowl set", tone: "sage" },
      { label: "Glaze close-up", tone: "deep" },
      { label: "Bowls stacked", tone: "accent" },
    ],
  },
  {
    id: "sample-product-5",
    slug: "embroidered-clutch",
    name: "Embroidered clutch",
    category: "fashion",
    creatorId: "sample-creator-5",
    summary: "An evening clutch with dense thread embroidery.",
    description:
      "Sample description. A compact evening clutch covered in dense thread embroidery, with a fabric lining and a magnetic clasp.",
    details: ["Approx. 25 × 14 cm (sample)", "Thread embroidery", "Lined interior"],
    pricePkr: 7200,
    interestCount: 12,
    interestTarget: 40,
    status: "open",
    featured: false,
    listedOn: "2026-11-10",
    closesOn: "2027-02-28",
    estimatedTimeline: "About 6 weeks after the target is reached (sample estimate)",
    gallery: [
      { label: "Clutch, front", tone: "brand" },
      { label: "Embroidery detail", tone: "deep" },
    ],
  },
  {
    id: "sample-product-6",
    slug: "landscape-painting-study",
    name: "Landscape painting study",
    category: "art",
    creatorId: "sample-creator-3",
    summary: "Small-edition prints of a northern landscape study.",
    description:
      "Sample description. Prints of a small landscape study in muted greens and blues, offered in a limited edition.",
    details: ["A3 print (sample size)", "Limited edition", "Unframed"],
    pricePkr: 11000,
    interestCount: 4,
    interestTarget: 20,
    status: "open",
    featured: false,
    listedOn: "2026-11-21",
    closesOn: "2027-03-20",
    estimatedTimeline: "About 4 weeks after the target is reached (sample estimate)",
    gallery: [
      { label: "Print, full view", tone: "sage" },
      { label: "Brushwork detail", tone: "deep" },
    ],
  },
  {
    id: "sample-product-7",
    slug: "printed-lawn-dupatta",
    name: "Printed lawn dupatta",
    category: "fashion",
    creatorId: "sample-creator-1",
    summary: "A lightweight lawn dupatta with a geometric border.",
    description:
      "Sample description. A light lawn dupatta with a printed geometric border and hand-finished edges.",
    details: ["Lawn cotton (sample)", "Approx. 2.5 m long", "Hand-finished edges"],
    pricePkr: 4500,
    interestCount: 22,
    interestTarget: 60,
    status: "closed",
    featured: false,
    listedOn: "2026-08-15",
    closesOn: "2026-10-31",
    estimatedTimeline: "Registration closed (sample)",
    gallery: [
      { label: "Dupatta, draped", tone: "accent" },
      { label: "Border print", tone: "brand" },
    ],
  },
  {
    id: "sample-product-8",
    slug: "carved-wood-tray",
    name: "Carved wooden serving tray",
    category: "crafts",
    creatorId: "sample-creator-2",
    summary: "A serving tray with a hand-carved geometric pattern.",
    description:
      "Sample description. A wooden serving tray with a hand-carved geometric pattern along the rim, finished with natural oil.",
    details: ["Hardwood (sample)", "Approx. 40 × 28 cm", "Oil finish"],
    pricePkr: 12500,
    interestCount: 9,
    interestTarget: 25,
    status: "open",
    featured: true,
    listedOn: "2026-11-05",
    closesOn: "2027-01-31",
    estimatedTimeline: "About 8 weeks after the target is reached (sample estimate)",
    gallery: [
      { label: "Tray, top view", tone: "brand" },
      { label: "Carving detail", tone: "sage" },
    ],
  },
  {
    id: "sample-product-9",
    slug: "ink-calligraphy-panel",
    name: "Ink calligraphy panel",
    category: "art",
    creatorId: "sample-creator-3",
    summary: "A calligraphy print in black ink and gold detailing.",
    description:
      "Sample description. A calligraphy artwork in black ink with gold detailing, reproduced as a print on textured paper.",
    details: ["30 × 40 cm print (sample)", "Textured paper", "Gold-ink detailing"],
    pricePkr: 8000,
    interestCount: 15,
    interestTarget: 30,
    status: "closing-soon",
    featured: false,
    listedOn: "2026-10-25",
    closesOn: "2026-12-15",
    estimatedTimeline: "About 4 weeks after the target is reached (sample estimate)",
    gallery: [
      { label: "Calligraphy panel", tone: "deep" },
      { label: "Gold detail", tone: "accent" },
    ],
  },
];

// Helpers for looking things up. Later these will query Supabase instead.

export function getProductBySlug(slug: string) {
  return sampleProducts.find((product) => product.slug === slug);
}

export function getCreatorById(id: string) {
  return sampleCreators.find((creator) => creator.id === id);
}

export function getCreatorBySlug(slug: string) {
  return sampleCreators.find((creator) => creator.slug === slug);
}

/** All designs made by one creator */
export function getProductsByCreator(creatorId: string) {
  return sampleProducts.filter((product) => product.creatorId === creatorId);
}

export function getRelatedProducts(product: Product, limit = 3) {
  return sampleProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
