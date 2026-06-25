import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, "image-manifest.json"), "utf8"),
);
const staticRoot = path.join(root, "static_resources", "images");

async function download(url, dest, fallback) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) {
    console.log(`skip (exists): ${path.relative(root, dest)}`);
    return;
  }
  const response = await fetch(url);
  if (!response.ok) {
    console.warn(`failed (${response.status}): ${url}`);
    if (fallback) {
      const fallbackPath = path.join(staticRoot, fallback);
      if (fs.existsSync(fallbackPath)) {
        fs.copyFileSync(fallbackPath, dest);
        console.log(`fallback copy: ${path.relative(root, dest)} ← ${fallback}`);
      }
    }
    return;
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`saved: ${path.relative(root, dest)}`);
}

for (const item of manifest) {
  await download(item.url, path.join(staticRoot, item.file), item.fallback);
}

console.log("Done.");
