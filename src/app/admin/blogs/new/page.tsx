import { BlogEditor } from "@/components/admin/BlogEditor";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">New blog post</h1>
      <BlogEditor />
    </div>
  );
}
