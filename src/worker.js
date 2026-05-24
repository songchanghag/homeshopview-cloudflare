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
  ["public-data-guide", "공공데이터 기반 편성표 활용법", "홈쇼핑뷰는 공공데이터 기반 편성 정보를 보기 쉽게 정리해 방송 전 비교와 확인을 돕습니다."],
  ["small-business-guide", "공영홈쇼핑과 중소기업 상품 이해하기", "공영홈쇼핑에는 중소기업과 소상공인 상품이 많이 편성됩니다. 브랜드보다 상품 조건을 보는 기준이 중요합니다."],
  ["farm-fishery-guide", "농축수산물 방송 상품 고르는 법", "농산물, 축산물, 수산물은 산지, 등급, 손질 상태, 보관 방법에 따라 실제 만족도가 크게 달라집니다."],
  ["seasonal-guide", "명절·시즌 상품 편성표 활용법", "명절 선물세트와 계절 상품은 배송 마감, 보관 기간, 구성품 변동을 미리 확인해야 합니다."],
  ["live-shopping-guide", "TV 생방송 주문과 온라인 구매 차이", "TV 방송 중 주문, 모바일 앱 구매, 공식 사이트 구매는 혜택과 확인 방식이 다를 수 있습니다."],
  ["senior-shopping-guide", "부모님 선물용 홈쇼핑 상품 고르는 법", "부모님 선물은 가격보다 사용 편의성, 배송, AS, 섭취·착용 조건을 먼저 확인하는 것이 좋습니다."],
  ["first-time-guide", "공영홈쇼핑 처음 이용하는 사람을 위한 안내", "처음 이용한다면 편성표, 공식 구매 링크, 주문 방식, 배송과 반품 조건을 순서대로 확인하는 것이 좋습니다."],
  ["kitchenware-guide", "주방용품 홈쇼핑 구매 전 확인할 점", "프라이팬, 냄비, 칼, 보관용기 같은 주방용품은 소재, 코팅, 크기, 관리법을 확인해야 오래 사용할 수 있습니다."],
  ["beauty-guide", "화장품·이미용 상품 홈쇼핑 구매 가이드", "화장품과 이미용 기기는 피부 타입, 구성품, 사용 주기, 개봉 후 반품 조건을 신중히 확인해야 합니다."],
  ["bundle-guide", "홈쇼핑 세트 구성과 사은품 비교법", "세트 상품과 사은품은 좋아 보이지만 실제 필요한 구성인지, 단가가 합리적인지 따져 봐야 합니다."],
  ["soldout-guide", "품절·매진 임박 상품을 볼 때 주의할 점", "품절 임박 문구는 구매를 서두르게 만들 수 있으므로 재고, 대체 상품, 방송 후 구매 가능성을 함께 확인해야 합니다."],
  ["card-discount-guide", "공영홈쇼핑 카드 할인 혜택 확인법", "카드 청구 할인과 즉시 할인은 적용 방식이 다르므로 결제 전 조건과 최종 금액을 확인해야 합니다."],
  ["order-delivery-guide", "공영홈쇼핑 주문·배송 확인 가이드", "주문 후에는 배송 예정일, 송장, 수령 가능 시간, 신선식품 보관 조건을 함께 확인하는 것이 좋습니다."],
  ["customer-center-guide", "공영홈쇼핑 고객센터 문의 전 준비사항", "주문, 배송, 반품, 상품 오류 문의 전에는 상품명, 주문번호, 방송일, 사진 자료를 정리해 두면 좋습니다."],
  ["mobile-app-guide", "공영홈쇼핑 모바일 앱 구매 활용법", "모바일 앱 구매는 쿠폰, 알림, 주문 확인이 편하지만 앱 전용 조건과 결제 화면을 꼼꼼히 확인해야 합니다."],
  ["review-check-guide", "홈쇼핑 상품 후기와 상세정보 읽는 법", "후기는 참고 자료일 뿐이므로 상품 상세정보, 구성품, 조건, 반복되는 불만을 함께 확인해야 합니다."],
  ["budget-guide", "홈쇼핑 충동구매 줄이는 예산 관리법", "방송 혜택에 흔들리지 않으려면 월 예산, 필요 상품 목록, 재구매 기준을 미리 정해 두는 것이 좋습니다."]
];

const INDEXABLE_PRODUCT_LIMIT = 300;

const CATEGORY_PAGES = {
  food: {
    title: "식품 홈쇼핑 상품 모아보기",
    heading: "식품 방송 상품",
    description: "공영홈쇼핑 식품 편성 상품을 모아보고 중량, 원산지, 보관 방식, 소비기한, 배송 조건을 함께 확인하세요.",
    keywords: ["식품", "농산", "수산", "축산", "김치", "쌀", "한우", "굴비", "과일", "반찬", "간편식"],
    guide: ["food-guide", "식품 방송 상품 구매 가이드"],
    points: ["총 중량과 개별 포장 단위를 확인합니다.", "원산지, 등급, 손질 상태를 비교합니다.", "냉장·냉동 배송과 수령 가능 시간을 확인합니다.", "소비기한과 보관 방법을 공식 상품 페이지에서 다시 확인합니다."],
    faq: [["식품 홈쇼핑 상품은 가격만 비교해도 되나요?", "아니요. 식품은 총 중량, 실중량, 원산지, 보관 방식, 배송 조건을 함께 봐야 실제 만족도를 판단하기 쉽습니다."], ["냉동식품은 어떤 점을 확인해야 하나요?", "수령 가능 시간, 냉동 보관 공간, 해동 후 재냉동 가능 여부, 소비기한을 확인하는 것이 좋습니다."], ["방송 화면의 조리 예시는 실제 구성인가요?", "조리 예시는 연출 이미지일 수 있으므로 실제 구성품과 중량은 공식 상품 페이지의 상세 정보를 기준으로 확인해야 합니다."], ["식품 방송 상품은 언제 주문하는 것이 좋나요?", "신선식품이나 냉동식품은 수령 가능한 날짜와 시간을 먼저 생각한 뒤 주문하는 것이 좋습니다. 장시간 부재가 예상되면 배송 상태가 만족도에 영향을 줄 수 있습니다."], ["선물용 식품은 무엇을 더 확인해야 하나요?", "포장 상태, 배송 가능 지역, 도착 예정일, 받는 사람의 보관 가능 여부를 함께 확인해야 합니다. 명절 전후에는 배송 마감일도 중요합니다."]]
  },
  health: {
    title: "건강식품 방송 상품",
    heading: "건강식품 편성 상품",
    description: "공영홈쇼핑 건강식품 방송 상품을 모아보고 기능성 표현, 섭취 대상, 원료, 알레르기 성분, 공식 주의사항을 확인하세요.",
    keywords: ["건강", "홍삼", "유산균", "비타민", "영양", "콜라겐", "오메가", "루테인", "프로폴리스"],
    guide: ["health-guide", "건강식품 구매 전 확인사항"],
    points: ["질병 치료 효과처럼 보이는 표현은 주의합니다.", "주요 성분의 1일 섭취량 기준 함량을 확인합니다.", "복용 중인 약이나 알레르기 성분과 충돌하지 않는지 확인합니다.", "총 포장 수보다 실제 섭취 가능 일수를 계산합니다."],
    faq: [["건강식품 방송 상품은 효능이 보장되나요?", "아니요. 건강기능식품은 개인의 건강 상태와 섭취 습관에 따라 체감이 다를 수 있으며 질병 치료제로 이해하면 안 됩니다."], ["성분 함량은 어떻게 비교해야 하나요?", "총 용량보다 1일 섭취량 기준의 주요 성분 함량과 섭취 가능 일수를 기준으로 비교하는 것이 좋습니다."], ["부모님 선물로 건강식품을 사도 괜찮나요?", "복용 중인 약, 알레르기, 기저질환이 있을 수 있으므로 공식 주의사항을 확인하고 필요한 경우 전문가와 상담하는 것이 안전합니다."], ["건강식품은 대용량 구성이 유리한가요?", "꾸준히 섭취할 수 있는 맛과 제형인지가 먼저입니다. 처음 먹어보는 성분이라면 대용량보다 섭취 주의사항과 보관 기간을 먼저 확인하는 것이 좋습니다."], ["질병명이나 치료 효과가 보이면 어떻게 봐야 하나요?", "건강식품은 질병 치료제가 아닙니다. 질병 치료·예방처럼 보이는 표현은 주의하고, 공식 상품 페이지의 기능성 표시와 섭취 대상 기준을 확인해야 합니다."]]
  },
  kitchen: {
    title: "주방용품 홈쇼핑 상품",
    heading: "주방용품 편성 상품",
    description: "공영홈쇼핑 주방용품 편성 상품을 모아보고 소재, 코팅, 크기, 구성품, 관리법, 반품 조건을 함께 확인하세요.",
    keywords: ["주방", "프라이팬", "냄비", "칼", "도마", "용기", "조리", "후라이팬", "밀폐"],
    guide: ["kitchenware-guide", "주방용품 홈쇼핑 구매 전 확인할 점"],
    points: ["소재와 코팅 종류, 사용 가능한 열원을 확인합니다.", "실제로 자주 쓰는 크기와 구성인지 봅니다.", "인덕션, 식기세척기, 오븐 사용 가능 여부를 확인합니다.", "세트 구성품별 단가와 보관 공간을 함께 고려합니다."],
    faq: [["주방용품 세트는 구성이 많을수록 좋은가요?", "반드시 그렇지는 않습니다. 실제로 자주 쓰는 크기와 소재가 포함되어 있는지 보는 것이 더 중요합니다."], ["코팅 제품은 무엇을 확인해야 하나요?", "사용 가능한 열원, 금속 조리도구 사용 가능 여부, 세척 방법, 코팅 관리법을 확인해야 오래 사용할 수 있습니다."], ["개봉 후 반품이 가능한가요?", "상품군과 공식 판매 조건에 따라 다르므로 개봉·사용 후 교환 및 반품 제한을 공식 상품 페이지에서 확인해야 합니다."], ["인덕션을 쓰면 어떤 표시를 봐야 하나요?", "인덕션 사용 가능 여부와 바닥 지름, 소재를 확인해야 합니다. 일부 제품은 가스레인지용 구성과 인덕션용 구성이 다를 수 있습니다."], ["주방용품 세트는 보관 공간도 봐야 하나요?", "네. 수량이 많으면 단가가 낮아 보이지만 수납 공간이 부족하면 사용 빈도가 떨어질 수 있습니다. 손잡이 분리나 적층 보관 가능 여부도 확인하세요."]]
  },
  fashion: {
    title: "패션·잡화 홈쇼핑 상품",
    heading: "패션·잡화 편성 상품",
    description: "공영홈쇼핑 패션·잡화 방송 상품을 모아보고 사이즈, 색상 차이, 소재, 세트 구성, 교환 조건을 확인하세요.",
    keywords: ["패션", "의류", "신발", "가방", "잡화", "속옷", "여성", "남성", "사이즈"],
    guide: ["fashion-guide", "패션 상품 사이즈 확인법"],
    points: ["평소 사이즈보다 실측표를 기준으로 확인합니다.", "방송 화면 색상과 실제 색감이 다를 수 있음을 고려합니다.", "세트 구성의 개별 색상과 수량을 확인합니다.", "착용·세탁 후 교환 제한 여부를 확인합니다."],
    faq: [["패션 상품은 평소 사이즈대로 사면 되나요?", "브랜드마다 기준이 다르므로 어깨, 가슴, 허리, 총장 같은 실측표를 기준으로 확인하는 것이 안전합니다."], ["화면 색상과 실제 색상이 다를 수 있나요?", "네. 조명과 화면 설정에 따라 달라질 수 있으므로 상세 이미지와 색상 설명을 함께 확인해야 합니다."], ["세트 의류는 일부만 반품할 수 있나요?", "대부분 세트 전체 기준으로 처리되는 경우가 많으므로 공식 교환·반품 조건을 먼저 확인해야 합니다."], ["신발이나 잡화는 어떤 정보를 봐야 하나요?", "발볼, 굽 높이, 소재, 무게, 수납 구조처럼 실제 착용감과 사용성을 좌우하는 정보를 봐야 합니다. 사이즈 교환 조건도 중요합니다."], ["의류 세탁 방법은 왜 중요한가요?", "드라이클리닝 전용이거나 물세탁 제한이 있으면 유지 비용이 커질 수 있습니다. 소재 혼용률과 세탁 표시를 함께 확인하는 것이 좋습니다."]]
  },
  appliance: {
    title: "생활가전 홈쇼핑 상품",
    heading: "생활가전 편성 상품",
    description: "공영홈쇼핑 생활가전 방송 상품을 모아보고 AS, 설치 조건, 소비전력, 구성품, 모델명을 함께 확인하세요.",
    keywords: ["가전", "청소기", "건조기", "냉장", "세탁", "마사지", "전자", "생활가전", "설치"],
    guide: ["appliance-guide", "생활가전 홈쇼핑 구매 가이드"],
    points: ["정확한 모델명과 출시 시기를 확인합니다.", "AS 기간, 소모품 비용, 설치 조건을 확인합니다.", "설치 공간과 전원, 배수 등 환경 조건을 점검합니다.", "기본 구성품과 추가 구성품을 구분해서 봅니다."],
    faq: [["생활가전은 가격만 보고 사도 되나요?", "아니요. 모델명, AS, 설치 조건, 소모품 비용, 소비전력까지 함께 확인해야 실제 비용을 판단할 수 있습니다."], ["설치 상품은 반품이 쉬운가요?", "설치 후에는 단순 변심 반품이 제한되거나 철거 비용이 발생할 수 있으므로 설치 전 조건을 확인해야 합니다."], ["구성품은 어디에서 확인해야 하나요?", "방송 설명과 공식 상품 페이지의 기본 구성품, 추가 구성품, 사은품 안내를 함께 확인해야 합니다."], ["생활가전 모델명은 왜 확인해야 하나요?", "비슷한 이름의 상품이라도 모델명에 따라 출시 시기, 성능, 부속품, AS 기준이 달라질 수 있습니다. 결제 전 공식 상세의 모델명을 기준으로 확인하세요."], ["소모품 비용도 구매 전에 봐야 하나요?", "필터, 브러시, 전용 세제, 배터리처럼 반복 구매가 필요한 소모품이 있으면 실제 유지 비용이 달라집니다. 본체 가격과 함께 계산하는 것이 좋습니다."]]
  }
};
const PAGE_CACHE_VERSION = "2026-05-24-text-detail-guide";
const ADSENSE_CLIENT_ID = "ca-pub-3819299014015793";
const ADSENSE_PUBLISHER_ID = "pub-3819299014015793";

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

  if (path === "/favicon.ico") {
    const favicon = await env.ASSETS.fetch(new Request(new URL("/favicon.png", url).toString(), request));
    return new Response(favicon.body, {
      status: favicon.status,
      headers: { "content-type": "image/png", "cache-control": "public, max-age=86400" }
    });
  }
  if (path.startsWith("/css/") || path.startsWith("/js/") || path.startsWith("/favicon") || path === "/apple-touch-icon.png" || path === "/og-image.png") {
    return env.ASSETS.fetch(request);
  }

  if (path === "/robots.txt") return text(robots(env), "text/plain; charset=utf-8");
  if (path === "/ads.txt") return text(`google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`, "text/plain; charset=utf-8");
  if (path === "/sitemap.xml") return sitemap(env);
  if (path === "/rss" || path === "/rss.xml") return rssFeed(env);
  if (path === "/schedule") return redirect(new URL("/", url).toString(), 301);
  if (path === "/" || path === "") return cachedPage(request, ctx, () => schedulePage(request, env));
  if (path === "/intro") return cachedPage(request, ctx, () => introPageV2(env), 1800);
  if (path === "/popular") return cachedPage(request, ctx, () => popularPage(env));
  if (path.startsWith("/popular/")) return cachedPage(request, ctx, () => categoryPopularPage(path.split("/").pop(), env));
  if (path.startsWith("/category/")) return cachedPage(request, ctx, () => categoryLandingPage(path.split("/").pop(), env));
  if (path === "/channel") return cachedPage(request, ctx, () => channelPage(env), 1800);
  if (path === "/guide") return cachedPage(request, ctx, () => guideListPage(env), 1800);
  if (path.startsWith("/guide/")) return cachedPage(request, ctx, () => guideDetailPage(path.split("/").pop(), env), 1800);
  if (path === "/terms") return staticLegalPage("이용약관", termsHtml(), env, { description: "홈쇼핑뷰 이용약관입니다. 편성표 정보 제공 범위, 공식 사이트 확인 책임, 광고와 외부 링크 이용 기준을 안내합니다." });
  if (path === "/privacy") return staticLegalPage("개인정보처리방침", privacyHtml(), env, { description: "홈쇼핑뷰 개인정보처리방침입니다. 비회원 정보 이용, 접속 로그, 쿠키, 광고 서비스와 문의 처리 기준을 안내합니다." });
  if (path === "/contact") return staticLegalPage("문의하기", contactHtml(), env, { description: "홈쇼핑뷰 문의 및 오류 제보 안내입니다. 편성표 오류, 상품 정보 수정 요청, 사이트 개선 의견을 보내는 방법을 확인하세요." });
  if (path === "/data-source") return staticLegalPage("데이터 출처", dataSourceHtml(), env, { canonical: "/data-source/", description: "홈쇼핑뷰 데이터 출처 안내입니다. 공공데이터포털 API, 갱신 주기, 편성표 가공 방식, 정확성 한계를 설명합니다." });
  if (path === "/editorial-policy") return staticLegalPage("운영 정책", editorialPolicyHtml(), env, { canonical: "/editorial-policy/", description: "홈쇼핑뷰 운영 정책입니다. 편성 정보 편집 기준, 광고와 콘텐츠 분리, 오류 제보 처리 원칙을 안내합니다." });

  const dateMatch = path.match(/^\/schedule\/(\d{8})$/);
  if (dateMatch) return cachedPage(request, ctx, () => schedulePage(request, env, dateMatch[1]));

  const productMatch = path.match(/^\/schedule\/(\d{8})\/([^/]+)$/);
  if (productMatch) return productPage(productMatch[1], productMatch[2], env, ctx);

  return notFoundPage(env);
}

function notFoundPage(env) {
  const body = `<section class="section"><div class="container"><div class="not-found"><h1>404</h1><p>요청하신 페이지를 찾을 수 없습니다. 주소가 바뀌었거나 방송 편성이 종료되었을 수 있습니다.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px;"><a class="btn-primary" href="/">최신 편성표 보기</a><a class="btn-secondary" href="/popular/">인기 상품 보기</a><a class="btn-secondary" href="/guide/">구매 가이드 보기</a></div></div></div></section>`;
  return htmlPage("페이지를 찾을 수 없습니다", body, env, { status: 404, robots: "noindex, follow" });
}

async function cachedPage(request, ctx, producer, seconds = 300) {
  if (request.method !== "GET") return producer();
  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.searchParams.set("__v", PAGE_CACHE_VERSION);
  const cacheKey = new Request(cacheUrl.toString(), request);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;
  const response = await producer();
  if (response.status === 200) {
    response.headers.set("cache-control", `public, max-age=${seconds}, s-maxage=${seconds}`);
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
  }
  return response;
}

async function schedulePage(request, env, forcedDate = "") {
  const url = new URL(request.url);
  const today = todayKst();
  let dates = await env.DB.prepare("SELECT DISTINCT date FROM schedule WHERE date >= ? ORDER BY date ASC LIMIT 10").bind(today).all();
  let dateRows = dates.results || [];
  if (!dateRows.length) {
    dates = await env.DB.prepare("SELECT DISTINCT date FROM schedule ORDER BY date DESC LIMIT 10").all();
    dateRows = (dates.results || []).reverse();
  }
  const requestedDate = forcedDate || url.searchParams.get("date");
  const selectedDate = dateRows.some((row) => row.date === requestedDate) ? requestedDate : (dateRows[0]?.date || today);
  const { results } = await env.DB.prepare("SELECT * FROM schedule WHERE date = ? ORDER BY start_time ASC, priority ASC").bind(selectedDate).all();
  const slots = groupSlots(results || []);
  const canonicalPath = forcedDate ? `/schedule/${selectedDate}/` : "/";
  const pageTitle = forcedDate
    ? `공영홈쇼핑 편성표 ${formatDate(selectedDate)} | TV 방송 시간·상품 가격`
    : "공영홈쇼핑 편성표 | 오늘 TV 방송 시간·상품 가격";
  const heroTitle = forcedDate ? `${formatDate(selectedDate)} 공영홈쇼핑 TV 편성표` : "공영홈쇼핑 TV 편성표";
  const heroText = forcedDate ? `${formatDate(selectedDate)} 방송 일정과 상품 가격, 배송 혜택을 한눈에 확인하세요.` : "오늘의 방송 일정과 상품 정보를 한눈에 확인하세요.";

  const dateButtons = dateRows.map((row) => {
    const active = row.date === selectedDate ? " active" : "";
    const todayClass = row.date === today ? " today" : "";
    const todayLabel = row.date === today ? `<br><span style="font-size:0.7rem;opacity:0.8;">오늘</span>` : "";
    const href = row.date === today ? "/" : `/schedule/${row.date}/`;
    return `<a href="${href}" class="date-btn${active}${todayClass}">${formatDateShort(row.date)}${todayLabel}</a>`;
  }).join("");

  const cards = slots.length ? slots.map((slot) => scheduleCard(slot.main, selectedDate, slot.subs)).join("") : `<div style="text-align:center;padding:60px 20px;color:var(--text-muted);"><p style="font-size:1.5rem;">편성 정보가 없습니다.</p></div>`;

  const body = `
    <section class="hero"><div class="container"><h1>📺 ${heroTitle}</h1><p>${heroText}</p></div></section>
    <section class="section"><div class="container">
      <div class="date-selector">${dateButtons}</div>
      <h2 class="section-title">📅 ${formatDate(selectedDate)} 편성표</h2>
      <div class="schedule-list">${cards}</div>
    </div></section>
  `;
  return htmlPage(pageTitle, body, env, {
    description: "공영홈쇼핑 TV 편성표, 방송 시간, 상품 가격, 무료배송과 무이자 혜택을 한눈에 확인하세요.",
    active: "schedule",
    canonical: canonicalPath,
    structuredData: scheduleStructuredData(selectedDate, slots, canonicalPath, env)
  });
}

function scheduleCard(item, date, subs = []) {
  if (!item) return "";
  const productUrl = `/schedule/${date}/${encodeURIComponent(item.item_code)}`;
  const subSummary = relatedProductsTextSummary(subs);

  return `
    <a href="${productUrl}" class="schedule-card">
      <div class="schedule-time"><span class="time-start">${formatTime(item.start_time)}</span><span class="time-sep">~</span><span class="time-end">${formatTime(item.end_time)}</span><span class="runtime">${Number(item.runtime || 0)}분</span></div>
      ${item.img ? `<img src="${esc(item.img)}" alt="${esc(decodeName(item.name))}" class="schedule-img" loading="lazy">` : ""}
      <div class="schedule-info">
        <span class="category-badge">${esc(decodeName(item.category1))}${item.category2 ? ` > ${esc(decodeName(item.category2))}` : ""}</span>
        <div class="product-name">${esc(decodeName(item.name))}</div>
        <div class="price-row"><span class="price">${price(item.price)}원</span>${Number(item.discount_rate) > 0 ? `<span class="original-price">${price(item.orgin_price)}원</span><span class="discount-badge">${item.discount_rate}%</span>` : ""}</div>
        <div class="tags">${Number(item.free_shipping) ? `<span class="tag tag-free">무료배송</span>` : ""}${Number(item.month) > 0 ? `<span class="tag tag-installment">무이자 ${item.month}개월</span>` : ""}</div>
        ${subSummary}
      </div>
    </a>`;
}

function relatedProductsTextSummary(subs = []) {
  if (!subs.length) return "";
  const names = subs.slice(0, 4).map((sub) => decodeName(sub.name)).filter(Boolean);
  const prices = subs.map((sub) => Number(sub.price || 0)).filter(Boolean);
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;
  const priceText = min && max && min !== max ? `가격대 ${price(min)}원~${price(max)}원` : min ? `관련 상품 ${price(min)}원` : "가격은 공식 페이지 확인";
  const more = subs.length > names.length ? ` 외 ${subs.length - names.length}개` : "";
  return `<p class="schedule-related-note">함께 방송 옵션 ${subs.length}개: ${esc(names.join(", "))}${more}. ${priceText} 기준으로 용량, 사이즈, 구성 차이를 같이 확인하세요.</p>`;
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
  const allowIndex = await isIndexableProduct(env, date, itemCode, item);
  const relatedItems = related.results || [];
  const similarProducts = await findSimilarActiveProducts(env, item, itemCode, 3);

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
        ${productBroadcastInsightHtml(item, name, relatedItems, cards)}
        ${productDecisionGuideHtml(item, name)}
        ${similarProductComparisonHtml(item, name, similarProducts)}
        ${sameTimeProductEditorialHtml(item, name, relatedItems)}
        <div class="product-header">
          ${item.img ? `<div class="product-img-wrap"><img src="${esc(item.img)}" alt="${esc(name)}" loading="lazy"></div>` : ""}
          <div class="product-main-info"><h2>💰 가격 정보</h2><div style="margin-bottom:16px;">${Number(item.discount_rate) > 0 ? `<span style="font-size:0.9rem;color:var(--text-muted);text-decoration:line-through;">${price(item.orgin_price)}원</span><span class="discount-badge" style="margin-left:6px;">${item.discount_rate}%</span><br>` : ""}<span style="font-size:2rem;font-weight:800;color:var(--danger);">${price(item.price)}</span><span style="font-size:1.3rem;font-weight:600;color:var(--danger);">원</span></div><div style="display:flex;gap:8px;flex-wrap:wrap;">${Number(item.free_shipping) ? `<span class="tag tag-free">무료배송</span>` : ""}${Number(item.month) > 0 ? `<span class="tag tag-installment">무이자 ${item.month}개월</span>` : ""}</div>${cards.length ? `<h3 style="margin-top:18px;">카드 할인</h3>${cards.map((card) => `<div style="background:#f8f4ff;padding:8px 14px;border-radius:8px;margin-bottom:6px;"><strong>${esc(decodeName(card.name))}</strong> ${card.discount_rate || 0}% 할인</div>`).join("")}` : ""}</div>
        </div>
        ${broadcastDetailHtml(item)}
        ${categoryClassificationHtml(item)}
        ${buyUrl ? detailSection("공식 사이트에서 구매하기", `<p>공영홈쇼핑 공식 사이트에서 상품의 상세 정보와 최종 구매 조건을 확인할 수 있습니다.</p><a href="${esc(buyUrl)}" target="_blank" rel="noopener" class="btn-apply">공영홈쇼핑 공식 사이트에서 보기 →</a>`) : ""}
        ${imgList.length ? detailSection("추가 상품 이미지", `<div style="display:flex;gap:12px;flex-wrap:wrap;">${imgList.map((img) => `<img src="${esc(img)}" alt="${esc(name)} 추가 이미지" style="width:180px;height:180px;object-fit:cover;border-radius:8px;" loading="lazy">`).join("")}</div>`) : ""}
        ${productFaqHtml(item, name, cards, relatedItems)}
      </div>
    </div></section>`;

  return htmlPage(`${name} - ${formatDate(item.date)} 공영홈쇼핑 편성표`, body, env, {
    description: `${name} 공영홈쇼핑 ${formatDate(item.date)} ${formatTime(item.start_time)} 방송 상품 정보, 가격 ${price(item.price)}원, 카테고리 ${decodeName(item.category1)}.`,
    canonical: canonicalPath,
    active: "schedule",
    robots: allowIndex ? "" : "noindex, follow",
    structuredData: productStructuredData(item, name, canonicalPath, buyUrl, env)
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

async function isIndexableProduct(env, date, itemCode, item) {
  if (!item || !Number(item.main)) return false;
  const today = todayKst();
  if (date < today) return false;
  const row = await env.DB.prepare(`
    SELECT 1
    FROM schedule
    WHERE date >= ? AND main = 1 AND date = ? AND item_code = ?
    ORDER BY date ASC, start_time ASC, priority ASC
    LIMIT 1
  `).bind(today, date, itemCode).first();
  return Boolean(row);
}

function productBroadcastInsightHtml(item, productName, relatedItems = [], cards = []) {
  const categoryPath = [item.category1, item.category2, item.category3, item.category4].map(decodeName).filter(Boolean);
  const categoryText = categoryPath.length ? categoryPath.join(" > ") : "분류 미정";
  const productType = Number(item.main) ? "대표 상품" : "세트/관련 상품";
  const installment = Number(item.month || 0);
  const discount = Number(item.discount_rate || 0);
  const priceValue = Number(item.price || 0);
  const sameTimeText = relatedItems.length
    ? Number(item.main)
      ? `같은 시간대에 관련 상품 ${relatedItems.length}개가 함께 편성되어 있어 옵션, 사이즈, 구성 차이를 같이 비교하는 것이 좋습니다.`
      : `이 상품은 같은 시간대 대표 상품과 함께 노출되는 관련 상품입니다. 단독 상품처럼 보더라도 구성, 가격, 옵션이 대표 상품과 다를 수 있습니다.`
    : "현재 같은 시간대에 함께 표시할 관련 상품은 확인되지 않습니다.";
  const priceSentence = discount > 0
    ? `정상가 ${price(item.orgin_price)}원에서 ${discount}% 할인된 ${price(item.price)}원으로 표시되어 있습니다.`
    : `판매가는 ${price(item.price)}원으로 표시되어 있습니다.`;
  const paySentence = [
    Number(item.free_shipping) ? "무료배송 표시가 있어 배송비 포함 여부를 확인하기 쉽습니다." : "배송비 조건은 공식 상품 페이지에서 다시 확인하는 편이 안전합니다.",
    installment > 0 ? `무이자 ${installment}개월 조건이 표시되어 월 부담액을 나누어 계산해 볼 수 있습니다.` : "무이자 할부 정보가 표시되지 않았으므로 결제 단계의 카드 조건을 확인해야 합니다.",
    cards.length ? `카드 할인 정보가 ${cards.length}건 있어 최종 결제수단에 따라 체감가가 달라질 수 있습니다.` : "별도 카드 할인 정보는 확인되지 않습니다."
  ].join(" ");
  const categorySentence = categoryPath.length >= 4
    ? `분류는 ${esc(categoryText)}까지 확인되므로 같은 대분류 안에서도 세부 상품군 기준으로 비교해야 합니다.`
    : `분류는 ${esc(categoryText)} 기준으로 확인되며, 세부 모델이나 구성은 공식 상세 페이지를 함께 보는 것이 좋습니다.`;
  const categoryAngle = detailedCategoryEditorialSentence(item);

  return `<div class="detail-section editorial-insight text-guide-section"><h2>이 상품을 볼 때 먼저 비교할 점</h2><p><strong>${esc(productName)}</strong>은 ${formatDate(item.date)} ${formatTime(item.start_time)}~${formatTime(item.end_time)}에 방송되는 ${esc(productType)}입니다. ${categorySentence}</p><p>${esc(priceSentence)} ${esc(paySentence)}</p><p>${esc(categoryAngle)}</p><p>${esc(sameTimeText)}</p></div>`;
}

function detailedCategoryEditorialSentence(item) {
  const c1 = decodeName(item.category1);
  const c2 = decodeName(item.category2);
  const c3 = decodeName(item.category3);
  const c4 = decodeName(item.category4);
  const name = decodeName(item.name);
  const text = `${c1} ${c2} ${c3} ${c4} ${name}`;
  if (hasText(text, ["육우", "소고기", "쇠고기", "한우", "갈비", "불고기", "정육"])) {
    return "육류 상품은 가격보다 부위, 원산지, 손질 상태, 1팩 중량, 냉동 보관 가능 여부가 만족도에 더 큰 영향을 줍니다. 방송 화면의 조리 예시는 참고용으로 보고 실제 구성표를 기준으로 판단하세요.";
  }
  if (hasText(text, ["수산", "생선", "굴비", "고등어", "갈치", "전복", "오징어", "새우"])) {
    return "수산물은 마리 수보다 실중량과 손질 상태를 먼저 보는 편이 좋습니다. 냉동 배송 유지, 해동 후 조리 방식, 원산지 표기를 함께 확인해야 합니다.";
  }
  if (hasText(text, ["쌀", "잡곡", "현미", "콩", "팥"])) {
    return "쌀과 잡곡류는 생산연도, 도정일, 포장 단위, 보관 공간을 함께 봐야 합니다. 대용량일수록 소비 속도와 보관 환경이 실제 만족도를 좌우합니다.";
  }
  if (hasText(text, ["과일", "사과", "배", "블루베리", "토마토", "고구마"])) {
    return "농산물은 개당 크기, 당도 보장 여부, 흠과 포함 여부, 선물 포장 여부에 따라 체감 가치가 달라집니다. 수령 가능일도 함께 맞춰야 합니다.";
  }
  if (hasText(text, ["침구", "이불", "베개", "커버", "매트", "카페트"])) {
    return "침구류는 화면 색감보다 사이즈, 소재, 세탁 가능 여부, 계절감을 먼저 확인해야 합니다. 부피가 큰 상품은 반품 배송비도 구매 판단에 포함하세요.";
  }
  if (hasText(text, ["프라이팬", "후라이팬", "냄비", "압력", "솥", "주방", "용기"])) {
    return "주방용품은 세트 수량보다 실제 자주 쓰는 크기와 열원 호환 여부가 중요합니다. 코팅 관리법, 식기세척기 사용 가능 여부, 보관 방식도 같이 보세요.";
  }
  if (hasText(text, ["건강식품", "홍삼", "유산균", "비타민", "콜라겐", "오메가", "루테인"])) {
    return "건강식품은 효능처럼 보이는 문구보다 1일 섭취량, 주요 성분 함량, 섭취 제한 대상, 알레르기 성분을 기준으로 판단하는 편이 안전합니다.";
  }
  if (hasText(text, ["가전", "청소기", "건조기", "냉장", "세탁", "마사지", "디지털"])) {
    return "생활가전은 모델명, 설치 가능 공간, 소모품 비용, 무상 보증 기간을 반드시 확인해야 합니다. 방송 혜택보다 사후관리 조건이 더 중요할 수 있습니다.";
  }
  if (hasText(text, ["패션", "의류", "속옷", "언더웨어", "신발", "가방", "잡화"])) {
    return "패션·잡화는 방송 화면의 색감보다 실측표, 소재, 색상 선택 가능 여부, 착용 후 교환 제한을 먼저 보는 것이 좋습니다.";
  }
  return "홈쇼핑 상품은 방송 혜택이 빠르게 바뀔 수 있으므로 상품명, 구성, 가격, 배송 조건, 반품 기준을 같은 기준으로 놓고 비교하는 것이 좋습니다.";
}

async function findSimilarActiveProducts(env, item, currentItemCode, limit = 3) {
  const today = todayKst();
  const rows = (await env.DB.prepare(`
    SELECT *
    FROM schedule
    WHERE date >= ?
      AND main = 1
      AND item_code != ?
    ORDER BY date ASC, start_time ASC, priority ASC
    LIMIT 500
  `).bind(today, currentItemCode).all()).results || [];

  const keywords = productNameKeywords(decodeName(item.name));
  const category2 = decodeName(item.category2);
  const category3 = decodeName(item.category3);
  const category4 = decodeName(item.category4);
  const scored = rows.map((row) => {
    let score = 0;
    const reasons = [];
    if (category2 && decodeName(row.category2) === category2) {
      score += 4;
      reasons.push("중분류 일치");
    }
    if (category3 && decodeName(row.category3) === category3) {
      score += 5;
      reasons.push("소분류 일치");
    }
    if (category4 && decodeName(row.category4) === category4) {
      score += 6;
      reasons.push("세분류 일치");
    }
    const rowName = decodeName(row.name);
    const matched = keywords.filter((keyword) => rowName.includes(keyword));
    if (matched.length) {
      score += Math.min(5, matched.length * 2);
      reasons.push(`${matched.slice(0, 2).join(", ")} 키워드 일치`);
    }
    if (Number(row.free_shipping) === Number(item.free_shipping)) {
      score += 1;
      reasons.push("배송 조건 유사");
    }
    if (Math.abs(Number(row.price || 0) - Number(item.price || 0)) <= Math.max(10000, Number(item.price || 0) * 0.2)) {
      score += 1;
      reasons.push("가격대 유사");
    }
    if (score < 5) return null;
    return { item: row, score, reasons: reasons.slice(0, 3) };
  }).filter(Boolean);

  scored.sort((a, b) => b.score - a.score || String(a.item.date).localeCompare(String(b.item.date)) || String(a.item.start_time).localeCompare(String(b.item.start_time)));
  return scored.slice(0, limit);
}

function productNameKeywords(name) {
  const stop = new Set(["공영", "홈쇼핑", "세트", "상품", "무료배송", "인기상품", "단독", "특가", "구성", "정품"]);
  return String(name || "")
    .replace(/[()[\]{}★☆「」\[\],/+*]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 2 && !stop.has(word) && !/^\d+$/.test(word))
    .slice(0, 8);
}

function similarProductComparisonHtml(item, productName, similarProducts = []) {
  if (!similarProducts.length) return "";
  const currentPrice = Number(item.price || 0);
  const rows = similarProducts.map(({ item: row, reasons }) => {
    const rowName = decodeName(row.name);
    const diff = productComparisonDifferenceText(item, row, reasons);
    return `<li><a href="/schedule/${row.date}/${encodeURIComponent(row.item_code)}"><strong>${esc(rowName)}</strong></a><br><span>${esc(diff)}</span></li>`;
  }).join("");
  const priceGuide = currentPrice ? `현재 상품 가격은 ${price(currentPrice)}원이므로, 비교 상품은 단순 상품명보다 가격 차이와 구성 차이를 함께 보는 것이 좋습니다.` : "현재 상품의 가격은 방송 조건에 따라 달라질 수 있으므로 공식 판매 페이지의 최종 금액을 기준으로 비교하는 것이 좋습니다.";
  return `<div class="detail-section comparison-guide text-guide-section"><h2>비슷한 방송 상품과 비교할 점</h2><p><strong>${esc(productName)}</strong>과 같은 세부 상품군 또는 가격대가 가까운 현재 이후 대표상품을 기준으로 비교했습니다. ${esc(priceGuide)}</p><ul class="text-comparison-list">${rows}</ul><p>비슷한 이름의 상품이라도 용량, 사이즈, 구성품, 무료배송, 무이자 조건, 방송 날짜가 다르면 실제 구매 판단은 달라질 수 있습니다.</p></div>`;
}

function productComparisonDifferenceText(current, other, reasons = []) {
  const currentCategory = [decodeName(current.category2), decodeName(current.category3), decodeName(current.category4)].filter(Boolean).join(" > ");
  const otherCategory = [decodeName(other.category2), decodeName(other.category3), decodeName(other.category4)].filter(Boolean).join(" > ");
  const currentPrice = Number(current.price || 0);
  const otherPrice = Number(other.price || 0);
  const priceDiff = currentPrice && otherPrice ? otherPrice - currentPrice : 0;
  const priceText = priceDiff === 0
    ? "가격은 현재 상품과 같습니다"
    : priceDiff > 0
      ? `가격은 현재 상품보다 ${price(priceDiff)}원 높습니다`
      : `가격은 현재 상품보다 ${price(Math.abs(priceDiff))}원 낮습니다`;
  const categoryText = currentCategory && otherCategory && currentCategory !== otherCategory
    ? `분류는 ${otherCategory}로, 현재 상품의 ${currentCategory}와 다릅니다`
    : otherCategory
      ? `분류는 ${otherCategory}로 유사합니다`
      : "세부 분류는 공식 상품 상세에서 확인해야 합니다";
  const shippingText = Number(current.free_shipping) === Number(other.free_shipping)
    ? Number(other.free_shipping) ? "두 상품 모두 무료배송 표시가 있습니다" : "두 상품 모두 배송비 조건을 공식 페이지에서 확인해야 합니다"
    : Number(other.free_shipping) ? "비교 상품은 무료배송 표시가 있습니다" : "비교 상품은 무료배송 표시가 확인되지 않습니다";
  const monthText = Number(current.month || 0) === Number(other.month || 0)
    ? Number(other.month || 0) ? `무이자 조건은 ${other.month}개월로 같습니다` : "무이자 개월 수는 별도 확인이 필요합니다"
    : `무이자 조건은 현재 상품 ${Number(current.month || 0) || "미표시"}개월, 비교 상품 ${Number(other.month || 0) || "미표시"}개월입니다`;
  const reasonText = reasons.length ? `선정 기준은 ${reasons.join(", ")}입니다` : "상품군과 가격대를 기준으로 비교했습니다";
  return `${formatDate(other.date)} ${formatTime(other.start_time)} 방송 예정 상품입니다. ${priceText}. ${categoryText}. ${shippingText}. ${monthText}. ${reasonText}.`;
}

function sameTimeProductEditorialHtml(item, productName, relatedItems = []) {
  if (!relatedItems.length) return "";
  const list = relatedItems.map((row) => `<li>${sameTimeProductDifferenceText(item, row)}</li>`).join("");
  return `<div class="detail-section same-time-editorial text-guide-section"><h2>같은 시간대 옵션과 구성 차이</h2><p><strong>${esc(productName)}</strong>은 같은 방송 시간대에 여러 옵션 또는 관련 상품과 함께 편성되어 있습니다. 별도 서브상품 카드로 나누기보다 대표 상품 기준에서 어떤 선택지가 함께 있는지 확인하는 방식이 더 적합합니다.</p><ul class="text-comparison-list">${list}</ul><p>같은 시간대 상품은 메인 상품의 사이즈, 용량, 색상, 세트 수량, 단품 옵션처럼 구성 차이를 보여주는 경우가 많습니다. 결제 전에는 공식 상품 페이지에서 최종 선택 옵션과 가격을 다시 확인하세요.</p></div>`;
}

function sameTimeProductDifferenceText(main, sub) {
  const subName = decodeName(sub.name);
  const mainPrice = Number(main.price || 0);
  const subPrice = Number(sub.price || 0);
  const priceDiff = mainPrice && subPrice ? subPrice - mainPrice : 0;
  const priceText = priceDiff === 0
    ? "가격은 대표 상품과 같습니다"
    : priceDiff > 0
      ? `대표 상품보다 ${price(priceDiff)}원 높습니다`
      : `대표 상품보다 ${price(Math.abs(priceDiff))}원 낮습니다`;
  const subCategory = [decodeName(sub.category2), decodeName(sub.category3), decodeName(sub.category4)].filter(Boolean).join(" > ");
  const categoryText = subCategory ? `분류는 ${subCategory}입니다` : "세부 분류는 공식 상세에서 확인해야 합니다";
  const typeText = Number(sub.main) ? "대표 상품으로도 표시되는 상품" : "세트/관련 상품으로 표시되는 옵션";
  const shippingText = Number(sub.free_shipping) ? "무료배송 표시가 있습니다" : "배송비 조건은 공식 페이지 확인이 필요합니다";
  return `<strong>${esc(subName)}</strong>은 ${typeText}입니다. ${priceText}. ${categoryText}. ${shippingText}. 상품명에 사이즈나 구성명이 다르게 붙어 있다면 실제 선택 옵션이 다를 수 있습니다.`;
}

function broadcastDetailHtml(item) {
  const rows = [
    ["방송 날짜", formatDate(item.date)],
    ["방송 시간", `${formatTime(item.start_time)} ~ ${formatTime(item.end_time)} (${Number(item.runtime || 0)}분)`],
    ["상품 코드", item.item_code || "-"],
    ["상품 유형", Number(item.main) ? "대표 상품" : "세트/관련 상품"]
  ];
  return `<div class="detail-section compact-info-section"><h2>방송 상세 정보</h2><div class="compact-info-grid">${rows.map(([label, value]) => `<div class="compact-info-item"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}</div></div>`;
}

function categoryClassificationHtml(item) {
  const rows = [
    ["대분류", decodeName(item.category1) || "미분류"],
    ["중분류", decodeName(item.category2) || "미분류"],
    ["소분류", decodeName(item.category3) || "미분류"],
    ["세분류", decodeName(item.category4) || "미분류"]
  ];
  const path = rows.map(([, value]) => value).filter((value) => value && value !== "미분류").join(" > ");
  return `<div class="detail-section compact-info-section"><h2>상품 카테고리 분류</h2><div class="compact-info-grid">${rows.map(([label, value]) => `<div class="compact-info-item"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}</div>${path ? `<p class="compact-info-note">이 상품은 ${esc(path)} 기준으로 분류됩니다. 같은 대분류라도 세부 분류에 따라 구성품, 보관법, 반품 조건이 달라질 수 있습니다.</p>` : ""}</div>`;
}

function productDecisionGuideHtml(item, productName) {
  const profile = productAdviceProfile(item, productName);
  const subGuide = subcategoryAdviceHtml(item);
  const priceText = Number(item.price || 0) > 0 ? `${price(item.price)}원` : "공식 판매가";
  const shippingText = Number(item.free_shipping) ? "무료배송으로 표시되지만 도서산간 추가 비용은 별도 확인이 필요합니다." : "배송비 조건은 공식 상품 페이지에서 다시 확인하는 편이 안전합니다.";
  const installmentText = Number(item.month || 0) > 0 ? `무이자 ${item.month}개월 조건이 표시되어 있어 고가 상품은 월 부담액도 함께 계산해 볼 수 있습니다.` : "무이자 할부 정보가 표시되지 않았으므로 결제 단계의 카드 혜택을 별도로 확인해야 합니다.";
  const bullets = profile.checks.slice(0, 3).map((check) => `<li><strong>${esc(check[0])}</strong> ${esc(check[1])}</li>`).join("");
  return `<div class="detail-section decision-guide text-guide-section"><h2>${esc(profile.title)}</h2><p><strong>${esc(productName)}</strong>은 ${esc(profile.categoryLabel)} 상품입니다. 현재 표시 가격은 <strong>${priceText}</strong>이며, 방송 혜택보다 구성, 배송, 반품 기준을 함께 확인하는 것이 좋습니다.</p><p><strong>가격 조건:</strong> ${esc(shippingText)} ${esc(installmentText)}</p>${productBuyerFitHtml(item, productName, profile)}${subGuide ? `<div class="text-note">${subGuide}</div>` : ""}<ul class="text-check-list">${bullets}</ul><p>${esc(profile.note)}</p></div>`;
}

function hasText(text, words) {
  const target = String(text || "").toLowerCase();
  return words.some((word) => target.includes(String(word).toLowerCase()));
}

function productCategoryKind(item) {
  const text = `${decodeName(item.category1)} ${decodeName(item.category2)} ${decodeName(item.category3)} ${decodeName(item.category4)} ${decodeName(item.name)}`;
  if (hasText(text, ["건강식품", "홍삼", "유산균", "비타민", "콜라겐", "오메가", "루테인", "프로폴리스"])) return "health";
  if (hasText(text, ["주방", "프라이팬", "후라이팬", "냄비", "도마", "식기", "용기", "조리"])) return "kitchen";
  if (hasText(text, ["패션", "의류", "속옷", "언더웨어", "신발", "가방", "잡화", "사이즈"])) return "fashion";
  if (hasText(text, ["생활가전", "가전", "청소기", "건조기", "냉장", "세탁", "마사지", "디지털"])) return "appliance";
  if (hasText(text, ["침구", "이불", "베개", "매트", "커버", "카페트"])) return "bedding";
  if (hasText(text, ["식품", "신선식품", "가공식품", "농산", "수산", "축산", "육류", "소고기", "육우", "한우"])) return "food";
  return "general";
}

function productBuyerFitHtml(item, productName, profile) {
  const text = `${productName} ${decodeName(item.category1)} ${decodeName(item.category2)} ${decodeName(item.category3)} ${decodeName(item.category4)}`.toLowerCase();
  const kind = profile.kind || productCategoryKind(item);
  const priceValue = Number(item.price || 0);
  const has = (...words) => words.some((word) => text.includes(word.toLowerCase()));
  let fit = `${profile.categoryLabel} 상품을 방송 전에 비교하고, 공식 상품 페이지에서 최종 조건을 확인하려는 분에게 적합합니다.`;
  let check = "상품명과 방송 시간, 가격, 배송 조건, 반품 기준을 함께 확인한 뒤 결정하는 것이 좋습니다.";
  if (kind === "food") {
    fit = has("선물", "명절") ? "선물용 식품을 찾거나 받는 사람의 수령 가능일을 맞춰야 하는 분에게 특히 확인할 만한 상품입니다." : "가정에서 반복적으로 소비할 식품을 미리 준비하거나 방송 중 식품 구성을 비교하려는 분에게 맞습니다.";
    check = "총 중량보다 1회 섭취량, 포장 단위, 원산지, 냉장·냉동 보관 가능 공간을 기준으로 보는 것이 좋습니다.";
  } else if (kind === "health") {
    fit = "본인이나 가족의 건강 관리용 상품을 찾지만 성분과 섭취 대상 조건을 먼저 따져보고 싶은 분에게 맞습니다.";
    check = "기능성 문구보다 1일 섭취량, 총 섭취 가능 일수, 알레르기 성분, 복용 중인 약과의 충돌 가능성을 우선 확인하세요.";
  } else if (kind === "kitchen") {
    fit = "조리 도구를 교체하거나 세트 구성을 한 번에 비교하려는 분에게 적합합니다.";
    check = "인덕션 호환, 코팅 관리법, 실제 자주 쓰는 크기, 세척과 보관 편의성을 확인하면 실패 가능성을 줄일 수 있습니다.";
  } else if (kind === "fashion") {
    fit = "방송 혜택으로 의류나 잡화를 구매하되 사이즈와 교환 조건을 꼼꼼히 보고 싶은 분에게 맞습니다.";
    check = "평소 사이즈보다 실측표와 소재, 색상 선택 가능 여부, 착용 후 교환 제한을 먼저 확인하세요.";
  } else if (kind === "appliance") {
    fit = "생활가전 구매 전 모델명과 AS, 설치 조건을 비교하려는 분에게 적합합니다.";
    check = "설치 공간, 소모품 비용, 소비전력, 무상 보증 기간, 기존 제품 철거 여부를 공식 상세에서 확인해야 합니다.";
  } else if (kind === "bedding") {
    fit = "침구나 커버류를 방송 혜택으로 비교하되 사이즈와 소재, 세탁 가능 여부를 먼저 확인하려는 분에게 맞습니다.";
    check = "침대 규격, 매트리스 높이, 소재, 세탁 가능 여부, 반품 배송비를 함께 확인하세요.";
  }
  const priceGuide = priceValue >= 200000 ? "가격대가 높은 편이므로 무이자 할부가 있어도 총 결제금액과 월별 카드 부담액을 나누어 계산해 보세요." : priceValue > 0 ? "가격 부담이 아주 큰 상품은 아니더라도 배송비와 구성품 기준으로 실제 단가를 비교해 보세요." : "가격 정보가 바뀔 수 있으므로 결제 직전 공식 페이지의 최종 금액을 기준으로 판단하세요.";
  return `<p><strong>이런 분께 맞습니다:</strong> ${esc(fit)}</p><p><strong>구매 전 핵심 확인:</strong> ${esc(check)} ${esc(priceGuide)}</p>`;
}

function subcategoryAdviceHtml(item) {
  const category3 = decodeName(item.category3);
  const category4 = decodeName(item.category4);
  const text = `${category3} ${category4} ${decodeName(item.name)}`.toLowerCase();
  const has = (...words) => words.some((word) => text.includes(word.toLowerCase()));
  const label = [category3, category4].filter(Boolean).join(" > ");
  let advice = "";
  if (has("김치")) advice = "김치류는 포기김치, 갓김치, 파김치처럼 종류에 따라 숙성도와 보관 온도 체감이 다릅니다. 총 중량뿐 아니라 소분 포장 여부와 수령 후 냉장 보관 공간을 확인하세요.";
  else if (has("과일", "사과", "블루베리")) advice = "과일류는 개당 중량, 크기 편차, 당도 보장 여부, 흠과 포함 여부를 확인하는 것이 좋습니다. 선물용이면 포장 상태와 배송 중 파손 가능성도 함께 봐야 합니다.";
  else if (has("쌀", "잡곡", "현미", "콩", "팥")) advice = "쌀·잡곡류는 생산연도, 도정일, 보관 방식이 중요합니다. 대용량일수록 소비 속도와 보관 용기를 미리 고려해야 품질 저하를 줄일 수 있습니다.";
  else if (has("한우", "육류", "갈비", "불고기", "삼계탕", "해장국", "곰국")) advice = "축산·탕류 상품은 부위, 양념 포함 여부, 1팩 중량, 해동 후 조리 방식이 만족도에 큰 영향을 줍니다. 냉동 보관 공간과 재냉동 가능 여부를 확인하세요.";
  else if (has("생선", "수산", "굴비", "고등어", "갈치", "전복", "오징어")) advice = "수산물은 손질 상태, 마리 수보다 실중량, 원산지, 냉동 배송 상태를 봐야 합니다. 비린내나 해동 후 식감이 걱정된다면 조리 방식과 보관법을 먼저 확인하세요.";
  else if (has("유산균", "효소", "분말", "환", "건강즙", "엑기스")) advice = "분말·환·즙 형태 건강식품은 1일 섭취량과 총 섭취 가능 일수를 기준으로 가격을 비교해야 합니다. 성분표와 섭취 제한 대상을 함께 확인하세요.";
  else if (has("프라이팬", "팬세트", "밀폐용기", "플라스틱용기", "주방도구")) advice = "주방도구는 소재, 열원 호환, 세척 방식, 보관 편의성을 함께 확인해야 합니다. 세트 수량보다 실제 자주 쓰는 크기와 구성인지 보는 편이 좋습니다.";
  else if (has("청소기", "밥솥", "냉장고", "서큘레이터", "가전")) advice = "가전류는 모델명, 소비전력, 소모품 비용, AS 기간을 우선 확인하세요. 설치나 회수가 필요한 상품은 추가 비용과 반품 제한 조건도 중요합니다.";
  else if (has("블라우스", "팬츠", "데님", "상의", "하의", "언더웨어", "신발", "화")) advice = "패션 상품은 실측표, 소재 혼용률, 색상 선택, 세탁 방법을 확인해야 합니다. 착용 후 교환 제한이 있을 수 있어 수령 직후 상태 확인이 좋습니다.";
  else if (has("침구", "카페트", "커버", "이불", "베개", "매트")) advice = "침구·카페트류는 소재, 세탁 가능 여부, 계절감, 사이즈를 먼저 확인하세요. 큰 부피 상품은 반품 배송비와 보관 공간도 구매 판단에 영향을 줍니다.";
  if (!advice) return label ? `<p><strong>세부 분류 기준:</strong> ${esc(label)} 상품입니다. 같은 대분류 안에서도 세부 분류에 따라 구성품, 보관법, 반품 조건이 달라질 수 있으니 공식 상세 정보를 기준으로 확인하세요.</p>` : "";
  return `<p><strong>세부 분류 기준:</strong> ${esc(label)} 상품입니다. ${esc(advice)}</p>`;
}

function productAdviceProfile(item, productName) {
  const granular = productGranularAdviceProfile(item);
  if (granular) return granular;

  const text = `${decodeName(item.category1)} ${decodeName(item.category2)} ${decodeName(item.category3)} ${decodeName(item.category4)} ${productName}`.toLowerCase();
  const has = (...words) => words.some((word) => text.includes(word.toLowerCase()));
  if (has("건강식품", "홍삼", "유산균", "비타민", "콜라겐", "오메가", "루테인", "프로폴리스", "여주")) {
    return {
      categoryLabel: "건강식품",
      title: "건강식품 구매 전 확인 포인트",
      checks: [["성분 기준:", "총 용량보다 1일 섭취량 기준의 주요 성분 함량, 섭취 가능 일수, 원료명을 먼저 비교하세요."], ["섭취 대상:", "임산부, 어린이, 고령자, 복용 중인 약이 있는 사람은 공식 주의사항과 섭취 제한 문구를 확인해야 합니다."], ["표현 주의:", "건강 유지에 도움을 줄 수 있다는 표현과 질병 치료·예방 표현은 다릅니다. 과장된 효능처럼 보이는 문구는 신중하게 봐야 합니다."], ["보관 방법:", "캡슐, 분말, 액상 제품은 습기와 온도에 민감할 수 있으므로 개봉 후 보관법과 소비 가능 기간을 확인하세요."]],
      note: "건강식품은 개인의 건강 상태에 따라 체감이 크게 달라질 수 있으므로, 가격 혜택보다 성분표와 섭취 주의사항을 우선 기준으로 보는 것이 좋습니다."
    };
  }
  if (has("식품", "농산", "수산", "축산", "김치", "쌀", "한우", "굴비", "과일", "반찬", "해장국", "사과")) {
    const freshNote = has("냉동", "수산", "굴비", "한우", "축산") ? "냉동·신선식품은 수령 가능 시간과 냉동실 보관 공간까지 함께 계산해야 합니다." : "상온 식품이라도 소비기한과 개봉 후 보관법을 확인해야 낭비를 줄일 수 있습니다.";
    return {
      categoryLabel: "식품",
      title: "식품 구매 전 확인 포인트",
      checks: [["실중량:", "총 박스 수보다 실제 먹을 수 있는 중량, 개별 포장 단위, 1회분 기준 수량을 확인하세요."], ["원산지·등급:", "농축수산물은 산지, 등급, 손질 상태, 혼합 구성 여부에 따라 만족도가 크게 달라질 수 있습니다."], ["배송 조건:", freshNote], ["소비기한:", "대용량 구성은 가격이 좋아 보여도 소비 속도와 보관 공간이 맞지 않으면 오히려 부담이 될 수 있습니다."]],
      note: "식품은 방송 이미지와 조리 예시가 실제 구성품 전체를 의미하지 않을 수 있으니, 최종 구매 전 공식 상품 상세의 구성표를 기준으로 확인하세요."
    };
  }
  if (has("주방", "프라이팬", "후라이팬", "냄비", "칼", "도마", "용기", "식기", "조리")) {
    return {
      categoryLabel: "주방용품",
      title: "주방용품 구매 전 확인 포인트",
      checks: [["소재·코팅:", "스테인리스, 알루미늄, 코팅팬은 관리법과 내구성이 다르므로 소재와 코팅 종류를 먼저 보세요."], ["열원 호환:", "인덕션, 가스레인지, 하이라이트, 오븐 사용 가능 여부가 실제 사용성과 직결됩니다."], ["구성품:", "세트 수량이 많아도 자주 쓰는 크기가 빠져 있으면 활용도가 낮습니다. 팬 지름, 냄비 용량, 뚜껑 포함 여부를 확인하세요."], ["세척·보관:", "식기세척기 사용 가능 여부와 손잡이 분리, 적층 보관 가능 여부를 보면 사용 후 관리 부담을 줄일 수 있습니다."]],
      note: "주방용품은 한 번 사면 오래 쓰는 상품이 많아 가격보다 사용 환경과 관리 편의성을 먼저 맞추는 편이 좋습니다."
    };
  }
  if (has("패션", "의류", "속옷", "여성", "남성", "신발", "가방", "잡화", "언더웨어", "사이즈")) {
    return {
      categoryLabel: "패션·잡화",
      title: "패션·잡화 구매 전 확인 포인트",
      checks: [["실측표:", "평소 사이즈보다 어깨, 가슴, 허리, 총장, 밑위 같은 실측 수치를 기준으로 비교하세요."], ["색상 차이:", "방송 조명과 화면 설정 때문에 실제 색감이 달라질 수 있으므로 상세 이미지와 색상명을 함께 확인해야 합니다."], ["세트 구성:", "복수 구성 상품은 색상 선택 가능 여부, 사이즈 혼합 가능 여부, 일부 반품 가능 여부를 확인하세요."], ["교환 조건:", "착용 흔적, 세탁, 택 제거 후에는 교환·반품이 제한될 수 있어 수령 직후 상태 확인이 중요합니다."]],
      note: "패션 상품은 가격 혜택보다 사이즈 실패와 반품 조건이 만족도를 좌우하므로, 결제 전 교환 기준을 반드시 확인하는 것이 좋습니다."
    };
  }
  if (has("가전", "청소기", "건조기", "냉장", "세탁", "마사지", "전자", "설치", "디지털")) {
    return {
      categoryLabel: "생활가전",
      title: "생활가전 구매 전 확인 포인트",
      checks: [["모델명:", "비슷한 이름의 제품도 모델명에 따라 출시 시기, 구성품, 성능, AS 조건이 달라질 수 있습니다."], ["설치 조건:", "전원, 배수, 설치 공간, 벽면 간격, 기존 제품 철거 비용을 구매 전 확인하세요."], ["유지 비용:", "필터, 소모품, 전기요금, 추가 부품 비용이 있는지 보면 실제 총비용을 판단하기 쉽습니다."], ["AS 기준:", "무상 보증 기간, 출장비, 제조사와 판매처의 책임 범위를 공식 상세에서 확인해야 합니다."]],
      note: "생활가전은 방송 중 혜택보다 설치 가능 여부와 사후관리 조건이 더 중요할 수 있습니다."
    };
  }
  return {
    categoryLabel: "홈쇼핑 편성",
    title: "구매 전 확인 포인트",
    checks: [["상품 구성:", "기본 구성품, 추가 구성품, 사은품을 구분해서 실제 필요한 구성인지 확인하세요."], ["최종 가격:", "방송가, 카드 할인, 쿠폰, 배송비가 결제 단계에서 어떻게 적용되는지 확인하세요."], ["반품 조건:", "개봉 후 반품 제한, 설치 상품 조건, 식품·위생 상품 예외 기준을 확인하세요."], ["공식 안내:", "본 사이트는 편성 정보를 정리하므로 최종 조건은 공영홈쇼핑 공식 상품 페이지를 기준으로 판단해야 합니다."]],
    note: "홈쇼핑 상품은 방송 시간과 혜택이 빠르게 바뀔 수 있으니, 결제 전 공식 판매 페이지의 최신 안내를 확인하세요."
  };
}

function productGranularAdviceProfile(item) {
  const category1 = decodeName(item.category1);
  const category2 = decodeName(item.category2);
  const category3 = decodeName(item.category3);
  const category4 = decodeName(item.category4);
  const label = category4 || category3 || category2 || category1;
  if (!label) return null;
  const categoryText = `${category1} ${category2} ${category3} ${category4} ${decodeName(item.name)}`;

  if (category1.includes("식품") && hasText(categoryText, ["육류", "소고기", "쇠고기", "육우", "한우", "갈비", "불고기", "정육"])) {
    return {
      categoryLabel: label,
      kind: "food",
      title: `${label} 구매 전 확인 포인트`,
      checks: [
        ["부위·용도:", "구이용, 국거리, 불고기용처럼 조리 목적에 따라 만족도가 달라지므로 상품명과 상세 구성의 부위를 먼저 확인하세요."],
        ["중량·팩구성:", "총 중량뿐 아니라 1팩 중량, 팩 수, 소분 포장 여부를 확인해야 보관과 해동 계획을 세우기 쉽습니다."],
        ["원산지·등급:", "육류는 원산지, 등급, 손질 상태, 양념 포함 여부에 따라 체감 품질과 활용도가 크게 달라질 수 있습니다."],
        ["냉동·해동:", "냉동 상품은 수령 가능 시간, 냉동실 여유 공간, 재냉동 가능 여부를 함께 고려해야 합니다."]
      ],
      note: `${label} 상품은 방송 화면의 조리 예시보다 실제 부위, 중량, 포장 단위가 중요합니다. 최종 구매 전 공식 상품 상세의 구성표와 보관 방법을 기준으로 확인하세요.`
    };
  }

  if (category1.includes("식품") && hasText(categoryText, ["수산", "생선", "굴비", "고등어", "갈치", "전복", "오징어", "새우"])) {
    return {
      categoryLabel: label,
      kind: "food",
      title: `${label} 구매 전 확인 포인트`,
      checks: [
        ["실중량:", "마리 수나 팩 수보다 손질 후 실제 먹을 수 있는 중량과 개별 포장 단위를 확인하세요."],
        ["원산지·손질:", "원산지, 손질 상태, 염도나 양념 여부에 따라 조리 편의성과 맛이 달라질 수 있습니다."],
        ["냉동 배송:", "수산물은 냉동 상태 유지와 수령 가능 시간이 중요하므로 배송 조건을 먼저 확인하는 것이 좋습니다."],
        ["보관·조리:", "해동 후 재냉동 가능 여부와 권장 조리 방식을 확인하면 낭비를 줄일 수 있습니다."]
      ],
      note: `${label} 상품은 이미지보다 손질 상태와 보관 조건이 만족도에 더 큰 영향을 줄 수 있습니다.`
    };
  }

  if (category1.includes("식품") && hasText(categoryText, ["채소", "과일", "농산", "사과", "배", "블루베리", "토마토", "고구마", "감자"])) {
    return {
      categoryLabel: label,
      kind: "food",
      title: `${label} 구매 전 확인 포인트`,
      checks: [
        ["크기·등급:", "개당 중량, 크기 편차, 등급 표기, 흠과 포함 여부를 확인하세요."],
        ["수확·포장:", "수확 시기와 포장 방식에 따라 신선도와 선물 적합성이 달라질 수 있습니다."],
        ["배송 상태:", "신선식품은 수령 가능 시간과 파손 가능성을 함께 봐야 합니다."],
        ["보관 기간:", "대용량 구성은 소비 속도와 냉장 보관 공간이 맞는지 먼저 계산하세요."]
      ],
      note: `${label} 상품은 산지와 등급, 포장 상태가 중요합니다. 선물용이면 포장 형태와 배송 일정을 공식 상세에서 다시 확인하세요.`
    };
  }

  if (category1.includes("식품") && (category2.includes("신선식품") || category2.includes("가공식품"))) {
    return {
      categoryLabel: label,
      kind: "food",
      title: `${label} 구매 전 확인 포인트`,
      checks: [
        ["구성 확인:", "총 수량보다 실제 섭취 가능한 중량, 개별 포장 단위, 구성품 종류를 확인하세요."],
        ["보관 방식:", "상온, 냉장, 냉동 여부에 따라 수령 후 보관 공간과 소비 계획이 달라집니다."],
        ["원산지:", "주요 원재료의 원산지와 혼합 구성 여부를 확인하면 기대와 다른 구성을 피할 수 있습니다."],
        ["소비기한:", "대용량 구성은 가격이 좋아 보여도 소비기한과 섭취 속도가 맞지 않으면 부담이 될 수 있습니다."]
      ],
      note: `${label} 상품은 방송 중 혜택보다 구성표, 원산지, 보관 방법을 기준으로 판단하는 편이 안전합니다.`
    };
  }

  if (category1.includes("가구") || category2.includes("침구") || category3.includes("커버") || category4.includes("커버")) {
    return {
      categoryLabel: label,
      kind: "bedding",
      title: `${label} 구매 전 확인 포인트`,
      checks: [
        ["사이즈:", "침대 규격과 매트리스 높이에 맞는지 상세 사이즈를 먼저 확인하세요."],
        ["소재:", "면, 극세사, 냉감, 방수 등 소재에 따라 계절감과 세탁 방식이 달라집니다."],
        ["세탁 가능:", "세탁기 사용 가능 여부, 건조기 사용 제한, 탈수 조건을 확인하는 것이 좋습니다."],
        ["반품 배송:", "부피가 큰 침구류는 반품 배송비와 개봉 후 반품 제한이 구매 판단에 영향을 줍니다."]
      ],
      note: `${label} 상품은 화면 색감보다 사이즈, 소재, 세탁 가능 여부가 중요합니다. 공식 상세의 규격표를 기준으로 확인하세요.`
    };
  }

  if (category1.includes("건강")) {
    return {
      categoryLabel: label,
      kind: "health",
      title: `${label} 구매 전 확인 포인트`,
      checks: [
        ["성분:", "대표 성분명보다 1일 섭취량 기준 함량과 총 섭취 가능 일수를 확인하세요."],
        ["섭취 대상:", "임산부, 어린이, 고령자, 복용 중인 약이 있는 사람은 주의사항을 먼저 봐야 합니다."],
        ["원료:", "원료명, 원산지, 부원료와 알레르기 유발 성분을 확인하세요."],
        ["보관:", "분말, 캡슐, 액상 제품은 개봉 후 보관법과 소비 가능 기간이 중요합니다."]
      ],
      note: `${label} 상품은 개인 건강 상태에 따라 맞지 않을 수 있으므로 효능 문구보다 성분표와 주의사항을 우선 확인하세요.`
    };
  }

  return null;
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
  const rows = (await env.DB.prepare("SELECT * FROM schedule WHERE date >= ? ORDER BY views DESC, date ASC, start_time ASC LIMIT 160").bind(today).all()).results || [];
  const slots = groupCategorySlots(rows).slice(0, 50);
  const list = slots.map((slot, index) => popularSlotCard(slot, { heading: "공영홈쇼핑 인기 상품" }, index)).join("");
  const empty = `<div class="empty-state"><h3>현재 표시할 인기 상품이 없습니다.</h3><p>편성표 데이터가 갱신되면 현재 방송 예정 상품 기준으로 다시 표시됩니다.</p></div>`;
  return htmlPage("오늘 인기 공영홈쇼핑 상품 TOP 50", `<section class="hero"><div class="container"><h1>🔥 오늘 인기 상품 TOP 50</h1><p>현재 조회된 공영홈쇼핑 방송 상품을 정리했습니다.</p></div></section><section class="section"><div class="container">${popularIntroHtml()}<h2 class="section-title">조회수 기준 인기 상품</h2><div class="popular-list">${list || empty}</div></div></section>`, env, {
    active: "popular",
    canonical: "/popular/",
    description: "공영홈쇼핑 편성 상품 중 상세 조회가 많은 인기 상품 TOP 50입니다. 방송 묶음, 가격, 배송, 반품 조건을 함께 확인하세요."
  });
}

async function categoryPopularPage(slug, env) {
  const config = CATEGORY_PAGES[slug];
  if (!config) return htmlPage("인기 상품을 찾을 수 없습니다", `<section class="section"><div class="container"><div class="not-found"><h1>404</h1><p>요청하신 인기 상품 분류를 찾을 수 없습니다.</p><a class="btn-primary" href="/popular/">인기 상품 보기</a></div></div></section>`, env, { status: 404, robots: "noindex, follow" });
  const rows = await loadCategoryItems(env, slug, 120, true);
  const slots = groupCategorySlots(rows).slice(0, 30);
  const list = slots.map((slot, index) => popularSlotCard(slot, config, index)).join("");
  return htmlPage(`${config.heading} 인기 TOP 30 - 홈쇼핑뷰`, `<section class="hero"><div class="container"><h1>${esc(config.heading)} 인기 TOP 30</h1><p>조회수와 편성 정보를 기준으로 ${esc(config.heading)}을 정리했습니다.</p></div></section><section class="section"><div class="container">${popularIntroHtml(config)}<div class="popular-list">${list || emptyCategoryHtml(config)}</div></div></section>`, env, {
    active: "popular",
    canonical: `/popular/${slug}/`,
    description: `${config.heading} 인기 상품을 조회수 기준으로 확인하고 구매 전 체크포인트를 함께 살펴보세요.`
  });
}

async function categoryLandingPage(slug, env) {
  const config = CATEGORY_PAGES[slug];
  if (!config) return htmlPage("상품군 페이지를 찾을 수 없습니다", `<section class="section"><div class="container"><div class="not-found"><h1>404</h1><p>요청하신 상품군 페이지를 찾을 수 없습니다.</p><a class="btn-primary" href="/">편성표 보기</a></div></div></section>`, env, { status: 404, robots: "noindex, follow" });
  const rows = await loadCategoryItems(env, slug, 120, false);
  const popularRows = await loadCategoryItems(env, slug, 80, true);
  const slots = groupCategorySlots(rows).slice(0, 24);
  const popularSlots = groupCategorySlots(popularRows).slice(0, 6);
  const cards = slots.length ? `<div class="schedule-list">${slots.map((slot) => scheduleCard(slot.main, slot.main.date, slot.subs)).join("")}</div>` : emptyCategoryHtml(config);
  const guideSlug = config.guide[0];
  const faqHtml = `<div class="faq-section guide-faq"><h2>자주 묻는 질문</h2>${config.faq.map(([q, a], index) => `<div class="faq-item${index === 0 ? " open" : ""}"><div class="faq-question"><span>Q. ${esc(q)}</span><span class="icon">⌄</span></div><div class="faq-answer"><div class="faq-answer-inner">${esc(a)}</div></div></div>`).join("")}</div>`;
  const body = `<section class="hero"><div class="container"><h1>${esc(config.title)}</h1><p>${esc(config.description)}</p></div></section>
  ${categoryPopularPreviewHtml(config, slug, popularSlots)}
  <section class="section"><div class="container"><h2 class="section-title">오늘 이후 편성 상품</h2>${cards}</div></section>
  <section class="section"><div class="container"><div class="content-page"><h2>구매 전 체크포인트</h2>${categoryLongGuideHtml(slug, config)}<ul>${config.points.map((point) => `<li>${esc(point)}</li>`).join("")}</ul><p>관련 기준을 더 자세히 보려면 <a href="/guide/${guideSlug}/">${esc(config.guide[1])}</a>를 함께 확인해 주세요.</p></div></div></section>
  <section class="section"><div class="container">${faqHtml}</div></section>`;
  return htmlPage(`${config.title} - 홈쇼핑뷰`, body, env, {
    active: categoryNavActive(slug),
    canonical: `/category/${slug}/`,
    description: config.description
  });
}

function categoryNavActive(slug) {
  if (["food", "health", "kitchen", "fashion", "appliance"].includes(slug)) return slug;
  return "schedule";
}

function categoryPopularPreviewHtml(config, slug, slots) {
  if (!slots.length) return "";
  const list = slots.map((slot, index) => popularSlotCard(slot, config, index)).join("");
  return `<section class="section"><div class="container"><div class="section-heading-row"><h2 class="section-title">인기 ${esc(config.heading)} TOP 6</h2><a href="/popular/${slug}/" class="btn-secondary">TOP 30 보기</a></div><div class="popular-list">${list}</div></div></section>`;
}

function popularSlotCard(slot, config, index) {
  const item = slot.main;
  const subText = slot.subs.length ? ` · 함께 방송 ${slot.subs.length}개` : "";
  return `<a class="popular-card" href="/schedule/${item.date}/${encodeURIComponent(item.item_code)}"><div class="popular-rank">${index + 1}</div><div class="popular-body"><div class="popular-meta"><span>${esc(config.heading)}</span><span>${formatDate(item.date)}</span><span>${Number(item.views || 0)}회${subText}</span></div><h3>${esc(decodeName(item.name))}</h3><p>${price(item.price)}원</p></div></a>`;
}

function categoryLongGuideHtml(slug, config) {
  const guides = {
    food: ["식품 홈쇼핑 상품은 가격과 양이 먼저 눈에 들어오지만, 실제 만족도는 중량 표기와 보관 조건에서 갈리는 경우가 많습니다. 같은 10팩 구성이라도 1팩 용량, 손질 상태, 양념 포함 여부, 냉장·냉동 배송 방식에 따라 체감 가치는 달라집니다. 특히 농축수산물은 산지와 등급, 수확·가공 시점, 개별 포장 방식이 중요합니다.", "대용량 식품은 1회 식사 기준으로 몇 번 먹을 수 있는지 계산해 보는 것이 좋습니다. 냉동식품은 냉동실 공간과 수령 가능 시간을 함께 고려해야 하고, 신선식품은 배송 지연이나 부재중 수령 문제가 품질에 영향을 줄 수 있습니다. 방송 화면의 조리 예시나 플레이팅 이미지는 참고 자료로 보고, 실제 구성품은 공식 상품 상세의 구성표와 원산지 표시를 기준으로 확인하는 편이 안전합니다."],
    health: ["건강식품은 다른 상품군보다 표현을 더 조심해서 읽어야 합니다. 방송에서 강조하는 원료명이나 함량이 좋아 보여도, 실제로는 1일 섭취량 기준의 성분 함량과 총 섭취 가능 일수가 더 중요합니다. 홍삼, 유산균, 비타민, 오메가, 루테인 같은 상품은 성분명만 같아도 원료 형태와 함량, 부원료, 섭취 대상이 다를 수 있습니다.", "건강식품은 개인의 건강 상태, 복용 중인 약, 알레르기, 연령에 따라 맞지 않을 수 있습니다. 질병 치료나 예방처럼 들리는 표현은 광고 문구와 실제 기능성 표시를 구분해서 봐야 합니다. 부모님 선물용으로 구매할 때도 포장 수량보다 섭취 방법이 간단한지, 보관이 쉬운지, 공식 주의사항에 해당되는 사람이 없는지를 먼저 확인하는 것이 좋습니다."],
    kitchen: ["주방용품은 세트 구성이 많아 보일수록 좋아 보이지만, 실제로 자주 쓰는 크기와 소재가 맞지 않으면 보관만 차지할 수 있습니다. 프라이팬, 냄비, 칼, 보관용기는 제품별로 확인해야 할 기준이 다릅니다. 코팅 제품은 코팅 종류와 금속 조리도구 사용 가능 여부, 스테인리스 제품은 연마제 제거와 관리법, 밀폐용기는 용량과 뚜껑 구조가 중요합니다.", "구매 전에는 인덕션, 가스레인지, 하이라이트, 오븐, 식기세척기 호환 여부를 확인해야 합니다. 방송에서는 세트 수량과 할인율을 강조하지만 실제 사용성은 손잡이 구조, 무게, 세척 편의성, 보관 방식에서 결정되는 경우가 많습니다. 이미 비슷한 제품이 있다면 부족한 크기나 용도만 보완하는 구성인지 따져 보는 것이 좋습니다."],
    fashion: ["패션·잡화 상품은 방송 화면에서 착용감과 색감이 좋아 보여도 실제 수령 후 차이가 생기기 쉬운 상품군입니다. 가장 먼저 확인할 것은 평소 사이즈가 아니라 실측표입니다. 브랜드마다 어깨, 가슴, 허리, 총장 기준이 다르고, 신축성 있는 소재인지 아닌지에 따라 같은 사이즈도 착용감이 달라질 수 있습니다.", "세트 의류나 속옷, 신발, 가방 상품은 색상 선택 가능 여부와 구성품별 반품 조건을 확인해야 합니다. 조명과 화면 설정 때문에 색상이 달라 보일 수 있고, 착용 흔적이나 택 제거 후에는 교환·반품이 제한될 수 있습니다. 방송 중 혜택이 좋아 보여도 자신의 체형, 보유한 옷과의 조합, 세탁 관리 난이도까지 고려하는 편이 실패를 줄입니다."],
    appliance: ["생활가전은 표시 가격보다 설치 가능 여부와 사후관리 조건이 더 중요할 때가 많습니다. 청소기, 주방가전, 마사지기, 계절가전처럼 상품군이 달라도 공통으로 모델명, 구성품, AS 기간, 소모품 비용을 확인해야 합니다. 비슷한 이름의 제품이라도 모델명 한 글자 차이로 출시 시기나 성능, 포함 부품이 달라질 수 있습니다.", "설치형 상품은 전원 위치, 배수 조건, 제품 크기, 문 열림 공간, 기존 제품 철거 여부를 미리 확인해야 합니다. 소형가전도 필터나 브러시 같은 소모품 비용이 반복적으로 들 수 있습니다. 방송 혜택이 큰 상품일수록 결제 전에 공식 상품 페이지에서 제조사, 보증 기간, 출장 AS 조건, 반품 제한 기준을 차분히 확인하는 것이 좋습니다."]
  };
  const paragraphs = guides[slug] || [`${config.description} 상품은 방송 화면의 혜택 문구만 보고 결정하기보다 구성, 가격, 배송, 반품 조건을 함께 확인하는 것이 좋습니다.`, "홈쇼핑 상품은 방송 중 조건과 공식 사이트 조건이 달라질 수 있으므로 최종 결제 전 공식 상품 페이지의 최신 안내를 기준으로 판단해야 합니다."];
  return paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("");
}

function popularIntroHtml(config) {
  const target = config ? config.heading : "공영홈쇼핑 상품";
  const guide = popularRelatedGuideHtml(config);
  return `<div class="content-page" style="margin-bottom:26px;"><h2>인기 상품을 볼 때 확인할 점</h2><p>${esc(target)} 인기 목록은 현재 편성된 상품 중 상세 페이지 조회가 많은 상품을 우선 보여줍니다. 조회수가 높다는 것은 관심이 많다는 뜻이지만, 반드시 나에게 맞는 상품이라는 의미는 아닙니다. 가격, 구성품, 배송 조건, 반품 가능 여부를 함께 확인해야 실제 구매 만족도를 판단할 수 있습니다.</p><p>같은 시간대에 함께 방송되는 상품은 하나의 방송 묶음으로 정리합니다. 대표 상품과 관련 상품의 가격이나 구성이 다를 수 있으므로, 인기 순위만 보고 바로 결제하기보다 상세 페이지에서 방송 시간, 공식 구매 링크, 상품군별 체크포인트를 함께 확인해 주세요.</p>${guide}</div>`;
}

function popularRelatedGuideHtml(config) {
  const heading = config?.heading || "";
  let slug = "shopping-checklist";
  if (heading.includes("식품")) slug = "food-guide";
  if (heading.includes("건강")) slug = "health-guide";
  if (heading.includes("주방")) slug = "kitchenware-guide";
  if (heading.includes("패션")) slug = "fashion-guide";
  if (heading.includes("가전")) slug = "appliance-guide";
  const post = GUIDE_POSTS.find((item) => item[0] === slug) || GUIDE_POSTS.find((item) => item[0] === "shopping-checklist");
  if (!post) return "";
  const [, title, excerpt] = post;
  return `<div class="guide-inline-box"><h3>상세 가이드: ${esc(title)}</h3><p>${esc(excerpt)}</p><a href="/guide/${slug}/">가이드 자세히 보기</a></div>`;
}

async function channelPage(env) {
  const channelRows = await loadChannelRows(env);
  const body = `<section class="hero"><div class="container"><h1>공영홈쇼핑 채널번호 안내</h1><p>IPTV와 케이블TV에서 공영홈쇼핑을 시청하는 방법과 지역별 채널번호를 확인하세요.</p></div></section><section class="section"><div class="container">${channelGuideHtml(channelRows)}</div></section>`;
  return htmlPage("공영홈쇼핑 채널번호 안내 - 홈쇼핑뷰", body, env, {
    active: "intro",
    canonical: "/channel/",
    description: "공영홈쇼핑 IPTV, 위성방송, 케이블TV 지역별 채널번호와 시청 방법을 안내합니다."
  });
}

async function loadCategoryItems(env, slug, limit = 24, byViews = false) {
  const config = CATEGORY_PAGES[slug];
  if (!config) return [];
  const today = todayKst();
  const keywords = categoryKeywordVariants(config.keywords);
  const clauses = keywords.map(() => "(category1 LIKE ? OR category2 LIKE ? OR category3 LIKE ? OR category4 LIKE ? OR name LIKE ?)");
  const params = [today];
  for (const keyword of keywords) {
    const value = `%${keyword}%`;
    params.push(value, value, value, value, value);
  }
  params.push(limit);
  const order = byViews ? "views DESC, date ASC, start_time ASC" : "date ASC, start_time ASC, priority ASC";
  const sql = `SELECT * FROM schedule WHERE date >= ? AND (${clauses.join(" OR ")}) ORDER BY ${order} LIMIT ?`;
  return (await env.DB.prepare(sql).bind(...params).all()).results || [];
}

function categoryKeywordVariants(keywords) {
  const variants = new Set();
  for (const keyword of keywords) {
    variants.add(encodeURIComponent(keyword));
  }
  return [...variants];
}

function emptyCategoryHtml(config) {
  const guideSlug = config.guide?.[0] || "shopping-checklist";
  return `<div class="empty-state"><h3>현재 표시할 ${esc(config.heading)}이 없습니다.</h3><p>편성 데이터가 갱신되면 해당 상품군의 방송 상품을 다시 정리합니다. 지금은 전체 편성표와 인기 상품, 관련 구매 가이드에서 비슷한 상품군을 먼저 확인해 보세요.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px;"><a class="btn-primary" href="/">전체 편성표</a><a class="btn-secondary" href="/popular/">인기 상품</a><a class="btn-secondary" href="/guide/${guideSlug}/">관련 가이드</a></div></div>`;
}

async function introPageV2(env) {
  const body = `<section class="hero"><div class="container"><h1>홈쇼핑뷰 공영홈쇼핑 가이드</h1><p>편성표, 상품 정보, 할인 혜택을 한눈에 비교하고 오늘의 방송 쇼핑을 더 똑똑하게 확인하세요.</p></div></section>
  ${introGuideSectionsHtml()}
  ${faqSectionHtml()}`;
  return htmlPage("홈쇼핑뷰 공영홈쇼핑 소개", body, env, {
    active: "intro",
    canonical: "/intro/",
    description: "홈쇼핑뷰 공영홈쇼핑 소개, 운영 목적, 공공데이터 출처, 주요 기능, 편성표와 상품 정보 활용 방법 안내."
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
    <p>공영홈쇼핑은 중소기업과 소상공인의 판로 확대를 위해 운영되는 공적 성격의 홈쇼핑 채널입니다. 기존 민영 홈쇼핑과 달리 중소기업 상품, 지역 특산품, 농축수산물 편성이 많은 편이며, 시청자는 방송 시간과 공식 상품 페이지의 조건을 함께 확인하는 것이 좋습니다.</p>
    <h3>일반 홈쇼핑과의 차이점</h3>
    <p>공영홈쇼핑은 다른 민영 홈쇼핑 채널과 다음과 같은 차별점이 있습니다.</p>
    <ul><li><strong>중소기업 상품 비중이 높음:</strong> 전체 방송 상품의 70% 이상이 중소기업·소상공인 제품입니다.</li><li><strong>합리적인 가격 정책:</strong> 과도한 마진을 추구하지 않아 소비자가에서 경쟁력 있는 가격을 유지합니다.</li><li><strong>지역 특산품 집중 편성:</strong> 전국 각 지역의 농·수·축산물, 지역 특산품에 대한 방송 비중이 높습니다.</li><li><strong>사회적 약자 지원:</strong> 장애인 기업, 사회적 기업의 상품도 적극 편성합니다.</li><li><strong>상대적으로 낮은 송출 수수료:</strong> 중소기업 입점 시 수수료 부담이 적어 판매자와 소비자 모두에게 유리합니다.</li></ul>
    <h3>공영홈쇼핑 방송 시간</h3>
    <p>공영홈쇼핑은 <strong>24시간</strong> 운영됩니다. 새벽 시간대에는 주로 식품류, 낮 시간대에는 생활용품 및 패션, 저녁 시간대(프라임 타임)에는 인기 상품이 집중 편성되는 경향이 있습니다. 하루 평균 <strong>60개 이상의 상품</strong>이 방송되며, 한 방송 시간(40~65분) 동안 메인 상품 외에 세트 구성이나 관련 상품도 함께 소개됩니다.</p>
    <h3>공영홈쇼핑 시청 방법</h3>
    <p>공영홈쇼핑은 IPTV, 케이블TV, 위성방송 등 다양한 경로로 시청할 수 있습니다. 채널번호는 통신사와 지역 케이블 사업자에 따라 다를 수 있으므로, 자세한 번호는 <a href="/channel/">공영홈쇼핑 채널번호 안내</a> 페이지에서 별도로 확인할 수 있습니다.</p>
  </div></div></section>

  <section class="section" id="site-section"><div class="container"><div class="content-page">
    <h2>홈쇼핑뷰 공영홈쇼핑 사이트 소개</h2>
    <h3>사이트 개요</h3>
    <p><strong>홈쇼핑뷰 공영홈쇼핑</strong>은 공공데이터포털(data.go.kr)에서 제공하는 공영홈쇼핑 오픈 API를 활용하여 TV 편성표와 상품 정보를 수집·정리하여 제공하는 독립 정보 사이트입니다.</p>
    <p>공영홈쇼핑 공식 사이트와는 별개로 운영되며, 소비자가 더 편리하게 편성 정보를 확인하고 합리적인 쇼핑을 할 수 있도록 돕는 것이 목표입니다.</p>
    <p>홈쇼핑뷰는 상품을 판매하거나 결제를 중개하지 않습니다. 편성표, 상품명, 가격, 카테고리, 공식 구매 링크를 보기 쉽게 정리하고, 상품군별 구매 전 확인사항을 덧붙여 사용자가 공식 사이트에서 최종 조건을 확인하기 전에 비교 기준을 잡을 수 있도록 돕습니다.</p>
    <h3>주요 기능</h3>
    <ul><li><strong>날짜별 TV 편성표 조회:</strong> 오늘부터 최대 9일 후까지의 편성 일정을 날짜별로 확인할 수 있습니다.</li><li><strong>31개 항목의 상세 정보:</strong> 상품명, 가격, 할인율, 카드 혜택, 카테고리 4단계, 무이자 할부, 품절 여부 등 API에서 제공하는 모든 정보를 빠짐없이 표시합니다.</li><li><strong>메인·관련 상품 그룹핑:</strong> 같은 방송 시간대의 메인 상품과 부속 상품(세트/옵션)을 묶어서 보여드려 비교가 쉽습니다.</li><li><strong>자동 업데이트:</strong> 매일 자정에 자동으로 최신 편성 정보를 수집하여 항상 최신 상태를 유지합니다.</li><li><strong>공식 사이트 바로가기:</strong> 각 상품 상세 페이지에서 공영홈쇼핑 공식 구매 페이지로 바로 이동할 수 있습니다.</li></ul>
    <h3>데이터 출처</h3>
    <p>본 사이트의 모든 편성표 및 상품 정보는 <a href="https://www.data.go.kr/" target="_blank" rel="noopener">공공데이터포털(data.go.kr)</a>에서 제공하는 공영홈쇼핑 TV편성 상품정보 API를 통해 수집됩니다. 정보의 정확성을 위해 노력하고 있으나, 실제 방송 편성과 차이가 있을 수 있으므로 최종 확인은 <a href="https://www.gongyoungshop.kr" target="_blank" rel="noopener">공영홈쇼핑 공식 사이트</a>를 이용해 주세요.</p>
    <p>데이터는 날짜별 편성표와 상품 상세 페이지로 재구성되며, 동일 방송 시간대의 대표 상품과 관련 상품을 묶어 표시합니다. 인기 상품은 상세 페이지 조회수를 기준으로 정렬하지만, 조회수는 구매 추천이나 품질 보증을 의미하지 않습니다.</p>
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
  return htmlPage("홈쇼핑 가이드 - 공영홈쇼핑 편성표 활용법", `<section class="hero"><div class="container"><h1>📖 홈쇼핑 가이드</h1><p>편성표와 상품 정보를 더 똑똑하게 확인하는 방법을 정리했습니다.</p></div></section><section class="section"><div class="container"><h2 class="section-title">안내 글 모음</h2><div class="post-list-grid">${cards}</div></div></section>`, env, {
    active: "guide",
    canonical: "/guide/",
    description: "공영홈쇼핑 편성표, 식품, 건강식품, 생활가전, 패션, 배송, 반품, 카드 할인 확인법을 정리한 홈쇼핑 구매 가이드 모음입니다."
  });
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
  const faqs = guideFaqs(title, data);
  return `<p>${data.intro}</p>
  ${guideSeoBody(title, data)}
  ${guideUniqueNote(title)}
  ${guideRelatedLinks(title)}
  <div class="faq-section guide-faq"><h2>❓ 자주 묻는 질문</h2>${faqs.map(([question, answer], index) => `<div class="faq-item${index === 0 ? " open" : ""}"><div class="faq-question"><span>Q. ${question}</span><span class="icon">▼</span></div><div class="faq-answer"><div class="faq-answer-inner">${answer}</div></div></div>`).join("")}</div>`;
}

function guideRelatedLinks(title) {
  const links = [["전체 편성표", "/"], ["인기 상품", "/popular/"], ["공영홈쇼핑 채널번호", "/channel/"]];
  if (title.includes("식품") || title.includes("농축수산")) links.push(["식품 편성 상품", "/category/food/"], ["식품 인기 TOP", "/popular/food/"]);
  else if (title.includes("건강")) links.push(["건강식품 편성 상품", "/category/health/"], ["건강식품 인기 TOP", "/popular/health/"]);
  else if (title.includes("주방")) links.push(["주방용품 편성 상품", "/category/kitchen/"], ["주방용품 인기 TOP", "/popular/kitchen/"]);
  else if (title.includes("패션")) links.push(["패션·잡화 편성 상품", "/category/fashion/"], ["패션·잡화 인기 TOP", "/popular/fashion/"]);
  else if (title.includes("가전")) links.push(["생활가전 편성 상품", "/category/appliance/"], ["생활가전 인기 TOP", "/popular/appliance/"]);
  else links.push(["식품 상품", "/category/food/"], ["건강식품 상품", "/category/health/"], ["생활가전 상품", "/category/appliance/"]);
  return `<div class="guide-inline-box"><h2>관련 페이지</h2><p>이 글과 함께 보면 좋은 홈쇼핑뷰 내부 페이지입니다. 편성표와 상품군 페이지를 함께 보면 실제 방송 상품을 기준으로 구매 조건을 비교하기 쉽습니다.</p><div style="display:flex;gap:8px;flex-wrap:wrap;">${links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div></div>`;
}

function guideFaqs(title, data) {
  const faqs = {
    "공영홈쇼핑 편성표 보는 법": [["편성표는 몇 일치까지 확인하는 것이 좋나요?", "오늘 방송부터 앞으로 며칠간의 편성을 함께 보면 같은 상품군의 반복 방송과 구성 차이를 비교하기 쉽습니다."], ["대표상품과 관련상품은 어떻게 구분하나요?", "대표상품은 해당 시간대의 중심 상품이고, 관련상품은 옵션이나 세트 구성으로 함께 소개되는 상품입니다."], ["방송 시간이 지나도 상품 상세를 볼 수 있나요?", "종료된 과거 편성은 최신 정보 중심 운영을 위해 노출을 제한할 수 있습니다. 현재와 미래 편성 위주로 확인해 주세요."]],
    "홈쇼핑 구매 전 체크리스트": [["체크리스트에서 가장 먼저 볼 항목은 무엇인가요?", "상품 구성과 반품 조건입니다. 가격이 좋아도 구성이나 반품 제한을 놓치면 구매 만족도가 떨어질 수 있습니다."], ["결제 직전에는 무엇을 확인해야 하나요?", "색상, 사이즈, 수량, 배송지, 최종 결제 금액, 카드 할인 적용 여부를 확인하는 것이 좋습니다."], ["방송 중 바로 사도 괜찮나요?", "필요한 상품이고 공식 페이지 조건까지 확인했다면 괜찮지만, 처음 보는 상품은 잠시 멈추고 조건을 비교하는 편이 안전합니다."]],
    "무료배송과 무이자 할부 확인법": [["무료배송이면 추가 비용이 전혀 없나요?", "대부분 배송비가 면제되지만 제주도와 일부 도서산간 지역은 추가 배송비가 붙을 수 있습니다."], ["무이자 할부는 할인과 같은 뜻인가요?", "아닙니다. 가격이 줄어드는 것은 아니고 결제 부담을 여러 달로 나누는 방식입니다."], ["무료배송과 할부 중 무엇이 더 중요한가요?", "소액 상품은 배송비가, 고가 상품은 할부 조건이 체감에 더 크게 작용할 수 있습니다."]],
    "식품 방송 상품 구매 가이드": [["식품 방송 상품은 무엇을 가장 먼저 봐야 하나요?", "총 중량, 원산지, 포장 단위, 보관 방식, 소비기한을 먼저 확인하는 것이 좋습니다."], ["냉동식품은 대용량이 무조건 유리한가요?", "냉동실 공간과 실제 소비 속도에 맞지 않으면 낭비가 될 수 있어 식사 횟수 기준으로 계산해야 합니다."], ["식품은 반품이 쉬운 편인가요?", "신선도와 위생 문제 때문에 개봉 후 또는 단순 변심 반품이 제한되는 경우가 많습니다."]],
    "건강식품 구매 전 확인사항": [["건강식품은 효과를 보장하나요?", "개인 상태에 따라 체감이 다르며 질병 치료나 예방 효과로 이해하면 안 됩니다."], ["함량은 어떻게 비교해야 하나요?", "총 용량보다 1일 섭취량 기준의 주요 성분 함량과 총 섭취 가능 일수를 함께 보는 것이 좋습니다."], ["복용 중인 약이 있으면 어떻게 하나요?", "특정 성분과 충돌할 수 있으므로 전문가와 상담한 뒤 구매하는 것이 안전합니다."]],
    "생활가전 홈쇼핑 구매 가이드": [["생활가전은 가격 외에 무엇을 봐야 하나요?", "설치 공간, AS 기간, 소모품 비용, 소비전력, 소음, 세척 편의성을 함께 확인해야 합니다."], ["모델명이 왜 중요한가요?", "비슷한 제품이라도 모델명에 따라 성능, 구성품, 출시 시기, AS 조건이 달라질 수 있습니다."], ["설치 후에도 반품이 가능한가요?", "설치형 제품은 설치 후 단순 변심 반품이 제한되거나 철거 비용이 발생할 수 있습니다."]],
    "패션 상품 사이즈 확인법": [["평소 사이즈대로 사면 되나요?", "브랜드마다 기준이 달라 실측표를 기준으로 확인하는 것이 더 안전합니다."], ["화면 색상과 실제 색상이 다를 수 있나요?", "조명과 화면 설정에 따라 색감이 달라질 수 있어 상세 이미지와 색상 설명을 함께 봐야 합니다."], ["세트 의류는 일부만 반품할 수 있나요?", "대부분 세트 전체 기준으로 처리되므로 구성품 전체 상태와 택 보관이 중요합니다."]],
    "홈쇼핑 상품 가격이 바뀌는 이유": [["방송 가격과 온라인 가격이 다른 이유는 무엇인가요?", "방송 시간 혜택, 카드 행사, 쿠폰, 구성 변경, 재고 상태가 다를 수 있기 때문입니다."], ["할인율이 높으면 좋은 가격인가요?", "정상가 기준이 높을 수 있으므로 최종 판매가와 구성품 기준으로 비교해야 합니다."], ["가격 변동을 어떻게 확인하면 좋나요?", "같은 상품의 재편성 여부와 공식 페이지 최종 결제 금액을 함께 확인하는 것이 좋습니다."]],
    "교환·반품 조건 확인 가이드": [["반품 조건은 어디서 확인하나요?", "공식 상품 상세 페이지의 교환·반품 안내에서 가능 기간, 배송비, 제한 조건을 확인해야 합니다."], ["식품도 단순 변심 반품이 되나요?", "신선도와 위생 문제로 제한되는 경우가 많아 구매 전 조건 확인이 필요합니다."], ["설치 상품은 왜 더 조심해야 하나요?", "설치 후 철거비나 재설치비가 발생할 수 있고 단순 변심 반품이 어려울 수 있습니다."]],
    "공공데이터 기반 편성표 활용법": [["공공데이터 편성표는 공식 판매 정보와 같은가요?", "방송 편성 확인에는 유용하지만 최종 판매 조건은 공식 사이트에서 확인해야 합니다."], ["데이터가 실제 방송과 다를 수 있나요?", "편성 변경이나 가격 변경이 발생할 수 있어 구매 직전 공식 페이지 확인이 필요합니다."], ["과거 편성은 왜 사라질 수 있나요?", "최신 방송 정보 중심으로 운영하고 검색엔진에는 현재 확인 가능한 정보 위주로 보여주기 위해서입니다."]],
    "공영홈쇼핑과 중소기업 상품 이해하기": [["낯선 중소기업 상품은 어떻게 판단하나요?", "제조원, 원산지, 인증, AS, 상세 설명의 구체성을 기준으로 판단하는 것이 좋습니다."], ["브랜드 인지도가 낮으면 피해야 하나요?", "무조건 피할 필요는 없지만 상품 정보와 고객 지원 조건이 충분한지 확인해야 합니다."], ["중소기업 상품의 장점은 무엇인가요?", "특정 품목에 전문성이 있거나 가격과 구성에서 실속 있는 경우가 많습니다."]],
    "농축수산물 방송 상품 고르는 법": [["농축수산물은 중량만 보면 되나요?", "중량뿐 아니라 산지, 등급, 손질 상태, 냉장·냉동 여부를 함께 봐야 합니다."], ["수산물 실중량은 왜 중요한가요?", "손질 전 중량과 실제 먹을 수 있는 중량이 다를 수 있어 실중량 확인이 필요합니다."], ["선물용 농축수산물은 무엇을 봐야 하나요?", "배송일, 포장 상태, 받는 사람의 보관 가능 여부를 함께 확인해야 합니다."]],
    "명절·시즌 상품 편성표 활용법": [["명절 상품은 언제 사는 것이 좋나요?", "배송 마감일을 고려해 필요한 날짜보다 여유 있게 주문하는 것이 좋습니다."], ["시즌 막바지 상품은 더 저렴한가요?", "가격이 내려갈 수는 있지만 원하는 구성이나 색상이 품절될 수 있습니다."], ["선물세트는 무엇을 확인해야 하나요?", "포장, 쇼핑백, 배송일, 원산지, 구성 수량을 함께 확인해야 합니다."]],
    "TV 생방송 주문과 온라인 구매 차이": [["TV 주문과 온라인 구매 혜택이 항상 같나요?", "주문 방식에 따라 ARS 할인, 앱 쿠폰, 카드 혜택이 다를 수 있습니다."], ["처음 구매자는 어떤 방식이 좋나요?", "조건을 눈으로 확인할 수 있는 온라인 구매가 더 차분할 수 있습니다."], ["전화 주문 시 주의할 점은 무엇인가요?", "상품 옵션, 수량, 배송지, 결제 조건을 상담 중 정확히 확인해야 합니다."]],
    "부모님 선물용 홈쇼핑 상품 고르는 법": [["부모님 선물은 무엇을 먼저 봐야 하나요?", "사용법이 쉬운지, 보관이 편한지, 배송과 AS가 명확한지 먼저 확인하는 것이 좋습니다."], ["건강식품을 선물해도 괜찮나요?", "복용 중인 약이나 건강 상태에 따라 맞지 않을 수 있어 섭취 주의사항을 확인해야 합니다."], ["대신 주문할 때 주의할 점은 무엇인가요?", "수령 가능 시간, 연락처, 배송지, 설치 가능 여부를 미리 확인해야 합니다."]],
    "공영홈쇼핑 처음 이용하는 사람을 위한 안내": [["처음 이용하면 무엇부터 봐야 하나요?", "편성표 날짜, 상품 상세, 공식 구매 링크 순서로 확인하면 이해하기 쉽습니다."], ["처음부터 고가 상품을 사도 되나요?", "가능하지만 먼저 소액 상품으로 주문 흐름을 익히는 편이 더 안전합니다."], ["홈쇼핑뷰에서 직접 결제하나요?", "아닙니다. 홈쇼핑뷰는 정보 제공 사이트이며 결제는 공영홈쇼핑 공식 사이트에서 진행합니다."]],
    "주방용품 홈쇼핑 구매 전 확인할 점": [["주방용품은 몇 종 세트가 좋나요?", "구성 수보다 실제 자주 쓰는 크기와 소재가 포함되어 있는지가 중요합니다."], ["인덕션 사용자는 무엇을 확인해야 하나요?", "제품의 인덕션 호환 여부와 바닥 소재를 반드시 확인해야 합니다."], ["코팅 팬은 반품이 쉬운가요?", "사용 흔적이 생기면 반품이 어려울 수 있어 사용 전 상태와 설명서를 확인해야 합니다."]],
    "화장품·이미용 상품 홈쇼핑 구매 가이드": [["화장품 세트는 많이 들어 있으면 좋은가요?", "피부에 맞지 않으면 낭비가 될 수 있어 용량과 사용 기간을 함께 봐야 합니다."], ["이미용 기기는 무엇을 확인해야 하나요?", "안전 인증, 사용 금지 대상, 세척 방법, 소모품 비용을 확인해야 합니다."], ["피부가 민감하면 어떻게 해야 하나요?", "성분을 확인하고 처음부터 대용량 세트를 구매하지 않는 편이 안전합니다."]],
    "홈쇼핑 세트 구성과 사은품 비교법": [["사은품이 많으면 좋은 구성인가요?", "실제로 쓸 수 있는 사은품인지, 본품 가격이 합리적인지 따로 봐야 합니다."], ["세트 상품 단가는 어떻게 계산하나요?", "식품은 100g당, 생활용품은 개당, 화장품은 ml당 가격처럼 상품군에 맞춰 계산합니다."], ["처음 써 보는 상품도 대량 세트가 좋나요?", "처음 구매라면 적은 구성으로 시작하는 것이 실패 위험을 줄입니다."]],
    "품절·매진 임박 상품을 볼 때 주의할 점": [["매진 임박이면 바로 사야 하나요?", "필요한 상품인지와 반품 조건이 맞는지 먼저 확인해야 합니다."], ["품절된 상품은 다시 살 수 없나요?", "공식 사이트 재입고나 앵콜 방송이 있을 수 있어 다음 편성을 확인해 볼 수 있습니다."], ["급하게 결제할 때 가장 조심할 것은 무엇인가요?", "옵션, 수량, 배송지, 최종 금액을 잘못 선택하지 않도록 마지막 화면을 확인해야 합니다."]],
    "공영홈쇼핑 카드 할인 혜택 확인법": [["카드 청구 할인과 즉시 할인은 무엇이 다른가요?", "즉시 할인은 결제 화면에서 바로 금액이 내려가는 방식이고, 청구 할인은 카드사 청구 단계에서 할인되는 방식입니다. 그래서 결제 화면에 보이는 금액만 보고 판단하지 말고 카드사 조건과 적용 시점을 함께 확인해야 합니다."], ["ARS 할인과 카드 할인은 동시에 적용되나요?", "상품과 행사 조건에 따라 다릅니다. 일부 혜택은 중복 적용이 가능하지만, 카드사 할인이나 쿠폰과 함께 쓸 수 없는 경우도 있으므로 공식 구매 페이지의 혜택 안내를 기준으로 확인하는 것이 좋습니다."], ["카드 할인 때문에 필요 없는 상품을 사도 괜찮을까요?", "할인액이 커 보여도 상품을 실제로 쓰지 않으면 지출만 늘어납니다. 카드 혜택은 구매 이유가 아니라 이미 필요한 상품을 더 좋은 조건으로 사기 위한 보조 기준으로 보는 편이 안전합니다."]],
    "공영홈쇼핑 주문·배송 확인 가이드": [["주문 후 가장 먼저 확인할 것은 무엇인가요?", "주문번호, 상품명, 옵션, 수량, 배송지, 결제 금액을 먼저 확인하는 것이 좋습니다. 홈쇼핑 상품은 세트 구성이나 옵션명이 길 수 있어 주문 직후 확인하면 배송 전 오류를 빨리 발견할 수 있습니다."], ["배송 예정일이 늦어질 수 있나요?", "신선식품, 주문 제작, 설치형 상품, 도서산간 배송은 일반 상품보다 일정이 달라질 수 있습니다. 방송 중 안내된 예상일과 실제 송장 등록 시점이 다를 수 있으므로 공식 주문 내역에서 다시 확인해야 합니다."], ["택배를 받기 어려운 시간대라면 어떻게 해야 하나요?", "식품이나 파손 위험이 있는 상품은 수령 가능 시간을 미리 고려해야 합니다. 부재가 잦다면 배송 메시지를 남기거나 가족 수령, 보관 장소를 정해 두는 것이 좋습니다."]],
    "공영홈쇼핑 고객센터 문의 전 준비사항": [["고객센터에 문의하기 전에 무엇을 준비해야 하나요?", "상품명, 주문번호, 방송일, 옵션, 결제 금액, 문의하려는 내용을 짧게 정리해 두면 상담이 빨라집니다. 상품 불량이나 오배송처럼 확인 자료가 필요한 경우에는 사진을 먼저 준비하는 것이 좋습니다."], ["반품 문의는 언제 하는 것이 좋나요?", "상품을 받은 뒤 이상이 있으면 가능한 빨리 문의하는 편이 좋습니다. 특히 식품, 화장품, 설치형 상품은 시간이 지나면 상태 확인이 어려워질 수 있으므로 수령 직후 포장과 구성품을 확인해야 합니다."], ["홈쇼핑뷰에서 고객센터 접수가 되나요?", "아닙니다. 홈쇼핑뷰는 편성표와 상품 정보를 정리하는 사이트이며 주문, 결제, 배송, 반품 처리는 공영홈쇼핑 공식 고객센터나 공식 사이트에서 진행해야 합니다."]],
    "공영홈쇼핑 모바일 앱 구매 활용법": [["모바일 앱으로 구매하면 무엇이 편한가요?", "방송 알림, 쿠폰 확인, 주문 내역 조회, 배송 상태 확인을 한 화면에서 처리하기 쉽습니다. 다만 앱 전용 혜택은 기간과 대상 상품이 정해져 있을 수 있어 결제 전 조건을 확인해야 합니다."], ["앱 알림은 모두 켜 두는 것이 좋나요?", "관심 상품군만 알림을 켜는 편이 좋습니다. 모든 알림을 켜 두면 불필요한 구매 자극이 늘어날 수 있으므로 식품, 생활용품, 패션처럼 자주 사는 분야만 선별하는 것이 효율적입니다."], ["모바일 결제에서 실수하기 쉬운 부분은 무엇인가요?", "작은 화면에서는 옵션, 수량, 배송지를 놓치기 쉽습니다. 결제 버튼을 누르기 전 마지막 화면에서 상품명, 옵션, 카드 혜택, 배송비를 천천히 확인하는 습관이 필요합니다."]],
    "홈쇼핑 상품 후기와 상세정보 읽는 법": [["후기 평점이 높으면 믿어도 되나요?", "평점은 참고 자료이지만 전부를 대신하지는 않습니다. 후기 수, 최근 후기, 반복되는 불만, 내 사용 목적과 비슷한 사람의 의견을 함께 봐야 실제 만족도를 더 잘 예측할 수 있습니다."], ["상세정보에서 가장 중요한 항목은 무엇인가요?", "상품군마다 다릅니다. 식품은 중량과 원산지, 가전은 AS와 설치 조건, 패션은 실측과 소재, 화장품은 성분과 사용 대상이 중요합니다. 제목보다 상세표를 먼저 확인하는 습관이 좋습니다."], ["후기가 너무 적은 상품은 피해야 하나요?", "반드시 피해야 하는 것은 아니지만 판단 자료가 적다는 뜻입니다. 이럴 때는 브랜드 신뢰도, 공식 상품 설명, 방송 구성, 반품 조건을 더 꼼꼼히 확인하고 처음부터 대량 구매를 피하는 편이 안전합니다."]],
    "홈쇼핑 충동구매 줄이는 예산 관리법": [["방송 중 사고 싶은 마음이 들면 어떻게 멈추나요?", "바로 결제하지 말고 필요한 이유를 한 문장으로 적어 보는 것이 좋습니다. 이미 집에 비슷한 상품이 있는지, 이번 달 예산에 들어오는지, 보관 공간이 충분한지 확인하면 순간적인 구매를 줄일 수 있습니다."], ["월 예산은 어떻게 잡는 것이 좋나요?", "식품처럼 반복 구매하는 품목과 가전처럼 드물게 사는 품목을 나누어 잡는 것이 좋습니다. 카드 할부로 나가는 금액도 다음 달 예산에 포함해야 실제 지출을 정확히 볼 수 있습니다."], ["세트 상품은 예산 관리에 불리한가요?", "필요한 만큼 모두 쓸 수 있다면 유리할 수 있지만, 보관 공간이 부족하거나 소비 속도가 느리면 낭비가 됩니다. 세트 상품은 개당 단가뿐 아니라 끝까지 사용할 가능성을 기준으로 판단해야 합니다."]]
  };
  return faqs[title] || data.faqs || [];
}

function guideUniqueNote(title) {
  const notes = {
    "공영홈쇼핑 편성표 보는 법": ["시간대별로 편성 의도를 나누어 보기", "새벽 방송은 재방송이나 실속형 식품이 섞일 수 있고, 저녁 시간대에는 설명이 긴 상품이나 가족 단위 구매 상품이 배치되는 경우가 있습니다. 편성표를 볼 때는 단순히 오늘 날짜만 보는 것이 아니라 내가 실제로 주문 가능한 시간대와 수령 가능한 상품군을 함께 생각해야 합니다. 방송을 보지 못하더라도 편성표에서 상품 상세로 들어가면 주요 조건을 미리 확인할 수 있으므로, 관심 상품은 방송 전에 따로 열어 두는 방식이 유용합니다."],
    "홈쇼핑 구매 전 체크리스트": ["결제 전 1분 점검 루틴", "구매 직전에는 가격보다 실수를 줄이는 확인이 더 중요합니다. 옵션 색상, 수량, 배송지, 연락처, 결제 카드가 맞는지 확인하고, 식품이나 화장품처럼 개봉 후 반품이 어려운 상품은 한 번 더 멈춰야 합니다. 체크리스트는 긴 문서가 아니라 결제 전 반복하는 습관입니다. 매번 같은 순서로 확인하면 방송 중 분위기에 휩쓸려도 놓치는 항목이 줄어듭니다."],
    "무료배송과 무이자 할부 확인법": ["혜택을 실제 금액으로 바꾸어 보기", "무료배송과 무이자 할부는 서로 다른 성격의 혜택입니다. 무료배송은 즉시 결제 금액을 낮추지만, 무이자 할부는 지출 시점을 나눌 뿐 전체 금액은 그대로입니다. 그래서 두 조건을 함께 볼 때는 배송비 포함 최종 금액과 월별 카드 부담액을 따로 적어 보는 것이 좋습니다. 특히 여러 홈쇼핑 상품을 같은 달에 할부로 구매하면 다음 달 고정 지출이 커질 수 있습니다."],
    "식품 방송 상품 구매 가이드": ["식탁에 올라갈 횟수로 계산하기", "식품은 총 중량보다 실제 식사 횟수로 생각하면 판단이 쉬워집니다. 10팩 구성이라도 한 팩이 한 끼인지, 두 사람이 먹기 충분한지, 양념이나 부재료가 필요한지에 따라 체감 가격이 달라집니다. 냉동실 공간이 부족하거나 자주 해먹지 않는 음식이라면 대용량 구성이 오히려 부담이 됩니다. 방송 화면의 조리 예시는 참고하고, 실제 생활 패턴에 맞는 양인지 계산해 보세요."],
    "건강식품 구매 전 확인사항": ["기대 효과보다 섭취 지속 가능성", "건강식품은 꾸준히 먹어야 한다는 점 때문에 처음부터 대량 구매가 부담이 될 수 있습니다. 맛, 제형, 섭취 시간, 알약 크기, 보관 방법이 내 생활과 맞지 않으면 아무리 좋은 구성도 오래 이어가기 어렵습니다. 특히 가족이 함께 먹을 상품이라면 연령대와 건강 상태가 모두 다르므로 한 사람 기준으로만 판단하면 안 됩니다. 기능성 문구보다 실제 섭취 가능성을 먼저 보세요."],
    "생활가전 홈쇼핑 구매 가이드": ["집 안 동선과 유지 관리까지 보기", "생활가전은 사는 순간보다 사용하는 시간이 더 중요합니다. 제품을 둘 공간, 콘센트 위치, 소음이 울리는 구조, 세척해야 하는 부품 수까지 생각해야 합니다. 매일 쓰는 제품은 조작이 쉬워야 하고, 가끔 쓰는 제품은 보관이 쉬워야 합니다. 방송에서 성능이 좋아 보여도 관리가 번거로우면 사용 빈도가 빠르게 줄어들 수 있습니다."],
    "패션 상품 사이즈 확인법": ["반품보다 처음 선택을 줄이는 기준", "패션 상품은 교환이 가능하더라도 왕복 배송과 기다리는 시간이 부담입니다. 특히 세트 의류는 일부만 마음에 들어도 전체를 반품해야 하는 경우가 있어 처음 선택이 중요합니다. 평소 잘 맞는 옷의 실측을 재어 두면 방송 상품의 사이즈표와 비교하기 쉽습니다. 색상은 화면 차이가 있으므로 기본색과 활용도가 높은 색을 우선 고려하는 것이 실패를 줄입니다."],
    "홈쇼핑 상품 가격이 바뀌는 이유": ["가격 변동을 이상하게만 보지 않기", "홈쇼핑 가격은 방송 회차와 판매 전략에 따라 움직입니다. 같은 상품이라도 재고 정리, 시즌 행사, 카드사 프로모션, 구성 변경에 따라 가격이 달라질 수 있습니다. 중요한 것은 어제보다 싸졌는지보다 오늘 구성과 내가 필요한 조건이 맞는지입니다. 가격이 바뀌는 구조를 이해하면 할인 문구에 흔들리기보다 최종 결제 금액과 구성품을 기준으로 판단할 수 있습니다."],
    "교환·반품 조건 확인 가이드": ["문제가 생겼을 때의 비용까지 생각하기", "반품 조건은 구매 후에 읽으면 늦습니다. 상품 하자가 아니라 단순 변심이면 배송비를 부담해야 할 수 있고, 설치 상품은 철거 비용이 별도로 붙을 수 있습니다. 식품과 위생 상품은 개봉 여부가 매우 중요합니다. 구매 전 반품 가능 기간과 비용을 확인하면 상품 가격이 조금 더 비싸더라도 조건이 명확한 쪽을 선택할 이유가 생깁니다."],
    "공공데이터 기반 편성표 활용법": ["데이터와 구매 정보의 경계 이해하기", "공공데이터는 방송 편성 정보를 이해하는 데 유용하지만, 판매자의 실시간 재고와 결제 조건을 완전히 대신하지는 않습니다. 그래서 데이터 기반 사이트는 상품 탐색과 비교를 돕는 역할에 집중해야 합니다. 사용자는 편성표에서 관심 상품을 찾고, 공식 페이지에서 최신 조건을 확인하는 두 단계를 거치면 됩니다. 이 경계를 이해하면 정보 오류에 대한 혼란이 줄어듭니다."],
    "공영홈쇼핑과 중소기업 상품 이해하기": ["브랜드보다 설명의 구체성 보기", "중소기업 상품은 대기업 브랜드보다 낯설 수 있지만, 설명이 구체적이면 충분히 좋은 선택지가 됩니다. 제조원, 소재, 원산지, 인증, 고객센터, AS 조건이 명확한지 확인하세요. 반대로 브랜드가 익숙하지 않은데 상품 정보도 부족하다면 신중해야 합니다. 공영홈쇼핑의 장점은 다양한 중소기업 상품을 접할 수 있다는 점이고, 소비자의 역할은 정보를 차분히 비교하는 것입니다."],
    "농축수산물 방송 상품 고르는 법": ["신선식품은 배송 이후까지 계획하기", "농축수산물은 주문하는 순간보다 받은 뒤 관리가 중요합니다. 과일은 후숙이 필요한지, 고기는 소분이 되어 있는지, 수산물은 해동 후 재냉동이 가능한지 확인해야 합니다. 선물용이면 받는 사람이 바로 수령할 수 있는지도 중요합니다. 신선식품은 가격이 좋아도 수령과 보관이 맞지 않으면 만족도가 크게 떨어질 수 있습니다."],
    "명절·시즌 상품 편성표 활용법": ["시즌 상품은 마감일이 가격만큼 중요", "명절 선물세트나 계절 상품은 늦게 주문하면 원하는 날짜에 받지 못할 수 있습니다. 방송 가격이 좋아도 배송 마감일을 놓치면 선물의 의미가 줄어듭니다. 시즌 상품은 가격, 구성, 배송일, 포장 상태를 함께 봐야 합니다. 특히 명절 직전에는 품절과 배송 지연이 겹칠 수 있으므로 편성표를 미리 보고 여유 있게 결정하는 것이 좋습니다."],
    "TV 생방송 주문과 온라인 구매 차이": ["주문 방식에 따라 확인 가능한 정보가 다르다", "전화 주문은 빠르고 편하지만 화면으로 조건을 다시 읽기 어렵습니다. 온라인 구매는 시간이 조금 더 걸려도 구성품, 배송비, 카드 할인, 반품 조건을 직접 확인할 수 있습니다. 어떤 방식이 더 좋다기보다 상품 성격에 맞는 방식이 다릅니다. 옵션이 복잡하거나 고가 상품이라면 온라인에서 확인하고, 단순 반복 구매 상품이면 전화 주문도 편리할 수 있습니다."],
    "부모님 선물용 홈쇼핑 상품 고르는 법": ["받는 사람의 생활 리듬에 맞추기", "부모님 선물은 내 기준의 좋은 상품보다 부모님 생활에 맞는 상품이어야 합니다. 조작이 복잡한 기기, 보관이 어려운 대용량 식품, 섭취 방법이 번거로운 건강식품은 부담이 될 수 있습니다. 선물 전에 사용 공간과 보관 공간, 건강 상태, 배송 수령 가능 시간을 생각해 보세요. 좋은 선물은 비싼 상품보다 받는 사람이 편하게 쓰는 상품입니다."],
    "공영홈쇼핑 처음 이용하는 사람을 위한 안내": ["처음에는 작은 구매로 흐름을 익히기", "처음부터 고가 상품을 구매하기보다 생활용품이나 식품처럼 조건을 이해하기 쉬운 상품으로 주문 흐름을 익히는 것이 좋습니다. 편성표 확인, 공식 페이지 이동, 결제 조건 확인, 배송 조회, 수령 후 상태 확인까지 한 번 경험하면 다음 구매가 훨씬 편해집니다. 처음 이용자는 혜택보다 절차를 익히는 것이 더 중요합니다."],
    "주방용품 홈쇼핑 구매 전 확인할 점": ["주방 크기와 조리 습관에 맞추기", "주방용품은 많이 들어 있는 세트보다 자주 쓰는 구성이 중요합니다. 인덕션을 쓰는 집은 호환 여부를 확인해야 하고, 식기세척기를 쓰는 집은 세척 가능 여부가 중요합니다. 무거운 냄비는 조리할 때 안정적일 수 있지만 매일 꺼내 쓰기 불편할 수 있습니다. 내 주방의 수납 공간과 조리 습관을 기준으로 선택하세요."],
    "화장품·이미용 상품 홈쇼핑 구매 가이드": ["피부에 직접 닿는 상품은 천천히 판단하기", "화장품과 이미용 기기는 사용 후 반품이 어려울 수 있으므로 처음 구매할 때 더 조심해야 합니다. 피부 타입이 민감하다면 대용량 세트보다 기본 구성을 먼저 확인하는 것이 안전합니다. 이미용 기기는 효과보다 사용 금지 대상, 세척 방법, 전원 안전, 소모품 비용을 먼저 봐야 합니다. 방송의 즉각적인 변화 장면은 참고 자료로만 보세요."],
    "홈쇼핑 세트 구성과 사은품 비교법": ["사은품은 덤, 본품은 기준", "세트 구성에서 사은품이 커 보이면 본품 판단이 흐려질 수 있습니다. 먼저 본품만 놓고 가격과 필요성을 계산하고, 그다음 사은품이 실제로 쓸 물건인지 판단하세요. 사은품이 많아도 보관이 어렵거나 유통기한이 짧으면 장점이 아닙니다. 세트 상품은 많이 받는 것보다 버리지 않고 쓰는 구성이 좋은 구성입니다."],
    "품절·매진 임박 상품을 볼 때 주의할 점": ["급할수록 옵션 실수를 줄이기", "품절 임박 상황에서는 색상, 사이즈, 수량, 배송지를 잘못 선택하기 쉽습니다. 빠르게 결제해야 할 것처럼 느껴져도 마지막 화면에서 옵션과 금액을 확인해야 합니다. 인기 상품이라도 내게 맞지 않으면 좋은 구매가 아닙니다. 매진 문구는 참고하되, 필요한 상품인지와 반품 조건이 괜찮은지를 먼저 보세요."],
    "공영홈쇼핑 카드 할인 혜택 확인법": ["카드 혜택은 최종 결제 기준으로 보기", "카드 할인은 방송 문구보다 실제 결제 조건을 기준으로 봐야 합니다. 같은 할인율이라도 월 한도, 전월 실적, 대상 카드, 결제 방식에 따라 적용 여부가 달라질 수 있습니다. 청구 할인은 결제 화면에서 바로 보이지 않을 수 있으므로 카드사 안내와 공식 구매 페이지를 함께 확인하세요. 혜택을 받기 위해 필요 없는 상품을 사는 것보다, 이미 살 상품에 혜택이 붙는지를 보는 것이 더 좋은 기준입니다."],
    "공영홈쇼핑 주문·배송 확인 가이드": ["주문 직후 확인이 배송 문제를 줄입니다", "배송 문제는 대부분 주문 직후 정보 확인으로 줄일 수 있습니다. 주소, 연락처, 옵션, 수량, 배송 메시지가 맞는지 확인하고, 식품이나 설치형 상품처럼 수령 조건이 중요한 상품은 예상 배송일을 따로 메모해 두세요. 방송 중 안내와 실제 주문 내역이 다르게 보이면 공식 사이트의 주문 상세를 기준으로 확인하는 것이 가장 안전합니다."],
    "공영홈쇼핑 고객센터 문의 전 준비사항": ["문의는 자료가 정리될수록 빨라집니다", "고객센터 문의는 감정적으로 설명하는 것보다 확인 가능한 정보를 준비하는 것이 빠릅니다. 주문번호, 상품명, 방송일, 옵션, 결제 금액, 사진 자료를 함께 정리하면 상담원이 상황을 파악하기 쉽습니다. 특히 오배송이나 파손은 포장 상태 사진이 중요할 수 있으므로 버리기 전에 상태를 기록해 두는 습관이 좋습니다."],
    "공영홈쇼핑 모바일 앱 구매 활용법": ["앱은 편하지만 마지막 화면은 천천히", "모바일 앱은 방송 알림과 쿠폰 확인이 편리하지만 작은 화면 때문에 옵션과 수량을 놓치기 쉽습니다. 앱 전용 혜택이 있다면 적용 조건을 확인하고, 결제 전 마지막 화면에서 배송비와 카드 혜택이 실제로 반영되었는지 확인하세요. 자주 사는 품목만 알림을 켜 두면 편리함은 살리고 충동구매는 줄일 수 있습니다."],
    "홈쇼핑 상품 후기와 상세정보 읽는 법": ["후기는 결론이 아니라 단서입니다", "후기는 실제 사용자의 경험을 볼 수 있다는 장점이 있지만 모든 사람에게 같은 결과가 적용되지는 않습니다. 별점보다 최근 후기, 반복되는 불만, 사진 후기, 내 사용 환경과 비슷한 사례를 함께 확인하는 것이 좋습니다. 후기가 부족한 상품은 상세정보와 반품 조건을 더 꼼꼼히 보고, 처음부터 대량 구매하지 않는 방식으로 위험을 줄일 수 있습니다."],
    "홈쇼핑 충동구매 줄이는 예산 관리법": ["사지 않는 기준도 미리 정해두기", "예산 관리는 단순히 금액을 줄이는 일이 아니라 구매하지 않을 기준을 정하는 일입니다. 같은 기능의 상품이 이미 있거나, 보관 공간이 없거나, 다음 달 카드 지출이 부담된다면 방송 혜택이 좋아도 멈추는 편이 좋습니다. 홈쇼핑은 기회처럼 보이는 순간이 자주 오므로 구매 기준을 미리 정해 두면 후회하는 소비를 크게 줄일 수 있습니다."]
  };
  const note = notes[title];
  return note ? `<h2>${note[0]}</h2><p>${note[1]}</p>` : "";
}

function guideSeoBody(title, data) {
  const sections = guideLongSections(title);
  return sections.map((section) => `<h2>${section.heading}</h2>${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}${section.items ? `<ul>${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}`).join("");
}

function guideLongSections(title) {
  const articles = {
    "공영홈쇼핑 편성표 보는 법": [
      {
        heading: "방송 시간표를 읽는 순서",
        paragraphs: [
          "공영홈쇼핑 편성표를 볼 때는 날짜를 먼저 고르고, 그다음 방송 시작 시간과 종료 시간을 확인하는 것이 좋습니다. 홈쇼핑 상품은 같은 날에도 새벽, 오전, 점심, 저녁 시간대별로 전혀 다른 성격의 상품이 배치됩니다. 식품은 이른 시간이나 점심 전후에 편성되는 경우가 많고, 생활가전이나 건강식품은 설명 시간이 긴 방송으로 잡히는 경우가 있습니다. 방송 시간이 길다고 무조건 더 좋은 상품이라는 뜻은 아니지만, 설명 시간이 길수록 구성품, 사용법, 혜택 조건이 자세히 소개될 가능성이 높습니다.",
          "편성표의 상품명은 긴 경우가 많습니다. 상품명 안에는 브랜드, 중량, 구성 수량, 색상, 모델명, 사은품 여부가 함께 들어가므로 처음에는 복잡해 보입니다. 하지만 상품명에서 숫자와 단위를 먼저 보면 비교가 쉬워집니다. 예를 들어 100g 10팩인지, 1kg 2통인지, 5종 세트인지에 따라 실제 단가가 완전히 달라집니다. 그래서 편성표를 볼 때는 상품명을 대충 읽지 말고 구성 단위와 판매 가격을 함께 보는 습관이 필요합니다."
        ],
        items: ["날짜 선택 후 시간대별로 방송 순서를 봅니다.", "상품명 안의 중량, 수량, 모델명을 먼저 확인합니다.", "대표상품과 관련상품을 구분해 같은 시간대 구성을 비교합니다.", "가격 표시 아래의 무료배송, 무이자 할부, 카드 혜택을 함께 봅니다."]
      },
      {
        heading: "대표상품과 관련상품 구분",
        paragraphs: [
          "편성표에는 한 시간대에 하나의 상품만 나오는 것이 아니라 대표상품과 관련상품이 함께 잡히는 경우가 있습니다. 대표상품은 해당 방송에서 가장 중심이 되는 상품이고, 관련상품은 옵션, 리필, 다른 용량, 세트 구성, 색상 선택 상품일 수 있습니다. 소비자 입장에서는 대표상품만 보는 것보다 같은 시간대 관련상품까지 확인해야 실제 선택지가 보입니다. 특히 식품이나 패션 상품은 비슷한 이름의 관련상품이 여러 개 있을 수 있어 가격 차이를 비교하는 것이 중요합니다.",
          "홈쇼핑뷰에서는 날짜별 편성표와 상품 상세 페이지를 연결해 방송 시간, 가격, 카테고리, 공식 구매 링크를 확인할 수 있게 구성했습니다. 다만 최종 주문은 공영홈쇼핑 공식 사이트에서 진행해야 하며, 방송 편성 변경이나 품절 여부는 공식 페이지 기준으로 확인해야 합니다. 편성표는 구매 결정을 돕는 지도에 가깝고, 결제 조건을 확정하는 화면은 공식 판매 페이지라고 이해하면 안전합니다."
        ]
      },
      {
        heading: "편성표 활용 팁",
        paragraphs: [
          "필요한 상품이 있다면 당일 편성표만 보지 말고 며칠 뒤 편성까지 함께 확인해 보세요. 같은 브랜드 상품이 반복 편성되더라도 구성이나 가격이 조금씩 달라질 수 있습니다. 오늘은 대용량 세트가 나오고 며칠 뒤에는 소용량 세트가 나오는 식입니다. 가족 수, 보관 공간, 실제 사용량에 맞춰 선택하면 방송 중 분위기에 휩쓸려 과하게 구매하는 일을 줄일 수 있습니다.",
          "인기 상품 페이지도 함께 보면 어떤 상품이 많이 조회되는지 파악할 수 있습니다. 조회수가 높다고 무조건 좋은 상품은 아니지만, 소비자가 관심을 많이 두는 상품이라는 신호는 됩니다. 편성표로 방송 시간을 확인하고, 인기 상품에서 관심도를 참고한 뒤, 상품 상세에서 FAQ와 조건을 읽는 순서로 보면 공영홈쇼핑 방송 상품을 훨씬 체계적으로 비교할 수 있습니다."
        ]
      }
    ],
    "홈쇼핑 구매 전 체크리스트": [
      {
        heading: "구매 버튼을 누르기 전 확인할 것",
        paragraphs: [
          "홈쇼핑 구매는 방송 화면의 설명을 듣다 보면 빠르게 결정하게 되는 경우가 많습니다. 하지만 구매 전에는 최소한 상품명, 구성품, 수량, 가격, 배송 조건, 반품 조건을 따로 확인해야 합니다. 특히 방송 중에는 ‘오늘만’, ‘한정’, ‘추가 구성’ 같은 표현이 반복되기 때문에 실제로 필요한 상품인지 판단하기 어려울 수 있습니다. 체크리스트를 만들어 두면 순간적인 분위기보다 내 기준으로 상품을 볼 수 있습니다.",
          "첫 번째는 구성품 확인입니다. 같은 가격이라도 본품만 있는 상품과 사은품이 포함된 상품은 체감 가치가 다릅니다. 두 번째는 배송 조건입니다. 무료배송 표시가 있더라도 일부 지역은 추가 배송비가 붙을 수 있습니다. 세 번째는 반품 조건입니다. 식품, 설치 가전, 개봉 후 가치가 떨어지는 상품은 단순 변심 반품이 제한될 수 있습니다. 네 번째는 결제 혜택입니다. 카드 청구 할인은 카드사와 결제 금액 조건이 맞아야 적용됩니다."
        ],
        items: ["상품명과 구성품 수량 확인", "배송비와 배송 가능 지역 확인", "교환·반품 가능 조건 확인", "카드 할인과 무이자 할부 적용 조건 확인", "공식 구매 페이지의 최종 금액 확인"]
      },
      {
        heading: "상품군별 체크 방식",
        paragraphs: [
          "식품은 중량과 원산지가 핵심입니다. 방송 화면에서는 먹음직스러운 연출이 강조되지만 실제 구매 만족도는 수령하는 양, 보관 방식, 소비기한에 따라 달라집니다. 건강식품은 기능성 표현을 그대로 믿기보다 섭취 대상과 주의 문구를 확인해야 합니다. 생활가전은 설치 공간, AS, 소모품 비용이 중요합니다. 패션은 사이즈표와 교환 조건을 확인하지 않으면 수령 후 불편을 겪기 쉽습니다.",
          "홈쇼핑 구매 전 체크리스트는 모든 상품을 똑같이 보는 것이 아니라 상품군에 따라 기준을 바꾸는 도구입니다. 예를 들어 냉동식품은 배송일과 보관 공간이 중요하고, 안마기나 청소기 같은 제품은 전기 사용량과 소음, 필터 교체 비용까지 생각해야 합니다. 옷과 신발은 화면 색상과 실제 색감 차이가 있을 수 있으므로 후기나 상세 설명을 함께 보는 것이 좋습니다."
        ]
      },
      {
        heading: "충동구매를 줄이는 방법",
        paragraphs: [
          "구매 전 3분만 멈추고 ‘지금 당장 필요한가’, ‘비슷한 상품을 이미 가지고 있지 않은가’, ‘보관할 공간이 충분한가’를 확인해 보세요. 홈쇼핑은 방송 시간이 제한되어 있어 빨리 사야 할 것처럼 느껴지지만, 많은 상품은 방송 이후에도 공식 사이트에서 판매가 이어집니다. 물론 방송 중 혜택이 사라질 수는 있으나 필요 없는 상품을 싸게 사는 것보다 필요한 상품을 적정 조건에 사는 것이 더 낫습니다.",
          "홈쇼핑뷰의 상품 상세 페이지는 가격, 배송, 무이자 할부, FAQ를 한 번에 볼 수 있게 구성되어 있습니다. 구매 전 체크리스트와 함께 보면 광고 문구보다 조건 중심으로 판단할 수 있습니다. 최종 구매는 공식 사이트에서 진행하고, 결제 직전 화면의 금액과 배송 조건을 다시 확인하면 불필요한 실수를 줄일 수 있습니다."
        ]
      }
    ],
    "무료배송과 무이자 할부 확인법": [
      {
        heading: "무료배송 표시를 볼 때 주의할 점",
        paragraphs: [
          "무료배송은 홈쇼핑 상품의 체감 가격을 크게 바꾸는 조건입니다. 같은 판매가라도 배송비가 붙는 상품과 무료배송 상품은 실제 결제 금액이 달라집니다. 다만 무료배송이라고 표시되어 있어도 제주도, 도서산간, 일부 특수 배송 지역은 추가 비용이 붙을 수 있습니다. 특히 냉장·냉동 식품이나 부피가 큰 생활가전은 배송 방식이 일반 택배와 다를 수 있어 공식 상품 페이지에서 세부 조건을 확인해야 합니다.",
          "무료배송은 단순히 배송비가 0원이라는 뜻만이 아닙니다. 대용량 세트 상품에서는 배송비가 이미 상품 가격에 반영되어 있을 수도 있습니다. 그래서 무료배송 여부만 보지 말고 총 구성 수량과 단가를 함께 계산해야 합니다. 예를 들어 한 상품은 배송비가 무료지만 구성량이 적고, 다른 상품은 배송비가 붙지만 단가가 낮다면 최종 금액 기준으로 후자가 더 나을 수 있습니다."
        ],
        items: ["무료배송 표시와 추가 배송비 예외 지역을 확인합니다.", "냉장·냉동, 설치 배송, 대형 상품 여부를 봅니다.", "배송비 포함 총 결제 금액을 기준으로 비교합니다.", "반품 시 왕복 배송비 부담 여부를 확인합니다."]
      },
      {
        heading: "무이자 할부의 실제 의미",
        paragraphs: [
          "무이자 할부는 가격 할인과 다릅니다. 상품 가격 자체를 낮추는 혜택이 아니라 결제 부담을 여러 달로 나누는 방식입니다. 생활가전, 침구, 건강기기처럼 금액이 큰 상품을 구매할 때는 월 부담을 줄이는 데 도움이 되지만, 필요하지 않은 상품을 사게 만드는 이유가 되면 오히려 지출이 커집니다. 따라서 무이자 할부는 ‘싸지는 조건’이 아니라 ‘지출을 나누는 조건’으로 이해해야 합니다.",
          "할부 개월 수가 표시되어 있어도 모든 카드에 동일하게 적용되는 것은 아닐 수 있습니다. 카드사, 행사 기간, 결제 금액, 간편결제 사용 여부에 따라 무이자 조건이 달라집니다. 방송 중 안내된 조건과 실제 결제 화면의 조건이 다를 수 있으므로 최종 결제 직전 카드 혜택 적용 여부를 확인해야 합니다. 홈쇼핑뷰의 할부 표시는 비교용 정보이며, 결제 확정 기준은 공식 판매 페이지입니다."
        ]
      },
      {
        heading: "배송과 할부를 함께 계산하는 법",
        paragraphs: [
          "구매 판단은 판매가 하나로 끝나지 않습니다. 판매가에 배송비를 더하고, 카드 청구 할인을 빼고, 할부 기간에 따라 월 부담 금액을 계산해 보는 것이 좋습니다. 예를 들어 120,000원 상품을 6개월 무이자로 구매하면 월 20,000원 수준이지만, 같은 기간에 여러 상품을 할부로 구매하면 다음 달 고정 지출이 커질 수 있습니다. 한 상품의 월 부담만 보지 말고 전체 카드 지출을 함께 봐야 합니다.",
          "무료배송과 무이자 할부가 함께 붙어 있으면 조건이 좋아 보이지만, 구성품과 품질이 맞지 않으면 좋은 구매가 아닙니다. 배송 조건은 수령 편의와 반품 비용을, 할부 조건은 지출 계획을 확인하는 도구로 활용하세요. 상품 상세 FAQ와 공식 구매 페이지를 같이 보면 배송과 결제 조건을 더 안전하게 확인할 수 있습니다."
        ]
      }
    ],
    "식품 방송 상품 구매 가이드": [
      {
        heading: "식품 홈쇼핑은 중량과 보관이 핵심",
        paragraphs: [
          "식품 방송 상품은 화면에서 맛있어 보이는 장면이 강하게 노출됩니다. 그러나 실제 구매 만족도는 맛 표현보다 중량, 원산지, 보관 방식, 소비기한, 포장 단위에서 결정됩니다. 고기, 생선, 과일, 김치, 반찬류는 같은 가격이라도 총 중량과 팩 수가 다르면 1회 섭취 단가가 크게 달라집니다. 방송에서 ‘푸짐하다’고 표현해도 가족 수와 냉동실 공간에 맞지 않으면 오히려 부담이 될 수 있습니다.",
          "냉장·냉동 식품은 배송일과 수령 가능 시간도 중요합니다. 부재 중 오래 방치되면 품질이 떨어질 수 있고, 냉동 상품은 수령 즉시 보관해야 합니다. 또한 식품은 개봉 후 단순 변심 반품이 제한되는 경우가 많습니다. 그래서 구매 전에는 원산지, 제조일, 소비기한, 보관 방법, 알레르기 성분을 확인해야 합니다."
        ],
        items: ["총 중량과 팩 수를 나누어 1회분 단가를 계산합니다.", "원산지와 제조원, 보관 방식을 확인합니다.", "냉장·냉동 배송 여부와 수령 가능 시간을 봅니다.", "소비기한과 개봉 후 보관 방법을 확인합니다."]
      },
      {
        heading: "구성품과 사은품을 구분하는 법",
        paragraphs: [
          "식품 방송에서는 본품 외에 추가 증정, 양념, 소스, 리필 구성 등이 함께 소개될 수 있습니다. 이때 중요한 것은 사은품을 포함한 총량이 실제 필요한 양인지 판단하는 것입니다. 예를 들어 고기 세트에 추가 팩이 붙어도 냉동 보관 공간이 부족하면 장점이 아닐 수 있습니다. 과일은 개당 중량과 개수, 손질 상태가 중요하고, 반찬류는 포장 단위가 작을수록 보관과 섭취가 편합니다.",
          "가격을 비교할 때는 총액보다 단가를 보세요. 59,900원 상품이라도 10팩 구성인지 20팩 구성인지에 따라 다릅니다. 또한 같은 식품이라도 원산지와 등급, 손질 상태가 다르면 가격 차이가 자연스럽게 발생합니다. 식품은 단순히 저렴한 상품보다 내 식탁에서 실제로 잘 소비할 수 있는 상품이 좋은 상품입니다."
        ]
      },
      {
        heading: "식품 구매 후 확인할 것",
        paragraphs: [
          "상품을 받은 뒤에는 포장 파손, 냉동 상태, 수량, 소비기한을 먼저 확인해야 합니다. 문제가 있다면 개봉하거나 조리하기 전에 사진을 남기고 판매처 안내에 따라 문의하는 것이 좋습니다. 식품은 상태 확인이 늦어지면 교환이나 환불이 어려울 수 있으므로 수령 직후 확인이 중요합니다.",
          "홈쇼핑뷰의 식품 가이드는 방송 전 비교를 돕는 용도입니다. 최종 구매 전에는 공식 페이지에서 원산지와 구성품을 다시 확인하고, 방송 중 변경된 혜택이 있는지 체크하세요. 특히 명절이나 시즌 상품은 배송 지연 가능성이 있으므로 필요한 날짜보다 여유 있게 주문하는 것이 좋습니다."
        ]
      }
    ],
    "건강식품 구매 전 확인사항": [
      {
        heading: "건강식품은 광고 문구보다 표시 사항",
        paragraphs: [
          "건강식품 방송은 기대감을 주는 표현이 많습니다. 하지만 건강식품은 질병을 치료하는 약이 아니며, 개인의 체질과 생활 습관에 따라 체감이 다릅니다. 따라서 구매 전에는 기능성 표시, 주요 원료, 1일 섭취량, 섭취 대상, 알레르기 성분, 주의 문구를 먼저 확인해야 합니다. 방송 화면의 후기나 진행자의 설명만으로 결정하기보다 공식 상품 상세의 표시사항을 읽는 것이 안전합니다.",
          "특히 임산부, 어린이, 고령자, 특정 질환자, 약을 복용 중인 사람은 섭취 전 전문가 상담이 필요할 수 있습니다. 건강식품은 장기간 섭취하는 경우가 많기 때문에 한 번에 많은 세트를 사기보다 실제 섭취 가능한 기간과 보관 조건을 고려해야 합니다. 유통기한이 충분한지도 중요합니다."
        ],
        items: ["기능성 표시와 원료명을 확인합니다.", "1일 섭취량 기준 함량을 봅니다.", "섭취 대상과 주의 문구를 확인합니다.", "복용 중인 약이나 질환과 충돌 가능성을 고려합니다."]
      },
      {
        heading: "함량과 가격 비교",
        paragraphs: [
          "건강식품은 병 수나 박스 수가 많다고 무조건 좋은 구성이 아닙니다. 중요한 것은 1일 섭취량 기준으로 주요 성분이 얼마나 들어 있는지, 총 섭취 가능 일수가 얼마나 되는지입니다. 예를 들어 같은 3개월분이라고 해도 1일 1회 섭취인지, 1일 2회 섭취인지에 따라 실제 사용 기간이 다릅니다. 가격을 비교할 때는 총액보다 하루 섭취 비용으로 환산하면 판단이 쉬워집니다.",
          "또한 건강식품은 원료 원산지, 제조 방식, 개별 포장 여부, 보관 편의성도 살펴야 합니다. 휴대용 스틱 포장은 편하지만 가격이 높을 수 있고, 대용량 통 제품은 저렴하지만 위생 관리가 필요합니다. 방송 중 사은품이 붙는 경우에도 본품의 함량과 섭취 기간을 기준으로 비교해야 합니다."
        ]
      },
      {
        heading: "과대광고를 피하는 기준",
        paragraphs: [
          "건강식품을 고를 때 ‘무조건 좋아진다’, ‘치료된다’, ‘즉시 효과’ 같은 표현은 경계해야 합니다. 건강기능식품은 인정된 기능성 범위 안에서만 이해해야 하며, 질병 예방이나 치료 효과로 받아들이면 안 됩니다. 후기나 체험담은 개인 경험일 뿐 모든 사람에게 같은 결과를 보장하지 않습니다.",
          "홈쇼핑뷰는 건강식품 편성 정보를 정리하지만, 의료적 판단을 제공하지 않습니다. 구매 전 공식 상세 페이지와 제품 표시사항을 확인하고, 건강 상태에 따라 전문가 상담을 받는 것이 좋습니다. 특히 여러 건강식품을 동시에 섭취하는 경우 성분 중복도 확인해야 합니다."
        ]
      }
    ],
    "생활가전 홈쇼핑 구매 가이드": [
      {
        heading: "생활가전은 설치와 AS가 먼저",
        paragraphs: [
          "생활가전은 방송 가격이 좋아 보여도 설치 조건과 AS를 확인하지 않으면 만족도가 떨어질 수 있습니다. 청소기, 공기청정기, 음식물처리기, 안마기, 주방가전은 사용 공간과 전원 위치, 소음, 필터 교체 비용, 소모품 구매 가능 여부가 중요합니다. 특히 설치형 제품은 배송만으로 끝나는 것이 아니라 기사 방문, 설치 공간, 추가 설치비 조건이 붙을 수 있습니다.",
          "구매 전에는 제품 크기와 집 안 배치 공간을 실제로 재어 보는 것이 좋습니다. 화면에서는 작아 보여도 실제 제품이 큰 경우가 많고, 문턱이나 엘리베이터 크기 때문에 배송이 어려울 수 있습니다. AS 기간과 서비스 센터 접근성도 확인해야 합니다. 홈쇼핑 방송에서는 장점이 강조되지만, 사용 후 불편은 설치와 유지 관리에서 생기는 경우가 많습니다."
        ],
        items: ["제품 크기와 설치 공간을 확인합니다.", "무상 AS 기간과 서비스 가능 지역을 봅니다.", "필터, 소모품, 배터리 교체 비용을 확인합니다.", "설치비와 철거비 등 추가 비용 여부를 확인합니다."]
      },
      {
        heading: "구성품과 모델명 확인",
        paragraphs: [
          "생활가전은 모델명이 매우 중요합니다. 비슷한 외형이라도 모델명에 따라 성능, 구성품, 출시 시기, 부속품이 달라질 수 있습니다. 방송에서 소개되는 세트 구성에는 추가 브러시, 필터, 전용 용기, 보관대 등이 포함될 수 있는데, 공식 페이지에서 정확한 구성품 목록을 확인해야 합니다. 구성품이 많아 보여도 실제로 자주 쓰지 않는 부속품이면 큰 혜택이 아닐 수 있습니다.",
          "가격 비교를 할 때는 같은 모델인지 확인해야 합니다. 온라인 최저가와 비교할 때 모델명이 다르면 비교가 의미 없습니다. 홈쇼핑 구성은 사은품이 붙어 전체 가치가 높아질 수 있지만, 반대로 구형 모델이나 특정 색상만 판매되는 경우도 있습니다. 제품 상세의 모델명과 제조년월, 에너지 소비효율, 보증 조건을 함께 보세요."
        ]
      },
      {
        heading: "반품과 설치 후 제한",
        paragraphs: [
          "생활가전은 개봉 또는 설치 후 반품이 제한되는 경우가 많습니다. 특히 위생과 관련된 제품이나 설치형 제품은 단순 변심으로 반품하기 어려울 수 있습니다. 배송 전 취소는 가능해도 설치 후 철거 비용이 발생할 수 있으므로 구매 전 조건을 확인해야 합니다.",
          "홈쇼핑뷰에서 생활가전 편성표를 확인했다면 방송 시간과 가격뿐 아니라 공식 페이지의 설치 안내를 꼭 읽어 보세요. 제품 사용 후기보다 먼저 봐야 할 것은 내 집에 설치 가능한지, 유지비가 감당 가능한지, AS를 받을 수 있는지입니다. 이 세 가지가 맞으면 생활가전 구매 실패 확률이 크게 줄어듭니다."
        ]
      }
    ],
    "패션 상품 사이즈 확인법": [
      {
        heading: "패션 상품은 실측표가 기준",
        paragraphs: [
          "홈쇼핑 패션 상품은 화면에서 색감과 핏이 좋아 보이지만, 실제 착용감은 개인 체형과 실측에 따라 달라집니다. 평소 입는 사이즈만 믿기보다 상세 페이지의 실측표를 확인해야 합니다. 상의는 가슴둘레, 어깨너비, 총장, 소매 길이를 보고, 하의는 허리, 엉덩이, 밑위, 총장을 확인하는 것이 좋습니다. 신발은 발볼과 굽 높이, 소재에 따른 늘어남도 고려해야 합니다.",
          "같은 66 사이즈라도 브랜드마다 기준이 다르고, 여유핏과 슬림핏은 착용감이 다릅니다. 방송에서는 모델 착용 장면이 나오지만 모델의 키와 체형이 내 체형과 다를 수 있습니다. 그래서 상품명보다 사이즈표와 소재, 세탁 방법, 교환 조건을 먼저 보는 것이 안전합니다."
        ],
        items: ["평소 사이즈보다 실측표를 기준으로 봅니다.", "모델 키와 착용 사이즈를 참고하되 그대로 믿지 않습니다.", "소재의 신축성과 두께를 확인합니다.", "교환 가능 기간과 왕복 배송비를 확인합니다."]
      },
      {
        heading: "색상과 소재 확인",
        paragraphs: [
          "패션 상품은 화면 색상과 실제 색상이 다를 수 있습니다. 조명, 카메라, 휴대폰 화면 밝기에 따라 색감이 달라 보이기 때문입니다. 특히 베이지, 아이보리, 카키, 네이비 계열은 화면과 실물이 다르게 느껴질 가능성이 있습니다. 색상 선택이 중요한 상품은 상세 이미지와 소재 설명을 함께 확인해야 합니다.",
          "소재도 중요합니다. 면, 폴리에스터, 레이온, 울 혼방 등 소재에 따라 세탁 방법과 착용감이 달라집니다. 관리가 어려운 소재는 자주 입기 어렵고, 계절감이 맞지 않으면 활용도가 떨어질 수 있습니다. 방송 중에는 디자인이 강조되지만 실제 만족도는 세탁과 관리 편의성에서 갈립니다."
        ]
      },
      {
        heading: "세트 상품 구매 요령",
        paragraphs: [
          "홈쇼핑 패션은 여러 벌 세트로 판매되는 경우가 많습니다. 세트 상품은 개당 단가가 낮아 보이지만 모든 색상과 디자인을 실제로 입을 수 있는지 생각해야 합니다. 마음에 드는 한 벌 때문에 전체 세트를 구매하면 나머지 구성품은 잘 입지 않을 수 있습니다. 색상 조합, 계절, 기존 옷과의 코디 가능성을 함께 보세요.",
          "교환·반품은 세트 전체 기준으로 처리되는 경우가 많습니다. 일부만 착용하거나 택을 제거하면 전체 반품이 어려울 수 있습니다. 수령 후에는 모든 구성품의 사이즈와 오염 여부를 먼저 확인하고, 착용 전 택과 포장을 보관하는 것이 좋습니다.",
          "속옷, 이너웨어, 신발처럼 위생이나 착용 흔적이 중요한 상품은 반품 제한이 더 엄격할 수 있습니다. 선물용으로 패션 상품을 고를 때는 받는 사람의 정확한 사이즈를 모르면 여유핏 의류나 사이즈 선택 부담이 적은 잡화류가 더 안전합니다. 방송 중 모델 착용 장면은 참고만 하고, 실제 구매는 치수표와 교환 조건을 기준으로 판단하는 것이 좋습니다."
        ]
      }
    ],
    "홈쇼핑 상품 가격이 바뀌는 이유": [
      {
        heading: "방송 가격과 온라인 가격 차이",
        paragraphs: [
          "홈쇼핑 상품 가격은 고정되어 있는 것처럼 보이지만 실제로는 방송 시간, 카드 행사, 구성품, 재고, 사은품, 쿠폰 조건에 따라 달라질 수 있습니다. 방송 중에는 특정 카드 할인이나 ARS 할인, 앱 주문 혜택이 붙을 수 있고, 방송 종료 후에는 해당 혜택이 사라질 수 있습니다. 반대로 방송 후에도 온라인에서 같은 가격이 유지되는 경우도 있습니다.",
          "가격이 바뀌는 이유는 판매 채널과 행사 조건이 다르기 때문입니다. TV 방송 전용 구성, 모바일 앱 전용 쿠폰, 카드사 청구 할인은 각각 적용 기준이 다릅니다. 그래서 편성표의 가격은 참고 기준으로 보고, 결제 직전 공식 페이지에서 최종 금액을 확인해야 합니다."
        ],
        items: ["방송 시간 한정 혜택 여부 확인", "카드 청구 할인 적용 조건 확인", "쿠폰과 앱 주문 혜택 구분", "구성품 변경 여부 확인", "최종 결제 금액 기준으로 판단"]
      },
      {
        heading: "정상가와 할인율을 보는 법",
        paragraphs: [
          "할인율이 높다고 항상 좋은 가격은 아닙니다. 정상가 기준이 높게 잡혀 있으면 할인율이 커 보여도 실제 판매가가 특별히 낮지 않을 수 있습니다. 반대로 할인율은 낮아도 무료배송, 사은품, 추가 구성품이 붙으면 전체 조건이 좋아질 수 있습니다. 가격 비교는 정상가보다 실제 결제 금액과 구성품 기준으로 해야 합니다.",
          "특히 식품과 생활용품은 단가 계산이 중요합니다. 총 가격을 팩 수, 개수, 중량으로 나누면 실제 가치를 비교할 수 있습니다. 가전제품은 모델명과 구성품이 같아야 가격 비교가 의미 있습니다. 패션은 세트 수량만 보지 말고 실제 입을 수 있는 구성인지 판단해야 합니다."
        ]
      },
      {
        heading: "가격 변동에 대응하는 습관",
        paragraphs: [
          "급하지 않은 상품은 며칠 편성표를 비교해 보는 것이 좋습니다. 같은 브랜드나 비슷한 상품이 다시 편성되면서 구성이나 혜택이 달라질 수 있습니다. 다만 인기 상품은 빠르게 품절될 수 있으므로 필요한 상품이라면 방송 시간 전에 공식 페이지를 열어 두고 조건을 확인하는 것도 방법입니다.",
          "홈쇼핑뷰의 인기 상품과 편성표를 함께 보면 어떤 상품이 많이 조회되는지, 언제 방송되는지 파악할 수 있습니다. 가격이 낮아 보여도 내게 필요 없는 상품이면 좋은 구매가 아닙니다. 최종 기준은 할인율이 아니라 필요성, 구성, 배송, 반품, 결제 조건을 모두 합친 실제 만족도입니다.",
          "가격 변동을 기록해 두는 것도 도움이 됩니다. 오늘 본 가격이 방송 전용인지, 며칠 뒤 같은 상품이 다른 구성으로 나오는지 확인하면 다음 구매 때 기준이 생깁니다. 특히 자주 사는 식품이나 생활용품은 한 번의 방송 가격만 보고 결정하지 말고, 단가와 배송 조건을 메모해 두면 과장된 할인 문구에 흔들릴 가능성이 줄어듭니다."
        ]
      }
    ],
    "교환·반품 조건 확인 가이드": [
      {
        heading: "상품군마다 반품 조건은 다르다",
        paragraphs: [
          "홈쇼핑 상품은 모두 같은 방식으로 교환·반품되는 것이 아닙니다. 식품은 신선도와 위생 문제로 단순 변심 반품이 제한될 수 있고, 건강식품은 개봉 후 반품이 어려울 수 있습니다. 생활가전은 설치 후 철거 비용이 발생할 수 있으며, 패션 상품은 택 제거와 착용 흔적이 있으면 교환이 제한될 수 있습니다. 구매 전 반품 조건을 확인하는 것은 선택이 아니라 필수입니다.",
          "방송 중에는 가격과 혜택이 강조되기 때문에 반품 조건은 상대적으로 작게 보일 수 있습니다. 하지만 실제 문제가 생겼을 때 가장 중요한 것은 교환 가능 기간, 반품 배송비, 상품 상태 기준입니다. 공식 페이지에서 반품 조건을 찾기 어렵다면 구매를 서두르지 않는 것이 좋습니다."
        ],
        items: ["교환·반품 가능 기간 확인", "개봉 후 반품 제한 여부 확인", "왕복 배송비 부담 주체 확인", "설치 상품의 철거비와 재설치비 확인", "불량과 단순 변심 기준 구분"]
      },
      {
        heading: "수령 직후 해야 할 일",
        paragraphs: [
          "상품을 받으면 먼저 포장 상태와 구성품을 확인하세요. 식품은 냉장·냉동 상태, 수량, 소비기한을 보고, 가전은 파손 여부와 구성품 누락을 확인해야 합니다. 패션 상품은 택을 제거하기 전에 사이즈와 오염 여부를 살펴야 합니다. 문제가 있다면 사진을 남기고 즉시 판매처에 문의하는 것이 좋습니다.",
          "특히 설치 상품은 설치 전에 제품과 공간을 다시 확인해야 합니다. 설치가 완료되면 단순 변심 반품이 어려워질 수 있습니다. 배송 기사에게 바로 설치를 요청하기 전에 모델명과 구성품, 설치 위치를 확인하는 습관이 필요합니다."
        ]
      },
      {
        heading: "반품 비용까지 계산하기",
        paragraphs: [
          "상품 가격이 저렴해도 반품 비용이 크면 실제 위험 부담이 커집니다. 대형 가전이나 부피가 큰 상품은 왕복 배송비가 상당할 수 있고, 식품은 반품 자체가 제한될 수 있습니다. 따라서 구매 전에 ‘마음에 들지 않으면 돌려보내면 된다’고 생각하기보다, 처음부터 반품 가능성이 낮은 상품인지 판단해야 합니다.",
          "홈쇼핑뷰의 상품 상세 FAQ는 구매 전 확인할 기본 조건을 정리하지만, 최종 반품 기준은 공식 판매 페이지와 판매처 정책을 따라야 합니다. 애매한 상품은 방송 중 바로 결제하기보다 공식 상세 설명을 끝까지 읽고 판단하는 것이 안전합니다."
        ]
      }
    ],
    "공공데이터 기반 편성표 활용법": [
      {
        heading: "공공데이터 편성표의 장점",
        paragraphs: [
          "홈쇼핑뷰는 공공데이터포털에서 제공되는 공영홈쇼핑 TV 편성 상품 정보를 바탕으로 방송 일정과 상품 정보를 정리합니다. 공공데이터 기반 편성표의 장점은 특정 상품을 홍보하는 화면이 아니라 날짜, 시간, 상품명, 가격, 카테고리 같은 기본 정보를 한눈에 비교할 수 있다는 점입니다. 방송을 직접 보지 않아도 어떤 상품이 언제 나오는지 미리 알 수 있어 쇼핑 계획을 세우기 쉽습니다.",
          "다만 공공데이터는 최종 결제 조건을 보장하는 정보가 아닙니다. 방송 편성은 변경될 수 있고, 상품 가격이나 재고 상태는 공식 판매 페이지 기준으로 달라질 수 있습니다. 따라서 공공데이터 편성표는 탐색과 비교의 출발점으로 활용하고, 실제 구매는 공식 사이트에서 조건을 확인한 뒤 진행하는 것이 좋습니다."
        ],
        items: ["방송 날짜와 시간 확인", "상품명과 가격 비교", "카테고리별 상품 흐름 파악", "공식 구매 링크로 최종 조건 확인", "과거 종료 상품은 색인에서 제외"]
      },
      {
        heading: "데이터를 볼 때 생길 수 있는 차이",
        paragraphs: [
          "API로 제공되는 상품명은 긴 문자열로 들어오는 경우가 많고, 방송 현장에서 표현되는 상품명과 약간 다를 수 있습니다. 가격 역시 사전 등록 가격과 방송 중 혜택 적용 가격이 다를 수 있습니다. 상품 이미지나 구매 링크도 제공 시점에 따라 변경될 수 있으므로, 사용자는 편성표 정보를 참고하되 공식 페이지의 최신 정보를 함께 확인해야 합니다.",
          "홈쇼핑뷰는 매일 자정 기준으로 새 편성 데이터를 갱신하고, 지난 방송 정보는 검색엔진 색인에서 불필요하게 남지 않도록 정리하는 방향으로 운영합니다. 이는 사용자에게 최신 방송 정보를 보여주고, 검색엔진에는 현재 확인 가능한 정보 중심으로 사이트를 이해시키기 위한 구조입니다."
        ]
      },
      {
        heading: "편성표, 인기, 가이드의 연결",
        paragraphs: [
          "공공데이터 편성표는 방송 전체 흐름을 보여주고, 인기 페이지는 사용자가 많이 조회한 상품을 보여주며, 가이드 글은 상품군별 확인 기준을 설명합니다. 세 페이지를 함께 보면 단순히 상품 목록을 훑는 것보다 훨씬 실용적으로 이용할 수 있습니다. 예를 들어 인기 상품에서 관심 상품을 찾고, 편성표에서 방송 시간을 확인한 뒤, 가이드 글로 구매 전 체크 포인트를 확인하는 방식입니다.",
          "이 구조는 애드센스 승인 관점에서도 중요합니다. 단순히 API 데이터만 나열하는 사이트보다, 사용자가 이해할 수 있는 안내 문서와 독립적인 설명 콘텐츠가 함께 있어야 정보 사이트로서 가치가 커집니다. 홈쇼핑뷰는 편성 데이터와 자체 가이드를 함께 제공해 사용자가 더 안전하게 상품을 비교할 수 있도록 구성됩니다."
        ]
      }
    ],
    "공영홈쇼핑과 중소기업 상품 이해하기": [
      {
        heading: "공영홈쇼핑에서 중소기업 상품이 중요한 이유",
        paragraphs: [
          "공영홈쇼핑은 대형 브랜드 상품만 보여주는 채널이 아니라 중소기업, 소상공인, 지역 생산자 상품이 자주 소개되는 유통 채널입니다. 소비자 입장에서는 낯선 브랜드가 많아 처음에는 판단이 어려울 수 있지만, 브랜드 인지도만으로 상품 가치를 결정하기보다 실제 구성, 제조사 정보, 원산지, 인증 여부, 고객 지원 조건을 확인하면 좋은 상품을 발견할 수 있습니다. 특히 식품, 생활용품, 주방용품, 건강 관련 상품은 규모가 작은 업체라도 특정 품목에 전문성이 있는 경우가 많습니다.",
          "중소기업 상품을 볼 때 가장 먼저 확인할 것은 판매사가 아니라 상품 자체의 조건입니다. 제조원과 판매원이 다른 경우가 있고, OEM 또는 위탁 생산 방식으로 만들어지는 상품도 있습니다. 이때 상품 상세 페이지에서 제조원, 원산지, 품질 표시, 인증 번호, AS 연락처가 충분히 안내되는지 확인해야 합니다. 설명이 부족하거나 반품 조건이 불명확하면 가격이 좋아 보여도 신중하게 접근하는 것이 좋습니다."
        ],
        items: ["제조원과 판매원을 구분해 확인합니다.", "인증, 원산지, 품질 표시가 있는지 봅니다.", "AS와 고객센터 연결 방법을 확인합니다.", "가격보다 구성과 사용 후 관리 조건을 먼저 봅니다."]
      },
      {
        heading: "낯선 브랜드를 판단하는 기준",
        paragraphs: [
          "홈쇼핑에서 처음 보는 브랜드라고 해서 무조건 피할 필요는 없습니다. 대신 상품 설명이 구체적인지 살펴야 합니다. 식품이라면 산지, 중량, 포장 단위, 보관 방법이 명확해야 하고, 생활용품이라면 소재, 크기, 사용 방법, 관리 방법이 안내되어야 합니다. 가전이나 기기류는 모델명, 정격 전압, 소비전력, 인증 여부, AS 기간이 중요합니다. 이런 기본 정보가 탄탄하면 브랜드 인지도가 낮아도 비교해 볼 만합니다.",
          "후기나 방송 설명은 참고 자료일 뿐입니다. 방송 중에는 상품의 장점이 집중적으로 소개되기 때문에 단점이나 제한 조건은 작게 느껴질 수 있습니다. 그래서 공식 구매 페이지의 상세 설명, 교환·반품 조건, 배송 조건을 별도로 읽어야 합니다. 홈쇼핑뷰의 편성표는 어떤 중소기업 상품이 언제 방송되는지 확인하는 도구이고, 최종 판단은 공식 상세 페이지의 정보량과 조건을 기준으로 하는 것이 좋습니다."
        ]
      },
      {
        heading: "중소기업 상품을 현명하게 구매하는 방법",
        paragraphs: [
          "중소기업 상품은 대형 브랜드보다 가격이나 구성에서 장점이 있을 수 있습니다. 하지만 사후 관리가 중요한 상품이라면 AS 체계가 충분한지 꼭 확인해야 합니다. 단순 생활용품이나 식품은 구성과 배송 조건이 중요하고, 전자제품이나 설치 제품은 고객센터 운영 여부와 부품 공급 가능성이 중요합니다. 선물용으로 구매한다면 포장 상태와 배송 일정도 확인해야 합니다.",
          "공영홈쇼핑의 중소기업 상품을 잘 활용하려면 방송 당일 가격만 보지 말고, 같은 카테고리의 다른 상품과 비교해 보세요. 같은 주방용품이라도 소재와 크기가 다르고, 같은 식품이라도 원산지와 가공 방식이 다릅니다. 홈쇼핑뷰에서 편성표와 인기 상품을 함께 보면 어떤 상품이 반복 편성되는지, 소비자 관심이 있는지 확인할 수 있어 더 차분하게 선택할 수 있습니다."
        ]
      }
    ],
    "농축수산물 방송 상품 고르는 법": [
      {
        heading: "산지와 등급을 먼저 확인하기",
        paragraphs: [
          "농축수산물은 홈쇼핑에서 매우 자주 편성되는 상품군입니다. 과일, 한우, 돼지고기, 닭고기, 생선, 전복, 김치, 젓갈처럼 종류가 다양하고 방송 화면에서 품질이 좋아 보이기 때문에 충동구매가 쉽게 일어납니다. 하지만 농축수산물은 산지, 등급, 손질 상태, 냉장·냉동 여부, 포장 단위에 따라 실제 만족도가 크게 달라집니다. 같은 가격이라도 산지와 중량이 다르면 비교 결과가 완전히 달라집니다.",
          "과일은 개당 중량과 당도 기준, 흠집 여부, 보관 가능 기간을 확인해야 합니다. 축산물은 부위, 등급, 원산지, 냉장·냉동 여부가 중요합니다. 수산물은 손질 전 중량인지 손질 후 실중량인지, 해동 상품인지, 개별 포장인지 확인해야 합니다. 방송에서는 총량이 강조되지만 실제로 먹을 수 있는 양과 보관 편의성이 더 중요할 수 있습니다."
        ],
        items: ["산지와 원산지 표시를 확인합니다.", "총 중량과 실중량을 구분합니다.", "냉장·냉동 배송 방식과 수령 가능 시간을 확인합니다.", "손질 상태와 포장 단위를 봅니다."]
      },
      {
        heading: "가격보다 단가 계산이 중요",
        paragraphs: [
          "농축수산물은 총 가격만 보면 비교가 어렵습니다. 69,900원 상품과 79,900원 상품이 있을 때 더 비싼 상품이 실제로는 단가가 낮을 수 있습니다. 총 중량을 기준으로 100g당 가격, 1팩당 가격, 1회 식사 기준 가격을 계산하면 훨씬 객관적으로 비교할 수 있습니다. 특히 한우나 수산물은 부위와 손질 상태에 따라 단가 차이가 크므로 단순 중량 비교만으로도 부족할 수 있습니다.",
          "무료배송이 포함되어 있는지도 확인해야 합니다. 농축수산물은 신선 배송이 많아 배송비가 상품 가격에 영향을 줍니다. 무료배송 상품이라도 도서산간 추가 비용이 있을 수 있고, 명절이나 성수기에는 배송 지연 가능성도 있습니다. 필요한 날짜가 정해져 있다면 방송 당일 주문 가능 여부와 배송 마감일을 함께 확인하세요."
        ]
      },
      {
        heading: "수령 후 확인과 보관",
        paragraphs: [
          "농축수산물은 상품을 받은 직후 확인이 중요합니다. 포장 파손, 냉동 상태, 수량, 중량, 변질 여부를 확인하고 문제가 있으면 바로 사진을 남겨야 합니다. 시간이 지나면 배송 중 문제인지 보관 중 문제인지 판단하기 어려워질 수 있습니다. 특히 냉동식품은 해동 후 재냉동하면 품질이 떨어질 수 있으므로 도착 즉시 보관하는 것이 좋습니다.",
          "홈쇼핑뷰의 농축수산물 가이드는 방송 상품을 비교하기 위한 기준을 제공합니다. 최종 구매 전에는 공식 페이지에서 산지, 등급, 구성, 배송 조건을 다시 확인하세요. 방송 화면의 조리 예시는 참고용일 수 있으므로 실제 수령 상품의 구성과 중량을 기준으로 판단하는 것이 안전합니다."
        ]
      }
    ],
    "명절·시즌 상품 편성표 활용법": [
      {
        heading: "시즌 상품은 타이밍이 중요",
        paragraphs: [
          "명절, 어버이날, 김장철, 여름 보양식 시즌처럼 특정 시기에 집중되는 상품은 일반 상품보다 구매 타이밍이 중요합니다. 방송일은 빠르지만 배송 마감일이 따로 있을 수 있고, 인기 구성은 조기 품절될 수 있습니다. 특히 선물세트는 받는 사람의 일정에 맞춰 도착해야 하므로 가격보다 배송 가능일과 포장 상태를 먼저 확인해야 합니다.",
          "명절 상품은 과일, 한우, 수산물, 건강식품, 생활용품 세트가 많이 편성됩니다. 이때 상품명에 들어간 ‘특대’, ‘프리미엄’, ‘선물세트’ 같은 표현만 보고 판단하기보다 실제 중량, 개수, 등급, 원산지, 포장 방식을 확인해야 합니다. 선물용이라면 쇼핑백 포함 여부, 메시지 카드 여부, 배송 송장에 가격이 표시되는지도 확인하면 좋습니다."
        ],
        items: ["배송 마감일과 도착 예정일을 확인합니다.", "선물 포장과 쇼핑백 포함 여부를 봅니다.", "받는 사람의 보관 여건을 고려합니다.", "시즌 후 가격 변동 가능성을 감안합니다."]
      },
      {
        heading: "계절 상품을 고르는 법",
        paragraphs: [
          "여름에는 냉방용품, 보양식, 제습 관련 상품이 늘고, 겨울에는 난방용품, 침구, 건강식품, 김장 관련 상품이 늘어납니다. 계절 상품은 필요한 시기를 놓치면 활용 기간이 짧아질 수 있으므로 방송 일정과 배송 일정을 함께 봐야 합니다. 예를 들어 여름용 냉방 제품은 폭염이 시작된 뒤 주문하면 배송이 늦어질 수 있고, 겨울 침구는 추워지기 전에 준비하는 편이 좋습니다.",
          "계절 상품은 재고와 구성 변화가 잦습니다. 시즌 초반에는 선택지가 많고, 시즌 막바지에는 가격이 내려갈 수 있지만 원하는 색상이나 구성은 품절될 수 있습니다. 급하게 필요한 상품은 가격보다 배송 속도가 중요하고, 여유가 있는 상품은 며칠 편성표를 비교해 보는 것이 좋습니다."
        ]
      },
      {
        heading: "선물용 구매 체크 포인트",
        paragraphs: [
          "선물용 상품은 내가 쓰는 상품보다 더 조심해서 골라야 합니다. 받는 사람이 바로 사용할 수 있는지, 보관이 쉬운지, 알레르기나 섭취 제한이 없는지 확인해야 합니다. 건강식품은 복용 중인 약이나 건강 상태에 따라 맞지 않을 수 있고, 식품은 냉장·냉동 보관이 어려운 사람에게 부담이 될 수 있습니다.",
          "명절·시즌 편성표를 활용하면 선물 준비를 미리 할 수 있습니다. 홈쇼핑뷰에서 날짜별 방송을 확인하고, 공식 페이지에서 배송 마감일과 포장 조건을 확인한 뒤 구매하면 급하게 주문하는 상황을 줄일 수 있습니다. 선물은 가격보다 받는 사람이 편하게 받을 수 있는 조건이 더 중요합니다."
        ]
      }
    ],
    "TV 생방송 주문과 온라인 구매 차이": [
      {
        heading: "TV 주문과 온라인 구매는 같지 않을 수 있다",
        paragraphs: [
          "공영홈쇼핑 상품은 TV 생방송 중 전화 주문으로 구매할 수도 있고, 공식 사이트나 모바일 앱에서 온라인으로 구매할 수도 있습니다. 같은 상품처럼 보여도 주문 방식에 따라 혜택, 쿠폰, 카드 할인, 재고 상태가 다를 수 있습니다. 방송 중에는 ARS 할인이나 상담원 주문 혜택이 안내될 수 있고, 온라인에서는 앱 전용 쿠폰이나 카드 청구 할인이 따로 적용될 수 있습니다.",
          "TV 주문은 방송 설명을 보며 바로 구매할 수 있다는 장점이 있지만, 상세 조건을 천천히 비교하기 어렵습니다. 온라인 구매는 상품 상세 설명, 구성품, 반품 조건, 결제 금액을 직접 확인할 수 있다는 장점이 있습니다. 따라서 방송을 보면서 관심 상품을 발견했다면 바로 주문하기 전에 공식 페이지에서 조건을 다시 확인하는 것이 좋습니다."
        ],
        items: ["TV 방송 혜택과 온라인 혜택이 같은지 확인합니다.", "상담원 주문과 앱 주문의 결제 조건을 비교합니다.", "온라인 상세 페이지에서 구성품과 반품 조건을 확인합니다.", "최종 결제 금액을 기준으로 판단합니다."]
      },
      {
        heading: "전화 주문의 장단점",
        paragraphs: [
          "전화 주문은 인터넷 사용이 익숙하지 않은 사람에게 편리합니다. 방송 중 안내되는 전화번호로 주문하면 상담을 통해 옵션이나 주소를 확인할 수 있습니다. 다만 통화량이 많을 때 연결이 지연될 수 있고, 결제 조건을 화면으로 직접 비교하기 어렵다는 단점이 있습니다. 또한 주문 내용을 정확히 확인하지 않으면 색상, 수량, 배송지 입력에서 실수가 생길 수 있습니다.",
          "부모님이나 어르신이 전화 주문을 이용한다면 상품명, 수량, 가격, 배송지, 결제 방식, 반품 조건을 메모해 두는 것이 좋습니다. 상담 중 안내받은 내용이 공식 페이지와 같은지 확인하면 더 안전합니다. 특히 건강식품이나 의료기기처럼 오해하기 쉬운 상품은 가족과 함께 조건을 확인하는 것이 좋습니다."
        ]
      },
      {
        heading: "온라인 구매의 확인 장점",
        paragraphs: [
          "온라인 구매는 결제 전 화면에서 최종 금액을 직접 확인할 수 있다는 점이 큽니다. 카드 할인, 쿠폰, 배송비, 적립금 적용 여부를 눈으로 확인하고 결제할 수 있습니다. 또한 상품 상세 설명과 교환·반품 조건을 다시 읽을 수 있어 충동구매를 줄이는 데 도움이 됩니다.",
          "홈쇼핑뷰는 공식 구매 링크를 통해 상품 페이지로 이동할 수 있게 구성되어 있습니다. 편성표에서 방송 시간을 확인하고, 상품 상세에서 FAQ를 읽은 뒤, 공식 페이지에서 최종 결제 조건을 확인하는 흐름이 가장 안전합니다. TV 생방송의 속도감과 온라인 구매의 확인 절차를 함께 활용하면 실수를 줄일 수 있습니다."
        ]
      }
    ],
    "부모님 선물용 홈쇼핑 상품 고르는 법": [
      {
        heading: "부모님 선물은 사용 편의성이 먼저",
        paragraphs: [
          "부모님 선물용 홈쇼핑 상품을 고를 때는 가격이나 사은품보다 사용 편의성을 먼저 봐야 합니다. 건강식품은 섭취 방법이 복잡하지 않은지, 생활가전은 조작 버튼이 어렵지 않은지, 식품은 보관과 조리가 간단한지 확인해야 합니다. 선물은 받는 사람이 실제로 편하게 사용할 수 있어야 의미가 있습니다. 좋은 상품이라도 사용법이 어렵거나 보관이 번거로우면 부담이 될 수 있습니다.",
          "부모님 세대는 TV 홈쇼핑에 익숙한 경우가 많지만, 상품 상세 조건을 모두 확인하기는 어렵습니다. 자녀가 대신 확인해 줄 때는 상품명, 가격, 배송일, 반품 조건, AS 연락처를 정리해 주면 좋습니다. 특히 건강 관련 상품은 과장된 기대를 갖지 않도록 기능성 표시와 섭취 주의사항을 함께 설명하는 것이 안전합니다."
        ],
        items: ["사용법이 쉬운 상품인지 확인합니다.", "배송일과 수령 편의성을 봅니다.", "AS와 고객센터 연결 방법을 확인합니다.", "건강식품은 섭취 주의사항을 먼저 봅니다."]
      },
      {
        heading: "상품군별 선물 기준",
        paragraphs: [
          "식품 선물은 보관이 쉬운지가 중요합니다. 냉동실 공간이 부족한 집에는 대용량 냉동식품이 부담이 될 수 있습니다. 건강식품은 복용 중인 약이나 건강 상태와 맞는지 확인해야 합니다. 생활가전은 무게와 조작 방식, 소음, 세척 편의성을 봐야 합니다. 패션 상품은 사이즈와 취향이 맞지 않으면 교환이 필요할 수 있으므로 교환 조건을 확인해야 합니다.",
          "부모님 선물은 ‘많이 주는 구성’보다 ‘잘 쓰는 구성’이 좋습니다. 예를 들어 주방용품은 자주 쓰는 크기인지, 건강기기는 매일 관리하기 쉬운지, 식품은 소분 포장인지 확인해 보세요. 선물 받는 사람의 생활 패턴을 기준으로 보면 실패 확률이 줄어듭니다."
        ]
      },
      {
        heading: "대신 주문할 때 주의할 점",
        paragraphs: [
          "자녀가 대신 주문할 때는 배송지와 연락처를 정확히 입력해야 합니다. 수령자가 부모님이라면 배송 전 연락이 가능한 번호인지 확인하고, 냉장·냉동 상품은 수령 가능한 날짜를 맞추는 것이 좋습니다. 설치 가전은 설치 장소와 방문 가능 시간을 미리 확인해야 합니다.",
          "선물용 구매는 반품이 어려운 경우가 많으므로 구매 전 조건을 충분히 확인해야 합니다. 홈쇼핑뷰에서 편성표와 상품 상세를 확인한 뒤 공식 페이지에서 최종 조건을 확인하면, 부모님께 드릴 상품을 더 차분하게 고를 수 있습니다. 가격보다 사용 편의성, 배송 안정성, 사후 관리가 핵심입니다."
        ]
      }
    ],
    "공영홈쇼핑 처음 이용하는 사람을 위한 안내": [
      {
        heading: "처음 이용할 때는 편성표부터 익히기",
        paragraphs: [
          "공영홈쇼핑을 처음 이용한다면 방송을 보다가 바로 주문하기보다 편성표 구조를 먼저 익히는 것이 좋습니다. 날짜별로 어떤 상품이 나오는지, 한 방송 시간이 몇 분인지, 대표상품과 관련상품이 어떻게 나뉘는지 확인하면 방송 화면의 빠른 설명에 덜 흔들립니다. 처음에는 상품명과 가격만 보이지만, 몇 번 살펴보면 무료배송, 무이자 할부, 카드 혜택, 공식 구매 링크가 구매 판단에 얼마나 중요한지 알 수 있습니다.",
          "처음 이용자는 특히 공식 사이트와 정보 사이트의 역할을 구분해야 합니다. 홈쇼핑뷰는 공영홈쇼핑 편성표와 상품 정보를 보기 쉽게 정리하는 사이트이고, 실제 결제와 주문은 공영홈쇼핑 공식 사이트에서 진행됩니다. 따라서 홈쇼핑뷰에서 관심 상품을 찾고, 공식 구매 페이지에서 최종 가격과 배송 조건을 확인한 뒤 결제하는 흐름이 가장 안전합니다."
        ],
        items: ["편성표에서 날짜와 방송 시간을 확인합니다.", "상품 상세에서 가격, 배송, 할부 조건을 봅니다.", "공식 구매 페이지에서 최종 결제 조건을 다시 확인합니다.", "처음에는 고가 상품보다 필요한 생활용품부터 비교해 봅니다."]
      },
      {
        heading: "주문 방식 이해하기",
        paragraphs: [
          "공영홈쇼핑 상품은 TV 방송 중 전화로 주문할 수도 있고, 공식 사이트나 모바일 앱을 통해 구매할 수도 있습니다. 전화 주문은 방송을 보며 바로 상담을 받을 수 있다는 장점이 있지만, 상품 상세와 반품 조건을 천천히 확인하기 어렵습니다. 온라인 구매는 화면에서 구성품과 결제 금액을 직접 확인할 수 있어 처음 이용자에게 더 차분한 방법이 될 수 있습니다.",
          "처음 구매할 때는 방송 중 안내되는 가격과 온라인 결제 화면의 최종 가격이 같은지 확인해야 합니다. 카드 할인이나 쿠폰, 배송비가 적용되는 방식이 달라질 수 있기 때문입니다. 특히 가족 대신 주문하거나 선물용으로 구매한다면 배송지와 연락처, 수령 가능 날짜를 한 번 더 확인하세요."
        ]
      },
      {
        heading: "처음 이용자가 자주 놓치는 부분",
        paragraphs: [
          "가장 많이 놓치는 부분은 반품 조건입니다. 식품은 개봉 후 반품이 어렵고, 설치 가전은 설치 후 취소가 제한될 수 있으며, 패션 상품은 택 제거 후 교환이 어려울 수 있습니다. 처음 이용자는 가격 혜택보다 교환·반품 조건을 먼저 보는 습관을 들이는 것이 좋습니다.",
          "또 하나는 방송 시간의 압박입니다. 방송 중에는 매진 임박이나 한정 혜택이 강조될 수 있지만, 모든 상품을 즉시 사야 하는 것은 아닙니다. 필요한 상품인지, 공식 페이지 조건이 명확한지, 배송과 보관이 가능한지 확인한 뒤 결정해도 늦지 않은 경우가 많습니다."
        ]
      }
    ],
    "주방용품 홈쇼핑 구매 전 확인할 점": [
      {
        heading: "주방용품은 소재와 크기가 먼저",
        paragraphs: [
          "주방용품은 방송에서 조리 장면이 잘 나오기 때문에 좋아 보이기 쉽습니다. 하지만 실제 만족도는 소재, 크기, 무게, 세척 방법, 보관 편의성에서 결정됩니다. 프라이팬은 코팅 종류와 사용 가능한 열원, 냄비는 용량과 손잡이 재질, 칼은 날 소재와 관리 방법, 보관용기는 밀폐력과 전자레인지 사용 가능 여부를 확인해야 합니다.",
          "같은 세트 상품이라도 집에서 실제로 자주 쓰는 크기가 포함되어 있는지 봐야 합니다. 큰 냄비가 많아도 보관할 공간이 부족하면 불편하고, 작은 프라이팬이 여러 개 있어도 가족 수와 맞지 않으면 활용도가 떨어집니다. 주방용품은 ‘몇 종 세트’보다 ‘자주 쓸 크기와 재질이 포함됐는지’가 더 중요합니다."
        ],
        items: ["사용 가능한 열원과 인덕션 호환 여부를 확인합니다.", "코팅 관리법과 금속 조리도구 사용 가능 여부를 봅니다.", "세척기 사용 가능 여부와 보관 공간을 확인합니다.", "세트 구성 중 실제로 쓸 크기가 몇 개인지 계산합니다."]
      },
      {
        heading: "코팅 제품은 관리 조건이 중요",
        paragraphs: [
          "프라이팬과 냄비는 코팅 성능이 강조되는 경우가 많습니다. 그러나 코팅 제품은 사용 방법에 따라 수명이 크게 달라집니다. 강한 불, 빈 팬 가열, 금속 조리도구, 거친 수세미는 코팅 손상을 빠르게 만들 수 있습니다. 방송에서 음식이 잘 떨어지는 장면만 보고 결정하지 말고, 사용 설명과 관리 조건을 확인해야 합니다.",
          "코팅 제품은 교환·반품 조건도 확인해야 합니다. 사용 흔적이 생기면 단순 변심 반품이 어려울 수 있고, 코팅 손상이 사용 과실인지 제품 불량인지 판단이 복잡할 수 있습니다. 따라서 처음 사용할 때는 설명서에 맞춰 예열과 세척을 하고, 문제가 있으면 바로 사진을 남기는 것이 좋습니다."
        ]
      },
      {
        heading: "세트 구성을 현명하게 보는 법",
        paragraphs: [
          "주방용품 세트는 구성 수가 많을수록 좋아 보입니다. 하지만 실제로는 같은 크기의 제품이 겹치거나, 잘 쓰지 않는 도구가 포함된 경우도 있습니다. 구성품 수보다 내 주방에 필요한 기능이 있는지 확인하세요. 1인 가구라면 대용량 냄비보다 작은 팬과 보관용기가 유용하고, 가족이 많다면 큰 웍이나 깊은 냄비가 필요할 수 있습니다.",
          "홈쇼핑뷰에서 주방용품 방송을 확인할 때는 가격과 세트 수량만 보지 말고 공식 페이지의 소재, 크기, 관리법을 함께 확인하세요. 주방용품은 오래 쓰는 상품이므로 당장 싸게 사는 것보다 실제 사용 빈도가 높은 구성을 고르는 것이 더 중요합니다."
        ]
      }
    ],
    "화장품·이미용 상품 홈쇼핑 구매 가이드": [
      {
        heading: "화장품은 피부 타입과 성분 확인",
        paragraphs: [
          "화장품 홈쇼핑은 전후 비교 화면과 모델 사용 장면이 강조됩니다. 하지만 실제 피부 반응은 사람마다 다르므로 방송 화면만으로 판단하면 안 됩니다. 구매 전에는 피부 타입, 주요 성분, 사용 순서, 용량, 개봉 후 사용 기간을 확인해야 합니다. 민감성 피부라면 향료, 알코올, 특정 보존제처럼 자극이 될 수 있는 성분도 살펴야 합니다.",
          "세트 구성이 많아 보이는 화장품은 실제 사용 기간을 계산해야 합니다. 같은 기능의 제품이 여러 개 들어 있으면 활용도가 떨어질 수 있고, 개봉 후 오래 보관하면 품질이 변할 수 있습니다. 특히 선물용으로 구매한다면 받는 사람의 피부 타입과 향 취향을 알기 어려우므로 기초 제품보다 사용 부담이 적은 구성인지 확인하는 것이 좋습니다."
        ],
        items: ["피부 타입과 민감 성분 여부를 확인합니다.", "개봉 후 사용 기간과 보관 방법을 봅니다.", "같은 기능 제품이 과도하게 겹치지 않는지 확인합니다.", "교환·반품 제한 조건을 확인합니다."]
      },
      {
        heading: "이미용 기기는 안전성과 소모품",
        paragraphs: [
          "고데기, 드라이기, 마사지기, 피부관리기 같은 이미용 기기는 효과보다 안전성이 먼저입니다. 정격 전압, 온도 조절, 자동 전원 차단, 인증 여부, 사용 금지 대상이 안내되어 있는지 확인해야 합니다. 피부에 직접 닿는 기기는 세척 방법과 위생 관리도 중요합니다.",
          "이미용 기기는 소모품 비용이 숨어 있을 수 있습니다. 전용 젤, 패드, 필터, 충전 케이블, 교체 부품이 필요한지 확인해야 합니다. 방송 중 본체 가격이 저렴해도 소모품을 계속 구매해야 한다면 장기 비용이 커질 수 있습니다."
        ]
      },
      {
        heading: "화장품 방송을 차분히 보는 방법",
        paragraphs: [
          "화장품 방송에서는 즉각적인 변화가 강조될 수 있지만, 대부분의 화장품은 꾸준히 사용해야 체감할 수 있습니다. 방송 표현을 그대로 기대하기보다 나에게 맞는 성분인지, 기존에 쓰던 제품과 겹치지 않는지, 사용 순서가 복잡하지 않은지 확인하세요.",
          "홈쇼핑뷰의 편성표로 화장품 방송 시간을 확인했다면 공식 페이지에서 전성분, 용량, 사용법, 반품 조건을 읽어 보세요. 피부에 맞지 않을 가능성이 있는 상품은 대용량 세트보다 적은 구성으로 시작하는 편이 안전합니다."
        ]
      }
    ],
    "홈쇼핑 세트 구성과 사은품 비교법": [
      {
        heading: "세트 구성은 개수보다 실사용 기준",
        paragraphs: [
          "홈쇼핑 상품은 세트 구성이 강점으로 소개되는 경우가 많습니다. 본품 여러 개, 리필, 사은품, 추가 증정이 붙으면 가격이 좋아 보입니다. 하지만 중요한 것은 구성품 수가 아니라 실제로 사용할 수 있는 구성인지입니다. 같은 기능의 제품이 너무 많이 들어 있으면 보관만 하다가 사용 기한을 넘길 수 있고, 필요 없는 사은품은 체감 혜택이 아닐 수 있습니다.",
          "세트 상품을 볼 때는 본품과 사은품을 구분해야 합니다. 본품은 실제 가격 비교의 기준이 되고, 사은품은 추가 가치로만 봐야 합니다. 사은품 때문에 구매를 결정하면 정작 본품 조건을 놓칠 수 있습니다. 특히 건강식품, 화장품, 식품은 사용 기간과 보관 조건이 있어 대량 구성이 항상 좋은 것은 아닙니다."
        ],
        items: ["본품과 사은품을 분리해 봅니다.", "총 구성품 중 실제 사용할 품목을 표시합니다.", "사용 기한과 보관 공간을 계산합니다.", "단가 계산은 본품 기준으로 먼저 합니다."]
      },
      {
        heading: "단가 계산으로 보는 실제 혜택",
        paragraphs: [
          "세트 상품은 총액이 크기 때문에 단가 계산이 필요합니다. 식품은 100g당 가격, 생활용품은 개당 가격, 화장품은 ml당 가격, 건강식품은 1일 섭취 비용으로 비교하면 실제 혜택을 알 수 있습니다. 단순히 사은품이 많다는 이유로 구매하면 필요 없는 구성까지 비용에 포함될 수 있습니다.",
          "사은품이 같은 브랜드 정품인지, 체험용인지, 용량이 작은 샘플인지도 확인해야 합니다. 방송 화면에서는 크게 보이지만 실제 용량이 작을 수 있습니다. 공식 페이지의 구성품 표를 보고 수량과 용량을 정확히 확인하는 것이 좋습니다."
        ]
      },
      {
        heading: "세트 상품이 유리한 경우",
        paragraphs: [
          "세트 상품이 항상 나쁜 것은 아닙니다. 자주 쓰는 생활용품, 냉동 보관이 가능한 식품, 가족이 함께 사용하는 제품은 세트 구성이 더 유리할 수 있습니다. 다만 처음 써 보는 상품이라면 대량 세트보다 적은 구성으로 시작하는 것이 안전합니다.",
          "홈쇼핑뷰에서 세트 상품을 볼 때는 가격, 수량, 관련상품, FAQ를 함께 확인하세요. 같은 시간대 관련상품에 소용량이나 다른 구성이 있을 수 있습니다. 세트 구성과 사은품을 객관적으로 비교하면 방송 중 과장된 혜택 느낌에서 벗어나 실제 필요한 구성을 선택할 수 있습니다."
        ]
      }
    ],
    "품절·매진 임박 상품을 볼 때 주의할 점": [
      {
        heading: "매진 임박 문구에 바로 반응하지 않기",
        paragraphs: [
          "홈쇼핑 방송에서 품절, 매진 임박, 한정 수량 같은 표현은 구매 결정을 빠르게 만들기 위한 장치가 될 수 있습니다. 실제로 인기 상품은 빠르게 품절될 수 있지만, 모든 매진 임박 문구가 곧바로 구매해야 한다는 뜻은 아닙니다. 먼저 내가 필요한 상품인지, 구성과 가격이 맞는지, 반품 조건이 괜찮은지 확인해야 합니다.",
          "품절 임박 상황에서는 비교 시간이 줄어듭니다. 그래서 평소에 관심 상품 카테고리의 가격과 구성을 어느 정도 알고 있으면 도움이 됩니다. 예를 들어 자주 구매하는 식품이나 생활용품의 적정 단가를 알고 있으면 방송 중 빠른 판단이 가능합니다. 기준이 없으면 매진 분위기에 끌려 필요 없는 상품을 살 가능성이 커집니다."
        ],
        items: ["필요한 상품인지 먼저 확인합니다.", "구성품과 단가를 빠르게 계산합니다.", "방송 후 온라인 구매 가능성을 확인합니다.", "반품 제한 상품은 더 신중하게 봅니다."]
      },
      {
        heading: "품절 후 대체 상품 확인",
        paragraphs: [
          "관심 상품이 품절되었다고 해서 바로 아쉬워할 필요는 없습니다. 비슷한 카테고리의 상품이 며칠 뒤 다시 편성될 수 있고, 같은 방송 시간대에 관련상품이 남아 있을 수도 있습니다. 특히 식품, 주방용품, 패션 세트는 유사 상품이 반복 편성되는 경우가 많습니다.",
          "품절 후 재입고나 앵콜 방송 여부는 공식 사이트 기준으로 확인해야 합니다. 홈쇼핑뷰의 편성표와 인기 상품을 함께 보면 최근 관심이 높은 상품과 앞으로의 방송 일정을 확인할 수 있습니다. 급하지 않은 상품이라면 대체 상품과 다음 편성을 기다리는 것도 좋은 선택입니다."
        ]
      },
      {
        heading: "서두를수록 확인해야 할 조건",
        paragraphs: [
          "구매 시간이 짧을수록 반품 조건, 배송 조건, 최종 가격을 더 명확히 봐야 합니다. 품절 직전 구매는 옵션 선택 실수나 수량 착오가 생기기 쉽습니다. 색상, 사이즈, 배송지, 결제 카드가 맞는지 확인하고 결제해야 합니다.",
          "품절 임박 상품은 인기 신호일 수 있지만, 나에게 좋은 상품이라는 보장은 아닙니다. 홈쇼핑뷰에서 상품 상세의 FAQ와 공식 구매 링크를 확인하고, 결제 전 마지막 화면에서 금액과 배송 조건을 다시 점검하세요. 빠른 구매보다 정확한 구매가 더 중요합니다."
        ]
      }
    ],
    "공영홈쇼핑 카드 할인 혜택 확인법": [
      {
        heading: "카드 할인은 결제 화면에서 확정된다",
        paragraphs: [
          "공영홈쇼핑 방송 상품에는 카드 할인 정보가 함께 표시되는 경우가 있습니다. 하지만 카드 할인은 방송 화면에서 보이는 문구만으로 확정되는 것이 아니라, 실제 결제 단계에서 카드사와 결제 금액, 행사 기간, 결제 방식이 맞아야 적용됩니다. 청구 할인은 결제 당시에는 원래 금액으로 보이고 카드 대금 청구 시 할인되는 방식일 수 있으며, 즉시 할인은 결제 화면에서 바로 금액이 줄어드는 방식입니다. 두 방식은 체감이 다르므로 반드시 구분해야 합니다.",
          "특히 카드 할인은 카드 종류가 세분화되어 있을 수 있습니다. 같은 카드사라도 개인 신용카드, 체크카드, 법인카드, 제휴카드에 따라 조건이 달라질 수 있습니다. 간편결제에 등록한 카드로 결제하면 카드사 할인 대상에서 제외되는 경우도 있으므로, 결제 직전 안내 문구를 확인해야 합니다."
        ],
        items: ["청구 할인인지 즉시 할인인지 구분합니다.", "대상 카드와 최소 결제 금액을 확인합니다.", "간편결제 사용 시 할인 적용 여부를 봅니다.", "방송 혜택과 카드 혜택이 중복 적용되는지 확인합니다."]
      },
      {
        heading: "카드 혜택을 실제 가격으로 계산하기",
        paragraphs: [
          "카드 할인이 붙으면 상품이 더 저렴해 보이지만, 실제 할인 금액을 따로 계산해 보는 것이 좋습니다. 예를 들어 100,000원 상품에 7% 청구 할인이 적용되면 예상 할인액은 7,000원입니다. 그러나 최대 할인 한도가 5,000원이라면 실제 혜택은 5,000원에 그칩니다. 할인율과 할인 한도를 함께 보지 않으면 체감 가격을 잘못 판단할 수 있습니다.",
          "또한 무이자 할부와 카드 청구 할인이 동시에 적용되지 않는 경우도 있습니다. 어떤 조건을 선택하는 것이 더 유리한지 비교하려면 최종 결제 금액, 청구 할인 예상액, 할부 부담을 나누어 보아야 합니다. 고가 상품은 할인액이 크지만 지출 자체도 크므로 필요성 판단이 먼저입니다."
        ]
      },
      {
        heading: "카드 할인을 놓치지 않는 습관",
        paragraphs: [
          "관심 상품이 있다면 방송 시작 전에 사용할 카드와 결제 방식을 미리 정해 두는 것이 좋습니다. 방송 중 급하게 결제하면 할인 적용 조건을 놓칠 수 있습니다. 특히 모바일 앱에서 결제할 때는 쿠폰, 카드 할인, 적립금이 어떤 순서로 적용되는지 확인해야 합니다.",
          "홈쇼핑뷰에서 카드 할인 표시가 보이더라도 최종 기준은 공식 결제 화면입니다. 카드 할인은 행사 기간이 짧거나 조기 종료될 수 있으므로 결제 직전 금액을 기준으로 판단하세요. 카드 혜택은 좋은 보조 조건이지만, 필요 없는 상품을 사게 만드는 이유가 되어서는 안 됩니다."
        ]
      }
    ],
    "공영홈쇼핑 주문·배송 확인 가이드": [
      {
        heading: "주문 직후 확인할 정보",
        paragraphs: [
          "공영홈쇼핑 상품을 주문한 뒤에는 주문이 정상 접수되었는지 먼저 확인해야 합니다. 상품명, 수량, 옵션, 배송지, 연락처, 결제 금액이 맞는지 살펴보고, 오류가 있다면 가능한 빨리 수정해야 합니다. 방송 중 주문은 빠르게 진행되기 때문에 색상이나 수량 선택을 잘못하는 경우가 있습니다. 주문 완료 문자나 공식 사이트 주문 내역을 기준으로 확인하는 것이 좋습니다.",
          "특히 선물용 상품이나 신선식품은 배송지와 수령 가능 시간이 중요합니다. 냉장·냉동 상품은 수령자가 부재 중이면 품질 문제가 생길 수 있고, 명절 선물세트는 배송 마감일을 놓치면 필요한 날짜에 도착하지 않을 수 있습니다. 주문 후에는 배송 예정일과 송장 정보를 확인하는 습관이 필요합니다."
        ],
        items: ["주문번호와 상품명을 확인합니다.", "옵션, 수량, 배송지를 다시 봅니다.", "배송 예정일과 송장 등록 여부를 확인합니다.", "신선식품은 수령 가능 시간을 맞춥니다."]
      },
      {
        heading: "배송 상태를 볼 때 주의할 점",
        paragraphs: [
          "배송 조회는 송장이 등록된 뒤 바로 움직이지 않을 수 있습니다. 판매자가 송장을 먼저 등록하고 실제 집하는 다음 날 이루어지는 경우도 있습니다. 따라서 송장 번호가 보인다고 바로 출발한 것으로 이해하면 안 됩니다. 배송 상태가 장시간 멈춰 있거나 신선식품 배송이 지연된다면 공식 고객센터나 판매처 안내를 확인하는 것이 좋습니다.",
          "대형 가전이나 설치 상품은 일반 택배와 다르게 배송 기사와 일정 조율이 필요할 수 있습니다. 이 경우 송장 조회보다 설치 안내 전화가 더 중요합니다. 설치 상품은 방문 가능한 날짜와 설치 공간을 미리 준비해야 하며, 설치 당일에 조건이 맞지 않으면 추가 일정이 필요할 수 있습니다."
        ]
      },
      {
        heading: "수령 후 바로 해야 할 일",
        paragraphs: [
          "상품을 받으면 포장을 버리기 전에 구성품과 상태를 확인하세요. 식품은 냉장·냉동 상태와 소비기한, 가전은 외관 파손과 구성품, 패션은 사이즈와 오염 여부를 먼저 봐야 합니다. 문제가 있을 때는 사진을 남기고 공식 안내 절차에 따라 문의해야 합니다. 시간이 지나면 배송 중 문제인지 사용 중 문제인지 구분이 어려워질 수 있습니다.",
          "홈쇼핑 주문·배송 관리는 구매 후 만족도를 좌우합니다. 가격이 좋아도 배송 과정에서 문제가 생기면 불편이 커집니다. 주문 후 확인, 배송 조회, 수령 직후 점검까지 하나의 과정으로 생각하면 실수를 줄일 수 있습니다."
        ]
      }
    ],
    "공영홈쇼핑 고객센터 문의 전 준비사항": [
      {
        heading: "문의 전에 자료를 모아두기",
        paragraphs: [
          "고객센터에 문의할 때는 감정적으로 설명하기보다 필요한 정보를 정리해 두는 것이 해결에 도움이 됩니다. 상품명, 주문번호, 방송일, 결제일, 배송지, 문의 사유, 사진 자료가 있으면 상담이 훨씬 빠르게 진행됩니다. 특히 상품 파손, 누락, 변질, 오배송은 사진이나 영상이 중요합니다. 포장을 모두 버린 뒤에는 문제를 증명하기 어려울 수 있습니다.",
          "공영홈쇼핑 관련 문의는 상품 주문과 결제, 배송, 환불에 따라 담당 절차가 다를 수 있습니다. 홈쇼핑뷰는 편성표 정보를 제공하는 사이트이므로 실제 주문 처리 문의는 공영홈쇼핑 공식 고객센터나 공식 사이트를 이용해야 합니다. 다만 문의 전에 어떤 정보를 준비해야 하는지 알고 있으면 시간을 줄일 수 있습니다."
        ],
        items: ["주문번호와 상품명을 준비합니다.", "문제 상황을 사진으로 남깁니다.", "수령일과 배송 상태를 확인합니다.", "원하는 처리 방향을 미리 정리합니다."]
      },
      {
        heading: "문의 유형별 확인 항목",
        paragraphs: [
          "배송 지연 문의라면 송장 번호와 현재 배송 상태를 확인해야 합니다. 상품 불량 문의라면 파손 위치와 사용 전 상태를 보여줄 사진이 필요합니다. 구성품 누락은 박스 안 구성품 전체 사진이 도움이 됩니다. 반품 문의는 개봉 여부, 사용 여부, 택 제거 여부, 설치 여부가 중요합니다. 문의 유형에 따라 준비해야 할 자료가 다르므로 먼저 상황을 분류하세요.",
          "식품은 수령 직후 상태가 중요합니다. 냉동이 풀렸거나 포장이 파손된 경우 즉시 사진을 찍어야 합니다. 가전제품은 설치 전 파손인지 설치 후 문제인지에 따라 처리 방식이 달라질 수 있습니다. 패션 상품은 착용 전 오염이나 불량을 확인하는 것이 좋습니다."
        ]
      },
      {
        heading: "상담 내용을 기록하는 습관",
        paragraphs: [
          "고객센터 상담 후에는 상담 일시, 담당 안내 내용, 처리 예정일을 메모해 두는 것이 좋습니다. 교환이나 환불은 며칠이 걸릴 수 있으므로 진행 상황을 추적할 기준이 필요합니다. 문자나 이메일 안내가 오면 보관하고, 반품 택배 접수 번호도 따로 적어 두세요.",
          "문의는 불편한 일이지만 준비가 되어 있으면 해결이 빨라집니다. 방송 상품은 구매자가 많아 같은 시기에 문의가 몰릴 수 있으므로, 필요한 자료를 한 번에 전달하는 것이 중요합니다. 홈쇼핑 상품을 자주 구매한다면 주문 내역과 배송 문자를 일정 기간 보관하는 습관도 도움이 됩니다."
        ]
      }
    ],
    "공영홈쇼핑 모바일 앱 구매 활용법": [
      {
        heading: "모바일 앱 구매의 장점",
        paragraphs: [
          "공영홈쇼핑 모바일 앱은 방송을 보면서 상품 상세를 확인하거나, 방송 전후로 상품을 검색하고 주문 내역을 확인하는 데 편리합니다. 앱에서는 쿠폰, 알림, 주문 조회, 배송 확인 같은 기능을 한 화면에서 이용할 수 있습니다. TV 방송 중 전화 주문이 부담스럽다면 모바일 앱에서 상품 정보를 읽고 결제하는 방식이 더 차분할 수 있습니다.",
          "다만 앱 구매도 혜택 조건을 확인해야 합니다. 앱 전용 쿠폰이 있을 수 있고, 반대로 TV 방송 중 전화 주문 혜택과 다를 수 있습니다. 같은 상품이라도 주문 채널에 따라 최종 금액이나 혜택이 달라질 수 있으므로 결제 전 화면을 기준으로 판단해야 합니다."
        ],
        items: ["앱 전용 쿠폰과 카드 할인을 확인합니다.", "방송 상품명과 앱 상품명이 같은지 봅니다.", "장바구니 최종 금액을 확인합니다.", "알림 설정으로 관심 상품 방송을 놓치지 않습니다."]
      },
      {
        heading: "앱에서 실수하기 쉬운 부분",
        paragraphs: [
          "모바일 화면은 작기 때문에 옵션 선택 실수가 생기기 쉽습니다. 색상, 사이즈, 수량, 배송지를 확인하지 않고 결제하면 교환이나 취소가 번거로울 수 있습니다. 특히 부모님 대신 주문하거나 선물용으로 보낼 때는 수령자 연락처가 정확한지 확인해야 합니다.",
          "간편결제는 빠르지만 카드 할인 적용에서 제외될 수 있습니다. 카드 혜택을 기대한다면 결제 방식별 할인 적용 여부를 확인하세요. 쿠폰과 카드 할인은 중복 적용이 제한될 수 있으므로, 최종 결제 금액이 예상과 같은지 보는 것이 중요합니다."
        ]
      },
      {
        heading: "앱 알림을 활용하는 방법",
        paragraphs: [
          "관심 상품이 반복 편성되는 경우 앱 알림을 활용하면 방송 시간을 놓치지 않을 수 있습니다. 다만 알림이 많아지면 충동구매가 늘어날 수 있으므로 꼭 필요한 카테고리만 설정하는 것이 좋습니다. 식품, 생활용품, 건강식품처럼 자주 사는 품목 위주로 관리하면 효율적입니다.",
          "홈쇼핑뷰의 편성표로 방송 일정을 미리 보고, 공식 앱에서 쿠폰과 주문 조건을 확인하는 흐름이 좋습니다. 편성표는 탐색에 강하고, 앱은 실제 구매와 주문 관리에 강합니다. 두 기능을 나누어 활용하면 더 안정적으로 쇼핑할 수 있습니다."
        ]
      }
    ],
    "홈쇼핑 상품 후기와 상세정보 읽는 법": [
      {
        heading: "후기는 참고 자료일 뿐",
        paragraphs: [
          "홈쇼핑 상품 후기는 실제 구매자의 경험을 알 수 있어 유용하지만, 모든 사람에게 같은 결과가 적용되지는 않습니다. 식품은 입맛과 보관 상태에 따라 평가가 달라지고, 패션은 체형과 취향에 따라 만족도가 다릅니다. 가전제품은 사용 환경에 따라 소음이나 성능 체감이 달라질 수 있습니다. 후기는 참고하되 상세정보와 함께 읽어야 합니다.",
          "좋은 후기만 보는 것보다 반복되는 불만을 보는 것이 중요합니다. 배송 지연, 구성품 누락, 사이즈 불일치, 색상 차이, AS 불만이 반복된다면 구매 전 신중해야 합니다. 한두 개의 극단적인 후기는 참고 정도로 보고, 여러 후기에 공통으로 나오는 내용을 중심으로 판단하세요."
        ],
        items: ["반복되는 불만을 확인합니다.", "내 사용 환경과 후기 작성자의 상황이 비슷한지 봅니다.", "상세정보와 후기 내용이 일치하는지 확인합니다.", "사진 후기는 조명과 각도를 감안해 봅니다."]
      },
      {
        heading: "상세정보에서 꼭 볼 항목",
        paragraphs: [
          "상품 상세정보는 후기보다 더 기본이 되는 자료입니다. 모델명, 구성품, 용량, 중량, 소재, 원산지, 제조원, 사용 방법, 교환·반품 조건을 확인해야 합니다. 방송 화면에서는 장점이 강조되지만 상세정보에는 제한 조건이 함께 적혀 있을 수 있습니다. 특히 건강식품, 화장품, 설치 가전은 상세정보를 읽지 않고 사면 문제가 생기기 쉽습니다.",
          "상세정보가 부족한 상품은 가격이 좋아도 신중하게 봐야 합니다. 상품 설명이 구체적일수록 구매 후 예상과 실제의 차이가 줄어듭니다. 제품 특성상 반드시 알아야 할 정보가 빠져 있다면 공식 고객센터나 판매 페이지를 통해 추가 확인하는 것이 좋습니다."
        ]
      },
      {
        heading: "후기와 편성표를 함께 활용하기",
        paragraphs: [
          "편성표는 상품이 언제 방송되는지 알려주고, 후기는 구매 후 경험을 알려줍니다. 두 정보를 함께 보면 방송 전 판단이 더 쉬워집니다. 예를 들어 관심 상품이 내일 방송된다면 오늘 상세정보와 후기를 미리 확인해 두고, 방송 시간에는 최종 혜택만 확인하면 됩니다.",
          "후기를 볼 때도 광고성 표현보다 구체적인 사용 경험을 찾으세요. ‘좋아요’보다 ‘사이즈가 작다’, ‘배송이 늦었다’, ‘포장이 깔끔하다’, ‘소음이 있다’ 같은 구체적인 문장이 더 도움이 됩니다. 홈쇼핑 구매는 정보 확인 시간이 짧기 때문에 사전 검토가 특히 중요합니다."
        ]
      }
    ],
    "홈쇼핑 충동구매 줄이는 예산 관리법": [
      {
        heading: "방송 전에 예산을 정해두기",
        paragraphs: [
          "홈쇼핑은 방송 시간, 한정 수량, 할인 문구가 함께 움직이기 때문에 충동구매가 생기기 쉽습니다. 이를 줄이려면 월별 홈쇼핑 예산을 먼저 정해 두는 것이 좋습니다. 식품, 생활용품, 건강식품처럼 반복 구매가 필요한 품목과 일회성 고가 상품을 나누어 예산을 잡으면 지출 흐름이 보입니다.",
          "예산을 정할 때는 카드 할부도 포함해야 합니다. 이번 달 결제 금액은 낮아 보여도 다음 달과 그다음 달에 할부가 이어지면 실제 지출은 커집니다. 방송 중 무이자 할부가 좋아 보여도 전체 카드 지출 계획 안에 들어오는지 확인해야 합니다."
        ],
        items: ["월별 홈쇼핑 예산을 정합니다.", "반복 구매 품목과 일회성 상품을 나눕니다.", "할부 결제는 다음 달 지출까지 포함해 계산합니다.", "방송 전 필요한 상품 목록을 만들어 둡니다."]
      },
      {
        heading: "필요 상품 목록 만들기",
        paragraphs: [
          "충동구매를 줄이는 가장 쉬운 방법은 필요한 상품 목록을 미리 만들어 두는 것입니다. 냉동식품, 세제, 주방용품, 부모님 선물처럼 실제로 필요한 항목을 적어 두면 방송 중 새로운 상품이 나와도 기준이 생깁니다. 목록에 없는 상품은 바로 사지 않고 하루 정도 생각해 보는 방식도 효과적입니다.",
          "필요 상품 목록에는 예상 가격도 함께 적어 보세요. 평소 구매하던 가격을 알고 있으면 홈쇼핑 방송 가격이 정말 좋은지 판단하기 쉽습니다. 단가 기준을 모르고 보면 할인율만 크게 느껴질 수 있습니다."
        ]
      },
      {
        heading: "구매 후 기록하기",
        paragraphs: [
          "홈쇼핑 상품을 구매한 뒤에는 상품명, 가격, 배송 만족도, 재구매 여부를 간단히 기록해 보세요. 기록이 쌓이면 어떤 상품은 만족도가 높고, 어떤 상품은 방송 분위기에 끌려 샀는지 보입니다. 특히 식품과 생활용품은 재구매 기준을 만들기 쉽습니다.",
          "예산 관리는 구매를 막기 위한 것이 아니라 좋은 상품을 더 잘 고르기 위한 장치입니다. 홈쇼핑뷰에서 편성표와 인기 상품을 확인하되, 내 예산과 필요 목록 안에서 고르면 방송 혜택을 더 건강하게 활용할 수 있습니다."
        ]
      }
    ]
  };
  return articles[title] || articles["공영홈쇼핑 편성표 보는 법"];
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
  if (title === "공영홈쇼핑 카드 할인 혜택 확인법") return {
    intro: "공영홈쇼핑 방송에서 보이는 카드 할인은 즉시 할인, 청구 할인, ARS 할인, 쿠폰 조건이 섞여 보일 수 있습니다. 실제로 유리한 구매인지 판단하려면 할인 이름보다 적용 시점, 대상 카드, 월 한도, 최종 결제 금액을 기준으로 확인해야 합니다.",
    points: ["즉시 할인과 청구 할인의 적용 시점을 구분합니다.", "대상 카드, 전월 실적, 월 할인 한도를 확인합니다.", "ARS 할인이나 쿠폰과 중복되는지 확인합니다.", "할인 후에도 필요한 상품인지 다시 판단합니다."],
    caution: "카드 혜택은 카드사 정책과 방송 조건에 따라 달라질 수 있습니다. 결제 전 공식 상품 페이지와 카드사 안내를 함께 확인해야 합니다.",
    tip: "할인 금액만 보지 말고 이번 달 카드 지출 계획 안에 들어오는지 함께 보세요.",
    faqs: []
  };
  if (title === "공영홈쇼핑 주문·배송 확인 가이드") return {
    intro: "홈쇼핑 상품은 방송 중 주문이 몰리거나 상품 특성에 따라 배송 일정이 다를 수 있습니다. 주문 후에는 주문번호, 옵션, 배송지, 예상 배송일, 송장 등록 여부를 차분히 확인해야 배송 실수와 수령 불편을 줄일 수 있습니다.",
    points: ["주문 직후 상품명, 옵션, 수량을 확인합니다.", "배송지와 연락처가 정확한지 봅니다.", "신선식품은 수령 가능한 시간을 고려합니다.", "송장 등록 후 이동 상태를 확인합니다."],
    caution: "배송 일정은 재고, 물류, 지역, 상품 특성에 따라 달라질 수 있습니다. 공식 주문 내역의 최신 정보를 기준으로 확인해 주세요.",
    tip: "식품이나 설치형 상품은 배송 메시지와 수령 가능 시간을 미리 정리하면 좋습니다.",
    faqs: []
  };
  if (title === "공영홈쇼핑 고객센터 문의 전 준비사항") return {
    intro: "공영홈쇼핑 상품을 구매한 뒤 배송, 반품, 교환, 상품 오류를 문의할 때는 필요한 정보를 먼저 정리해 두는 것이 좋습니다. 상담 전에 상품명과 주문번호, 방송일, 사진 자료를 준비하면 같은 설명을 반복하는 일을 줄일 수 있습니다.",
    points: ["주문번호와 상품명을 먼저 확인합니다.", "문제 상황을 짧게 정리합니다.", "파손이나 오배송은 사진을 남깁니다.", "반품 가능 기간과 구성품 보관 상태를 확인합니다."],
    caution: "홈쇼핑뷰는 정보 제공 사이트이며 고객센터 접수를 대신하지 않습니다. 주문 관련 처리는 공영홈쇼핑 공식 고객센터에서 진행해야 합니다.",
    tip: "문의 전 원하는 해결 방식이 교환인지 반품인지 환불인지 정리하면 상담이 빨라집니다.",
    faqs: []
  };
  if (title === "공영홈쇼핑 모바일 앱 구매 활용법") return {
    intro: "공영홈쇼핑 모바일 앱은 방송 알림, 쿠폰, 주문 내역, 배송 확인을 빠르게 처리할 수 있다는 장점이 있습니다. 다만 작은 화면에서 옵션과 결제 조건을 놓치기 쉬우므로 마지막 결제 화면을 천천히 확인하는 습관이 필요합니다.",
    points: ["관심 상품군만 알림을 설정합니다.", "앱 전용 쿠폰의 적용 조건을 확인합니다.", "결제 전 옵션과 배송지를 다시 봅니다.", "주문 후 앱에서 배송 상태를 확인합니다."],
    caution: "앱 혜택은 기간, 대상 상품, 결제 수단에 따라 달라질 수 있습니다. 혜택 문구만 보고 결제하지 말고 최종 금액을 확인해 주세요.",
    tip: "모바일에서는 화면이 작으므로 상품 상세표와 반품 조건을 확대해서 확인하는 것이 좋습니다.",
    faqs: []
  };
  if (title === "홈쇼핑 상품 후기와 상세정보 읽는 법") return {
    intro: "홈쇼핑 상품 후기는 실제 사용자의 경험을 볼 수 있는 자료지만, 모든 구매자의 상황을 대신하지는 않습니다. 후기 평점과 함께 상세정보, 구성품, 반복되는 불만, 최근 후기, 반품 조건을 종합해서 읽어야 더 정확하게 판단할 수 있습니다.",
    points: ["최근 후기와 사진 후기를 우선 확인합니다.", "반복되는 불만이 있는지 봅니다.", "상품 상세표의 구성과 조건을 확인합니다.", "내 사용 목적과 비슷한 후기를 골라 읽습니다."],
    caution: "후기는 개인 경험이므로 절대적인 기준이 아닙니다. 상품군별 핵심 정보와 공식 조건을 함께 확인해야 합니다.",
    tip: "후기가 부족한 상품은 처음부터 대량 세트로 사기보다 구성과 반품 조건을 더 꼼꼼히 보는 편이 안전합니다.",
    faqs: []
  };
  if (title === "홈쇼핑 충동구매 줄이는 예산 관리법") return {
    intro: "홈쇼핑은 제한 시간, 매진 임박, 추가 구성, 카드 혜택이 함께 제시되기 때문에 계획하지 않은 구매가 생기기 쉽습니다. 충동구매를 줄이려면 월 예산, 구매 보류 기준, 재고 확인, 할부 지출까지 함께 관리하는 기준이 필요합니다.",
    points: ["월별 홈쇼핑 예산을 정합니다.", "비슷한 상품이 집에 있는지 확인합니다.", "카드 할부 지출을 다음 달 예산에 반영합니다.", "방송 중 바로 결제하지 않을 기준을 정합니다."],
    caution: "방송 혜택은 실제 필요성을 대신하지 않습니다. 보관 공간과 소비 속도, 다음 달 지출까지 고려해야 합니다.",
    tip: "사고 싶은 상품은 바로 결제하기보다 편성표에서 다시 확인할 상품 목록으로 옮겨 두면 충동을 줄일 수 있습니다.",
    faqs: []
  };
  return common;
}

function staticLegalPage(title, content, env, options = {}) {
  const canonical = options.canonical || `/${title === "이용약관" ? "terms" : title === "개인정보처리방침" ? "privacy" : "contact"}/`;
  return htmlPage(`${title} - 홈쇼핑뷰`, `<section class="section"><div class="container"><div class="content-page"><h1>${title}</h1>${content}</div></div></section>`, env, {
    canonical,
    description: options.description || `${title} 안내 페이지입니다. 홈쇼핑뷰의 데이터 출처, 운영 기준, 개인정보 및 문의 정보를 확인하세요.`
  });
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
  <p><strong>기타 문의:</strong> 제휴, 광고, 기타 문의도 환영합니다.</p>
  <h2>오류 제보 시 포함하면 좋은 내용</h2>
  <p>편성표나 상품 정보 오류를 제보할 때는 확인하려는 페이지 주소, 방송 날짜와 시간, 상품명, 공식 공영홈쇼핑 페이지에서 확인한 내용이 함께 있으면 더 빠르게 검토할 수 있습니다. 가격, 배송비, 무이자 할부, 품절 여부처럼 방송 중 변경될 수 있는 항목은 제보 시점의 화면과 실제 공식 페이지 상태가 다를 수 있습니다.</p>
  <p>상품 구매, 주문 취소, 배송 조회, 반품, 교환, AS 문의는 홈쇼핑뷰에서 처리하지 않습니다. 이 사이트는 편성표와 상품 정보를 정리하는 독립 정보 사이트이므로 실제 거래와 고객센터 업무는 공영홈쇼핑 공식 채널을 이용해 주세요.</p>
  <h2>문의 처리 기준</h2>
  <p>접수된 오류는 공공데이터포털 API 정보와 공영홈쇼핑 공식 상품 페이지를 기준으로 확인합니다. 단순 의견이나 기능 제안은 사이트 개선 시 참고하며, 모든 요청이 즉시 반영된다는 의미는 아닙니다. 개인정보 보호를 위해 주문번호, 카드번호, 주소, 주민등록번호 등 민감한 정보는 문의 내용에 포함하지 않는 것이 좋습니다.</p>`;
}

function dataSourceHtml() {
  return `<p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:30px;">최종 수정: 2026년 5월 23일</p>
  <h2>데이터 출처</h2>
  <p>홈쇼핑뷰는 공공데이터포털(data.go.kr)에서 제공하는 공영홈쇼핑 방송 편성 API를 기반으로 편성표와 상품 정보를 정리합니다. 원천 데이터에는 방송 날짜, 방송 시간, 상품명, 가격, 이미지, 공식 구매 링크, 배송 및 카드 혜택 관련 항목이 포함될 수 있습니다.</p>
  <h2>수집되는 주요 항목</h2>
  <p>사이트는 방송일, 시작 시간, 종료 시간, 상품명, 상품 코드, 대분류·중분류·소분류·세분류 카테고리, 판매가, 할인율, 무료배송 여부, 카드 혜택, 무이자 할부, 공식 상품 링크, 상품 이미지, 품절 여부 등 API가 제공하는 항목을 저장합니다. 항목별 제공 여부는 공영홈쇼핑 API 응답 상태에 따라 달라질 수 있습니다.</p>
  <h2>업데이트 기준</h2>
  <p>편성 데이터는 Cloudflare Worker의 예약 실행을 통해 매일 갱신되며, 현재 날짜 이후의 편성 정보를 우선 노출합니다. 방송 편성은 공영홈쇼핑 사정에 따라 변경될 수 있으므로 실제 구매 전에는 공영홈쇼핑 공식 사이트에서 최종 조건을 확인해야 합니다.</p>
  <h2>가공 방식</h2>
  <p>원천 데이터를 그대로 나열하지 않고 날짜별 편성표, 방송 시간대, 상품 상세 페이지, 인기 상품, 관련 상품, 구매 전 확인사항 형태로 재구성합니다. 같은 방송 날짜와 시작·종료 시간이 같은 상품은 하나의 방송 묶음으로 정리하고, 대표 상품 아래에 함께 방송되는 구성 상품이나 관련 상품을 표시합니다.</p>
  <p>인기 상품은 상품 상세 페이지 조회수를 기준으로 정렬합니다. 조회수는 이용자의 관심도를 보여주는 참고 지표일 뿐이며, 판매량, 품질, 추천 순위, 구매 보장을 의미하지 않습니다. 카테고리 페이지는 API의 상품 분류와 상품명 키워드를 함께 참고해 식품, 건강식품, 주방용품, 패션·잡화, 생활가전으로 나눕니다.</p>
  <h2>캐시와 반영 지연</h2>
  <p>페이지 속도를 높이기 위해 편성표, 인기 상품, 카테고리, 가이드, 신뢰 페이지는 일정 시간 캐시될 수 있습니다. 따라서 API 갱신 직후에는 공식 사이트와 홈쇼핑뷰 표시 내용 사이에 짧은 지연이 발생할 수 있습니다. 결제 직전에는 항상 공식 상품 페이지의 최신 가격과 혜택을 기준으로 판단해 주세요.</p>
  <h2>정확성 안내</h2>
  <p>가격, 할인율, 무료배송, 무이자, 재고 상태는 방송과 공식 판매 페이지에서 달라질 수 있습니다. 홈쇼핑뷰는 비교와 탐색을 돕는 정보 사이트이며 상품 판매, 주문, 결제, 고객 상담을 직접 처리하지 않습니다.</p>
  <h2>오류 제보</h2>
  <p>편성 시간, 상품명, 가격, 링크가 실제와 다르다면 <a href="/contact/">문의하기</a>를 통해 알려 주세요. 확인 후 가능한 범위에서 빠르게 수정하겠습니다.</p>`;
}

function editorialPolicyHtml() {
  return `<p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:30px;">최종 수정: 2026년 5월 23일</p>
  <h2>운영 목적</h2>
  <p>홈쇼핑뷰는 공영홈쇼핑 편성표와 상품 정보를 사용자가 한눈에 비교할 수 있도록 정리하는 정보 서비스입니다. 방송 중 구매를 서두르기보다 가격, 구성, 배송, 반품 조건을 함께 확인하도록 돕는 것을 목표로 합니다.</p>
  <h2>콘텐츠 작성 기준</h2>
  <p>가이드 콘텐츠는 홈쇼핑 상품을 구매하기 전 확인해야 할 기준을 중심으로 작성합니다. 특정 상품 구매를 무조건 권장하지 않으며, 상품군별 주의사항과 공식 사이트 확인 필요성을 함께 안내합니다.</p>
  <p>상품 상세 페이지의 구매 전 안내는 상품명, 방송 분류, 세부 카테고리, 가격, 배송 정보, 방송 시간 등 공개 데이터에 기반해 자동 구성됩니다. 사람이 직접 사용 후기를 작성한 것이 아니므로 개인 경험이나 성능 보증으로 해석해서는 안 됩니다.</p>
  <h2>편집 원칙</h2>
  <ul><li>공식 데이터와 확인 가능한 정보를 우선 사용합니다.</li><li>가격과 혜택은 최종 구매 조건이 아니라 참고 정보로 안내합니다.</li><li>소비자가 놓치기 쉬운 배송, 반품, 구성, AS 조건을 함께 설명합니다.</li><li>오류 제보가 접수되면 원천 데이터와 공식 페이지를 기준으로 확인합니다.</li></ul>
  <h2>인기 순위와 추천 기준</h2>
  <p>인기 상품 목록은 상세 페이지 조회수와 편성 정보를 기준으로 정렬합니다. 이 순위는 판매량이나 광고비 기준이 아니며, 특정 상품을 우선 구매하라는 추천도 아닙니다. 같은 방송 시간대에 함께 편성된 상품은 하나의 방송 묶음으로 보여 이용자가 구성 차이를 비교할 수 있도록 정리합니다.</p>
  <h2>광고와 콘텐츠의 분리</h2>
  <p>광고가 게재되더라도 편성표와 가이드 콘텐츠의 작성 기준은 유지됩니다. 광고 또는 외부 링크는 상품 정보의 정확성을 보장하지 않으며, 구매 결정은 공식 판매 페이지의 조건을 확인한 뒤 이용자가 직접 판단해야 합니다.</p>
  <h2>수정 요청 처리</h2>
  <p>상품명, 가격, 편성 시간, 링크 오류 등 확인 가능한 오류 제보는 공식 데이터와 원문 페이지를 기준으로 검토합니다. 방송 종료 후 변경된 가격이나 품절 상태처럼 시간에 따라 달라지는 정보는 실시간으로 완전히 일치하지 않을 수 있습니다.</p>
  <h2>비공식 사이트 안내</h2>
  <p>홈쇼핑뷰는 공영홈쇼핑의 공식 운영 사이트가 아닙니다. 주문, 결제, 배송, 반품, 교환, 고객센터 업무는 공영홈쇼핑 공식 채널에서 처리됩니다.</p>`;
}

async function sitemap(env) {
  const today = todayKst();
  let rows = (await env.DB.prepare("SELECT date, item_code FROM schedule WHERE date >= ? AND main = 1 ORDER BY date ASC, start_time ASC, priority ASC LIMIT ?").bind(today, INDEXABLE_PRODUCT_LIMIT).all()).results || [];
  if (!rows.length) rows = (await env.DB.prepare("SELECT date, item_code FROM schedule WHERE main = 1 ORDER BY date DESC, start_time ASC, priority ASC LIMIT ?").bind(INDEXABLE_PRODUCT_LIMIT).all()).results || [];
  const base = siteUrl(env);
  const categoryUrls = Object.keys(CATEGORY_PAGES).flatMap((slug) => [`/category/${slug}/`, `/popular/${slug}/`]);
  const staticUrls = ["/", "/intro/", "/popular/", "/channel/", "/guide/", "/data-source/", "/editorial-policy/", "/terms/", "/privacy/", "/contact/", ...categoryUrls, ...GUIDE_POSTS.map(([slug]) => `/guide/${slug}/`)];
  const dateUrls = [...new Set(rows.map((row) => row.date))].map((date) => `${base}schedule/${date}/`);
  const urls = [...staticUrls.map((path) => `${base}${path.replace(/^\//, "")}`), ...dateUrls, ...rows.map((row) => `${base}schedule/${row.date}/${encodeURIComponent(row.item_code)}`)];
  return text(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((loc) => `  <url><loc>${escXml(loc)}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join("\n")}\n</urlset>`, "application/xml; charset=utf-8");
}

function robots(env) {
  return `User-agent: *\nDisallow: /cdn-cgi/\nAllow: /\n\nSitemap: ${siteUrl(env)}sitemap.xml\n`;
}

async function rssFeed(env) {
  const today = todayKst();
  let rows = (await env.DB.prepare("SELECT * FROM schedule WHERE date >= ? ORDER BY date ASC, start_time ASC, priority ASC LIMIT 80").bind(today).all()).results || [];
  if (!rows.length) rows = (await env.DB.prepare("SELECT * FROM schedule ORDER BY date DESC, start_time ASC, priority ASC LIMIT 80").all()).results || [];
  const base = siteUrl(env);
  const now = new Date().toUTCString();
  const items = rows.map((item) => {
    const name = decodeName(item.name);
    const link = new URL(`schedule/${item.date}/${encodeURIComponent(item.item_code)}`, base).toString();
    const category = [decodeName(item.category1), decodeName(item.category2), decodeName(item.category3), decodeName(item.category4)].filter(Boolean).join(" > ");
    const description = `${formatDate(item.date)} ${formatTime(item.start_time)}~${formatTime(item.end_time)} 공영홈쇼핑 방송 상품입니다. 가격 ${price(item.price)}원, ${Number(item.free_shipping) ? "무료배송" : "배송 조건 공식 확인 필요"}${category ? `, 분류 ${category}` : ""}. 최종 구매 조건은 공영홈쇼핑 공식 사이트에서 확인하세요.`;
    return `<item>
      <title>${escXml(`${name} - ${formatDate(item.date)} 공영홈쇼핑 편성표`)}</title>
      <link>${escXml(link)}</link>
      <guid isPermaLink="true">${escXml(link)}</guid>
      <description>${escXml(description)}</description>
      <category>${escXml(decodeName(item.category1) || "공영홈쇼핑")}</category>
      <pubDate>${now}</pubDate>
    </item>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>홈쇼핑뷰 공영홈쇼핑 편성표</title>
    <link>${escXml(base)}</link>
    <description>공영홈쇼핑 TV 편성표, 방송 시간, 상품 가격, 무료배송과 무이자 혜택을 정리한 RSS 피드입니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>60</ttl>
    ${items}
  </channel>
</rss>`;
  return text(xml, "application/rss+xml; charset=utf-8");
}

function scheduleStructuredData(date, slots, canonicalPath, env) {
  const site = siteUrl(env).replace(/\/$/, "");
  const pageUrl = new URL(canonicalPath.replace(/^\//, ""), siteUrl(env)).toString();
  const listItems = slots
    .filter((slot) => slot.main)
    .slice(0, 50)
    .map((slot, index) => {
      const item = slot.main;
      const name = decodeName(item.name);
      return {
        "@type": "ListItem",
        position: index + 1,
        url: new URL(`schedule/${item.date}/${encodeURIComponent(item.item_code)}`, siteUrl(env)).toString(),
        name,
        item: {
          "@type": "Event",
          name: `${name} 공영홈쇼핑 방송`,
          startDate: kstDateTime(item.date, item.start_time),
          endDate: kstDateTime(item.date, item.end_time),
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "VirtualLocation",
            url: site
          },
          organizer: {
            "@type": "Organization",
            name: "공영홈쇼핑",
            url: "https://www.gongyoungshop.kr/"
          }
        }
      };
    });

  return [
    organizationSchema(env),
    websiteSchema(env),
    breadcrumbSchema([
      ["홈", "/"],
      [`${formatDate(date)} 편성표`, canonicalPath]
    ], env),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "공영홈쇼핑 편성표",
      description: "공영홈쇼핑 TV 방송 시간, 상품 가격, 무료배송과 무이자 혜택을 날짜별로 확인할 수 있습니다.",
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: env.SITE_NAME || "홈쇼핑뷰 공영홈쇼핑",
        url: siteUrl(env)
      },
      mainEntity: {
        "@type": "ItemList",
        name: `${formatDate(date)} 공영홈쇼핑 TV 편성표`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: listItems.length,
        itemListElement: listItems
      }
    }
  ];
}

function productStructuredData(item, name, canonicalPath, buyUrl, env) {
  const pageUrl = new URL(canonicalPath.replace(/^\//, ""), siteUrl(env)).toString();
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: imageArray(item),
    description: `${name} 공영홈쇼핑 ${formatDate(item.date)} ${formatTime(item.start_time)} 방송 상품 정보입니다.`,
    sku: String(item.item_code || ""),
    category: [decodeName(item.category1), decodeName(item.category2), decodeName(item.category3), decodeName(item.category4)].filter(Boolean).join(" > "),
    brand: {
      "@type": "Brand",
      name: "공영홈쇼핑"
    },
    offers: {
      "@type": "Offer",
      url: buyUrl || pageUrl,
      priceCurrency: "KRW",
      price: Number(item.price || 0),
      availability: Number(item.soldout) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "공영홈쇼핑"
      }
    }
  };

  return [
    organizationSchema(env),
    breadcrumbSchema([
      ["홈", "/"],
      ["편성표", "/"],
      [name, canonicalPath]
    ], env),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${name} - 공영홈쇼핑 편성표`,
      url: pageUrl,
      mainEntity: product
    },
    {
      "@context": "https://schema.org",
      "@type": "BroadcastEvent",
      name: `${name} 공영홈쇼핑 방송`,
      startDate: kstDateTime(item.date, item.start_time),
      endDate: kstDateTime(item.date, item.end_time),
      isLiveBroadcast: Boolean(Number(item.is_live_sale)),
      publishedOn: {
        "@type": "BroadcastService",
        name: "공영홈쇼핑 TV"
      },
      workPerformed: product
    }
  ];
}

function organizationSchema(env) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: env.SITE_NAME || "홈쇼핑뷰 공영홈쇼핑",
    url: siteUrl(env),
    logo: new URL("favicon.png?v=20260523", siteUrl(env)).toString(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "0507-2834-5978",
      contactType: "customer support",
      areaServed: "KR",
      availableLanguage: "ko"
    }
  };
}

function websiteSchema(env) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: env.SITE_NAME || "홈쇼핑뷰 공영홈쇼핑",
    url: siteUrl(env),
    inLanguage: "ko-KR"
  };
}

function breadcrumbSchema(items, env) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(path.replace(/^\//, ""), siteUrl(env)).toString()
    }))
  };
}

function structuredDataHtml(data) {
  const items = Array.isArray(data) ? data.filter(Boolean) : [data].filter(Boolean);
  return items.map((item) => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, "\\u003c")}</script>`).join("");
}

function imageArray(item) {
  const images = [item.img, ...parseJson(item.img_list, [])].filter(Boolean);
  return [...new Set(images)];
}

function kstDateTime(date, time) {
  const day = String(date || "");
  const clock = String(time || "").padStart(4, "0");
  if (day.length !== 8) return undefined;
  return `${day.slice(0, 4)}-${day.slice(4, 6)}-${day.slice(6, 8)}T${clock.slice(0, 2)}:${clock.slice(2, 4)}:00+09:00`;
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
  const structuredData = structuredDataHtml(options.structuredData);
  const adsenseScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}" crossorigin="anonymous"></script>`;
  const page = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(title)}</title><meta name="description" content="${esc(description)}">${robotsMeta}<link rel="canonical" href="${esc(canonical)}"><link rel="icon" href="/favicon.png?v=20260523" type="image/png" sizes="48x48"><link rel="shortcut icon" href="/favicon.ico?v=20260523"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=20260523"><meta property="og:type" content="website"><meta property="og:site_name" content="${esc(env.SITE_NAME || "홈쇼핑뷰 공영홈쇼핑")}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(new URL("og-image.png?v=20260523", siteUrl(env)).toString())}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${esc(new URL("og-image.png?v=20260523", siteUrl(env)).toString())}">${adsenseScript}${structuredData}<link rel="stylesheet" href="/css/style.css?v=20260524-text-detail-guide"></head><body>${header(options.active || "")}${body}${footer()}<script src="/js/main.js"></script></body></html>`;
  return new Response(page, { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": status === 200 ? "public, max-age=300" : "no-store" } });
}

function header(active) {
  const nav = [["schedule", "/", "📺 편성표"], ["popular", "/popular/", "🔥 인기"], ["food", "/category/food/", "🍱 식품"], ["health", "/category/health/", "💊 건강"], ["kitchen", "/category/kitchen/", "🍳 주방"], ["fashion", "/category/fashion/", "👗 패션"], ["appliance", "/category/appliance/", "🔌 가전"], ["channel", "/channel/", "📡 채널"], ["guide", "/guide/", "📖 가이드"]];
  return `<nav class="navbar"><div class="container"><a href="/" class="navbar-brand"><span class="owl-icon">🛍️</span> 홈쇼핑뷰 <span>공영홈쇼핑</span></a><button class="mobile-toggle" aria-label="메뉴">☰</button><ul class="nav-links">${nav.map(([key, href, label]) => `<li><a href="${href}" class="${active === key ? "active" : ""}">${label}</a></li>`).join("")}</ul></div></nav>`;
}

function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-inner"><div class="footer-info"><h4>홈쇼핑뷰 공영홈쇼핑</h4><p>공영홈쇼핑 편성표와 상품 정보를 한눈에 확인하세요.<br>공공데이터 기반의 알뜰 쇼핑 정보 사이트입니다.</p></div><div class="footer-col"><h4>카테고리</h4><a href="/">편성표</a><a href="/popular/">인기</a><a href="/category/food/">식품</a><a href="/category/health/">건강식품</a><a href="/category/kitchen/">주방용품</a><a href="/category/fashion/">패션·잡화</a><a href="/category/appliance/">생활가전</a><a href="/channel/">채널번호</a><a href="/guide/">가이드</a></div><div class="footer-col"><h4>안내</h4><p style="font-size:0.82rem;margin-bottom:6px;">사이트명 : 홈쇼핑뷰 공영홈쇼핑</p><p style="font-size:0.82rem;margin-bottom:6px;">데이터 출처 : 공공데이터포털(data.go.kr)</p><p style="font-size:0.82rem;margin-bottom:6px;">연락처 : <a href="tel:0507-2834-5978" style="color:var(--accent-light)">0507-2834-5978</a></p><p style="font-size:0.82rem;margin-bottom:6px;">이메일 : <span style="color:var(--accent-light)">songchanghag790@gmail.com</span></p><div class="footer-legal-links"><a href="/intro/">소개</a><a href="/data-source/">데이터 출처</a><a href="/editorial-policy/">운영 정책</a><a href="/terms/">이용약관</a><a href="/privacy/">개인정보처리방침</a><a href="/contact/">문의하기</a></div></div></div><div class="footer-bottom"><p>&copy; 2026 홈쇼핑뷰 공영홈쇼핑. All rights reserved.</p><p>편성 및 가격 정보는 변경될 수 있으니 최종 구매 전 공식 사이트에서 확인해 주세요.</p></div></div></footer>`;
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

function groupCategorySlots(items) {
  const slots = [];
  const map = new Map();
  for (const item of items) {
    const key = `${item.date}_${item.start_time}_${item.end_time}`;
    if (!map.has(key)) {
      map.set(key, { main: null, subs: [] });
      slots.push(map.get(key));
    }
    const slot = map.get(key);
    if (!slot.main) {
      slot.main = item;
      continue;
    }
    const currentIsMain = Number(slot.main.main);
    const itemIsMain = Number(item.main);
    if (itemIsMain && (!currentIsMain || Number(item.priority || 0) < Number(slot.main.priority || 0))) {
      slot.subs.push(slot.main);
      slot.main = item;
    } else {
      slot.subs.push(item);
    }
  }
  return slots.filter((slot) => slot.main);
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
