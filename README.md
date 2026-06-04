# 공영홈쇼핑 입점 가이드

공영홈쇼핑 입점을 준비하는 중소기업과 소상공인을 위한 정적 정보 사이트입니다. 입점 준비, 신청 절차, 상품 전략, 방송 준비, 입점 후 관리 정보를 카테고리별로 정리하고, 운영자 칼럼과 CMS-lite 관리자 화면을 함께 제공합니다.

## 사이트 개요

- 사이트명: 공영홈쇼핑 입점 가이드
- 도메인: https://homeshopview.com
- 운영자: 송창학
- 연락 이메일: songchanghag790@gmail.com
- 사이트 성격: 브랜드형 정보 사이트 + 정적 CMS-lite 관리자 UI
- 배포 방식: Vite 빌드 결과물을 Cloudflare Worker Static Assets로 배포

## 주요 페이지

- `/` 홈
- `/categories` 카테고리 목록
- `/categories/:slug` 카테고리 상세
- `/posts/:slug` 일반 정보 글 상세
- `/columns` 운영자 칼럼 목록
- `/columns/:slug` 칼럼 상세
- `/author` 운영자 소개 및 칼럼 허브
- `/about` 사이트 소개
- `/contact` 문의하기
- `/privacy` 개인정보처리방침
- `/terms` 이용약관
- `/disclaimer` 면책고지
- `/sitemap` HTML 사이트맵
- `/admin` CMS-lite 관리자 화면

## 파일 구조

```text
/
├─ index.html
├─ package.json
├─ wrangler.toml
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ rss.xml
├─ src/
│  ├─ App.tsx
│  ├─ worker.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ data/
│  │  ├─ siteConfig.ts
│  │  ├─ categories.ts
│  │  ├─ posts.ts
│  │  └─ columns.ts
│  ├─ components/
│  │  ├─ BreadcrumbNav.tsx
│  │  ├─ PostCard.tsx
│  │  └─ layout/
│  └─ pages/
│     ├─ Home.tsx
│     ├─ Admin.tsx
│     ├─ PostDetail.tsx
│     ├─ ColumnDetail.tsx
│     └─ ...
```

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버가 실행되면 Replit 또는 로컬 미리보기 URL에서 사이트를 확인할 수 있습니다.

## 빌드 방법

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

## Cloudflare 배포

```bash
npm run build
npx wrangler deploy
```

`wrangler.toml`은 `homeshopview.com`, `www.homeshopview.com`, `preview.homeshopview.com` 라우트를 사용하도록 설정되어 있습니다. Cloudflare Worker는 `dist/` 정적 파일을 제공하고, React 내부 경로는 `index.html`로 fallback 처리합니다.

## CMS-lite 관리자 안내

`/admin` 페이지는 워드프레스 느낌의 정적 CMS-lite 관리자 UI입니다. 로그인 전 화면과 로그인 후 화면이 구분되며, 글 관리, 칼럼 관리, 카테고리 확인, 사이트 설정 확인, JSON 내보내기/가져오기 기능을 제공합니다.

중요한 한계:

- 이 관리자 화면은 정적 사이트용 데모 UI입니다.
- 실제 데이터베이스, 서버 인증, 권한 관리가 없습니다.
- 저장된 내용은 브라우저 `localStorage`에 보관됩니다.
- 기기나 브라우저가 바뀌면 저장 내용이 유지되지 않을 수 있습니다.
- 실제 운영 데이터로 반영하려면 `src/data/` 파일을 직접 수정하거나, 추후 Supabase, Firebase, Git 기반 CMS 같은 저장소를 연결해야 합니다.

데모 로그인:

- 비밀번호: `admin123`

## 운영자 칼럼 작성 흐름

사이트의 푸터, 글 하단 편집자 박스, 운영자 소개 영역에서 운영자명을 클릭하면 `/author` 페이지로 이동합니다. 일반 방문자에게는 운영자 소개와 칼럼 목록이 보이고, 관리자 세션이 활성화된 상태에서는 “새 칼럼 작성하기” 버튼이 표시됩니다. 이 버튼은 `/admin`의 칼럼 작성 흐름으로 이어집니다.

## 수정 위치

- 사이트명 수정: `src/data/siteConfig.ts`
- 색상 수정: `src/index.css`
- 이메일 수정: `src/data/siteConfig.ts`
- 운영자명 수정: `src/data/siteConfig.ts`
- 운영자 소개 문구 수정: `src/data/siteConfig.ts`
- 카테고리 수정: `src/data/categories.ts`
- 일반 글 수정: `src/data/posts.ts`
- 칼럼 수정: `src/data/columns.ts`
- 관리자 기본 문구 수정: `src/pages/Admin.tsx`
- RSS 수정: `public/rss.xml`
- XML 사이트맵 수정: `public/sitemap.xml`
- Cloudflare 배포 설정 수정: `wrangler.toml`, `src/worker.ts`

## SEO 구성

- 기본 메타 태그: `index.html`
- 페이지별 클라이언트 메타 갱신: `src/components/layout/SeoHead.tsx`
- Cloudflare Worker HTML 메타 보강: `src/worker.ts`
- Article / FAQ 구조화 데이터: `src/pages/PostDetail.tsx`
- Breadcrumb 구조화 데이터: `src/components/BreadcrumbNav.tsx`
- robots: `public/robots.txt`
- sitemap: `public/sitemap.xml`
- RSS: `public/rss.xml`

## 운영 원칙

이 사이트는 공영홈쇼핑 입점을 준비하는 독자를 위해 공개적으로 확인 가능한 정보와 일반적인 준비 관점을 정리하는 정보 사이트입니다. 특정 결과를 보장하거나 공식 기관을 대리하지 않으며, 중요한 신청 절차와 정책은 반드시 공영홈쇼핑 공식 채널에서 다시 확인해야 합니다.
