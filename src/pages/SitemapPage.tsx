import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import { columns } from "@/data/columns";

export default function SitemapPage() {
  const publishedPosts = posts.filter((p) => p.status === "published");
  const publishedColumns = columns.filter((c) => c.status === "published");

  const sections = [
    {
      title: "주요 페이지",
      links: [
        { href: "/", label: "홈" },
        { href: "/about", label: "사이트 소개" },
        { href: "/author", label: "운영자 소개" },
        { href: "/contact", label: "문의하기" },
      ],
    },
    {
      title: "카테고리",
      links: [
        { href: "/categories", label: "카테고리 목록" },
        ...categories.map((c) => ({ href: `/categories/${c.slug}`, label: c.name })),
      ],
    },
    {
      title: "칼럼",
      links: [
        { href: "/columns", label: "칼럼 목록" },
        ...publishedColumns.map((c) => ({ href: `/columns/${c.slug}`, label: c.title })),
      ],
    },
    {
      title: "정책",
      links: [
        { href: "/privacy", label: "개인정보처리방침" },
        { href: "/terms", label: "이용약관" },
        { href: "/disclaimer", label: "면책고지" },
      ],
    },
  ];

  return (
    <Layout>
      <SeoHead title="사이트맵" description="공영홈쇼핑 입점 가이드의 전체 페이지 목록입니다." path="/sitemap-page" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "사이트맵" }]} />
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-8">사이트맵</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-bold text-foreground mb-3 text-base border-b border-border pb-2">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-bold text-foreground mb-3 text-base border-b border-border pb-2">
              전체 글 목록
            </h2>
            <ul className="space-y-2">
              {publishedPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-sm text-primary hover:underline line-clamp-1"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
