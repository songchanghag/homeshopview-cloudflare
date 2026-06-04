import { Link } from "wouter";
import {
  CheckCircle, Target, RefreshCw, BookOpen,
  LayoutGrid, Users, Shield, ArrowRight, FileText, Lightbulb
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { siteConfig } from "@/data/siteConfig";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import { columns } from "@/data/columns";

export default function About() {
  const publishedPosts = posts.filter((p) => p.status === "published");
  const publishedColumns = columns.filter((c) => c.status === "published");

  const coverageTopics = [
    { icon: "📋", title: "입점 전 준비", desc: "자격 조건, 기본 체크리스트, 사업자 요건 확인" },
    { icon: "📄", title: "신청 절차", desc: "서류 준비, 신청 방법, 심사 기간, 주의사항" },
    { icon: "💡", title: "상품 전략", desc: "상품 기획, 참신서 작성, 가격 구성, 방송 적합성" },
    { icon: "🎬", title: "방송 준비", desc: "큐시트 작성, CS 대응, 생방송 준비 요령" },
    { icon: "📊", title: "입점 이후 관리", desc: "정산 구조, 재방송 전략, MD 관계 관리" },
  ];

  const editorialPrinciples = [
    {
      no: "01",
      title: "확인된 정보만 다룹니다",
      desc: "검증되지 않은 내용, 허위 경험담, 과장된 수치를 사용하지 않습니다. 불분명한 내용은 '일반적으로', '보통', '입문자 기준' 등 정직한 표현으로 서술합니다.",
    },
    {
      no: "02",
      title: "초보자도 이해할 수 있게 씁니다",
      desc: "전문 용어는 가능한 한 풀어서 설명합니다. 읽은 후 바로 실행에 옮길 수 있는 구체적인 정보를 제공하는 것을 목표로 합니다.",
    },
    {
      no: "03",
      title: "콘텐츠를 주기적으로 점검합니다",
      desc: "공영홈쇼핑의 정책이나 절차가 변경되면 관련 글을 우선적으로 검토하고 보완합니다. 각 글의 발행일과 수정일을 모두 표시합니다.",
    },
    {
      no: "04",
      title: "광고성 표현을 배제합니다",
      desc: "낚시성 제목, 근거 없는 보장 문구, 과장된 성과 표현을 사용하지 않습니다. 이 사이트는 공영홈쇼핑의 공식 채널이 아닌 독립 정보 사이트입니다.",
    },
    {
      no: "05",
      title: "오류 발견 시 즉시 수정합니다",
      desc: "내용 오류나 보완 제안을 이메일로 알려주시면 내용을 검토하여 반영합니다. 정보의 정확성은 사이트 운영의 가장 기본 원칙입니다.",
    },
  ];

  const faqItems = [
    {
      q: "이 사이트는 공영홈쇼핑과 공식 파트너십이 있나요?",
      a: "아닙니다. 본 사이트는 공영홈쇼핑 입점 준비 정보를 정리하는 독립 정보 안내 사이트입니다.",
    },
    {
      q: "여기 나온 정보를 그대로 따라도 괜찮나요?",
      a: "입문자가 흐름을 이해하기 위한 참고 자료로 활용해 주세요. 정보 이용 한계와 중요한 확인 사항은 면책고지 페이지에 따로 정리해 두었습니다.",
    },
    {
      q: "콘텐츠를 얼마나 자주 업데이트하나요?",
      a: "공영홈쇼핑 관련 정책 변화나 이용자 피드백이 있을 때 우선적으로 업데이트합니다. 각 글 상단의 수정일을 참고하시면 최근 검토 여부를 확인할 수 있습니다.",
    },
    {
      q: "오류를 발견하거나 추가 주제를 제안하려면 어떻게 하나요?",
      a: `이메일(${siteConfig.email})로 알려주시면 검토 후 반영하겠습니다. 더 나은 정보를 위한 제보와 제안을 항상 환영합니다.`,
    },
  ];

  return (
    <Layout>
      <SeoHead
        title={`사이트 소개 | ${siteConfig.name}`}
        description={`${siteConfig.name}은 공영홈쇼핑 입점을 준비하는 중소기업·소상공인을 위한 정보 안내 사이트입니다. 운영 목적, 편집 원칙, 다루는 주제를 안내합니다.`}
        path="/about"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            publisher: {
              "@type": "Person",
              name: siteConfig.owner,
              email: siteConfig.email,
            },
          }),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "사이트 소개" }]} />

        {/* ── 히어로 요약 ── */}
        <div className="mt-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">사이트 소개</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            <strong className="text-foreground">{siteConfig.name}</strong>은 공영홈쇼핑 입점을 준비하거나 검토 중인
            중소기업·소상공인 대표님들을 위한 정보 안내 사이트입니다. 입점 준비부터 방송 이후 관리까지,
            단계별로 정직하게 정리하는 것을 목표로 합니다.
          </p>
        </div>

        {/* ── 현황 수치 ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: "정보 글", value: `${publishedPosts.length}편` },
            { label: "칼럼", value: `${publishedColumns.length}편` },
            { label: "카테고리", value: `${categories.length}개` },
            { label: "수록 FAQ", value: "50개+" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-card-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── 운영 목적 ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Target size={18} className="text-primary" />
            운영 목적
          </h2>
          <div className="bg-card border border-card-border rounded-xl p-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              공영홈쇼핑 입점 절차는 처음 접근하는 분들에게 생각보다 복잡합니다. 공식 홈페이지에는
              큰 흐름만 안내되어 있고, 실제 서류 준비 방법, 심사 평가 기준, 방송 당일 준비 요령 같은
              구체적인 정보는 찾기 어렵습니다.
            </p>
            <p>
              이 사이트는 흩어진 공개 정보를 입문자도 이해하기 쉬운 형태로 정리하여,
              불필요한 시행착오를 줄이는 데 도움을 드리는 것을 목적으로 합니다.
            </p>
            <p>
              공식 채널을 대신하기보다, 입점 준비자가 먼저 전체 흐름을 이해하고 필요한 질문을 정리할 수 있도록 돕는 안내서 역할을 지향합니다.
            </p>
          </div>
        </section>

        {/* ── 다루는 주제 ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <LayoutGrid size={18} className="text-primary" />
            다루는 주제
          </h2>
          <div className="space-y-3">
            {coverageTopics.map((t) => (
              <div key={t.title} className="flex items-start gap-4 bg-muted/40 rounded-xl px-5 py-4">
                <span className="text-xl mt-0.5">{t.icon}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <LayoutGrid size={14} />
              카테고리 전체 보기
            </Link>
            <Link
              href="/columns"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <BookOpen size={14} />
              운영자 칼럼 보기
            </Link>
          </div>
        </section>

        {/* ── 카테고리 구조 ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            사이트 구조
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex items-start gap-3 bg-card border border-card-border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <span className="text-2xl mt-0.5">{cat.emoji}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{cat.description}</p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-muted-foreground ml-auto mt-0.5 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── 편집 원칙 ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            편집 원칙
          </h2>
          <div className="space-y-3">
            {editorialPrinciples.map((p) => (
              <div key={p.no} className="flex items-start gap-4 bg-card border border-card-border rounded-xl p-5">
                <span className="text-xs font-bold text-primary bg-primary/10 rounded-lg px-2 py-1 shrink-0 mt-0.5">
                  {p.no}
                </span>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{p.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 대상 독자 ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Users size={18} className="text-primary" />
            이런 분께 도움이 됩니다
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "공영홈쇼핑 입점을 처음 검토하는 소상공인",
              "입점 신청 서류가 무엇인지 모르는 분",
              "심사 기준과 탈락 이유가 궁금한 분",
              "방송 전 큐시트·CS 준비가 처음인 분",
              "입점 후 정산 구조가 헷갈리는 분",
              "재방송 전략이나 MD 관계 관리가 필요한 분",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 bg-muted/40 rounded-lg px-4 py-3">
                <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-primary" />
            사이트에 대해 자주 묻는 질문
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-card border border-card-border rounded-xl p-5">
                <p className="font-semibold text-foreground text-sm mb-2">Q. {item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">A. {item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 운영자 박스 ── */}
        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="font-bold text-foreground mb-4">운영자 정보</h2>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
              {siteConfig.owner.charAt(0)}
            </div>
            <div className="flex-1">
              <Link href="/author" className="font-semibold text-foreground hover:text-primary transition-colors">
                {siteConfig.owner}
              </Link>
              <p className="text-sm text-muted-foreground mt-1 mb-3">{siteConfig.ownerBio}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                  {siteConfig.email}
                </a>
              </div>
              <div className="mt-3">
                <Link
                  href="/author"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  운영자 소개 및 칼럼 보기 <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
