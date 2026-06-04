import { Link } from "wouter";
import { Calendar, User } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { columns } from "@/data/columns";

export default function Columns() {
  const published = columns.filter((c) => c.status === "published");

  return (
    <Layout>
      <SeoHead
        title="운영자 칼럼"
        description="공영홈쇼핑 입점 관련 운영자의 관점과 경험을 담은 칼럼 모음입니다."
        path="/columns"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "칼럼" }]} />
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-2">운영자 칼럼</h1>
        <p className="text-muted-foreground mb-8">
          공영홈쇼핑 입점을 준비하면서 직접 정리한 관점과 실용적인 조언을 담았습니다.
        </p>
        <div className="space-y-6">
          {published.map((col) => (
            <article
              key={col.id}
              className="bg-card border border-card-border rounded-xl p-6 hover:shadow-md transition-shadow group"
              data-testid={`card-column-${col.id}`}
            >
              <span className="text-xs font-medium text-secondary bg-secondary/15 px-2 py-0.5 rounded-full">
                칼럼
              </span>
              <h2 className="font-bold text-foreground text-lg mt-3 mb-2 group-hover:text-primary transition-colors leading-snug">
                <Link href={`/columns/${col.slug}`}>{col.title}</Link>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{col.summary}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User size={12} />{col.author}</span>
                <span className="flex items-center gap-1"><Calendar size={12} />{col.publishedAt}</span>
              </div>
              <Link
                href={`/columns/${col.slug}`}
                className="inline-block mt-4 text-sm text-primary hover:underline"
              >
                계속 읽기 →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
