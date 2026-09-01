import { NextResponse } from "next/server";
import { getMarbleApiUrl, type MarbleCountry } from "@/lib/marble-api";

const REQUEST_TIMEOUT_MS = 8_000;

export async function GET() {
  const marbleApiUrl = getMarbleApiUrl();
  if (!marbleApiUrl) {
    return NextResponse.json({ countries: [] }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${marbleApiUrl}/public/countries`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({ countries: [] }, { status: 502, headers: { "Cache-Control": "no-store" } });
    }

    const data = (await response.json()) as { countries?: MarbleCountry[] };
    const countries = Array.isArray(data.countries)
      ? data.countries.filter(
          (row) =>
            typeof row.code === "string" &&
            typeof row.name === "string" &&
            typeof row.currency === "string",
        )
      : [];

    return NextResponse.json(
      { countries },
      { headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json({ countries: [] }, { status: 502, headers: { "Cache-Control": "no-store" } });
  } finally {
    clearTimeout(timeout);
  }
}
