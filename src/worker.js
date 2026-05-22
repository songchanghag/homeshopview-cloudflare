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

  if (path.startsWith("/css/") || path.startsWith("/js/") || path.startsWith("/favicon") || path === "/apple-touch-icon.png" || path === "/og-image.png") {
    return env.ASSETS.fetch(request);
  }

  if (path === "/robots.txt") return text(robots(env), "text/plain; charset=utf-8");
  if (path === "/sitemap.xml") return sitemap(env);
  if (path === "/schedule") return redirect(new URL("/", url).toString(), 301);
  if (path === "/" || path === "") return schedulePage(request, env);
  if (path === "/intro") return introPageV2(env);
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
  if (!item || date < todayKst()) {
    return htmlPage("종료된 편성 정보", `<section class="section"><div class="container"><div class="not-found"><h1>410</h1><p>해당 편성 정보는 종료되었거나 삭제되었습니다.</p><a class="btn-primary" href="/">최신 편성표 보기</a></div></div></section>`, env, { status: 410, robots: "noindex, follow" });
  }

  ctx.waitUntil(env.DB.prepare("UPDATE schedule SET views = COALESCE(views, 0) + 1 WHERE date = ? AND item_code = ?").bind(date, itemCode).run());
  const related = await env.DB.prepare("SELECT * FROM schedule WHERE date = ? AND start_time = ? AND item_code != ? ORDER BY priority ASC LIMIT 12").bind(date, item.start_time, itemCode).all();
  const name = decodeName(item.name);
  const buyUrl = item.url || item.detail_url || item.m_url || item.m_detail_url;
  const cards = parseJson(item.cards, []);
  const imgList = parseJson(item.img_list, []);
  const canonicalPath = `/schedule/${date}/${encodeURIComponent(itemCode)}`;

  const body = `
    <section class="section" style="padding-top:20px;"><div class="container">
      <div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span><a href="/">편성표</a><span class="sep">›</span><span>${esc(name)}</span></div>
      <div class="product-detail">
        <div class="product-title-header">
          <div class="product-badges"><span class="badge-category">${esc(decodeName(item.category1))}</span>${Number(item.main) ? `<span class="badge-status badge-main">대표상품</span>` : `<span class="badge-status badge-sub">관련상품</span>`}${Number(item.is_sale) ? `<span class="badge-status badge-main">판매중</span>` : ""}</div>
          <h1>${esc(name)}</h1>
          <div class="product-meta-row"><span>📅 방송일 ${formatDate(item.date)}</span><span>⏰ ${formatTime(item.start_time)} ~ ${formatTime(item.end_time)} (${item.runtime}분)</span></div>
          ${buyUrl ? `<a href="${esc(buyUrl)}" target="_blank" rel="noopener" class="btn-apply">🛒 공영홈쇼핑에서 구매하기</a>` : ""}
          ${socialShareButtons(name, canonicalPath, env)}
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
        ${productFaqHtml(item, name, cards, related.results || [])}
      </div>
    </div></section>`;

  return htmlPage(`${name} - ${formatDate(item.date)} 공영홈쇼핑 편성표`, body, env, {
    description: `${name} 공영홈쇼핑 ${formatDate(item.date)} ${formatTime(item.start_time)} 방송 상품 정보, 가격 ${price(item.price)}원, 카테고리 ${decodeName(item.category1)}.`,
    canonical: canonicalPath,
    active: "schedule"
  });
}

function socialShareButtons(title, path, env) {
  const url = new URL(path.replace(/^\//, ""), siteUrl(env)).toString();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return `<div class="social-share" aria-label="공유하기">
    <a class="share-btn share-naver" href="https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedTitle}" target="_blank" rel="noopener" aria-label="네이버 공유">N</a>
    <a class="share-btn share-facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener" aria-label="페이스북 공유">f</a>
    <a class="share-btn share-x" href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener" aria-label="X 공유">X</a>
    <a class="share-btn share-band" href="https://band.us/plugin/share?body=${encodedTitle}%0A${encodedUrl}&route=${encodeURIComponent(siteUrl(env))}" target="_blank" rel="noopener" aria-label="밴드 공유">b</a>
    <button type="button" class="share-btn share-copy" data-copy-url="${esc(url)}" aria-label="링크 복사">⧉</button>
  </div>`;
}

function productFaqHtml(item, productName, cards, relatedItems) {
  const installment = Number(item.month || 0);
  const cardText = cards.length ? ` 또한 ${esc(decodeName(cards[0].name))} 등의 카드 할인을 적용하면 더 저렴하게 구매할 수 있습니다.` : "";
  const relatedText = relatedItems.length ? ` 같은 시간대 관련 상품도 ${relatedItems.length}개 있으니 함께 비교해 보세요.` : "";
  const questions = [
    [`「${productName}」을(를) 어디에서 구매할 수 있나요?`, `「${esc(productName)}」은(는) 공영홈쇼핑 공식 사이트(gongyoungshop.kr)에서 구매하시거나, ${formatDate(item.date)} ${formatTime(item.start_time)}~${formatTime(item.end_time)} 방송 시간에 TV 채널을 통해 주문하실 수 있습니다. 위 구매 버튼을 클릭하면 공식 상품 페이지로 이동합니다.`],
    [`「${productName}」의 가격 ${price(item.price)}원은 확정 가격인가요?`, `본 사이트에 표시된 가격 ${price(item.price)}원은 공영홈쇼핑 API에서 제공하는 사전 등록 가격입니다. 실제 방송 중 특별 할인이나 가격 변경이 있을 수 있으니 최종 구매 가격은 공식 사이트에서 확인해 주세요.${cardText}`],
    [`「${productName}」 배송비는 정말 무료인가요?`, Number(item.free_shipping) ? "네, 이 상품은 무료배송이 적용됩니다. 다만 제주도 및 일부 도서산간 지역은 추가 배송비가 발생할 수 있으며, 정확한 배송 조건은 공영홈쇼핑 공식 사이트의 상품 상세 페이지에서 확인하시기 바랍니다." : "이 상품은 무료배송 표시가 확인되지 않았습니다. 배송비는 상품 구성, 지역, 공식 사이트 조건에 따라 달라질 수 있으니 구매 전 공식 상품 페이지에서 확인해 주세요."],
    [`「${productName}」을(를) 무이자 할부로 구매할 수 있나요?`, installment > 0 ? `네, 이 상품은 최대 ${installment}개월 무이자 할부가 가능합니다. 할부 적용 가능 카드사 및 세부 조건은 결제 단계에서 확인하실 수 있습니다. 단순 계산 기준으로는 월 약 ${price(Math.round(Number(item.price || 0) / installment))}원씩 나눠 부담할 수 있습니다.` : "현재 API 정보 기준으로 무이자 할부 개월 수가 확인되지 않습니다. 카드사별 행사나 결제 단계 조건에 따라 달라질 수 있으니 공식 사이트에서 최종 확인해 주세요."],
    [`「${productName}」은(는) ${Number(item.main) ? "단독 상품" : "세트/관련 상품"}인데 무슨 뜻인가요?`, Number(item.main) ? `이 상품은 ${formatTime(item.start_time)}~${formatTime(item.end_time)} 시간대의 대표 상품입니다. 해당 시간에 가장 주력으로 소개되는 상품입니다.${relatedText}` : "이 상품은 세트/관련 상품으로, 같은 시간대의 메인 상품과 함께 소개되는 구성품이나 옵션 상품입니다. 예를 들어 메인 상품의 소용량 버전이나 리필 상품 등이 이에 해당합니다."],
    [`「${productName}」 방송을 놓치면 어떻게 하나요?`, `방송 시간(${formatDate(item.date)} ${formatTime(item.start_time)}~${formatTime(item.end_time)})을 놓치더라도 공영홈쇼핑 공식 사이트에서 상품이 판매 중이라면 온라인으로 구매할 수 있습니다. 인기 상품의 경우 앵콜 방송이 편성될 수 있으니 편성표를 주기적으로 확인해 보세요.`]
  ];
  return `<div class="faq-section product-faq"><h2>❓ 「${esc(productName)}」 자주 묻는 질문</h2>${questions.map(([question, answer], index) => `<div class="faq-item${index === 0 ? " open" : ""}"><div class="faq-question"><span>Q. ${esc(question)}</span><span class="icon">▼</span></div><div class="faq-answer"><div class="faq-answer-inner">${answer}</div></div></div>`).join("")}</div>`;
}

async function popularPage(env) {
  const today = todayKst();
  const rows = (await env.DB.prepare("SELECT * FROM schedule WHERE date >= ? ORDER BY views DESC, date ASC, start_time ASC LIMIT 50").bind(today).all()).results || [];
  const list = rows.map((item, index) => `<a class="popular-card" href="/schedule/${item.date}/${encodeURIComponent(item.item_code)}"><div class="popular-rank">${index + 1}</div><div class="popular-body"><div class="popular-meta"><span>편성표</span><span>${formatDate(item.date)}</span><span>${Number(item.views || 0)}회</span></div><h3>${esc(decodeName(item.name))}</h3><p>${price(item.price)}원</p></div></a>`).join("");
  const empty = `<div class="empty-state"><h3>현재 표시할 인기 상품이 없습니다.</h3><p>편성표 데이터가 갱신되면 현재 방송 예정 상품 기준으로 다시 표시됩니다.</p></div>`;
  return htmlPage("오늘 인기 공영홈쇼핑 상품 TOP 50", `<section class="hero"><div class="container"><h1>🔥 오늘 인기 상품 TOP 50</h1><p>현재 조회된 공영홈쇼핑 방송 상품을 정리했습니다.</p></div></section><section class="section"><div class="container"><h2 class="section-title">조회수 기준 인기 상품</h2><div class="popular-list">${list || empty}</div></div></section>`, env, { active: "popular", canonical: "/popular/" });
}

async function introPageV2(env) {
  const channelRows = await loadChannelRows(env);
  const body = `<section class="hero"><div class="container"><h1>홈쇼핑뷰 공영홈쇼핑 가이드</h1><p>편성표, 상품 정보, 할인 혜택을 한눈에 비교하고 오늘의 방송 쇼핑을 더 똑똑하게 확인하세요.</p></div></section>
  ${introGuideSectionsHtml()}
  <section class="section"><div class="container">${channelGuideHtml(channelRows)}</div></section>
  ${faqSectionHtml()}`;
  return htmlPage("홈쇼핑뷰 공영홈쇼핑 소개", body, env, {
    active: "intro",
    canonical: "/intro/",
    description: "홈쇼핑뷰 공영홈쇼핑 소개, 운영 목적, 공공데이터 출처, 주요 기능, IPTV 및 케이블TV 전국 방송 채널 번호 안내."
  });
}

function introGuideSectionsHtml() {
  return `<section class="section">
    <div class="container">
      <div class="cards-grid">
        <div class="card" onclick="document.getElementById('intro-section').scrollIntoView({behavior:'smooth'})"><div class="card-icon">🏠</div><div class="card-body"><h3>공영홈쇼핑이란?</h3><p>공영홈쇼핑의 특징, 설립 목적, 일반 홈쇼핑과의 차이점을 알아보세요.</p></div></div>
        <div class="card" onclick="document.getElementById('site-section').scrollIntoView({behavior:'smooth'})"><div class="card-icon">🦉</div><div class="card-body"><h3>사이트 소개</h3><p>홈쇼핑뷰 공영홈쇼핑 사이트의 기능과 특징을 알아보세요.</p></div></div>
        <div class="card" onclick="document.getElementById('tips-section').scrollIntoView({behavior:'smooth'})"><div class="card-icon">💰</div><div class="card-body"><h3>알뜰 쇼핑 꿀팁</h3><p>카드 할인, 무이자 할부 등 더 싸게 사는 노하우를 공개합니다.</p></div></div>
        <div class="card" onclick="document.getElementById('howto-section').scrollIntoView({behavior:'smooth'})"><div class="card-icon">📺</div><div class="card-body"><h3>편성표 활용법</h3><p>편성표를 미리 확인하고 쇼핑 계획을 세우는 방법을 안내합니다.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section" id="intro-section"><div class="container"><div class="content-page">
    <h2>🏠 공영홈쇼핑이란?</h2>
    <h3>설립 목적과 배경</h3>
    <p>공영홈쇼핑(아이머스)은 대한민국 정부가 중소기업과 소상공인의 판로 확대를 위해 설립한 홈쇼핑 채널입니다. 2015년 9월 개국하였으며, 공식 명칭은 (주)공영홈쇼핑입니다. 기존 민영 홈쇼핑(CJ, 현대, GS, 롯데 등)과 달리 <strong>공공의 이익</strong>을 최우선으로 운영됩니다.</p>
    <h3>일반 홈쇼핑과의 차이점</h3>
    <p>공영홈쇼핑은 다른 민영 홈쇼핑 채널과 다음과 같은 차별점이 있습니다.</p>
    <ul><li><strong>중소기업 상품 비중이 높음:</strong> 전체 방송 상품의 70% 이상이 중소기업·소상공인 제품입니다.</li><li><strong>합리적인 가격 정책:</strong> 과도한 마진을 추구하지 않아 소비자가에서 경쟁력 있는 가격을 유지합니다.</li><li><strong>지역 특산품 집중 편성:</strong> 전국 각 지역의 농·수·축산물, 지역 특산품에 대한 방송 비중이 높습니다.</li><li><strong>사회적 약자 지원:</strong> 장애인 기업, 사회적 기업의 상품도 적극 편성합니다.</li><li><strong>상대적으로 낮은 송출 수수료:</strong> 중소기업 입점 시 수수료 부담이 적어 판매자와 소비자 모두에게 유리합니다.</li></ul>
    <h3>공영홈쇼핑 방송 시간</h3>
    <p>공영홈쇼핑은 <strong>24시간</strong> 운영됩니다. 새벽 시간대에는 주로 식품류, 낮 시간대에는 생활용품 및 패션, 저녁 시간대(프라임 타임)에는 인기 상품이 집중 편성되는 경향이 있습니다. 하루 평균 <strong>60개 이상의 상품</strong>이 방송되며, 한 방송 시간(40~65분) 동안 메인 상품 외에 세트 구성이나 관련 상품도 함께 소개됩니다.</p>
    <h3>공영홈쇼핑 시청 방법</h3>
    <p>공영홈쇼핑은 IPTV, 케이블TV, 위성방송 등 다양한 경로로 시청할 수 있습니다. 대부분의 IPTV에서는 <strong>21~22번 채널</strong>에서 시청 가능합니다. 자세한 지역별 채널 번호는 아래 방송 채널 안내를 참고하세요.</p>
  </div></div></section>

  <section class="section" id="site-section"><div class="container"><div class="content-page">
    <h2>홈쇼핑뷰 공영홈쇼핑 사이트 소개</h2>
    <h3>사이트 개요</h3>
    <p><strong>홈쇼핑뷰 공영홈쇼핑</strong>은 공공데이터포털(data.go.kr)에서 제공하는 공영홈쇼핑 오픈 API를 활용하여 TV 편성표와 상품 정보를 수집·정리하여 제공하는 독립 정보 사이트입니다.</p>
    <p>공영홈쇼핑 공식 사이트와는 별개로 운영되며, 소비자가 더 편리하게 편성 정보를 확인하고 합리적인 쇼핑을 할 수 있도록 돕는 것이 목표입니다.</p>
    <h3>주요 기능</h3>
    <ul><li><strong>날짜별 TV 편성표 조회:</strong> 오늘부터 최대 9일 후까지의 편성 일정을 날짜별로 확인할 수 있습니다.</li><li><strong>31개 항목의 상세 정보:</strong> 상품명, 가격, 할인율, 카드 혜택, 카테고리 4단계, 무이자 할부, 품절 여부 등 API에서 제공하는 모든 정보를 빠짐없이 표시합니다.</li><li><strong>메인·관련 상품 그룹핑:</strong> 같은 방송 시간대의 메인 상품과 부속 상품(세트/옵션)을 묶어서 보여드려 비교가 쉽습니다.</li><li><strong>자동 업데이트:</strong> 매일 자정에 자동으로 최신 편성 정보를 수집하여 항상 최신 상태를 유지합니다.</li><li><strong>공식 사이트 바로가기:</strong> 각 상품 상세 페이지에서 공영홈쇼핑 공식 구매 페이지로 바로 이동할 수 있습니다.</li></ul>
    <h3>데이터 출처</h3>
    <p>본 사이트의 모든 편성표 및 상품 정보는 <a href="https://www.data.go.kr/" target="_blank" rel="noopener">공공데이터포털(data.go.kr)</a>에서 제공하는 공영홈쇼핑 TV편성 상품정보 API를 통해 수집됩니다. 정보의 정확성을 위해 노력하고 있으나, 실제 방송 편성과 차이가 있을 수 있으므로 최종 확인은 <a href="https://www.gongyoungshop.kr" target="_blank" rel="noopener">공영홈쇼핑 공식 사이트</a>를 이용해 주세요.</p>
    <h3>주의사항</h3>
    <p>본 사이트는 공영홈쇼핑의 공식 사이트가 아닙니다. 상품의 직접 판매나 결제 기능을 제공하지 않으며, 실제 구매는 공영홈쇼핑 공식 사이트 또는 TV 생방송을 통해서만 가능합니다. 표시되는 가격은 API에서 제공하는 사전 등록 가격으로, 실제 방송 중 변동될 수 있습니다.</p>
  </div></div></section>

  <section class="section" id="tips-section"><div class="container"><div class="content-page">
    <h2>💰 공영홈쇼핑 알뜰 쇼핑 꿀팁 5가지</h2>
    <h3>1. 카드 할인을 반드시 확인하세요</h3><p>공영홈쇼핑은 특정 카드로 결제 시 <strong>추가 5~10% 할인</strong>이 적용되는 경우가 많습니다. 대표적으로 KB국민카드, 신한카드 등이 자주 제휴 할인을 진행합니다. 본 사이트 편성표에서 각 상품의 카드 할인 정보를 미리 확인할 수 있으므로, 결제 전 반드시 체크하세요.</p>
    <h3>2. 무이자 할부를 활용하세요</h3><p>고가 제품(가전, 가구, 건강기능식품 등)의 경우 <strong>3~6개월 무이자 할부</strong>가 제공되는 경우가 많습니다. 일시불이 부담되는 상품도 무이자 할부를 활용하면 경제적 부담 없이 구매할 수 있습니다. 본 사이트에서 무이자 할부 개월 수를 미리 확인할 수 있습니다.</p>
    <h3>3. 편성표를 미리 확인하고 쇼핑 계획을 세우세요</h3><p>본 사이트는 최대 <strong>9일 후 미래 편성표</strong>까지 미리 확인할 수 있습니다. 원하는 상품이 언제 방송되는지 사전에 파악하고, 방송 시간에 맞춰 TV를 시청하거나 공영홈쇼핑 사이트에 접속하면 놓치지 않고 구매할 수 있습니다.</p>
    <h3>4. 무료배송 상품을 노리세요</h3><p>공영홈쇼핑 상품의 대부분은 <strong>무료배송</strong>이 적용됩니다. 하지만 간혹 부피가 크거나 특수한 상품은 배송비가 별도로 부과될 수 있습니다. 본 사이트에서 무료배송 여부를 미리 체크하여 추가 비용 없이 쇼핑하세요.</p>
    <h3>5. 세트 구성 상품을 비교하세요</h3><p>같은 시간대에 메인 상품 외에도 <strong>세트 구성이나 단품 옵션</strong>이 함께 방송되는 경우가 많습니다. 예를 들어 메인 상품이 '사과 4.5kg'인데, 관련 상품으로 '사과 2kg 소용량'이 함께 판매될 수 있습니다. 본 사이트 편성표에서 메인 상품 아래에 관련 상품이 함께 표시되므로 쉽게 비교할 수 있습니다.</p>
  </div></div></section>

  <section class="section" id="howto-section"><div class="container"><div class="content-page">
    <h2>📺 편성표 이렇게 활용하세요</h2>
    <h3>STEP 1. 편성표 페이지로 이동</h3><p>상단 메뉴에서 <a href="/"><strong>📺 편성표</strong></a>를 클릭하세요. 오늘 날짜의 편성표가 기본으로 표시됩니다.</p>
    <h3>STEP 2. 날짜 선택</h3><p>상단의 날짜 탭을 눌러 원하는 날짜의 편성 일정을 확인합니다. <strong>오늘부터 최대 9일 후까지</strong>의 편성표를 미리 확인할 수 있습니다. 오늘 날짜는 '오늘' 표시가 되어 있어 쉽게 구분할 수 있습니다.</p>
    <h3>STEP 3. 상품 카드 확인</h3><p>각 방송 시간대별로 메인 상품이 카드 형태로 표시됩니다. 카테고리, 상품명, 가격, 할인율, 무료배송 여부, 무이자 할부, 카드 할인 등의 핵심 정보를 한눈에 확인할 수 있습니다. 메인 상품 아래에 '방송과 함께하는 상품'으로 관련 상품도 함께 표시됩니다.</p>
    <h3>STEP 4. 상세 페이지에서 31개 항목 확인</h3><p>관심 있는 상품 카드를 클릭하면 상세 페이지로 이동합니다. 상세 페이지에서는 <strong>31개의 세부 항목</strong>(가격 정보, 카드 할인 혜택, 카테고리 4단계 분류, 구매 링크, 쇼핑 호스트, 추가 이미지 등)을 모두 확인할 수 있으며, 같은 시간대에 함께 방송되는 관련 상품도 하단에서 비교할 수 있습니다.</p>
    <h3>STEP 5. 공식 사이트에서 구매</h3><p>상세 페이지의 <strong>'공영홈쇼핑에서 구매하기'</strong> 버튼을 클릭하면 공영홈쇼핑 공식 상품 페이지로 바로 이동합니다. PC와 모바일 링크가 모두 제공되므로 편한 환경에서 구매하실 수 있습니다.</p>
  </div></div></section>`;
}

function faqSectionHtml() {
  const faqs = [
    ["이 사이트는 공영홈쇼핑 공식 사이트인가요?", "아닙니다. 본 사이트는 공공데이터포털에서 제공하는 공영홈쇼핑 오픈 API를 활용하여 편성표 및 상품 정보를 정리·제공하는 독립 정보 사이트입니다. 공식적인 구매 및 결제는 공영홈쇼핑 공식 사이트(gongyoungshop.kr)를 이용해 주세요."],
    ["편성표 정보는 얼마나 자주 업데이트 되나요?", "매일 자정(00:00)에 자동으로 업데이트됩니다. 오늘부터 미래 9일까지 총 10일 치의 편성 정보를 수집하여 최신 상태를 유지합니다. 공영홈쇼핑 측에서 편성이 수정되더라도 자동으로 반영됩니다."],
    ["상품을 이 사이트에서 바로 구매할 수 있나요?", "본 사이트에서는 직접 구매가 불가능합니다. 상품 정보를 확인한 후, 공영홈쇼핑 공식 사이트 또는 TV 생방송을 통해 구매하실 수 있습니다. 각 상품 상세 페이지에서 공식 사이트 링크를 제공하고 있으니 참고해 주세요."],
    ["공영홈쇼핑은 다른 홈쇼핑보다 저렴한가요?", "공영홈쇼핑은 중소기업·소상공인 제품의 판로 확대를 위해 설립된 채널로, 과도한 마진 없이 합리적인 가격 정책을 운영합니다. 특히 지역 특산품이나 중소기업 제품의 경우 다른 유통 채널보다 경쟁력 있는 가격으로 구매할 수 있는 경우가 많습니다."],
    ["공영홈쇼핑 채널번호가 지역마다 다른가요?", "IPTV(KT Genie TV, SKB Btv, LG U+ TV)에서는 전국적으로 21~22번 채널에서 시청 가능합니다. 다만 케이블TV의 경우 지역과 SO(종합유선방송사업자)에 따라 채널 번호가 다를 수 있으니, 위 채널 안내표를 참고하거나 해당 케이블TV 사업자에게 문의해 주세요."]
  ];
  return `<section class="section"><div class="container"><div class="faq-section"><h2>❓ 자주 묻는 질문</h2>${faqs.map(([question, answer]) => `<div class="faq-item"><div class="faq-question"><span>Q. ${question}</span><span class="icon">▼</span></div><div class="faq-answer"><div class="faq-answer-inner">${answer}</div></div></div>`).join("")}</div></div></section>`;
}

async function loadChannelRows(env) {
  const fallback = [
    { region_group: "전국", area: "전국", analog_channel: "-", digital_channel: "22", operator: "KT Genie TV (구 olleh TV)" },
    { region_group: "전국", area: "전국", analog_channel: "-", digital_channel: "21", operator: "SKB Btv" },
    { region_group: "전국", area: "전국", analog_channel: "-", digital_channel: "21", operator: "LG U+ TV" },
    { region_group: "전국", area: "전국", analog_channel: "-", digital_channel: "21", operator: "KT Skylife" }
  ];
  try {
    const response = await env.ASSETS.fetch(new Request("https://homeshopview.com/channels.json"));
    if (!response.ok) return fallback;
    const rows = await response.json();
    return Array.isArray(rows) && rows.length ? rows : fallback;
  } catch {
    return fallback;
  }
}

function channelGuideHtml(rows) {
  const regions = [...new Set(rows.map((row) => row.region_group))];
  const commonRows = rows.filter((row) => row.region_group === "전국").slice(0, 4);
  const tabButtons = regions.map((region, index) => `<button class="region-tab${index === 0 ? " active" : ""}" data-region="${esc(region)}">${esc(region)}</button>`).join("");
  const cableRows = rows.map((row) => `<tr data-region="${esc(row.region_group)}"${row.region_group === "전국" ? "" : " style=\"display:none\""}><td>${esc(row.area)}</td><td>${esc(row.analog_channel)}</td><td>${esc(row.digital_channel)}</td><td>${esc(row.operator)}</td></tr>`).join("");
  const commonTableRows = commonRows.map((row) => `<tr><td>${esc(row.operator.includes("Skylife") ? "위성방송" : "IPTV")}</td><td>${esc(row.operator)}</td><td><strong style="color:var(--danger)">${esc(row.digital_channel)}</strong></td></tr>`).join("");
  return `<div class="channel-section">
    <h2 class="section-title">📡 전국 방송 채널 안내</h2>
    <p style="font-size:0.95rem;color:var(--text-light);margin-bottom:20px;">공영홈쇼핑은 IPTV 및 케이블TV를 통해 전국에서 시청할 수 있습니다. IPTV와 위성방송은 전국 공통 번호를 우선 확인하고, 케이블TV는 지역 탭을 눌러 확인해 주세요.</p>

    <h3 style="margin-bottom:12px;color:var(--primary-dark);font-size:1.1rem;">📺 IPTV 및 위성방송 전국 공통</h3>
    <table class="channel-table" style="margin-bottom:30px;">
      <thead><tr><th>종류</th><th>방송사</th><th>채널번호</th></tr></thead>
      <tbody>${commonTableRows}</tbody>
    </table>

    <h3 style="margin-bottom:12px;color:var(--primary-dark);font-size:1.1rem;">지역별 케이블TV 채널번호</h3>
    <div class="region-tabs">${tabButtons}</div>
    <table class="channel-table cable-table">
      <thead><tr><th>지역</th><th>아날로그/8VSB</th><th>디지털</th><th>케이블TV</th></tr></thead>
      <tbody>${cableRows}</tbody>
    </table>
    <p style="font-size:0.82rem;color:var(--text-muted);margin-top:12px;">※ 케이블TV 채널번호는 일부 지역 및 SO(종합유선방송사업자) 사정에 따라 위 표와 다를 수 있습니다. 정확한 채널번호는 해당 사업자 고객센터에서 확인해 주세요.</p>
  </div>`;
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
  const data = guideArticleData(title);
  return `<p>${data.intro}</p>
  <h2>핵심 확인 포인트</h2>
  <ul>${data.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  <h2>주의사항</h2>
  <p>${data.caution}</p>
  <h2>알뜰 활용 팁</h2>
  <p>${data.tip}</p>
  ${guideSeoBody(title, data)}
  <div class="faq-section guide-faq"><h2>❓ 자주 묻는 질문</h2>${data.faqs.map(([question, answer], index) => `<div class="faq-item${index === 0 ? " open" : ""}"><div class="faq-question"><span>Q. ${question}</span><span class="icon">▼</span></div><div class="faq-answer"><div class="faq-answer-inner">${answer}</div></div></div>`).join("")}</div>`;
}

function guideSeoBody(title, data) {
  return `<h2>${title}를 볼 때 먼저 정리할 기준</h2>
  <p>${title}에서 가장 중요한 기준은 방송 화면의 강한 문구보다 실제 구매자가 확인할 수 있는 객관적인 정보입니다. 홈쇼핑 상품은 한정 수량, 방송 전용 구성, 카드 혜택, 무이자 할부, 무료배송 표시가 함께 노출되기 때문에 순간적으로 저렴해 보일 수 있습니다. 하지만 같은 가격이라도 구성 수량이 다르면 체감 단가가 달라지고, 같은 무료배송이라도 제주도나 도서산간 지역은 추가 비용이 붙을 수 있습니다. 따라서 편성표를 볼 때는 상품명, 방송 시간, 판매가, 정상가, 배송 조건, 구매 링크를 한 번에 확인하고 공식 판매 페이지에서 최종 조건을 다시 대조하는 습관이 필요합니다.</p>
  <p>특히 공영홈쇼핑 편성표는 식품, 건강식품, 생활가전, 패션, 주방용품처럼 상품군이 다양합니다. 식품은 원산지와 중량, 건강식품은 기능성 표시와 섭취 대상, 생활가전은 설치 조건과 AS, 패션은 사이즈와 교환 조건이 핵심입니다. ${title}를 읽는 목적은 단순히 “싸다”를 판단하는 것이 아니라, 내 상황에 맞는 상품인지, 방송 시간이 지난 뒤에도 구매 가능한지, 실제 결제 단계에서 가격이 달라질 가능성이 있는지를 미리 점검하는 데 있습니다.</p>
  <h2>편성표와 공식 구매 페이지를 함께 보는 이유</h2>
  <p>홈쇼핑뷰는 공공데이터 기반으로 공영홈쇼핑 방송 편성 정보를 정리합니다. 이 정보는 방송 전 상품을 비교하고 일정을 확인하는 데 유용하지만, 최종 판매 조건을 대신하지는 않습니다. 방송 편성은 갑자기 변경될 수 있고, 상품 상세 페이지의 사은품, 카드 할인, 재고 상태, 배송 일정도 시점에 따라 달라질 수 있습니다. 그래서 편성표에서 관심 상품을 찾은 뒤에는 반드시 공식 구매 페이지로 이동해 가격과 조건을 다시 확인하는 것이 좋습니다.</p>
  <p>공식 페이지를 확인할 때는 판매가만 보지 말고 구성품 전체를 확인해야 합니다. 예를 들어 같은 고기 세트라도 총 중량, 부위 구성, 팩 수, 원산지가 다르면 실제 가치는 크게 달라집니다. 생활가전은 본체만 포함되는지, 필터나 추가 부속품이 포함되는지에 따라 유지 비용이 달라집니다. 패션 상품은 색상 선택 가능 여부와 사이즈 교환 가능 기간을 확인해야 합니다. 이런 항목을 함께 보면 방송 중 충동구매를 줄이고, 필요한 상품을 더 안정적으로 고를 수 있습니다.</p>
  <h2>가격과 혜택을 비교하는 방법</h2>
  <p>${title}에서 가격을 볼 때는 정상가, 판매가, 할인율, 카드 혜택을 분리해서 보는 것이 좋습니다. 할인율이 높아도 정상가 기준이 높게 잡혀 있으면 실제 혜택이 크지 않을 수 있고, 반대로 할인율 표시는 작아도 무료배송이나 무이자 할부, 추가 구성품이 붙으면 체감 조건이 좋아질 수 있습니다. 특히 카드 청구 할인은 결제 카드, 결제 금액, 행사 기간에 따라 적용 여부가 달라지므로 결제 직전 화면에서 최종 금액을 확인해야 합니다.</p>
  <p>무이자 할부는 실제 가격을 깎아 주는 혜택은 아니지만, 큰 금액의 생활가전이나 대용량 세트 상품을 구매할 때 부담을 나누는 데 도움이 됩니다. 다만 할부 개월 수가 길다고 무조건 좋은 것은 아닙니다. 꼭 필요한 상품인지, 보관 공간이 충분한지, 월별 지출 계획에 맞는지까지 생각해야 합니다. 홈쇼핑은 방송 시간의 압박이 있기 때문에 가격 비교를 미리 해 두면 훨씬 차분하게 판단할 수 있습니다.</p>
  <h2>구매 전 마지막 체크리스트</h2>
  <ul>
    <li>상품명과 모델명 또는 구성품명이 공식 페이지와 같은지 확인합니다.</li>
    <li>방송 날짜와 시간, 판매 상태, 품절 여부를 확인합니다.</li>
    <li>무료배송, 무이자 할부, 카드 할인 조건이 실제 결제 단계에 적용되는지 확인합니다.</li>
    <li>식품은 중량과 원산지, 건강식품은 섭취 주의사항, 가전은 AS와 설치 조건, 패션은 사이즈표를 확인합니다.</li>
    <li>교환·반품 가능 기간과 왕복 배송비 부담 여부를 확인합니다.</li>
  </ul>
  <p>이 체크리스트를 기준으로 보면 ${title}는 단순한 안내 글이 아니라 공영홈쇼핑 편성표를 실전에서 활용하기 위한 기준표가 됩니다. 방송 상품은 시간이 지나면 가격과 구성이 바뀔 수 있으므로, 오늘 방송되는 상품은 오늘 조건으로 확인하고, 며칠 뒤 다시 편성되는 상품은 다시 비교하는 방식이 가장 안전합니다. 홈쇼핑뷰의 편성표, 인기 상품, 가이드 글을 함께 활용하면 필요한 상품을 놓치지 않고 더 신중하게 비교할 수 있습니다.</p>`;
}

function guideArticleData(title) {
  const common = {
    intro: `공영홈쇼핑 편성표를 확인할 때는 단순히 상품명만 보는 것보다 방송 시간, 가격, 배송 조건, 카드 혜택, 공식 구매 링크를 함께 확인하는 것이 좋습니다. 같은 상품이라도 방송 회차나 구성에 따라 가격과 혜택이 달라질 수 있기 때문입니다. ${title}에서는 실제 구매 전에 확인하면 좋은 기준을 중심으로 정리합니다.`,
    points: ["방송 날짜와 시작 시간을 먼저 확인합니다.", "표시 가격과 정상가, 할인율을 함께 비교합니다.", "무료배송, 무이자 할부, 카드 할인 조건을 확인합니다.", "공식 구매 페이지에서 최종 판매 조건을 다시 확인합니다."],
    caution: "홈쇼핑뷰는 공공데이터를 기반으로 편성 정보를 정리하지만, 최종 판매 조건은 공영홈쇼핑 공식 사이트에서 바뀔 수 있습니다. 구매 전에는 공식 상품 페이지에서 가격, 배송, 반품, 재고 상태를 다시 확인해 주세요.",
    tip: "관심 상품은 방송 시작 전에 미리 확인해 두고, 비슷한 시간대의 관련 상품이나 세트 상품까지 함께 비교하면 실제 체감 가격을 더 정확하게 판단할 수 있습니다.",
    faqs: [["이 정보만 보고 바로 구매해도 되나요?", "아니요. 본문 정보는 비교를 돕기 위한 안내이며, 최종 구매 조건은 공영홈쇼핑 공식 사이트에서 확인해야 합니다."], ["방송 시간이 지나면 상품을 살 수 없나요?", "방송이 끝나도 공식 사이트에서 판매가 유지되는 경우가 있습니다. 다만 재고와 가격은 바뀔 수 있습니다."], ["무료배송 표시는 항상 맞나요?", "API 기준 정보이므로 대부분 참고할 수 있지만, 제주 및 도서산간 지역은 추가 배송비가 붙을 수 있습니다."]]
  };
  if (title.includes("식품")) return {
    intro: "식품 방송 상품은 화면에서 보이는 양과 실제 수령하는 중량, 포장 단위, 원산지, 보관 방식이 만족도를 크게 좌우합니다. 특히 냉장·냉동 상품은 배송 일정과 보관 조건이 중요하므로 가격만 보고 판단하기보다 구성과 조건을 함께 확인해야 합니다.",
    points: ["총 중량과 개당 중량을 나누어 실제 단가를 계산합니다.", "원산지, 제조원, 가공 방식, 보관 방법을 확인합니다.", "냉장·냉동 배송 여부와 수령 가능 시간을 고려합니다.", "소비기한 또는 유통기한 표기가 있는지 확인합니다."],
    caution: "식품은 단순 변심 반품이 제한될 수 있고, 개봉 후에는 교환이 어려운 경우가 많습니다. 방송 중 제공되는 추가 구성이나 사은품도 공식 상품 페이지에서 다시 확인하는 것이 좋습니다.",
    tip: "동일한 식품이라도 대용량 세트와 소용량 세트의 단가가 다릅니다. 가족 구성원 수와 보관 공간을 기준으로 실제 소진 가능한 양을 선택하면 낭비를 줄일 수 있습니다.",
    faqs: [["식품은 방송 후에도 같은 가격으로 살 수 있나요?", "방송 혜택은 시간 한정인 경우가 있어 방송 후 가격이나 구성품이 바뀔 수 있습니다."], ["원산지는 어디서 확인하나요?", "상품 상세 페이지의 원산지 표시와 공식 판매 페이지를 함께 확인하는 것이 가장 안전합니다."], ["냉동식품은 반품이 가능한가요?", "상품 특성상 단순 변심 반품이 제한될 수 있으므로 구매 전 반품 조건을 확인해야 합니다."]]
  };
  if (title.includes("건강")) return {
    intro: "건강식품은 가격보다 표시 내용과 섭취 대상 확인이 중요합니다. 기능성 표현, 원료명, 함량, 섭취 방법, 알레르기 성분을 확인하고 본인에게 맞는 상품인지 차분히 판단해야 합니다.",
    points: ["기능성 표현이 과장되어 있지 않은지 확인합니다.", "주요 원료와 1일 섭취량 기준 함량을 확인합니다.", "임산부, 어린이, 특정 질환자 섭취 주의 문구를 확인합니다.", "정기 섭취가 필요한 상품인지 비용을 계산합니다."],
    caution: "건강식품은 질병 치료제가 아닙니다. 복용 중인 약이 있거나 특정 질환이 있다면 전문가와 상담한 뒤 구매하는 것이 좋습니다.",
    tip: "한 번에 많은 세트를 구매하기보다 섭취 기간, 보관 기간, 본인에게 맞는지 여부를 기준으로 필요한 수량을 선택하세요.",
    faqs: [["건강식품은 효과가 보장되나요?", "개인 상태에 따라 체감이 다르며, 질병 예방이나 치료 효과를 보장하는 상품으로 보면 안 됩니다."], ["함량은 어떻게 비교하나요?", "총량보다 1일 섭취량 기준 함량을 비교하는 것이 좋습니다."], ["선물용으로 사도 괜찮나요?", "섭취 대상과 알레르기 성분을 먼저 확인하는 것이 안전합니다."]]
  };
  if (title.includes("생활가전")) return {
    intro: "생활가전은 방송 가격뿐 아니라 설치 조건, AS, 소비전력, 구성품, 소모품 비용까지 함께 확인해야 합니다. 화면에 보이는 본체 가격이 좋아 보여도 유지비와 설치 조건에 따라 실제 만족도가 달라질 수 있습니다.",
    points: ["무상 AS 기간과 서비스 가능 지역을 확인합니다.", "기본 구성품과 추가 구매가 필요한 소모품을 구분합니다.", "설치형 제품은 설치비와 공간 조건을 확인합니다.", "소비전력과 사용 빈도를 기준으로 유지비를 계산합니다."],
    caution: "가전제품은 개봉 또는 설치 후 반품이 제한될 수 있습니다. 제품 크기와 설치 공간을 미리 재고, 공식 판매 페이지의 교환·반품 조건을 꼭 확인하세요.",
    tip: "비슷한 제품이 여러 날짜에 편성될 수 있으므로 인기 페이지와 편성표를 같이 보고 가격, 구성품, AS 조건을 비교하면 좋습니다.",
    faqs: [["설치비가 항상 포함되나요?", "상품마다 다릅니다. 설치형 제품은 무료 설치 여부와 추가 설치비 조건을 공식 페이지에서 확인해야 합니다."], ["AS는 어디서 받나요?", "대부분 제조사 또는 판매처 기준으로 처리되며, 상품 상세 페이지의 AS 안내를 확인해야 합니다."], ["구성품은 방송 화면과 같나요?", "방송 중 구성과 온라인 상세 구성은 다를 수 있으므로 구매 전 구성품 목록을 확인하세요."]]
  };
  if (title.includes("패션")) return {
    intro: "패션 상품은 화면 색상과 실제 색감, 사이즈감이 다를 수 있습니다. 특히 세트 상품은 구성별 소재와 치수, 교환 조건을 함께 확인해야 만족도가 높습니다.",
    points: ["사이즈표에서 가슴둘레, 허리, 총장 등 실측을 확인합니다.", "소재와 세탁 방법을 확인합니다.", "세트 구성의 색상과 수량을 정확히 봅니다.", "교환 가능 기간과 왕복 배송비 조건을 확인합니다."],
    caution: "화면 색상은 조명과 모니터에 따라 다르게 보일 수 있습니다. 착용 후 상품 가치가 훼손되면 교환·반품이 제한될 수 있으니 수령 후 택 제거 전 상태를 확인하세요.",
    tip: "평소 입는 사이즈보다 실측표를 기준으로 고르는 편이 안전합니다. 여유핏 상품과 정사이즈 상품은 같은 사이즈라도 착용감이 다를 수 있습니다.",
    faqs: [["사이즈가 안 맞으면 교환되나요?", "상품별 교환 조건에 따라 다릅니다. 택 제거 전, 착용 흔적이 없는 상태에서만 가능한 경우가 많습니다."], ["색상이 화면과 다르면 반품 가능한가요?", "모니터 차이는 단순 변심으로 처리될 수 있어 공식 반품 조건을 확인해야 합니다."], ["세트 상품 일부만 교환되나요?", "대부분 전체 세트 기준으로 처리되므로 구성품 전체 보관이 필요합니다."]]
  };
  if (title.includes("가격")) return {
    intro: "홈쇼핑 상품 가격은 방송 시간, 카드 혜택, 구성 변경, 한정 수량, 사은품 여부에 따라 달라질 수 있습니다. 표시 가격만 보고 판단하기보다 최종 결제 가격을 기준으로 비교해야 합니다.",
    points: ["정상가, 판매가, 할인율을 구분합니다.", "카드 할인과 ARS 할인 적용 조건을 확인합니다.", "무이자 할부가 실제 필요한 혜택인지 판단합니다.", "구성품이 바뀌면 단가도 다시 계산합니다."],
    caution: "방송 중 혜택은 한시적으로 운영될 수 있습니다. API에 표시된 가격과 실제 결제 단계의 가격이 다를 수 있으므로 최종 결제 전 반드시 확인해야 합니다.",
    tip: "같은 상품이 며칠 뒤 다시 편성되는 경우가 있습니다. 급하지 않은 상품은 날짜별 편성표를 비교해 더 좋은 조건을 찾는 것이 좋습니다.",
    faqs: [["표시 가격과 결제 가격이 다를 수 있나요?", "네. 카드 할인, 쿠폰, 방송 조건에 따라 결제 가격이 달라질 수 있습니다."], ["할인율이 높으면 무조건 좋은가요?", "정상가 기준이 다를 수 있어 최종 판매가와 구성품을 함께 봐야 합니다."], ["무이자 할부는 할인인가요?", "가격 할인은 아니지만 결제 부담을 나누는 혜택입니다."]]
  };
  return common;
}

function staticLegalPage(title, content, env) {
  return htmlPage(`${title} - 홈쇼핑뷰`, `<section class="section"><div class="container"><div class="content-page"><h1>${title}</h1>${content}</div></div></section>`, env, { canonical: `/${title === "이용약관" ? "terms" : title === "개인정보처리방침" ? "privacy" : "contact"}/` });
}

function termsHtml() {
  return `<p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:30px;">시행일: 2026년 5월 9일 | 최종 수정: 2026년 5월 9일</p>
  <h2>제1조 목적</h2><p>본 약관은 홈쇼핑뷰 공영홈쇼핑 정보 사이트(이하 "서비스")가 제공하는 편성표 및 상품 정보 이용 조건과 절차, 이용자와 서비스의 권리·의무 및 책임사항을 안내합니다.</p>
  <h2>제2조 서비스의 내용</h2><p>서비스는 다음 기능을 제공합니다.</p><ul><li>공영홈쇼핑 TV 편성표 정보의 수집 및 제공</li><li>상품별 가격, 할인율, 카드 할인 정보 안내</li><li>날짜별 편성 일정 검색 기능</li><li>공영홈쇼핑 이용 가이드 및 알뜰 쇼핑 정보 제공</li><li>방송 채널 안내</li></ul>
  <h2>제3조 정보의 출처 및 정확성</h2><p>서비스에서 제공되는 편성표 및 상품 정보는 공공데이터포털(data.go.kr)에서 제공하는 공영홈쇼핑 오픈 API를 통해 수집됩니다.</p><p>서비스는 정보의 정확성을 위해 노력하지만, 실제 방송 편성 및 상품 가격은 공영홈쇼핑 공식 사이트(gongyoungshop.kr)에서 반드시 확인하시기 바랍니다.</p><p>편성표 변경, 가격 변동, 상품 품절 등으로 인한 차이가 발생할 수 있으며, 이로 인한 불이익에 대해 서비스는 책임지지 않습니다.</p>
  <h2>제4조 이용자의 의무</h2><p>이용자는 다음 행위를 하여서는 안 됩니다.</p><ul><li>서비스의 정상적인 운영을 방해하는 행위</li><li>자동화된 수단을 이용한 대량의 데이터 수집 행위</li><li>서비스 정보를 상업적 목적으로 무단 복제하는 행위</li><li>타인의 개인정보를 침해하는 행위</li></ul>
  <h2>제5조 지적재산권</h2><p>서비스의 디자인, 소프트웨어, 편집 저작물에 대한 권리는 홈쇼핑뷰에 있습니다. 공영홈쇼핑 상품 이미지 및 편성표 원천 데이터의 저작권은 각 권리자에게 있습니다.</p><p>이용자는 서비스의 콘텐츠를 운영자의 사전 동의 없이 복제, 배포, 상업적으로 이용할 수 없습니다.</p>
  <h2>제6조 면책</h2><p>서비스는 천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단에 대해 책임지지 않습니다.</p><p>이용자가 서비스의 정보를 바탕으로 한 구매 결정으로 발생하는 손해에 대해서는 책임지지 않습니다.</p><p>본 사이트는 공영홈쇼핑의 공식 사이트가 아니며, 상품을 직접 판매하거나 결제 기능을 제공하지 않습니다.</p>
  <h2>제7조 광고 정책</h2><p>서비스는 운영 비용 충당을 위해 Google AdSense 등의 광고를 게재할 수 있습니다. 광고 클릭 시 외부 사이트로 이동할 수 있으며, 외부 사이트에서 발생하는 거래·계약·손해는 해당 광고주의 책임입니다.</p>
  <h2>제8조 약관의 변경</h2><p>본 약관은 관련 법령 또는 서비스 정책 변경에 따라 수정될 수 있으며, 변경 내용은 서비스에 공지 후 적용됩니다.</p>
  <h2>제9조 준거법 및 관할</h2><p>본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁은 민사소송법상 관할 법원에 제기합니다.</p>
  <h2>제10조 문의</h2><p>본 약관에 관한 문의사항은 <a href="/contact/">문의 페이지</a> 또는 전화 0507-2834-5978로 연락해 주시기 바랍니다.</p>`;
}

function privacyHtml() {
  return `<p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:30px;">시행일: 2026년 5월 9일 | 최종 수정: 2026년 5월 9일</p>
  <p>홈쇼핑뷰 공영홈쇼핑(이하 "서비스")은 이용자의 개인정보를 중요하게 생각하며, 개인정보 보호법을 준수합니다. 본 방침은 서비스 이용 과정에서 처리될 수 있는 정보의 항목, 이용 목적, 보유 기간 등을 안내합니다.</p>
  <h2>1. 수집하는 개인정보 항목</h2><p>서비스는 별도의 회원가입 없이 이용 가능하며, 주민등록번호, 결제 정보, 주소 등 민감한 개인정보를 직접 수집하지 않습니다.</p><ul><li>접속 IP 주소(보안 및 통계 목적)</li><li>방문 일시, 이용 기록</li><li>브라우저 종류, 운영체제 정보</li><li>문의 시 이용자가 직접 제공한 연락 정보</li></ul>
  <h2>2. 개인정보의 수집 및 이용 목적</h2><ul><li>서비스 이용 통계 분석 및 품질 개선</li><li>인기 상품 및 트래픽 분석</li><li>서비스 안정성 확보 및 부정 이용 방지</li><li>문의 사항에 대한 답변 제공</li></ul>
  <h2>3. 개인정보의 보유 및 이용 기간</h2><p>수집된 정보는 수집 목적 달성 후 지체 없이 파기합니다.</p><ul><li>접속 로그: 최대 90일 보관 후 자동 삭제</li><li>문의 기록: 답변 완료 후 필요한 기간 동안 보관 후 삭제</li></ul>
  <h2>4. 개인정보의 제3자 제공</h2><p>서비스는 이용자의 개인정보를 외부에 제공하지 않습니다. 다만 법령에 의해 요구되는 경우는 예외로 합니다.</p>
  <h2>5. 쿠키 사용</h2><p>서비스는 이용 경험 개선과 통계 분석을 위해 쿠키를 사용할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
  <h2>6. 광고 서비스</h2><p>서비스는 Google AdSense 등 광고 서비스를 사용할 수 있으며, 광고 제공 업체가 쿠키를 통해 이용자의 관심사 기반 광고를 게재할 수 있습니다. 자세한 내용은 <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">Google 광고 정책</a>에서 확인할 수 있습니다.</p>
  <h2>7. 개인정보 보호를 위한 기술적 조치</h2><ul><li>SSL/TLS 암호화 통신 적용</li><li>접근 권한 최소화 및 관리</li><li>불필요한 개인정보 수집 제한</li></ul>
  <h2>8. 개인정보 관련 문의</h2><p>개인정보 처리에 관한 문의사항은 <a href="/contact/">문의 페이지</a> 또는 전화 0507-2834-5978로 연락해 주시기 바랍니다.</p>`;
}

function contactHtml() {
  return `<p>서비스 이용 중 궁금한 점이 있거나, 정보 오류를 발견하셨다면 아래 연락처로 편하게 문의해 주세요.</p>
  <div style="background:var(--bg);border-radius:var(--radius-sm);padding:30px;margin:30px 0;text-align:center;">
    <p style="font-size:1.3rem;font-weight:700;color:var(--primary-dark);margin-bottom:16px;">홈쇼핑뷰</p>
    <p style="font-size:1.05rem;margin-bottom:8px;"><strong>전화문의:</strong> <a href="tel:0507-2834-5978" style="font-weight:700;color:var(--primary-light);">0507-2834-5978</a></p>
    <p style="font-size:1.05rem;margin-bottom:8px;"><strong>이메일:</strong> <span style="font-weight:700;color:var(--primary-light);">songchanghag790@gmail.com</span></p>
    <p style="font-size:0.9rem;color:var(--text-muted);">운영시간: 평일 10:00 ~ 18:00 (점심시간 12:00 ~ 13:00)</p>
  </div>
  <h2>문의 유형 안내</h2>
  <p><strong>정보 오류 신고:</strong> 편성표 정보나 상품 가격 등에 오류가 있는 경우 알려주시면 확인 후 수정하겠습니다.</p>
  <p><strong>사이트 건의:</strong> 추가되었으면 하는 기능이나 개선 사항이 있으면 의견을 보내주세요.</p>
  <p><strong>기타 문의:</strong> 제휴, 광고, 기타 문의도 환영합니다.</p>`;
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
  const page = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(title)}</title><meta name="description" content="${esc(description)}">${robotsMeta}<link rel="canonical" href="${esc(canonical)}"><link rel="icon" href="/favicon.png?v=20260522" type="image/png"><link rel="shortcut icon" href="/favicon.png?v=20260522" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=20260522"><meta property="og:type" content="website"><meta property="og:site_name" content="${esc(env.SITE_NAME || "홈쇼핑뷰 공영홈쇼핑")}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(new URL("og-image.png?v=20260522", siteUrl(env)).toString())}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${esc(new URL("og-image.png?v=20260522", siteUrl(env)).toString())}"><link rel="stylesheet" href="/css/style.css"></head><body>${header(options.active || "")}${body}${footer()}<script src="/js/main.js"></script></body></html>`;
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
