import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, "image-manifest.json"), "utf8"),
);
const staticRoot = path.join(root, "static_resources", "images");

const forceAll = process.argv.includes("--force");
const forcePrefixes = process.argv
  .filter((arg) => arg.startsWith("--only="))
  .flatMap((arg) => arg.slice(7).split(",").filter(Boolean));

function shouldForce(file) {
  if (forcePrefixes.length > 0) {
    return forcePrefixes.some((prefix) => file.startsWith(prefix) || file === prefix);
  }
  return forceAll;
}

async function download(url, dest, file, fallback, theme) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const relative = path.relative(root, dest);

  if (fs.existsSync(dest) && !shouldForce(file)) {
    console.log(`skip (exists): ${relative}`);
    return;
  }

  if (theme) console.log(`→ ${relative} (${theme})`);

  const response = await fetch(url);
  if (!response.ok) {
    console.warn(`failed (${response.status}): ${url}`);
    if (fallback) {
      const fallbackPath = path.join(staticRoot, fallback);
      if (fs.existsSync(fallbackPath)) {
        fs.copyFileSync(fallbackPath, dest);
        console.log(`fallback copy: ${relative} ← ${fallback}`);
      }
    }
    return;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`saved: ${relative}`);
}

for (const item of manifest) {
  await download(
    item.url,
    path.join(staticRoot, item.file),
    item.file,
    item.fallback,
    item.theme,
  );
}

console.log("Done.");
