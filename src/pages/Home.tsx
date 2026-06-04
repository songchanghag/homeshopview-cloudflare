import { Link } from "wouter";
import { ArrowRight, BookOpen, CheckCircle, Mail, Pen } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import PostCard from "@/components/PostCard";
import { siteConfig } from "@/data/siteConfig";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import { columns } from "@/data/columns";

const categoryIcons: Record<string, string> = {
  "ipjeom-jeonbeob": "📋",
  "sincheon-jeolcha": "📝",
  "sang-pum-jeonryak": "💡",
  "bang-song-jun-bi": "📡",
  "ipjeom-ihu": "📊",
};

export default function Home() {
  const featuredPosts = posts.filter((p) => p.featured && p.status === "published");
  const latestPosts = [...posts]
    .filter((p) => p.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 6);
  const latestColumns = columns.filter((c) => c.status === "published").slice(0, 2);

  return (
    <Layout>
      <SeoHead
        title="공영홈쇼핑 입점 가이드"
        description={siteConfig.description}
        path="/"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
              중소기업·소상공인을 위한 정보 안내
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              공영홈쇼핑 입점,<br />
              <span className="text-primary">처음이라면 여기서 시작하세요</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {siteConfig.tagline}. 입점 전 준비사항부터 방송 이후 관리까지, 단계별로 정직하게 안내합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                data-testid="button-hero-categories"
              >
                카테고리 둘러보기
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/posts/ipjeom-joseon-checklist"
                className="inline-flex items-center gap-2 bg-muted text-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-muted/80 transition-colors"
              >
                입점 체크리스트 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">대표 카테고리</h2>
          <Link href="/categories" className="text-sm text-primary hover:underline flex items-center gap-1">
            전체 보기 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="bg-card border border-card-border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group"
              data-testid={`card-category-${cat.slug}`}
            >
              <div className="text-2xl mb-3">{categoryIcons[cat.slug] || "📌"}</div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">추천 글</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPosts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">최신 글</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Editorial Principles */}
      <section className="bg-primary/5 border-y border-primary/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen size={32} className="text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-3">이 사이트의 편집 원칙</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              공영홈쇼핑 입점 가이드는 중소기업·소상공인이 실제로 활용할 수 있는 정보만을 담습니다. 과장된 표현, 허위 사례, 의미 없는 키워드 반복을 배제하고, 검증 가능한 범위 내에서 정직하게 서술합니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                { icon: CheckCircle, title: "정직한 정보", desc: "확인되지 않은 내용은 일반론 수준으로 서술합니다" },
                { icon: CheckCircle, title: "초보자 중심", desc: "전문 용어는 쉽게 풀어서 설명합니다" },
                { icon: CheckCircle, title: "지속적 보완", desc: "콘텐츠는 순차적으로 업데이트됩니다" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 bg-background rounded-lg p-4 border border-border">
                  <item.icon size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author Box */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-card border border-card-border rounded-xl p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Pen size={20} className="text-primary" />
          </div>
          <h3 className="font-bold text-foreground mb-1">
            <Link href="/author" className="hover:text-primary transition-colors">
              {siteConfig.owner}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{siteConfig.ownerBio}</p>
          <Link
            href="/author"
            className="inline-flex items-center gap-2 text-sm text-primary border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors"
          >
            칼럼 및 운영자 소개 보기 <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Columns Preview */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">운영자 칼럼</h2>
            <Link href="/columns" className="text-sm text-primary hover:underline flex items-center gap-1">
              전체 보기 <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestColumns.map((col) => (
              <Link
                key={col.id}
                href={`/columns/${col.slug}`}
                className="bg-card border border-card-border rounded-xl p-5 hover:shadow-md transition-shadow group"
                data-testid={`card-column-${col.id}`}
              >
                <span className="text-xs font-medium text-secondary bg-secondary/15 px-2 py-0.5 rounded-full">칼럼</span>
                <h3 className="font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {col.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{col.summary}</p>
                <p className="text-xs text-muted-foreground mt-3">{col.publishedAt} · {col.author}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center">
          <Mail size={32} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-xl font-bold mb-2">궁금한 점이 있으신가요?</h2>
          <p className="opacity-80 mb-6 text-sm">이메일로 문의해 주시면 확인 후 안내해 드리겠습니다.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
            data-testid="button-contact-cta"
          >
            문의하기 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
