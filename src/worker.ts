export default {
  async fetch(
    request: Request,
    env: { ASSETS: { fetch(request: Request): Promise<Response> } },
  ): Promise<Response> {
    const url = new URL(request.url);

    try {
      const response = await env.ASSETS.fetch(request);

      if (response.status !== 404 || !shouldServeIndex(request)) {
        return shouldInjectHtml(request, response)
          ? injectSeo(response, url)
          : response;
      }
    } catch {
      if (!shouldServeIndex(request)) {
        return new Response("페이지를 찾을 수 없습니다.", { status: 404 });
      }
    }

    const fallbackUrl = new URL(request.url);
    fallbackUrl.pathname = "/index.html";
    const fallbackResponse = await env.ASSETS.fetch(new Request(fallbackUrl.toString()));
    return injectSeo(fallbackResponse, url, isKnownPagePath(url.pathname) ? 200 : 404);
  },
};

function shouldServeIndex(request: Request): boolean {
  return (
    request.method === "GET" &&
    request.headers.get("accept")?.includes("text/html") === true
  );
}

function shouldInjectHtml(request: Request, response: Response): boolean {
  return (
    shouldServeIndex(request) &&
    response.headers.get("content-type")?.includes("text/html") === true
  );
}

async function injectSeo(response: Response, url: URL, statusOverride?: number): Promise<Response> {
  const meta = getPageMeta(url.pathname);
  let html = await response.text();

  html = replaceBetween(html, /<title>.*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = replaceBetween(
    html,
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );
  html = replaceBetween(
    html,
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
  );
  html = replaceBetween(
    html,
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = replaceBetween(
    html,
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = replaceBetween(
    html,
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
  );
  html = replaceBetween(
    html,
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = replaceBetween(
    html,
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  );

  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=UTF-8");
  return new Response(html, {
    status: statusOverride ?? response.status,
    statusText: statusOverride === 404 ? "Not Found" : response.statusText,
    headers,
  });
}

function isKnownPagePath(pathname: string): boolean {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  const staticPaths = new Set([
    "/",
    "/categories",
    "/columns",
    "/author",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/sitemap",
    "/sitemap-page",
    "/admin",
  ]);
  const categoryPaths = new Set([
    "/categories/ipjeom-jeonbeob",
    "/categories/sincheon-jeolcha",
    "/categories/sang-pum-jeonryak",
    "/categories/bang-song-jun-bi",
    "/categories/ipjeom-ihu",
  ]);

  return staticPaths.has(normalizedPath) ||
    categoryPaths.has(normalizedPath) ||
    getDynamicTitle(normalizedPath, "") !== null;
}

function replaceBetween(html: string, pattern: RegExp, replacement: string): string {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

function getPageMeta(pathname: string): { title: string; description: string; canonical: string } {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  const canonicalPath = normalizedPath === "/sitemap-page" ? "/sitemap" : normalizedPath;
  const siteUrl = "https://homeshopview.com";
  const siteName = "공영홈쇼핑 입점 가이드";
  const defaultDescription =
    "공영홈쇼핑 입점을 준비하는 중소기업과 소상공인을 위한 정보 안내 사이트입니다.";

  const metaByPath: Record<string, { title: string; description: string }> = {
    "/": {
      title: `${siteName} | homeshopview.com`,
      description:
        "공영홈쇼핑 입점 절차, 서류 준비, 상품 전략, 방송 준비와 입점 후 관리까지 단계별로 안내합니다.",
    },
    "/categories": {
      title: `카테고리 | ${siteName}`,
      description: "공영홈쇼핑 입점 준비에 필요한 정보를 주제별 카테고리로 정리했습니다.",
    },
    "/columns": {
      title: `운영자 칼럼 | ${siteName}`,
      description: "공영홈쇼핑 입점 준비 과정에서 자주 헷갈리는 지점과 운영 관점을 칼럼으로 정리합니다.",
    },
    "/author": {
      title: `운영자 소개 | ${siteName}`,
      description: "공영홈쇼핑 입점 가이드를 운영하는 송창학의 소개, 편집 원칙, 칼럼 목록을 안내합니다.",
    },
    "/about": {
      title: `사이트 소개 | ${siteName}`,
      description: "공영홈쇼핑 입점 가이드의 운영 목적, 다루는 주제, 편집 원칙을 안내합니다.",
    },
    "/contact": {
      title: `문의하기 | ${siteName}`,
      description: "공영홈쇼핑 입점 가이드에 대한 문의, 오류 제보, 보완 제안을 이메일로 보내실 수 있습니다.",
    },
    "/privacy": {
      title: `개인정보처리방침 | ${siteName}`,
      description: "공영홈쇼핑 입점 가이드의 개인정보 수집 항목, 이용 목적, 보유 기간을 안내합니다.",
    },
    "/terms": {
      title: `이용약관 | ${siteName}`,
      description: "공영홈쇼핑 입점 가이드의 서비스 이용 조건과 콘텐츠 이용 범위를 안내합니다.",
    },
    "/disclaimer": {
      title: `면책고지 | ${siteName}`,
      description: "공영홈쇼핑 입점 가이드에서 제공하는 정보의 성격과 이용상 유의사항을 안내합니다.",
    },
    "/sitemap": {
      title: `사이트맵 | ${siteName}`,
      description: "공영홈쇼핑 입점 가이드의 주요 페이지, 카테고리, 글, 칼럼 목록을 한눈에 확인하세요.",
    },
    "/admin": {
      title: `관리자 CMS-lite | ${siteName}`,
      description: "정적 사이트용 CMS-lite 데모 관리자 화면입니다. 실제 보안 관리자 시스템은 아닙니다.",
    },
  };

  const dynamicTitle = getDynamicTitle(canonicalPath, siteName);
  const configured = metaByPath[canonicalPath];

  return {
    title: configured?.title || dynamicTitle || siteName,
    description: configured?.description || defaultDescription,
    canonical: `${siteUrl}${canonicalPath === "/" ? "/" : canonicalPath}`,
  };
}

function getDynamicTitle(pathname: string, siteName: string): string | null {
  const titles: Record<string, string> = {
    "/posts/ipjeom-joseon-checklist": "공영홈쇼핑 입점 전 기본 체크리스트",
    "/posts/seolyeo-junbi": "입점 신청에 필요한 서류 목록과 준비 방법",
    "/posts/ipjeom-jagyeok-jogeon": "공영홈쇼핑 입점 자격 조건 총정리",
    "/posts/ipjeom-sincheon-bangbeob": "공영홈쇼핑 입점 신청 방법 단계별 안내",
    "/posts/simsa-gigan-juuisahang": "입점 심사 기간과 합격·불합격 기준",
    "/posts/ipjeom-geobjeol-iyu": "입점 신청이 거절되는 주요 이유와 대처법",
    "/posts/jal-pallineun-sanpum-teukjing": "홈쇼핑에서 잘 팔리는 상품의 특징",
    "/posts/gagyeok-gusong-jeonryak": "홈쇼핑 상품 가격과 구성 설정 전략",
    "/posts/sanpum-chamshinso-jakseong": "상품 참신서 작성법과 바이어 설득 포인트",
    "/posts/bigmaengso-hyeopui": "바이어·MD와의 첫 협의, 이렇게 준비하세요",
    "/posts/qusit-jagseong-tipeu": "큐시트 작성 요령과 방송 원고 구성법",
    "/posts/saengbangsong-daeung": "생방송 당일 대응 요령과 실수 예방법",
    "/posts/jeonsan-gujo-ihaehagi": "공영홈쇼핑 정산 구조 이해하기",
    "/posts/jaebangsong-jeonryak": "재방송 신청과 장기 편성 전략",
    "/posts/cs-chulicheol": "홈쇼핑 입점 후 CS 처리와 반품 대응 방법",
    "/columns/ipjeom-junbi-shilgam": "공영홈쇼핑 입점 준비, 실제로 해보니 이런 점이 달랐습니다",
    "/columns/md-cheoeum-mannassul-ttae": "처음 MD를 만났을 때 당황했던 질문들",
    "/columns/ipjeom-ihu-balgyeonhan-geot": "입점 이후에야 알게 된 것들",
  };

  return titles[pathname] ? `${titles[pathname]} | ${siteName}` : null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
