// Formatting helpers so prices and dates look the same everywhere.

const pkr = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

/** 12500 -> "Rs 12,500" */
export function formatPrice(amountPkr: number) {
  return pkr.format(amountPkr);
}

const longDate = new Intl.DateTimeFormat("en-PK", {
  day: "numeric",
  month: "long",
  year: "numeric",
  // Fixed time zone so the server and browser always show the same date
  timeZone: "UTC",
});

/** "2027-03-15" -> "15 March 2027" */
export function formatDate(isoDate: string) {
  return longDate.format(new Date(`${isoDate}T00:00:00Z`));
}

/** Percentage of the interest target reached, capped at 100. */
export function progressPercent(current: number, target: number) {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}
