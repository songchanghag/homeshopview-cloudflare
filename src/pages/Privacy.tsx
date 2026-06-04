import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { siteConfig } from "@/data/siteConfig";

export default function Privacy() {
  return (
    <Layout>
      <SeoHead
        title="개인정보처리방침"
        description="공영홈쇼핑 입점 가이드(homeshopview.com)의 개인정보처리방침입니다. 수집 항목, 이용 목적, 보유 기간, 이용자 권리를 안내합니다."
        path="/privacy"
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "개인정보처리방침" }]} />
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-2">개인정보처리방침</h1>
        <p className="text-sm text-muted-foreground mb-8">최종 수정일: 2026년 5월 22일 | 시행일: 2026년 5월 22일</p>

        <div className="prose-article text-foreground space-y-8">

          <div className="bg-muted/50 border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{siteConfig.name}</strong>(이하 "본 사이트", 도메인: homeshopview.com)은
              이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수하여 개인정보를 처리합니다.
              본 방침은 본 사이트가 어떤 개인정보를 수집하고, 어떻게 사용하며, 어떻게 보호하는지를 명확하게 안내하기 위해 작성되었습니다.
            </p>
          </div>

          <section>
            <h2>제1조. 수집하는 개인정보 항목 및 수집 방법</h2>
            <p>
              본 사이트는 서비스 제공을 위해 최소한의 개인정보만 수집합니다. 현재 본 사이트는 회원가입, 결제,
              소셜 로그인 등의 기능을 운영하지 않으므로 서버에서 별도로 개인정보를 수집하지 않습니다.
            </p>
            <h3 className="text-base font-semibold mt-4 mb-2">1. 이메일 문의를 통한 수집</h3>
            <p>이용자가 이메일로 문의를 보내실 경우, 다음 정보가 수집될 수 있습니다.</p>
            <ul>
              <li>이름 (이용자가 이메일에 기재한 경우)</li>
              <li>이메일 주소 (발신자 주소)</li>
              <li>문의 내용에 포함된 기타 정보</li>
            </ul>
            <h3 className="text-base font-semibold mt-4 mb-2">2. 자동 수집 정보</h3>
            <p>
              본 사이트는 통계 목적으로 방문자의 기본적인 접속 정보(IP 주소, 브라우저 유형, 방문 페이지, 방문 시간 등)를
              수집할 수 있습니다. 이 정보는 개인을 식별하는 데 사용되지 않습니다.
            </p>
            <h3 className="text-base font-semibold mt-4 mb-2">3. 관리자 기능(로컬 스토리지)</h3>
            <p>
              본 사이트의 관리자 기능은 브라우저 로컬 스토리지(localStorage)를 사용합니다.
              로컬 스토리지에 저장된 데이터는 이용자의 기기에만 저장되며, 서버로 전송되거나 제3자에게 제공되지 않습니다.
              브라우저 설정을 통해 언제든지 삭제하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2>제2조. 개인정보의 수집 및 이용 목적</h2>
            <p>수집된 개인정보는 다음 목적으로만 사용됩니다.</p>
            <ul>
              <li>이용자 문의에 대한 답변 및 처리</li>
              <li>서비스 운영 관련 중요 안내 (필요한 경우)</li>
              <li>서비스 품질 개선을 위한 통계 분석 (개인 식별 불가 형태)</li>
            </ul>
            <p className="mt-3">
              수집된 개인정보는 마케팅, 광고, 제3자 제공, 기타 상업적 목적으로 사용되지 않습니다.
            </p>
          </section>

          <section>
            <h2>제3조. 개인정보의 보유 및 파기</h2>
            <p>
              본 사이트는 개인정보의 수집 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            </p>
            <ul>
              <li><strong>이메일 문의:</strong> 문의 답변 완료 후 6개월 이내 삭제</li>
              <li><strong>관련 법령에 따른 보존:</strong> 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령에 따라 보존이 필요한 경우, 해당 기간 동안 보관 후 파기합니다.</li>
            </ul>
            <p className="mt-3">개인정보의 파기는 복구 불가능한 방법으로 이루어집니다.</p>
          </section>

          <section>
            <h2>제4조. 개인정보의 제3자 제공</h2>
            <p>
              본 사이트는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
              다만, 법령에 의한 경우(수사기관의 적법한 요청 등)에는 예외적으로 제공될 수 있습니다.
            </p>
          </section>

          <section>
            <h2>제5조. 쿠키(Cookie) 사용에 관한 사항</h2>
            <p>
              본 사이트는 현재 마케팅 목적의 추적 쿠키를 사용하지 않습니다.
              향후 통계 서비스(예: Google Analytics 등)를 도입하는 경우 본 방침을 업데이트하여 안내드릴 예정입니다.
            </p>
          </section>

          <section>
            <h2>제6조. 이용자의 권리</h2>
            <p>이용자는 언제든지 다음 권리를 행사하실 수 있습니다.</p>
            <ul>
              <li>개인정보 열람 요청</li>
              <li>개인정보 정정·삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
            </ul>
            <p className="mt-3">
              위 권리 행사는 아래 개인정보 보호책임자 이메일로 요청하시면 되며, 요청일로부터 10일 이내에 처리 결과를 안내드립니다.
            </p>
          </section>

          <section>
            <h2>제7조. 개인정보 보호책임자</h2>
            <div className="bg-muted/50 rounded-xl p-5 border border-border">
              <p className="text-sm leading-relaxed">
                <strong>이름:</strong> {siteConfig.owner}<br />
                <strong>이메일:</strong>{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2>제8조. 개인정보 처리방침 변경</h2>
            <p>
              본 방침은 법령 또는 서비스 변경에 따라 수정될 수 있습니다. 변경 시 본 페이지에 게시하여 안내드리며,
              중요한 변경의 경우 시행 7일 전에 고지합니다.
            </p>
          </section>

          <section>
            <h2>제9조. 개인정보 관련 권리 침해 구제</h2>
            <p>
              개인정보 관련 권리 침해 등에 대한 민원은 아래 기관에 신청하실 수 있습니다.
            </p>
            <ul>
              <li>개인정보 침해신고센터: 118 (privacy.kisa.or.kr)</li>
              <li>개인정보 분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
              <li>대검찰청 사이버범죄수사단: 1301</li>
              <li>경찰청 사이버수사국: 182</li>
            </ul>
          </section>

        </div>
      </div>
    </Layout>
  );
}
