export type MarbleCountry = {
  code: string;
  name: string;
  currency: string;
};

export function getMarbleApiUrl(): string | null {
  const url = process.env.MARBLE_API_URL?.trim().replace(/\/+$/, "");
  return url || null;
}
