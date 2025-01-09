export function createSlugFromText(text: string): string {
  const slug = text
    .normalize("NFKD")
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/_/g, "-")
    .replace(/--+/g, "-")
    .replace(/-$/g, "");

  return slug;
}
