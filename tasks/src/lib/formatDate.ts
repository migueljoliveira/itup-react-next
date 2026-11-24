/**
 * Formats a Date into a human-readable string (e.g. "Nov 17, 2026").
 * Pure function with no React dependencies.
 */
export function formatDate(date: Date): string {
 return date.toLocaleDateString('en-US',  {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
