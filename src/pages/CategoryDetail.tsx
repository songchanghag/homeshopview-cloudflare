import { useParams } from "wouter";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PostCard from "@/components/PostCard";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import NotFound from "./not-found";

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return <NotFound />;

  const categoryPosts = posts.filter(
    (p) => p.categorySlug === slug && p.status === "published"
  );

  return (
    <Layout>
      <SeoHead
        title={`${category.name} | 카테고리`}
        description={category.description}
        path={`/categories/${slug}`}
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          items={[
            { label: "카테고리", href: "/categories" },
            { label: category.name },
          ]}
        />
        <div className="mt-4 mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>

        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>아직 등록된 글이 없습니다.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
