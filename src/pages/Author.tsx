import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Pen, BookOpen, ArrowRight, CheckCircle, Mail,
  Target, FileText, RefreshCw, Users, MessageCircle
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { siteConfig } from "@/data/siteConfig";
import { columns } from "@/data/columns";
import { posts } from "@/data/posts";

export default function Author() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("adminSession") === "true");
  }, []);

  const publishedColumns = columns.filter((c) => c.status === "published");
  const recentPosts = posts
    .filter((p) => p.status === "published")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 4);

  const editorialPrinciples = [
    {
      icon: <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />,
      title: "확인된 정보만 다룹니다",
      desc: "검증되지 않은 내용은 '일반적으로', '보통', '입문자 기준'처럼 정직하게 표현합니다. 허위 사실, 과장된 수치, 검증되지 않은 최신 정보를 만들지 않습니다.",
    },
    {
      icon: <RefreshCw size={16} className="text-primary shrink-0 mt-0.5" />,
      title: "정기적으로 콘텐츠를 점검합니다",
      desc: "공영홈쇼핑의 정책이나 절차가 변경되면 관련 글을 우선적으로 검토하고 내용을 보완합니다. 각 글의 수정일을 반드시 표시합니다.",
    },
    {
      icon: <Users size={16} className="text-primary shrink-0 mt-0.5" />,
      title: "초보자 관점으로 설명합니다",
      desc: "전문 용어는 가능한 한 풀어 씁니다. '아는 사람만 이해할 수 있는 글'이 아니라, 처음 입점을 검토하는 분도 읽고 바로 행동할 수 있는 정보를 지향합니다.",
    },
    {
      icon: <MessageCircle size={16} className="text-primary shrink-0 mt-0.5" />,
      title: "광고성 표현을 배제합니다",
      desc: "낚시성 제목, 근거 없는 보장 문구, 과장된 성과 표현을 사용하지 않습니다. 이 사이트는 공영홈쇼핑의 공식 채널이 아니므로, 독립적인 정보 제공자로서의 책임을 다합니다.",
    },
    {
      icon: <Target size={16} className="text-primary shrink-0 mt-0.5" />,
      title: "실질적으로 도움 되는 정보를 씁니다",
      desc: "추상적인 설명보다 구체적인 체크리스트, 단계별 절차, 실제 주의사항을 중심으로 구성합니다. 읽은 후 바로 써먹을 수 있는 정보를 목표로 합니다.",
    },
  ];

  const coverageTopics = [
    "입점 전 기본 체크리스트 및 자격 조건",
    "신청 서류 준비 방법과 유효기간 관리",
    "심사 절차 및 탈락 사유 분석",
    "방송에 잘 팔리는 상품 기획 전략",
    "상품 참신서·큐시트 작성 방법",
    "방송 당일 CS 대응 준비",
    "정산 구조 이해 및 재방송 전략",
    "MD 신뢰 쌓기 및 장기 입점 관계 관리",
  ];

  const siteStats = [
    { label: "정보 글", value: "15편" },
    { label: "운영자 칼럼", value: "3편" },
    { label: "카테고리", value: "5개" },
    { label: "수록 FAQ", value: "50개+" },
  ];

  return (
    <Layout>
      <SeoHead
        title={`운영자 소개 | ${siteConfig.owner} — ${siteConfig.name}`}
        description={`${siteConfig.name}을 운영하는 ${siteConfig.owner}의 소개, 편집 원칙, 운영 철학, 칼럼 목록을 안내합니다.`}
        path="/author"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteConfig.owner,
            email: siteConfig.email,
            url: `${siteConfig.url}/author`,
            worksFor: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "운영자 소개" }]} />

        {/* ── 프로필 카드 ── */}
        <div className="mt-6 bg-card border border-card-border rounded-2xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl shrink-0 border border-primary/20">
              {siteConfig.owner.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">{siteConfig.owner}</h1>
                  <p className="text-primary font-medium text-sm mb-2">{siteConfig.name} 운영자</p>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                    공영홈쇼핑 입점을 준비하는 중소기업·소상공인 대표님들이 불필요한 시행착오 없이 정확한 정보를 얻을 수 있도록
                    이 사이트를 운영하고 있습니다. 직접 입점을 알아보며 정리한 경험을 바탕으로, 흩어진 정보를 한자리에 모았습니다.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Mail size={14} />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          {/* 관리자/일반 분기 배너 */}
          {isAdmin ? (
            <div className="bg-primary/8 border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-primary font-medium">관리자 상태입니다. 새 칼럼을 작성하시겠어요?</p>
              <Link
                href="/admin?section=new-column"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                data-testid="button-new-column"
              >
                <Pen size={14} />
                새 칼럼 작성하기
              </Link>
            </div>
          ) : (
            <div className="bg-muted/60 rounded-xl p-4 flex items-center gap-2">
              <BookOpen size={15} className="text-muted-foreground shrink-0" />
              <p className="text-sm text-muted-foreground">
                운영자가 직접 정리한 칼럼을 읽어보세요. 공영홈쇼핑 입점 과정에서 실제로 마주치는 고민과 관점을 담았습니다.
              </p>
            </div>
          )}
        </div>

        {/* ── 사이트 현황 ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {siteStats.map((s) => (
            <div key={s.label} className="bg-card border border-card-border rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── 이 사이트를 만든 이유 ── */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            이 사이트를 만든 이유
          </h2>
          <div className="bg-card border border-card-border rounded-xl p-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              공영홈쇼핑 입점을 알아보면서, 정보가 생각보다 많지 않다는 것을 느꼈습니다.
              공식 홈페이지에는 절차의 큰 흐름만 나와 있고, 실제로 서류를 어떻게 준비하는지,
              심사에서 어떤 부분이 중점적으로 평가되는지, 방송 당일에는 무엇을 챙겨야 하는지에 대한
              구체적인 정보는 흩어져 있거나 아예 없는 경우가 많았습니다.
            </p>
            <p>
              그래서 공개된 자료와 일반적으로 알려진 경험들을 기반으로, 입점을 처음 시작하는 분들이
              읽고 바로 활용할 수 있는 정보를 단계별로 정리하기 시작했습니다.
              완벽하지 않을 수 있지만, 정직하게 서술하고 내용을 지속적으로 보완하는 것을 원칙으로 합니다.
            </p>
            <p>
              이 사이트의 모든 정보는 참고 목적입니다. 공영홈쇼핑의 실제 입점 조건과 절차는
              반드시 공영홈쇼핑 공식 채널에서 직접 확인하시기 바랍니다.
            </p>
          </div>
        </section>

        {/* ── 다루는 주제 ── */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Target size={18} className="text-primary" />
            다루는 주제
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coverageTopics.map((topic) => (
              <div key={topic} className="flex items-start gap-2 bg-muted/40 rounded-lg px-4 py-3">
                <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{topic}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 px-1">
            위 주제들은 카테고리별로 정리되어 있습니다.{" "}
            <Link href="/categories" className="text-primary hover:underline">카테고리 목록 보기 →</Link>
          </p>
        </section>

        {/* ── 편집 원칙 ── */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-primary" />
            편집 원칙
          </h2>
          <div className="space-y-3">
            {editorialPrinciples.map((p, i) => (
              <div key={i} className="bg-card border border-card-border rounded-xl p-5">
                <div className="flex items-start gap-3">
                  {p.icon}
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{p.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 운영자 칼럼 ── */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Pen size={18} className="text-primary" />
              운영자 칼럼
            </h2>
            <Link href="/columns" className="text-sm text-primary hover:underline">
              전체 보기 →
            </Link>
          </div>
          <div className="space-y-3">
            {publishedColumns.map((col) => (
              <Link
                key={col.id}
                href={`/columns/${col.slug}`}
                className="block bg-card border border-card-border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group"
                data-testid={`card-column-${col.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-xs font-medium text-secondary bg-secondary/15 px-2 py-0.5 rounded-full">
                      칼럼
                    </span>
                    <h3 className="font-semibold text-foreground mt-2 mb-1.5 group-hover:text-primary transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{col.summary}</p>
                    <p className="text-xs text-muted-foreground mt-2">{col.publishedAt}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground mt-1 shrink-0 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 최근 정보 글 ── */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">최근 정리한 정보 글</h2>
            <Link href="/categories" className="text-sm text-primary hover:underline">
              전체 글 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="block bg-muted/40 rounded-xl p-4 hover:bg-muted/70 transition-colors group"
              >
                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </p>
                <p className="text-xs text-muted-foreground mt-2">수정: {post.updatedAt}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 연락처 / 오류 제보 ── */}
        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="font-bold text-foreground mb-2 text-base">오류 제보 및 문의</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            내용 중 잘못된 정보를 발견하셨거나, 다루었으면 하는 주제가 있으시면 언제든지 이메일로 알려주세요.
            정보의 정확성을 높이기 위해 적극적으로 반영하겠습니다.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Mail size={14} />
            {siteConfig.email}으로 문의하기
          </a>
        </section>
      </div>
    </Layout>
  );
}
