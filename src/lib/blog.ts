const ALLOWED_TAGS =
  /<\/?(?:p|br|h2|h3|h4|strong|em|b|i|u|ul|ol|li|a|blockquote|figure|figcaption|img|div|span)\b[^>]*>/gi;

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

export function sanitizeBlogHtml(html: string): string {
  let cleaned = html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");

  cleaned = cleaned.replace(/<img\b([^>]*?)>/gi, (_match, attrs: string) => {
    const src = attrs.match(/\ssrc="([^"]*)"/i)?.[1] ?? attrs.match(/\ssrc='([^']*)'/i)?.[1];
    const alt = attrs.match(/\salt="([^"]*)"/i)?.[1] ?? "";
    if (!src || !src.startsWith("/api/blog/media/")) return "";
    return `<img src="${src}" alt="${alt.replace(/"/g, "")}" loading="lazy" class="rounded-xl max-w-full h-auto" />`;
  });

  cleaned = cleaned.replace(/<a\b([^>]*?)>/gi, (_match, attrs: string) => {
    const href = attrs.match(/\shref="([^"]*)"/i)?.[1];
    if (!href || (!href.startsWith("http://") && !href.startsWith("https://") && !href.startsWith("/"))) {
      return "<span>";
    }
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">`;
  });

  return cleaned.replace(ALLOWED_TAGS, (tag) => tag).replace(/<(?!\/?(?:p|br|h2|h3|h4|strong|em|b|i|u|ul|ol|li|a|blockquote|figure|figcaption|img|div|span)\b)[^>]+>/gi, "");
}

export function excerptFromHtml(html: string, maxLength = 200): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

export function blogMediaUrl(imageId: string): string {
  return `/api/blog/media/${imageId}`;
}

/** Avoid showing the same image twice when cover is rendered above the article body. */
export function prepareBlogContentForDisplay(html: string, hasCover: boolean): string {
  if (!hasCover) return html;
  return html.replace(/^\s*<figure>[\s\S]*?<\/figure>\s*/i, "").trim();
}
