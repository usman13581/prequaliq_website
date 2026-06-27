"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Send, Save, ImagePlus, X, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { slugify } from "@/lib/blog";

export type BlogImageItem = {
  id: string;
  url: string;
  fileName: string;
};

type BlogEditorProps = {
  initial?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: "draft" | "published";
    coverImageId: string | null;
    images: BlogImageItem[];
  };
  onSaved?: () => void;
};

export function BlogEditor({ initial, onSaved }: BlogEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "<p></p>");
  const [status, setStatus] = useState<"draft" | "published">(initial?.status ?? "draft");
  const [images, setImages] = useState<BlogImageItem[]>(initial?.images ?? []);
  const [coverImageId, setCoverImageId] = useState<string | null>(initial?.coverImageId ?? null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        if (initial?.id) formData.append("postId", initial.id);

        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = (await res.json()) as BlogImageItem & { error?: string };
        if (!res.ok) throw new Error(data.error ?? "Upload failed");

        setImages((prev) => [...prev, { id: data.id, url: data.url, fileName: data.fileName }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function insertImageIntoContent(url: string, alt: string) {
    setContent((prev) => `${prev}<figure><img src="${url}" alt="${alt}" /><figcaption>${alt}</figcaption></figure>`);
  }

  async function save(nextStatus?: "draft" | "published") {
    setSaving(true);
    setError(null);
    const publishStatus = nextStatus ?? status;

    const payload = {
      title,
      slug: slug || slugify(title),
      excerpt,
      content,
      status: publishStatus,
      coverImageId,
      imageIds: images.map((img) => img.id),
    };

    try {
      const url = initial?.id ? `/api/admin/blogs/${initial.id}` : "/api/admin/blogs";
      const method = initial?.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { post?: { id: string }; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      setStatus(publishStatus);
      if (data.post?.id && !initial?.id) {
        window.location.href = `/admin/blogs/${data.post.id}/edit`;
        return;
      }
      onSaved?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!initial?.id && !slug) setSlug(slugify(e.target.value));
            }}
            placeholder="Blog post title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">URL slug</label>
          <input
            className={inputClass}
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            placeholder="my-blog-post"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Short excerpt</label>
        <textarea
          className={`${inputClass} resize-y min-h-[80px]`}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary for the blog listing…"
          rows={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Content</label>
          <span className="text-xs text-muted">Format text with the toolbar</span>
        </div>
        <RichTextEditor
          value={content}
          onChange={setContent}
          disabled={saving}
          onInsertImage={() => fileRef.current?.click()}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium">Images</label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading || saving}
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus className="w-4 h-4" />
            {uploading ? "Uploading…" : "Add images"}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={(e) => uploadFiles(e.target.files)}
          />
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative group rounded-xl border border-border overflow-hidden bg-surface">
                <div className="relative aspect-[4/3]">
                  <Image src={img.url} alt={img.fileName} fill className="object-cover" unoptimized />
                </div>
                <div className="p-2 flex gap-1">
                  <button
                    type="button"
                    title="Set as cover"
                    className={`flex-1 text-xs py-1 rounded ${coverImageId === img.id ? "bg-accent text-white" : "bg-surface border border-border"}`}
                    onClick={() => setCoverImageId(img.id)}
                  >
                    <Star className="w-3 h-3 inline mr-1" />
                    Cover
                  </button>
                  <button
                    type="button"
                    title="Insert in content"
                    className="flex-1 text-xs py-1 rounded bg-surface border border-border"
                    onClick={() => insertImageIntoContent(img.url, img.fileName)}
                  >
                    Insert
                  </button>
                  <button
                    type="button"
                    className="h-7 w-7 flex items-center justify-center rounded border border-border text-muted hover:text-red-600"
                    onClick={() => {
                      setImages((prev) => prev.filter((i) => i.id !== img.id));
                      if (coverImageId === img.id) setCoverImageId(null);
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted rounded-xl border border-dashed border-border p-6 text-center">
            Upload one or more images for this post. Mark one as cover or insert into the article.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
        <Button type="button" variant="outline" disabled={saving} onClick={() => save("draft")}>
          <Save className="w-4 h-4" />
          Save draft
        </Button>
        <Button type="button" disabled={saving} onClick={() => save("published")}>
          <Send className="w-4 h-4" />
          {saving ? "Saving…" : "Publish"}
        </Button>
      </div>
    </div>
  );
}
