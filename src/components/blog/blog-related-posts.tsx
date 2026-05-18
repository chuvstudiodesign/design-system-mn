import type { BlogPost } from "@/data/blog";
import { BlogPostCard } from "./blog-post-card";

export function BlogRelatedPosts({
  posts,
  basePath,
}: {
  posts: BlogPost[];
  basePath?: string;
}) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="ds-grid-3">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} basePath={basePath} />
      ))}
    </div>
  );
}
