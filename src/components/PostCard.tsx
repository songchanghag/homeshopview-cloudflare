import { Link } from "wouter";
import { Calendar, User } from "lucide-react";
import { PostType } from "@/data/posts";
import { categories } from "@/data/categories";

interface PostCardProps {
  post: PostType;
}

export default function PostCard({ post }: PostCardProps) {
  const category = categories.find((c) => c.slug === post.categorySlug);

  return (
    <article
      className="bg-card border border-card-border rounded-xl p-5 hover:shadow-md transition-shadow group"
      data-testid={`card-post-${post.id}`}
    >
      <div className="flex items-center gap-2 mb-3">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full hover:bg-primary/20 transition-colors"
          >
            {category.name}
          </Link>
        )}
        {post.featured && (
          <span className="text-xs font-medium text-secondary bg-secondary/15 px-2 py-0.5 rounded-full">
            추천
          </span>
        )}
      </div>

      <h3 className="font-semibold text-foreground text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
        {post.summary}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <User size={12} />
          {post.author}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {post.publishedAt}
        </span>
      </div>
    </article>
  );
}
