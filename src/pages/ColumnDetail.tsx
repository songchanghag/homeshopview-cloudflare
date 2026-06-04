import { useParams, Link } from "wouter";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { columns } from "@/data/columns";
import { siteConfig } from "@/data/siteConfig";
import NotFound from "./not-found";

export default function ColumnDetail() {
  const { slug } = useParams<{ slug: string }>();
  const column = columns.find((c) => c.slug === slug);

  if (!column || column.status !== "published") return <NotFound />;

  return (
    <Layout>
      <SeoHead
        title={column.title}
        description={column.summary}
        path={`/columns/${column.slug}`}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <BreadcrumbNav
          items={[
            { label: "칼럼", href: "/columns" },
            { label: column.title },
          ]}
        />
        <article className="mt-6">
          <span className="inline-block text-xs font-medium text-secondary bg-secondary/15 px-2 py-0.5 rounded-full mb-4">
            칼럼
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
            {column.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">{column.summary}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4 mb-8">
            <span className="flex items-center gap-1">
              <User size={14} />
              <Link href="/author" className="hover:text-primary transition-colors">{column.author}</Link>
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {column.publishedAt}
            </span>
          </div>

          <div
            className="prose-article text-foreground"
            dangerouslySetInnerHTML={{ __html: column.content }}
          />

          <div className="mt-10 bg-muted/50 rounded-xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {column.author.charAt(0)}
              </div>
              <div>
                <Link href="/author" className="font-semibold text-foreground hover:text-primary transition-colors text-sm">
                  {column.author}
                </Link>
                <p className="text-xs text-muted-foreground">{siteConfig.ownerBio}</p>
              </div>
            </div>
            <Link href="/author" className="text-xs text-primary hover:underline">
              다른 칼럼 보기 →
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/columns"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              칼럼 목록으로
            </Link>
          </div>
        </article>
      </div>
    </Layout>
  );
}
