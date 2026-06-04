import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { siteConfig } from "@/data/siteConfig";

export default function Terms() {
  return (
    <Layout>
      <SeoHead
        title="이용약관"
        description="공영홈쇼핑 입점 가이드(homeshopview.com) 이용약관입니다. 서비스 이용 조건, 콘텐츠 이용 범위, 이용자 의무 등을 안내합니다."
        path="/terms"
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "이용약관" }]} />
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-2">이용약관</h1>
        <p className="text-sm text-muted-foreground mb-8">최종 수정일: 2026년 5월 22일 | 시행일: 2026년 5월 22일</p>

        <div className="prose-article text-foreground space-y-8">

          <div className="bg-muted/50 border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              본 이용약관은 <strong className="text-foreground">{siteConfig.name}</strong>(도메인: homeshopview.com, 이하 "본 사이트")을
              이용하는 데 있어 필요한 조건과 절차, 이용자와 운영자 간의 권리·의무 사항을 규정합니다.
              본 사이트에 접속하거나 콘텐츠를 이용함으로써 이 약관에 동의하는 것으로 간주됩니다.
            </p>
          </div>

          <section>
            <h2>제1조 (목적)</h2>
            <p>
              본 약관은 이용자가 {siteConfig.name}에서 제공하는 정보 및 서비스를 이용하는 데 있어
              필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2>제2조 (서비스의 성격 및 범위)</h2>
            <p>
              본 사이트는 공영홈쇼핑 입점 관련 일반 정보를 제공하는 독립 운영 정보 사이트입니다.
              한국공영홈쇼핑 주식회사의 공식 채널이 아니며, 본 사이트에서 제공하는 정보는 참고 목적으로만 활용하시기 바랍니다.
            </p>
            <p className="mt-3">본 사이트가 제공하는 서비스는 다음과 같습니다.</p>
            <ul>
              <li>공영홈쇼핑 입점 관련 정보 콘텐츠 제공</li>
              <li>카테고리별 정보 구조 및 검색 기능</li>
              <li>운영자 칼럼 및 관점 글 제공</li>
              <li>관리자 CMS-lite 기능 (정적 사이트 기반, 데모 수준)</li>
            </ul>
          </section>

          <section>
            <h2>제3조 (콘텐츠 저작권 및 이용 범위)</h2>
            <p>
              본 사이트의 모든 콘텐츠(글, 이미지, 구조, 디자인 등)에 대한 저작권은 운영자({siteConfig.owner})에게 귀속됩니다.
            </p>
            <p className="mt-3">이용자는 다음 범위 내에서 콘텐츠를 이용할 수 있습니다.</p>
            <ul>
              <li><strong>허용:</strong> 개인적·비상업적 목적의 열람 및 내부 참고</li>
              <li><strong>허용:</strong> URL을 통한 공유 및 링크 연결</li>
              <li><strong>금지:</strong> 콘텐츠의 무단 복제, 전재, 재배포</li>
              <li><strong>금지:</strong> 상업적 목적의 콘텐츠 활용</li>
              <li><strong>금지:</strong> 콘텐츠를 변형하거나 2차 저작물 제작</li>
            </ul>
          </section>

          <section>
            <h2>제4조 (이용자의 의무)</h2>
            <p>이용자는 본 사이트를 이용함에 있어 다음 사항을 준수해야 합니다.</p>
            <ul>
              <li>관련 법령 및 본 약관을 준수할 것</li>
              <li>타인의 명예·권리 및 제3자의 저작권을 침해하지 않을 것</li>
              <li>본 사이트의 콘텐츠를 무단 복제·배포하여 상업적으로 이용하지 않을 것</li>
              <li>해킹, 바이러스 배포, DDoS 공격 등 서비스 운영을 방해하는 행위를 하지 않을 것</li>
              <li>본 사이트를 이용하여 허위 정보를 유포하거나 타인을 기만하는 행위를 하지 않을 것</li>
            </ul>
          </section>

          <section>
            <h2>제5조 (정보의 정확성 및 면책)</h2>
            <p>
              본 사이트의 정보는 입점 준비를 돕기 위한 일반 참고 자료입니다.
              실제 입점 조건·절차·수수료 등 중요한 사항은 공영홈쇼핑 공식 채널을 통해 직접 확인하시기 바랍니다.
            </p>
            <p className="mt-3">
              정보 이용 한계와 책임 범위에 관한 자세한 내용은 <Link href="/disclaimer" className="text-primary hover:underline">면책고지</Link>를 확인해 주세요.
            </p>
          </section>

          <section>
            <h2>제6조 (서비스 변경 및 중단)</h2>
            <p>
              운영자는 운영상·기술상의 필요에 따라 서비스의 일부 또는 전부를 변경·중단할 수 있습니다.
              중요한 변경이 있는 경우 본 페이지 또는 공지를 통해 안내합니다.
            </p>
          </section>

          <section>
            <h2>제7조 (관리자 기능에 관한 특별 고지)</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-900 leading-relaxed">
                본 사이트의 관리자(/admin) 기능은 정적 사이트 CMS-lite 데모입니다.
                실제 보안 인증 시스템이 아니며, 브라우저 로컬 스토리지 기반으로 동작합니다.
                저장된 데이터는 브라우저 또는 기기가 변경되면 유지되지 않을 수 있습니다.
                이 기능을 실제 보안 관리 시스템으로 오해하지 마시기 바랍니다.
              </p>
            </div>
          </section>

          <section>
            <h2>제8조 (준거법 및 관할)</h2>
            <p>
              본 약관은 대한민국 법령에 따라 해석·적용됩니다.
              본 사이트 이용과 관련하여 분쟁이 발생한 경우 관련 법령에서 정한 절차에 따라 해결합니다.
            </p>
          </section>

          <section>
            <h2>제9조 (약관 변경)</h2>
            <p>
              운영자는 관련 법령이나 서비스 운영 정책의 변경에 따라 약관을 수정할 수 있습니다.
              변경된 약관은 본 페이지에 게시하여 안내하며, 중요한 변경의 경우 시행 7일 전에 게시합니다.
              변경된 약관의 시행일 이후에도 서비스를 계속 이용하시는 경우, 변경된 약관에 동의하는 것으로 간주됩니다.
            </p>
          </section>

          <section>
            <h2>제10조 (운영자 연락처)</h2>
            <div className="bg-muted/50 rounded-xl p-5 border border-border">
              <p className="text-sm leading-relaxed">
                <strong>운영자명:</strong> {siteConfig.owner}<br />
                <strong>이메일:</strong>{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}
