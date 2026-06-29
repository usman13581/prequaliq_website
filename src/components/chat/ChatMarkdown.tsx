import { Fragment, type ReactNode } from "react";

/** Parse inline markdown: **bold**, *italic*, `code`, [text](url). */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyPrefix}-${i++}`;
    if (match[2] !== undefined) {
      nodes.push(<strong key={key} className="font-semibold">{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<em key={key}>{match[3]}</em>);
    } else if (match[4] !== undefined) {
      nodes.push(
        <code key={key} className="rounded bg-foreground/10 px-1 py-0.5 text-[0.85em] font-mono">
          {match[4]}
        </code>,
      );
    } else if (match[5] !== undefined && match[6] !== undefined) {
      nodes.push(
        <a
          key={key}
          href={match[6]}
          className="font-medium text-accent underline underline-offset-2"
          target={match[6].startsWith("http") ? "_blank" : undefined}
          rel={match[6].startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {match[5]}
        </a>,
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

type Block =
  | { type: "p"; lines: string[] }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "h"; level: number; text: string };

function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let current: Block | null = null;

  const flush = () => {
    if (current) blocks.push(current);
    current = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed === "") {
      flush();
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flush();
      blocks.push({ type: "h", level: heading[1].length, text: heading[2] });
      continue;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(trimmed);
    if (bullet) {
      if (current?.type !== "ul") {
        flush();
        current = { type: "ul", items: [] };
      }
      current.items.push(bullet[1]);
      continue;
    }

    const ordered = /^\d+[.)]\s+(.*)$/.exec(trimmed);
    if (ordered) {
      if (current?.type !== "ol") {
        flush();
        current = { type: "ol", items: [] };
      }
      current.items.push(ordered[1]);
      continue;
    }

    if (current?.type !== "p") {
      flush();
      current = { type: "p", lines: [] };
    }
    current.lines.push(trimmed);
  }
  flush();
  return blocks;
}

export function ChatMarkdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-2">
      {blocks.map((block, idx) => {
        if (block.type === "h") {
          return (
            <p key={idx} className="text-sm font-semibold text-foreground">
              {renderInline(block.text, `h-${idx}`)}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={idx} className="ml-1 space-y-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2">
                  <span className="mt-[0.45rem] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  <span>{renderInline(item, `ul-${idx}-${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={idx} className="ml-1 space-y-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2">
                  <span className="font-semibold text-accent">{j + 1}.</span>
                  <span>{renderInline(item, `ol-${idx}-${j}`)}</span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={idx} className="leading-relaxed">
            {block.lines.map((line, j) => (
              <Fragment key={j}>
                {renderInline(line, `p-${idx}-${j}`)}
                {j < block.lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
