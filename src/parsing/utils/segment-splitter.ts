export function splitDescriptionSegments(description: string): string[] {
  return description
    .split(/\s+y\s+|;\s*|,\s+(?!\d)/i)
    .map((segment) => segment.trim())
    .filter(Boolean);
}
