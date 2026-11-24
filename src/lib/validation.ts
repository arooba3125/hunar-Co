// Small checks shared by the site's forms.

// Something@something.something with no spaces. Not perfect, but enough to
// catch typing mistakes; real verification happens by actually emailing.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

/** True for a full web address starting with http:// or https:// */
export function isValidWebUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}
