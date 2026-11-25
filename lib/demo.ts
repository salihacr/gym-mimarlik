// Demo projects show in development, or in any build with SHOW_DEMO=true
// (e.g. a preview deployment). Demo builds are never indexed (see lib/site.ts).
export const demoMode =
  process.env.SHOW_DEMO === "true" ||
  (process.env.NODE_ENV === "development" && process.env.SHOW_DEMO !== "false");
