const SERVICE_KEY = "d8c4e9bd3f23579924fc68f8354bb77452ffe6850a0fa85bef1285f7cd7b7687";
const API_BASE = "https://apis.data.go.kr/B553917/GyShopService2/selectBroadCastInfo2";

const GUIDE_POSTS = [
  ["schedule-guide", "공영홈쇼핑 편성표 보는 법", "방송 시간, 상품명, 가격, 무료배송 여부를 함께 확인하면 필요한 상품을 놓치지 않고 비교할 수 있습니다."],
  ["shopping-checklist", "홈쇼핑 구매 전 체크리스트", "방송 중 혜택만 보고 바로 결제하기보다 가격, 구성, 반품 조건, 공식 판매 페이지를 함께 확인하는 습관이 중요합니다."],
  ["installment-shipping", "무료배송과 무이자 할부 확인법", "무료배송과 무이자 할부는 실제 체감 가격을 바꾸는 핵심 조건입니다. 상품별 표시를 함께 비교해 보세요."],
  ["food-guide", "식품 방송 상품 구매 가이드", "식품 상품은 중량, 원산지, 보관 방식, 소비기한을 함께 봐야 실제 만족도가 높아집니다."],
  ["health-guide", "건강식품 구매 전 확인사항", "건강식품은 기능성 표현, 섭취 대상, 알레르기 성분, 과대광고 여부를 차분히 확인해야 합니다."],
  ["appliance-guide", "생활가전 홈쇼핑 구매 가이드", "가전 상품은 가격뿐 아니라 AS, 구성품, 소비전력, 설치 조건을 함께 확인하는 것이 좋습니다."],
  ["fashion-guide", "패션 상품 사이즈 확인법", "패션 상품은 화면 색상과 실제 색감이 다를 수 있어 사이즈표와 교환 조건을 꼭 확인해야 합니다."],
  ["price-guide", "홈쇼핑 상품 가격이 바뀌는 이유", "방송 시간, 카드 혜택, 구성 변경, 한정 수량에 따라 표시 가격과 최종 결제 가격이 달라질 수 있습니다."],
  ["return-guide", "교환·반품 조건 확인 가이드", "상품군마다 교환과 반품 조건이 다릅니다. 식품, 설치 가전, 개봉 상품은 특히 조건 확인이 필요합니다."],
  ["public-data-guide", "공공데이터 기반 편성표 활용법", "홈쇼핑뷰는 공공데이터 기반 편성 정보를 보기 쉽게 정리해 방송 전 비교와 확인을 돕습니다."]
];

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env, ctx);
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runDailyUpdate(env));
  }
};

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const path = normalizePath(url.pathname);

  if (path.startsWith("/css/") || path.startsWith("/js/") || path.startsWith("/favicon")) {
    return env.ASSETS.fetch(request);
  }

  if (path === "/robots.txt") return text(robots(env), "text/plain; charset=utf-8");
  if (path === "/sitemap.xml") return sitemap(env);
  if (path === "/schedule") return redirect(new URL("/", url).toString(), 301);
  if (path === "/" || path === "") return schedulePage(request, env);
  if (path === "/intro") return introPage(env);
  if (path === "/popular") return popularPage(env);
  if (path === "/guide") return guideListPage(env);
  if (path.startsWith("/guide/")) return guideDetailPage(path.split("/").pop(), env);
  if (path === "/terms") return staticLegalPage("이용약관", termsHtml(), env);
  if (path === "/privacy") return staticLegalPage("개인정보처리방침", privacyHtml(), env);
  if (path === "/contact") return staticLegalPage("문의하기", contactHtml(), env);

  const productMatch = path.match(/^\/schedule\/(\d{8})\/([^/]+)$/);
  if (productMatch) return productPage(productMatch[1], productMatch[2], env, ctx);

  return htmlPage("페이지를 찾을 수 없습니다", `<section class="section"><div class="container"><div class="not-found"><h1>404</h1><p>요청하신 페이지를 찾을 수 없습니다.</p><a class="btn-primary" href="/">편성표 보기</a></div></div></section>`, env, { status: 404 });
}

async function schedulePage(request, env) {
  const url = new URL(request.url);
  const today = todayKst();
  let dates = await env.DB.prepare("SELECT DISTINCT date FROM schedule WHERE date >= ? ORDER BY date ASC LIMIT 10").bind(today).all();
  let dateRows = dates.results || [];
  if (!dateRows.length) {
    dates = await env.DB.prepare("SELECT DISTINCT date FROM schedule ORDER BY date DESC LIMIT 10").all();
    dateRows = (dates.results || []).reverse();
  }
  const selectedDate = dateRows.some((row) => row.date === url.searchParams.get("date")) ? url.searchParams.get("date") : (dateRows[0]?.date || today);
  const { results } = await env.DB.prepare("SELECT * FROM schedule WHERE date = ? ORDER BY start_time ASC, priority ASC").bind(selectedDate).all();
  const slots = groupSlots(results || []);

  const dateButtons = dateRows.map((row) => {
    const active = row.date === selectedDate ? " active" : "";
    const todayClass = row.date === today ? " today" : "";
    const todayLabel = row.date === today ? `<br><span style="font-size:0.7rem;opacity:0.8;">오늘</span>` : "";
    return `<a href="/?date=${row.date}" class="date-btn${active}${todayClass}">${formatDateShort(row.date)}${todayLabel}</a>`;
  }).join("");

  const cards = slots.length ? slots.map((slot) => scheduleCard(slot.main, selectedDate, slot.subs)).join("") : `<div style="text-align:center;padding:60px 20px;color:var(--text-muted);"><p style="font-size:1.5rem;">편성 정보가 없습니다.</p></div>`;

  const body = `
    <section class="hero"><div class="container"><h1>📺 공영홈쇼핑 TV 편성표</h1><p>오늘의 방송 일정과 상품 정보를 한눈에 확인하세요.</p></div></section>
    <section class="section"><div class="container">
      <div class="date-selector">${dateButtons}</div>
      <h2 class="section-title">📅 ${formatDate(selectedDate)} 편성표</h2>
      <div class="schedule-list">${cards}</div>
    </div></section>
  `;
  return htmlPage(`공영홈쇼핑 TV 편성표 - ${formatDate(selectedDate)}`, body, env, {
    description: "공영홈쇼핑 TV 편성표, 방송 시간, 상품 가격, 무료배송과 무이자 혜택을 한눈에 확인하세요.",
    active: "schedule",
    canonical: "/"
  });
}

function scheduleCard(item, date, subs = []) {
  if (!item) return "";
  const productUrl = `/schedule/${date}/${encodeURIComponent(item.item_code)}`;
  const subHtml = subs.length ? `<div class="sub-products-wrapper"><div class="sub-products-label">함께 방송되는 상품 (${subs.length}개)</div>${subs.map((sub) => `
    <a href="/schedule/${date}/${encodeURIComponent(sub.item_code)}" class="schedule-card sub-card">
      ${sub.img ? `<img src="${esc(sub.img)}" alt="${esc(decodeName(sub.name))}" class="schedule-img sub-img" loading="lazy">` : ""}
      <div class="schedule-info"><div class="product-name">${esc(decodeName(sub.name))}</div><div class="price-row"><span class="price">${price(sub.price)}원</span></div><div class="tags"><span class="tag tag-sub">세트/관련상품</span>${Number(sub.free_shipping) ? `<span class="tag tag-free">무료배송</span>` : ""}</div></div>
    </a>`).join("")}</div>` : "";

  return `
    <a href="${productUrl}" class="schedule-card">
      <div class="schedule-time"><span class="time-start">${formatTime(item.start_time)}</span><span class="time-sep">~</span><span class="time-end">${formatTime(item.end_time)}</span><span class="runtime">${Number(item.runtime || 0)}분</span></div>
      ${item.img ? `<img src="${esc(item.img)}" alt="${esc(decodeName(item.name))}" class="schedule-img" loading="lazy">` : ""}
      <div class="schedule-info">
        <span class="category-badge">${esc(decodeName(item.category1))}${item.category2 ? ` > ${esc(decodeName(item.category2))}` : ""}</span>
        <div class="product-name">${esc(decodeName(item.name))}</div>
        <div class="price-row"><span class="price">${price(item.price)}원</span>${Number(item.discount_rate) > 0 ? `<span class="original-price">${price(item.orgin_price)}원</span><span class="discount-badge">${item.discount_rate}%</span>` : ""}</div>
        <div class="tags">${Number(item.free_shipping) ? `<span class="tag tag-free">무료배송</span>` : ""}${Number(item.month) > 0 ? `<span class="tag tag-installment">무이자 ${item.month}개월</span>` : ""}</div>
      </div>
    </a>${subHtml}`;
}

async function productPage(date, itemCode, env, ctx) {
  const item = await env.DB.prepare("SELECT * FROM schedule WHERE date = ? AND item_code = ? LIMIT 1").bind(date, itemCode).first();
  if (!item) {
    return htmlPage("종료된 편성 정보", `<section class="section"><div class="container"><div class="not-found"><h1>410</h1><p>해당 편성 정보는 종료되었거나 삭제되었습니다.</p><a class="btn-primary" href="/">최신 편성표 보기</a></div></div></section>`, env, { status: 410, robots: "noindex, follow" });
  }

  ctx.waitUntil(env.DB.prepare("UPDATE schedule SET views = COALESCE(views, 0) + 1 WHERE date = ? AND item_code = ?").bind(date, itemCode).run());
  const related = await env.DB.prepare("SELECT * FROM schedule WHERE date = ? AND start_time = ? AND item_code != ? ORDER BY priority ASC LIMIT 12").bind(date, item.start_time, itemCode).all();
  const name = decodeName(item.name);
  const buyUrl = item.url || item.detail_url || item.m_url || item.m_detail_url;
  const cards = parseJson(item.cards, []);
  const imgList = parseJson(item.img_list, []);

  const body = `
    <section class="section" style="padding-top:20px;"><div class="container">
      <div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span><a href="/">편성표</a><span class="sep">›</span><span>${esc(name)}</span></div>
      <div class="product-detail">
        <div class="product-title-header">
          <div class="product-badges"><span class="badge-category">${esc(decodeName(item.category1))}</span>${Number(item.main) ? `<span class="badge-status badge-main">대표상품</span>` : `<span class="badge-status badge-sub">관련상품</span>`}${Number(item.is_sale) ? `<span class="badge-status badge-main">판매중</span>` : ""}</div>
          <h1>${esc(name)}</h1>
          <div class="product-meta-row"><span>📅 방송일 ${formatDate(item.date)}</span><span>⏰ ${formatTime(item.start_time)} ~ ${formatTime(item.end_time)} (${item.runtime}분)</span></div>
          ${buyUrl ? `<a href="${esc(buyUrl)}" target="_blank" rel="noopener" class="btn-apply">🛒 공영홈쇼핑에서 구매하기</a>` : ""}
        </div>
        <div class="summary-box"><h2>📋 상품 핵심 요약</h2><p><strong>${esc(name)}</strong>은 공영홈쇼핑에서 <strong>${formatDate(item.date)} ${formatTime(item.start_time)}~${formatTime(item.end_time)}</strong> 시간대에 방송되는 <strong>${esc(decodeName(item.category1))}</strong> 상품입니다.</p><p>판매가는 <strong style="color:var(--danger);font-size:1.1em;">${price(item.price)}원</strong>이며 ${Number(item.free_shipping) ? "무료배송" : "배송비 별도"} 조건으로 표시됩니다. 실제 구매 전 공식 사이트의 최종 조건을 확인해 주세요.</p></div>
        <div class="product-header">
          ${item.img ? `<div class="product-img-wrap"><img src="${esc(item.img)}" alt="${esc(name)}" loading="lazy"></div>` : ""}
          <div class="product-main-info"><h2>💰 가격 정보</h2><div style="margin-bottom:16px;">${Number(item.discount_rate) > 0 ? `<span style="font-size:0.9rem;color:var(--text-muted);text-decoration:line-through;">${price(item.orgin_price)}원</span><span class="discount-badge" style="margin-left:6px;">${item.discount_rate}%</span><br>` : ""}<span style="font-size:2rem;font-weight:800;color:var(--danger);">${price(item.price)}</span><span style="font-size:1.3rem;font-weight:600;color:var(--danger);">원</span></div><div style="display:flex;gap:8px;flex-wrap:wrap;">${Number(item.free_shipping) ? `<span class="tag tag-free">무료배송</span>` : ""}${Number(item.month) > 0 ? `<span class="tag tag-installment">무이자 ${item.month}개월</span>` : ""}</div>${cards.length ? `<h3 style="margin-top:18px;">카드 할인</h3>${cards.map((card) => `<div style="background:#f8f4ff;padding:8px 14px;border-radius:8px;margin-bottom:6px;"><strong>${esc(decodeName(card.name))}</strong> ${card.discount_rate || 0}% 할인</div>`).join("")}` : ""}</div>
        </div>
        ${detailSection("방송 상세 정보", `<p><strong>방송 날짜:</strong> ${formatDate(item.date)}</p><p><strong>방송 시간:</strong> ${formatTime(item.start_time)} ~ ${formatTime(item.end_time)} (${item.runtime}분)</p><p><strong>상품 코드:</strong> ${esc(item.item_code)}</p><p><strong>상품 유형:</strong> ${Number(item.main) ? "대표 상품" : "세트/관련 상품"}</p>`)}
        ${detailSection("상품 카테고리 분류", `<p><strong>대분류:</strong> ${esc(decodeName(item.category1)) || "미분류"}</p><p><strong>중분류:</strong> ${esc(decodeName(item.category2)) || "미분류"}</p><p><strong>소분류:</strong> ${esc(decodeName(item.category3)) || "미분류"}</p><p><strong>세분류:</strong> ${esc(decodeName(item.category4)) || "미분류"}</p>`)}
        ${buyUrl ? detailSection("공식 사이트에서 구매하기", `<p>공영홈쇼핑 공식 사이트에서 상품의 상세 정보와 최종 구매 조건을 확인할 수 있습니다.</p><a href="${esc(buyUrl)}" target="_blank" rel="noopener" class="btn-apply">공영홈쇼핑 공식 사이트에서 보기 →</a>`) : ""}
        ${imgList.length ? detailSection("추가 상품 이미지", `<div style="display:flex;gap:12px;flex-wrap:wrap;">${imgList.map((img) => `<img src="${esc(img)}" alt="${esc(name)} 추가 이미지" style="width:180px;height:180px;object-fit:cover;border-radius:8px;" loading="lazy">`).join("")}</div>`) : ""}
        ${(related.results || []).length ? detailSection("같은 시간대 관련 상품", `<div class="schedule-list">${(related.results || []).map((row) => scheduleCard(row, row.date, [])).join("")}</div>`) : ""}
      </div>
    </div></section>`;

  return htmlPage(`${name} - ${formatDate(item.date)} 공영홈쇼핑 편성표`, body, env, {
    description: `${name} 공영홈쇼핑 ${formatDate(item.date)} ${formatTime(item.start_time)} 방송 상품 정보, 가격 ${price(item.price)}원, 카테고리 ${decodeName(item.category1)}.`,
    canonical: `/schedule/${date}/${encodeURIComponent(itemCode)}`,
    active: "schedule"
  });
}

async function popularPage(env) {
  const today = todayKst();
  let rows = (await env.DB.prepare("SELECT * FROM schedule WHERE date >= ? ORDER BY views DESC, date ASC, start_time ASC LIMIT 50").bind(today).all()).results || [];
  if (!rows.length) rows = (await env.DB.prepare("SELECT * FROM schedule ORDER BY date DESC, start_time ASC LIMIT 50").all()).results || [];
  const list = rows.map((item, index) => `<a class="popular-card" href="/schedule/${item.date}/${encodeURIComponent(item.item_code)}"><div class="popular-rank">${index + 1}</div><div class="popular-body"><div class="popular-meta"><span>편성표</span><span>${formatDate(item.date)}</span><span>${Number(item.views || 0)}회</span></div><h3>${esc(decodeName(item.name))}</h3><p>${price(item.price)}원</p></div></a>`).join("");
  return htmlPage("오늘 인기 공영홈쇼핑 상품 TOP 50", `<section class="hero"><div class="container"><h1>🔥 오늘 인기 상품 TOP 50</h1><p>많이 조회된 공영홈쇼핑 방송 상품을 정리했습니다.</p></div></section><section class="section"><div class="container"><h2 class="section-title">조회수 기준 인기 상품</h2><div class="popular-list">${list}</div></div></section>`, env, { active: "popular", canonical: "/popular/" });
}

function introPage(env) {
  return htmlPage("홈쇼핑뷰 공영홈쇼핑 소개", `<section class="hero"><div class="container"><h1>홈쇼핑뷰 공영홈쇼핑 소개</h1><p>공공데이터 기반으로 공영홈쇼핑 편성표와 상품 정보를 보기 쉽게 정리합니다.</p></div></section><section class="section"><div class="container"><div class="content-page"><h2>사이트 소개</h2><p>홈쇼핑뷰 공영홈쇼핑은 공공데이터포털에서 제공하는 공영홈쇼핑 TV편성 상품정보 API를 활용해 방송 일정, 상품명, 가격, 카테고리, 공식 구매 링크를 정리하는 정보 사이트입니다.</p><p>본 사이트는 공영홈쇼핑 공식 사이트가 아니며, 상품 판매나 결제를 직접 제공하지 않습니다. 최종 구매 조건은 공영홈쇼핑 공식 사이트에서 확인해 주세요.</p><h2>운영 목적</h2><p>소비자가 방송 시간과 상품 정보를 미리 확인하고, 무료배송이나 무이자 할부 같은 조건을 함께 비교할 수 있도록 돕는 것이 목적입니다.</p></div></div></section>`, env, { active: "intro", canonical: "/intro/" });
}

function guideListPage(env) {
  const cards = GUIDE_POSTS.map(([slug, title, excerpt]) => `<a class="post-list-card" href="/guide/${slug}"><span class="post-list-label">가이드</span><h3>${title}</h3><p>${excerpt}</p></a>`).join("");
  return htmlPage("홈쇼핑 가이드 - 공영홈쇼핑 편성표 활용법", `<section class="hero"><div class="container"><h1>📖 홈쇼핑 가이드</h1><p>편성표와 상품 정보를 더 똑똑하게 확인하는 방법을 정리했습니다.</p></div></section><section class="section"><div class="container"><h2 class="section-title">안내 글 모음</h2><div class="post-list-grid">${cards}</div></div></section>`, env, { active: "guide", canonical: "/guide/" });
}

function guideDetailPage(slug, env) {
  const post = GUIDE_POSTS.find((item) => item[0] === slug);
  if (!post) return htmlPage("가이드 글을 찾을 수 없습니다", `<section class="section"><div class="container"><div class="not-found"><h1>404</h1><p>가이드 글을 찾을 수 없습니다.</p><a class="btn-primary" href="/guide/">가이드 목록</a></div></div></section>`, env, { status: 404 });
  const [id, title, excerpt] = post;
  const body = `<section class="section"><div class="container"><article class="content-page"><p class="post-list-label">가이드</p><h1>${title}</h1><p>${excerpt}</p>${guideArticle(title)}</article></div></section>`;
  return htmlPage(`${title} - 홈쇼핑뷰`, body, env, { active: "guide", canonical: `/guide/${id}/`, description: excerpt });
}

function guideArticle(title) {
  return `<p>공영홈쇼핑 편성표를 확인할 때는 단순히 상품명만 보는 것보다 방송 시간, 가격, 배송 조건, 카드 혜택, 공식 구매 링크를 함께 확인하는 것이 좋습니다. 같은 상품이라도 방송 회차나 구성에 따라 가격과 혜택이 달라질 수 있기 때문입니다.</p><p>${title}에서는 실제 구매 전에 확인하면 좋은 기준을 중심으로 설명합니다. 특히 식품, 건강식품, 생활가전, 패션 상품은 각각 확인해야 할 포인트가 다르므로 상품군에 맞춰 비교하는 습관이 필요합니다.</p><p>홈쇼핑뷰는 공공데이터를 기반으로 편성 정보를 정리하지만, 최종 판매 조건은 공영홈쇼핑 공식 사이트에서 바뀔 수 있습니다. 구매 전에는 공식 상품 페이지에서 가격, 배송, 반품, 재고 상태를 다시 확인해 주세요.</p>`;
}

function staticLegalPage(title, content, env) {
  return htmlPage(`${title} - 홈쇼핑뷰`, `<section class="section"><div class="container"><div class="content-page"><h1>${title}</h1>${content}</div></div></section>`, env, { canonical: `/${title === "이용약관" ? "terms" : title === "개인정보처리방침" ? "privacy" : "contact"}/` });
}

function termsHtml() {
  return `<p>본 약관은 홈쇼핑뷰 공영홈쇼핑 정보 사이트 이용과 관련한 기본 사항을 안내합니다. 본 사이트는 공공데이터 기반 편성표와 상품 정보를 제공하며, 상품 판매와 결제를 직접 수행하지 않습니다.</p><p>사이트에 표시되는 정보는 API 제공 데이터와 실제 방송 상황에 따라 달라질 수 있습니다. 최종 구매 조건은 반드시 공영홈쇼핑 공식 사이트에서 확인해야 합니다.</p>`;
}

function privacyHtml() {
  return `<p>홈쇼핑뷰는 회원가입 기능을 제공하지 않으며, 이용자의 주민등록번호나 결제 정보를 수집하지 않습니다. 문의가 접수되는 경우 답변을 위해 이메일 등 사용자가 직접 제공한 정보만 제한적으로 확인할 수 있습니다.</p><p>서비스 안정성과 보안, 통계 분석을 위해 Cloudflare가 기본 접속 로그를 처리할 수 있습니다.</p>`;
}

function contactHtml() {
  return `<p>사이트 이용 중 오류, 편성표 정보 문제, 문의 사항이 있으면 아래 이메일로 연락해 주세요.</p><p><strong>이메일:</strong> songchanghag790@gmail.com</p><p><strong>연락처:</strong> 0507-2834-5978</p>`;
}

async function sitemap(env) {
  const today = todayKst();
  let rows = (await env.DB.prepare("SELECT date, item_code FROM schedule WHERE date >= ? ORDER BY date ASC, start_time ASC LIMIT 5000").bind(today).all()).results || [];
  if (!rows.length) rows = (await env.DB.prepare("SELECT date, item_code FROM schedule ORDER BY date DESC, start_time ASC LIMIT 5000").all()).results || [];
  const base = siteUrl(env);
  const staticUrls = ["/", "/intro/", "/popular/", "/guide/", "/terms/", "/privacy/", "/contact/", ...GUIDE_POSTS.map(([slug]) => `/guide/${slug}/`)];
  const urls = [...staticUrls.map((path) => `${base}${path.replace(/^\//, "")}`), ...rows.map((row) => `${base}schedule/${row.date}/${encodeURIComponent(row.item_code)}`)];
  return text(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((loc) => `  <url><loc>${escXml(loc)}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join("\n")}\n</urlset>`, "application/xml; charset=utf-8");
}

function robots(env) {
  return `User-agent: *\nDisallow: /cdn-cgi/\nAllow: /\n\nSitemap: ${siteUrl(env)}sitemap.xml\n`;
}

async function runDailyUpdate(env) {
  const today = todayKst();
  await env.DB.prepare("DELETE FROM schedule WHERE date < ?").bind(today).run();
  for (let i = 0; i < 10; i += 1) {
    const date = dateOffsetKst(i);
    await fetchAndUpsert(date, env);
  }
}

async function fetchAndUpsert(date, env) {
  const apiUrl = `${API_BASE}?ServiceKey=${SERVICE_KEY}&numOfRows=100&pageNo=1&date=${date}&_type=json`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const body = data?.response?.body;
  const rawItems = body?.item ? (Array.isArray(body.item) ? body.item : [body.item]) : [];
  const liveProduct = body?.live_product || "";
  if (!rawItems.length) return;

  const stmt = env.DB.prepare(`INSERT OR REPLACE INTO schedule (
    date,start_time,end_time,runtime,item_code,name,main,priority,img,img_list,url,detail_url,m_url,m_detail_url,shopping_host,event_type,event_period,orgin_price,price,discount_rate,free_shipping,cards,month,category1,category2,category3,category4,soldout,is_sale,is_live_sale,live_product,views
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,COALESCE((SELECT views FROM schedule WHERE date=? AND start_time=? AND item_code=?),0))`);

  const batch = rawItems.map((item) => stmt.bind(
    date, item.start_time || "", item.end_time || "", Number(item.runtime || 0), item.item_code || "", item.name || "",
    item.main ? 1 : 0, Number(item.priority || 0), item.img || "", JSON.stringify(item.img_list || []),
    item.url || "", item.detail_url || "", item.m_url || "", item.m_detail_url || "", JSON.stringify(item.shopping_host || []),
    item.event_type || "", item.event_period || "", Number(item.orgin_price || 0), Number(item.price || 0), Number(item.discount_rate || 0),
    item.free_shipping ? 1 : 0, JSON.stringify(item.cards || []), Number(item.month || 0), item.category1 || "", item.category2 || "",
    item.category3 || "", item.category4 || "", item.soldout ? 1 : 0, item.is_sale ? 1 : 0, item.is_live_sale ? 1 : 0, liveProduct,
    date, item.start_time || "", item.item_code || ""
  ));
  await env.DB.batch(batch);
}

function htmlPage(title, body, env, options = {}) {
  const status = options.status || 200;
  const canonical = new URL((options.canonical || "/").replace(/^\//, ""), siteUrl(env)).toString();
  const description = options.description || "홈쇼핑뷰 공영홈쇼핑 편성표와 상품 정보를 한눈에 확인하세요.";
  const robotsMeta = options.robots ? `<meta name="robots" content="${esc(options.robots)}">` : "";
  const page = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(title)}</title><meta name="description" content="${esc(description)}">${robotsMeta}<link rel="canonical" href="${esc(canonical)}"><meta property="og:type" content="website"><meta property="og:site_name" content="${esc(env.SITE_NAME || "홈쇼핑뷰 공영홈쇼핑")}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><link rel="stylesheet" href="/css/style.css"></head><body>${header(options.active || "")}${body}${footer()}<script src="/js/main.js"></script></body></html>`;
  return new Response(page, { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": status === 200 ? "public, max-age=300" : "no-store" } });
}

function header(active) {
  const nav = [["schedule", "/", "📺 편성표"], ["intro", "/intro/", "🏠 소개"], ["popular", "/popular/", "🔥 인기"], ["guide", "/guide/", "📖 가이드"]];
  return `<nav class="navbar"><div class="container"><a href="/" class="navbar-brand"><span class="owl-icon">🛍️</span> 홈쇼핑뷰 <span>공영홈쇼핑</span></a><button class="mobile-toggle" aria-label="메뉴">☰</button><ul class="nav-links">${nav.map(([key, href, label]) => `<li><a href="${href}" class="${active === key ? "active" : ""}">${label}</a></li>`).join("")}</ul></div></nav>`;
}

function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-inner"><div class="footer-info"><h4>홈쇼핑뷰 공영홈쇼핑</h4><p>공영홈쇼핑 편성표와 상품 정보를 한눈에 확인하세요.<br>공공데이터 기반의 알뜰 쇼핑 정보 사이트입니다.</p></div><div class="footer-col"><h4>카테고리</h4><a href="/">편성표</a><a href="/intro/">소개</a><a href="/popular/">인기</a><a href="/guide/">가이드</a></div><div class="footer-col"><h4>안내</h4><p style="font-size:0.82rem;margin-bottom:6px;">사이트명 : 홈쇼핑뷰 공영홈쇼핑</p><p style="font-size:0.82rem;margin-bottom:6px;">데이터 출처 : 공공데이터포털(data.go.kr)</p><p style="font-size:0.82rem;margin-bottom:6px;">연락처 : <a href="tel:0507-2834-5978" style="color:var(--accent-light)">0507-2834-5978</a></p><p style="font-size:0.82rem;margin-bottom:6px;">이메일 : <span style="color:var(--accent-light)">songchanghag790@gmail.com</span></p><div class="footer-legal-links"><a href="/intro/">소개</a><a href="/terms/">이용약관</a><a href="/privacy/">개인정보처리방침</a><a href="/contact/">문의하기</a></div></div></div><div class="footer-bottom"><p>&copy; 2026 홈쇼핑뷰 공영홈쇼핑. All rights reserved.</p><p>편성 및 가격 정보는 변경될 수 있으니 최종 구매 전 공식 사이트에서 확인해 주세요.</p></div></div></footer>`;
}

function detailSection(title, content) {
  return `<div class="detail-section"><h2>${title}</h2><div class="content-page" style="padding:0;">${content}</div></div>`;
}

function groupSlots(items) {
  const slots = [];
  const map = new Map();
  for (const item of items) {
    const key = `${item.start_time}_${item.end_time}`;
    if (!map.has(key)) {
      map.set(key, { main: null, subs: [] });
      slots.push(map.get(key));
    }
    const slot = map.get(key);
    if (Number(item.main)) slot.main = item;
    else slot.subs.push(item);
  }
  for (const slot of slots) {
    if (!slot.main && slot.subs.length) slot.main = slot.subs.shift();
  }
  return slots;
}

function parseJson(value, fallback) {
  try {
    const parsed = JSON.parse(value || "");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function normalizePath(path) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function siteUrl(env) {
  return (env.SITE_URL || "https://homeshopview.com").replace(/\/?$/, "/");
}

function todayKst() {
  return dateOffsetKst(0);
}

function dateOffsetKst(offset) {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  kst.setUTCDate(kst.getUTCDate() + offset);
  return `${kst.getUTCFullYear()}${String(kst.getUTCMonth() + 1).padStart(2, "0")}${String(kst.getUTCDate()).padStart(2, "0")}`;
}

function formatTime(value) {
  const text = String(value || "").padStart(4, "0");
  return `${text.slice(0, 2)}:${text.slice(2, 4)}`;
}

function formatDate(value) {
  const text = String(value || "");
  if (text.length !== 8) return text;
  return `${text.slice(0, 4)}.${text.slice(4, 6)}.${text.slice(6, 8)}`;
}

function formatDateShort(value) {
  const text = String(value || "");
  if (text.length !== 8) return text;
  const date = new Date(`${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}T00:00:00+09:00`);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${text.slice(4, 6)}.${text.slice(6, 8)}(${days[date.getDay()]})`;
}

function price(value) {
  return Math.round(Number(value || 0)).toLocaleString("ko-KR");
}

function decodeName(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(String(value).replace(/\+/g, "%20")).trim();
  } catch {
    return String(value).trim();
  }
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function escXml(value) {
  return esc(value);
}

function text(content, contentType) {
  return new Response(content, { headers: { "content-type": contentType } });
}

function redirect(location, status = 302) {
  return new Response(null, { status, headers: { location } });
}
