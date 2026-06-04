import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";

const categoryIcons: Record<string, string> = {
  "ipjeom-jeonbeob": "📋",
  "sincheon-jeolcha": "📝",
  "sang-pum-jeonryak": "💡",
  "bang-song-jun-bi": "📡",
  "ipjeom-ihu": "📊",
};

export default function Categories() {
  return (
    <Layout>
      <SeoHead
        title="카테고리"
        description="공영홈쇼핑 입점 관련 정보를 주제별로 정리한 카테고리 목록입니다."
        path="/categories"
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "카테고리" }]} />
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-2">카테고리</h1>
        <p className="text-muted-foreground mb-8">
          공영홈쇼핑 입점 정보를 주제별로 묶었습니다. 관심 있는 카테고리를 선택해 보세요.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const count = posts.filter((p) => p.categorySlug === cat.slug && p.status === "published").length;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="bg-card border border-card-border rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all group"
                data-testid={`card-category-${cat.slug}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-3xl mb-3">{categoryIcons[cat.slug] || "📌"}</div>
                    <h2 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">{count}개의 글</p>
                  </div>
                  <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
