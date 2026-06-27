"use client";

import { useEffect, useState } from "react";

type HeroRotatingWordsProps = {
  words: readonly string[];
  intervalMs?: number;
};

export function HeroRotatingWords({ words, intervalMs = 2800 }: HeroRotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [words, intervalMs]);

  if (words.length === 0) return null;

  return (
    <span className="relative inline-block min-h-[1.15em] overflow-hidden align-bottom">
      {words.map((word, i) => (
        <span
          key={word}
          className={`absolute left-0 top-0 w-full text-gradient transition-all duration-500 ${
            i === index
              ? "opacity-100 translate-y-0"
              : i === (index - 1 + words.length) % words.length
                ? "opacity-0 -translate-y-full"
                : "opacity-0 translate-y-full"
          }`}
          aria-hidden={i !== index}
        >
          {word}
        </span>
      ))}
      <span className="invisible">{words[index]}</span>
    </span>
  );
}
