import { NextResponse } from "next/server";
import { countIndexedChunks } from "@/lib/chat-retrieval";
import { countActiveDocuments } from "@/lib/chat-service";

export async function GET() {
  try {
    const [chunkCount, documentCount] = await Promise.all([
      countIndexedChunks(),
      countActiveDocuments(),
    ]);

    return NextResponse.json({
      ok: chunkCount > 0,
      chunkCount,
      documentCount,
      ready: chunkCount > 0,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message, ready: false }, { status: 503 });
  }
}
