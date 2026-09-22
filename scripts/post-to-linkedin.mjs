/**
 * Publish a blog post to the PrequaliQ LinkedIn Page as an article post:
 * short commentary above a link card pointing at the website.
 *
 * Usage:
 *   node scripts/post-to-linkedin.mjs --check
 *   node scripts/post-to-linkedin.mjs <slug> --dry-run
 *   node scripts/post-to-linkedin.mjs <slug> --test
 *   node scripts/post-to-linkedin.mjs <slug>
 *   node scripts/post-to-linkedin.mjs --delete urn:li:share:123
 *
 * Environment:
 *   LINKEDIN_ACCESS_TOKEN  OAuth token with w_organization_social (page admin)
 *   LINKEDIN_ORG_ID        numeric organization id; discoverable via --check
 *   LINKEDIN_API_VERSION   optional, defaults to 202609
 *   LINKEDIN_API_BASE      optional, defaults to the live API; override to test against a stub
 *   SITE_BASE_URL          optional, defaults to https://prequaliq.com
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { coverImageFileName } from "./blog-cover-images.mjs";
import { commentaryForSlug } from "./linkedin-commentary.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const coversDir = path.join(projectRoot, "static_resources", "images", "blog", "covers");

const TAG = "linkedin";
const YEARS = ["2022", "2023", "2024", "2025", "2026"];

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(projectRoot, ".env"));
loadEnvFile(path.join(projectRoot, ".env.local"));

const apiVersion = process.env.LINKEDIN_API_VERSION || "202609";
const API = (process.env.LINKEDIN_API_BASE || "https://api.linkedin.com/rest").replace(/\/$/, "");
const siteBaseUrl = (process.env.SITE_BASE_URL || "https://prequaliq.com").replace(/\/$/, "");

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Linkedin-Version": apiVersion,
    "X-Restli-Protocol-Version": "2.0.0",
  };
}

/** LinkedIn returns errors as JSON or HTML depending on the failure; surface whatever arrived. */
async function describeFailure(response) {
  let body = "";
  try {
    body = await response.text();
  } catch {
    body = "<unreadable body>";
  }
  const requestId = response.headers.get("x-li-uuid") ?? "n/a";
  return `HTTP ${response.status} ${response.statusText} (x-li-uuid: ${requestId})\n${body.slice(0, 800)}`;
}

function requireToken() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) {
    console.error(
      `[${TAG}] LINKEDIN_ACCESS_TOKEN is not set.\n` +
        `        Add it as a secret, then re-run. The token needs the w_organization_social\n` +
        `        scope and must belong to an admin of the LinkedIn Page.`
    );
    process.exit(1);
  }
  return token;
}

async function loadPostBySlug(slug) {
  for (const year of YEARS) {
    const mod = await import(`./blog-posts-${year}.mjs`);
    const found = (mod.blogPosts ?? []).find((p) => p.slug === slug);
    if (found) return found;
  }
  return null;
}

/** Strip HTML so an excerpt-derived description is safe to send as a card description. */
function toPlainText(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Confirm the token works and list the Pages it can post to. Run this before
 * attempting a post — a wrong page role surfaces here rather than as an
 * opaque 403 on the create call.
 */
async function checkAccess(token) {
  const url = `${API}/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&state=APPROVED`;
  const response = await fetch(url, { headers: authHeaders(token) });

  if (!response.ok) {
    console.error(`[${TAG}] access check failed:\n${await describeFailure(response)}`);
    process.exit(1);
  }

  const payload = await response.json();
  const elements = payload.elements ?? [];

  if (elements.length === 0) {
    console.warn(
      `[${TAG}] token is valid but administers no Pages. Confirm the authorising\n` +
        `        member has an ADMINISTRATOR role on the PrequaliQ Page.`
    );
    return;
  }

  console.log(`[${TAG}] token valid — administered organizations:`);
  for (const element of elements) {
    const urn = element.organization ?? "unknown";
    console.log(`  ${urn}   (LINKEDIN_ORG_ID=${String(urn).split(":").pop()})`);
  }
}

/** Register the upload, PUT the bytes, and return the image URN for use as a thumbnail. */
async function uploadThumbnail(token, orgUrn, imagePath) {
  const initResponse = await fetch(`${API}/images?action=initializeUpload`, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ initializeUploadRequest: { owner: orgUrn } }),
  });

  if (!initResponse.ok) {
    throw new Error(`thumbnail initializeUpload failed:\n${await describeFailure(initResponse)}`);
  }

  const { value } = await initResponse.json();
  const { uploadUrl, image: imageUrn } = value;

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: fs.readFileSync(imagePath),
  });

  if (!uploadResponse.ok) {
    throw new Error(`thumbnail upload failed:\n${await describeFailure(uploadResponse)}`);
  }

  console.log(`[${TAG}] uploaded thumbnail ${path.basename(imagePath)} → ${imageUrn}`);
  return imageUrn;
}

function buildPayload({ orgUrn, commentary, post, thumbnailUrn }) {
  return {
    author: orgUrn,
    commentary,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    content: {
      article: {
        source: `${siteBaseUrl}/blog/${post.slug}`,
        title: post.title,
        description: toPlainText(post.excerpt ?? ""),
        ...(thumbnailUrn ? { thumbnail: thumbnailUrn } : {}),
      },
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };
}

async function createPost(token, payload) {
  const response = await fetch(`${API}/posts`, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`post creation failed:\n${await describeFailure(response)}`);
  }

  return response.headers.get("x-restli-id");
}

async function deletePost(token, postUrn) {
  const response = await fetch(`${API}/posts/${encodeURIComponent(postUrn)}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`delete failed for ${postUrn}:\n${await describeFailure(response)}`);
  }

  console.log(`[${TAG}] deleted ${postUrn}`);
}

async function main() {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((a) => a.startsWith("--")));
  const positional = args.filter((a) => !a.startsWith("--"));

  if (flags.has("--check")) {
    await checkAccess(requireToken());
    return;
  }

  if (flags.has("--delete")) {
    const target = positional[0];
    if (!target) {
      console.error(`[${TAG}] --delete requires a post URN, e.g. urn:li:share:123`);
      process.exit(1);
    }
    await deletePost(requireToken(), target);
    return;
  }

  const slug = positional[0];
  if (!slug) {
    console.error(`[${TAG}] Usage: node scripts/post-to-linkedin.mjs <slug> [--dry-run|--test]`);
    process.exit(1);
  }

  const post = await loadPostBySlug(slug);
  if (!post) {
    console.error(`[${TAG}] no blog post found with slug "${slug}"`);
    process.exit(1);
  }

  const commentaryFlagIndex = args.indexOf("--commentary");
  const commentary =
    commentaryFlagIndex !== -1 ? args[commentaryFlagIndex + 1] : commentaryForSlug(slug);

  if (!commentary) {
    console.error(
      `[${TAG}] no commentary for "${slug}". Add it to scripts/linkedin-commentary.mjs\n` +
        `        or pass --commentary "your lines".`
    );
    process.exit(1);
  }

  const dryRun = flags.has("--dry-run");
  const isTest = flags.has("--test");

  // Dry run resolves everything locally so the payload can be reviewed without credentials.
  if (dryRun) {
    const orgUrn = `urn:li:organization:${process.env.LINKEDIN_ORG_ID ?? "{LINKEDIN_ORG_ID}"}`;
    const imageFile = coverImageFileName(slug);
    const imagePath = path.join(coversDir, imageFile);
    const payload = buildPayload({
      orgUrn,
      commentary,
      post,
      thumbnailUrn: "urn:li:image:{UPLOADED_AT_RUNTIME}",
    });

    console.log(`[${TAG}] dry run — no requests sent`);
    console.log(`[${TAG}] api version: ${apiVersion}`);
    console.log(
      `[${TAG}] thumbnail: ${path.relative(projectRoot, imagePath)}` +
        `${fs.existsSync(imagePath) ? "" : "  (MISSING)"}`
    );
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const token = requireToken();
  const orgId = process.env.LINKEDIN_ORG_ID;
  if (!orgId) {
    console.error(`[${TAG}] LINKEDIN_ORG_ID is not set. Run --check to discover it.`);
    process.exit(1);
  }
  const orgUrn = `urn:li:organization:${orgId}`;

  const imagePath = path.join(coversDir, coverImageFileName(slug));
  let thumbnailUrn = null;
  if (fs.existsSync(imagePath)) {
    thumbnailUrn = await uploadThumbnail(token, orgUrn, imagePath);
  } else {
    console.warn(`[${TAG}] no cover at ${path.relative(projectRoot, imagePath)} — posting without a thumbnail`);
  }

  const payload = buildPayload({ orgUrn, commentary, post, thumbnailUrn });
  const postUrn = await createPost(token, payload);

  console.log(`[${TAG}] published ${postUrn}`);
  console.log(`[${TAG}] view: https://www.linkedin.com/feed/update/${postUrn}`);

  // The API only accepts lifecycleState PUBLISHED on creation, so there is no
  // draft to inspect. --test therefore publishes and immediately removes the
  // post, which verifies the full path with minimal feed exposure.
  if (isTest) {
    console.log(`[${TAG}] --test: removing the post again`);
    await deletePost(token, postUrn);
    console.log(`[${TAG}] test complete — create and delete both succeeded`);
  }
}

main().catch((error) => {
  console.error(`[${TAG}] failed: ${error.message}`);
  process.exit(1);
});
