import { useParams, Link } from "wouter";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";
import { categories } from "@/data/categories";
import { siteConfig } from "@/data/siteConfig";
import NotFound from "./not-found";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post || post.status !== "published") return <NotFound />;

  const category = categories.find((c) => c.slug === post.categorySlug);
  const relatedPosts = posts.filter(
    (p) => post.relatedPostSlugs.includes(p.slug) && p.status === "published"
  );

  const faqSchema = post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <Layout>
      <SeoHead
        title={post.title}
        description={post.summary}
        path={`/posts/${post.slug}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.summary,
            author: { "@type": "Person", name: post.author },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 py-8">
        <BreadcrumbNav
          items={[
            { label: "카테고리", href: "/categories" },
            ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
            { label: post.title },
          ]}
        />

        <article className="mt-6">
          <header className="mb-8">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3 hover:bg-primary/20 transition-colors"
              >
                {category.name}
              </Link>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">{post.summary}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
              <span className="flex items-center gap-1">
                <User size={14} />
                <Link href="/author" className="hover:text-primary transition-colors">{post.author}</Link>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                발행: {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                수정: {post.updatedAt}
              </span>
            </div>
          </header>

          {post.toc.length > 0 && (
            <nav className="bg-muted rounded-xl p-5 mb-8" aria-label="목차">
              <p className="font-semibold text-foreground text-sm mb-3">목차</p>
              <ol className="space-y-2">
                {post.toc.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-primary hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollTo(item.id);
                      }}
                    >
                      {idx + 1}. {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className="prose-article text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.faq.length > 0 && (
            <section className="mt-10" aria-label="자주 묻는 질문">
              <h2 className="text-lg font-bold text-foreground mb-4">자주 묻는 질문</h2>
              <div className="space-y-4">
                {post.faq.map((item, idx) => (
                  <div key={idx} className="bg-card border border-card-border rounded-xl p-5">
                    <p className="font-semibold text-foreground text-sm mb-2">Q. {item.question}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">A. {item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 bg-muted/50 rounded-xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <Link href="/author" className="font-semibold text-foreground hover:text-primary transition-colors text-sm">
                  {post.author}
                </Link>
                <p className="text-xs text-muted-foreground">{siteConfig.ownerBio}</p>
              </div>
            </div>
            <Link href="/author" className="text-xs text-primary hover:underline">
              작성한 칼럼 보기 →
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              카테고리 목록으로
            </Link>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">관련 글</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <PostCard key={rp.id} post={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
