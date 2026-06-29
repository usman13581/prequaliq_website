export type TextChunk = {
  content: string;
  metadata: Record<string, unknown>;
  tokenCount: number;
};

const TARGET_CHARS = 1800;
const OVERLAP_CHARS = 200;

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Split document body into overlapping chunks for embedding. */
export function chunkDocumentText(
  body: string,
  baseMetadata: Record<string, unknown> = {},
): TextChunk[] {
  const paragraphs = splitParagraphs(body);
  if (paragraphs.length === 0) return [];

  const chunks: TextChunk[] = [];
  let buffer = "";
  let chunkIndex = 0;

  function flush() {
    const content = buffer.trim();
    if (!content) return;
    chunks.push({
      content,
      metadata: { ...baseMetadata, chunkIndex },
      tokenCount: estimateTokens(content),
    });
    chunkIndex += 1;
    const overlap = content.slice(-OVERLAP_CHARS);
    buffer = overlap ? `${overlap}\n\n` : "";
  }

  for (const paragraph of paragraphs) {
    if ((buffer + paragraph).length > TARGET_CHARS && buffer.length > 0) {
      flush();
    }
    buffer = buffer ? `${buffer}\n\n${paragraph}` : paragraph;
  }

  if (buffer.trim()) flush();

  if (chunks.length === 0 && body.trim()) {
    chunks.push({
      content: body.trim(),
      metadata: { ...baseMetadata, chunkIndex: 0 },
      tokenCount: estimateTokens(body),
    });
  }

  return chunks;
}
