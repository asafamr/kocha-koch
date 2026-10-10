// Google Analytics 4 measurement id; empty (or malformed) keeps the page free of Google requests.
const id = process.env.GA_MEASUREMENT_ID ?? "";
export const GA_ID = /^G-[A-Z0-9]{4,20}$/.test(id) ? id : "";
