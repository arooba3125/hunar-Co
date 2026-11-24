// ⚠️ DEMO DATA FOR THE ACCOUNT AREAS AND ADMIN PANEL
// Every user, interest, submission and application below is fictional and
// exists only to demonstrate the interface. They are NOT real people or real
// business results. Email addresses use the reserved ".test" domain so they
// can never belong to anyone. No passwords are stored anywhere.
//
// Creators and products come from src/features/products/sample-data.ts,
// connected here by id so nothing is duplicated.

import type {
  BuyerInterest,
  CreatorApplication,
  DemoUser,
  DesignSubmission,
} from "@/types";

export const demoUsers: DemoUser[] = [
  // --- Accounts you can log in with (listed on /login) ---
  {
    id: "demo-buyer",
    name: "Demo Buyer",
    email: "buyer@demo.hunarco.test",
    role: "buyer",
    status: "active",
    joinedOn: "2026-09-14",
    city: "Islamabad",
    loginable: true,
  },
  {
    id: "demo-creator",
    name: "Sample Creator One",
    email: "creator@demo.hunarco.test",
    role: "creator",
    status: "active",
    joinedOn: "2026-08-02",
    city: "Lahore",
    creatorId: "sample-creator-1",
    loginable: true,
  },
  {
    id: "demo-admin",
    name: "Demo Admin",
    email: "admin@demo.hunarco.test",
    role: "admin",
    status: "active",
    joinedOn: "2026-07-01",
    loginable: true,
  },

  // --- Accounts used after demo sign-up (start empty, to show empty states) ---
  {
    id: "demo-new-buyer",
    name: "New buyer",
    email: "new-buyer@demo.hunarco.test",
    role: "buyer",
    status: "active",
    joinedOn: "2026-11-24",
  },
  {
    id: "demo-new-creator",
    name: "New creator",
    email: "new-creator@demo.hunarco.test",
    role: "creator",
    status: "active",
    joinedOn: "2026-11-24",
  },

  // --- Other fictional users, shown only in the admin user list ---
  {
    id: "sample-user-2",
    name: "Sample Creator Two",
    email: "creator-two@demo.hunarco.test",
    role: "creator",
    status: "active",
    joinedOn: "2026-08-19",
    city: "Multan",
    creatorId: "sample-creator-2",
  },
  {
    id: "sample-user-3",
    name: "Sample Creator Three",
    email: "creator-three@demo.hunarco.test",
    role: "creator",
    status: "active",
    joinedOn: "2026-09-03",
    city: "Karachi",
    creatorId: "sample-creator-3",
  },
  {
    id: "sample-user-4",
    name: "Sample Creator Four",
    email: "creator-four@demo.hunarco.test",
    role: "creator",
    status: "active",
    joinedOn: "2026-09-10",
    city: "Hyderabad",
    creatorId: "sample-creator-4",
  },
  {
    id: "sample-user-5",
    name: "Sample Creator Five",
    email: "creator-five@demo.hunarco.test",
    role: "creator",
    status: "suspended",
    joinedOn: "2026-10-01",
    city: "Peshawar",
    creatorId: "sample-creator-5",
  },
  {
    id: "sample-user-6",
    name: "Sample Creator Six",
    email: "creator-six@demo.hunarco.test",
    role: "creator",
    status: "invited",
    joinedOn: "2026-11-12",
    city: "Islamabad",
    creatorId: "sample-creator-6",
  },
  {
    id: "sample-user-7",
    name: "Sample Buyer Two",
    email: "buyer-two@demo.hunarco.test",
    role: "buyer",
    status: "active",
    joinedOn: "2026-10-08",
    city: "Lahore",
  },
  {
    id: "sample-user-8",
    name: "Sample Buyer Three",
    email: "buyer-three@demo.hunarco.test",
    role: "buyer",
    status: "active",
    joinedOn: "2026-10-22",
    city: "Karachi",
  },
  {
    id: "sample-user-9",
    name: "Sample Buyer Four",
    email: "buyer-four@demo.hunarco.test",
    role: "buyer",
    status: "suspended",
    joinedOn: "2026-11-02",
    city: "Faisalabad",
  },
];

/** Designs each demo buyer has registered interest in, keyed by user id */
export const demoBuyerInterests: Record<string, BuyerInterest[]> = {
  "demo-buyer": [
    { productId: "sample-product-2", quantity: 1, registeredOn: "2026-11-03" },
    { productId: "sample-product-1", quantity: 2, registeredOn: "2026-11-10" },
    { productId: "sample-product-4", quantity: 1, registeredOn: "2026-10-02" },
    { productId: "sample-product-7", quantity: 1, registeredOn: "2026-09-01" },
  ],
};

/** Design submissions from creators, with their review status */
export const demoSubmissions: DesignSubmission[] = [
  {
    id: "submission-1",
    creatorId: "sample-creator-1",
    title: "Embroidered cotton kurta",
    category: "fashion",
    pricePkr: 8500,
    submittedOn: "2026-10-20",
    reviewStatus: "approved",
    productSlug: "embroidered-cotton-kurta",
  },
  {
    id: "submission-2",
    creatorId: "sample-creator-1",
    title: "Printed lawn dupatta",
    category: "fashion",
    pricePkr: 4500,
    submittedOn: "2026-08-05",
    reviewStatus: "approved",
    productSlug: "printed-lawn-dupatta",
  },
  {
    id: "submission-3",
    creatorId: "sample-creator-1",
    title: "Mirror-work waistcoat",
    category: "fashion",
    pricePkr: 11000,
    submittedOn: "2026-11-18",
    reviewStatus: "in-review",
  },
  {
    id: "submission-4",
    creatorId: "sample-creator-1",
    title: "Hand-dyed silk scarf",
    category: "fashion",
    pricePkr: 6500,
    submittedOn: "2026-11-06",
    reviewStatus: "changes-requested",
    reviewNote: "Sample note: please add a close-up photo of the dye pattern and confirm the size.",
  },
  {
    id: "submission-5",
    creatorId: "sample-creator-2",
    title: "Indigo table runner",
    category: "crafts",
    pricePkr: 5200,
    submittedOn: "2026-11-15",
    reviewStatus: "in-review",
  },
  {
    id: "submission-6",
    creatorId: "sample-creator-3",
    title: "Courtyard sketch print",
    category: "art",
    pricePkr: 5000,
    submittedOn: "2026-11-20",
    reviewStatus: "in-review",
  },
  {
    id: "submission-7",
    creatorId: "sample-creator-4",
    title: "Glazed tile coasters",
    category: "crafts",
    pricePkr: 3500,
    submittedOn: "2026-10-28",
    reviewStatus: "rejected",
    reviewNote: "Sample note: too similar to an existing listing.",
  },
  {
    id: "submission-8",
    creatorId: "sample-creator-2",
    title: "Block-printed shawl",
    category: "crafts",
    pricePkr: 14000,
    submittedOn: "2026-10-05",
    reviewStatus: "approved",
    productSlug: "block-printed-shawl",
  },
];

/** Applications from people who want to join as creators */
export const demoApplications: CreatorApplication[] = [
  {
    id: "application-1",
    name: "Sample Applicant A",
    city: "Quetta",
    discipline: "crafts",
    portfolioUrl: "https://example.com/applicant-a",
    summary: "Sample summary. Hand-knotted rugs in small sizes using traditional patterns.",
    submittedOn: "2026-11-21",
    status: "pending",
  },
  {
    id: "application-2",
    name: "Sample Applicant B",
    city: "Lahore",
    discipline: "fashion",
    portfolioUrl: "https://example.com/applicant-b",
    summary: "Sample summary. Ready-to-wear pieces built around hand-woven khaddar.",
    submittedOn: "2026-11-19",
    status: "pending",
  },
  {
    id: "application-3",
    name: "Sample Applicant C",
    city: "Sialkot",
    discipline: "other",
    portfolioUrl: "https://example.com/applicant-c",
    summary: "Sample summary. Hand-stitched leather journals and accessories.",
    submittedOn: "2026-11-14",
    status: "pending",
  },
  {
    id: "application-4",
    name: "Sample Applicant D",
    city: "Karachi",
    discipline: "art",
    portfolioUrl: "https://example.com/applicant-d",
    summary: "Sample summary. Digital illustration printed as limited posters.",
    submittedOn: "2026-11-02",
    status: "approved",
  },
  {
    id: "application-5",
    name: "Sample Applicant E",
    city: "Gilgit",
    discipline: "crafts",
    portfolioUrl: "https://example.com/applicant-e",
    summary: "Sample summary. Resold mass-produced items; not original work.",
    submittedOn: "2026-10-27",
    status: "rejected",
  },
];

/** Default values for the demo admin settings page */
export const defaultDemoSettings = {
  platformName: "HunarCo",
  categories: [
    { id: "fashion", label: "Fashion", visible: true },
    { id: "art", label: "Art", visible: true },
    { id: "crafts", label: "Crafts", visible: true },
  ],
  defaultInterestTarget: 40,
  campaignLengthDays: 60,
  closingSoonDays: 14,
};

export type DemoSettings = typeof defaultDemoSettings;
