import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { siteConfig } from "@/data/siteConfig";

export default function Disclaimer() {
  return (
    <Layout>
      <SeoHead
        title="면책고지"
        description="공영홈쇼핑 입점 가이드(homeshopview.com)의 면책고지입니다. 본 사이트에서 제공하는 정보의 성격과 한계를 명확히 안내합니다."
        path="/disclaimer"
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "면책고지" }]} />
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-2">면책고지</h1>
        <p className="text-sm text-muted-foreground mb-8">최종 수정일: 2026년 5월 22일</p>

        <div className="prose-article text-foreground space-y-8">

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-amber-900 mb-2">⚠ 중요 안내</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>{siteConfig.name}</strong>(homeshopview.com)은 한국공영홈쇼핑 주식회사의 공식 채널이 아닙니다.
              본 사이트는 운영자({siteConfig.owner})가 독립적으로 운영하는 정보 안내 사이트입니다.
              본 사이트에서 제공하는 모든 정보는 일반적인 참고 목적으로만 제공됩니다.
            </p>
          </div>

          <section>
            <h2>1. 정보의 정확성에 관한 고지</h2>
            <p>
              본 사이트에서 제공하는 공영홈쇼핑 입점 관련 정보는 공개된 자료, 일반적으로 알려진 절차,
              공영홈쇼핑 공식 홈페이지 등을 바탕으로 정리한 것입니다.
            </p>
            <p className="mt-3">
              그러나 다음 사항을 명확히 인지하시기 바랍니다.
            </p>
            <ul>
              <li>공영홈쇼핑의 입점 조건, 심사 기준, 수수료 구조, 절차 등은 정책 변경에 따라 수시로 달라질 수 있습니다.</li>
              <li>본 사이트의 정보가 현재 시점의 공식 정책과 다를 수 있습니다.</li>
              <li>정보의 정확성, 완전성, 최신성을 보장하지 않습니다.</li>
              <li>중요한 결정 전에는 반드시 공영홈쇼핑 공식 채널에서 최신 정보를 직접 확인하시기 바랍니다.</li>
            </ul>
          </section>

          <section>
            <h2>2. 결정 및 행동의 책임</h2>
            <p>
              본 사이트의 정보를 참고하여 내린 사업적 결정(입점 신청, 서류 준비, 생산 계획, 계약 체결 등)에 대한
              결과와 책임은 전적으로 이용자 본인에게 있습니다.
            </p>
            <p className="mt-3">운영자는 다음 사항에 대해 어떠한 법적 책임도 지지 않습니다.</p>
            <ul>
              <li>입점 심사 결과 (합격·불합격)</li>
              <li>방송 편성 여부 및 방송 성과</li>
              <li>입점 후 매출 또는 수익 결과</li>
              <li>계약 조건 해석 또는 이행과 관련된 분쟁</li>
              <li>정보의 불완전성으로 인해 발생한 손실이나 손해</li>
            </ul>
          </section>

          <section>
            <h2>3. 컨설팅 서비스가 아님</h2>
            <p>
              본 사이트가 제공하는 정보는 일반적인 정보 제공을 목적으로 하며, 다음을 포함하지 않습니다.
            </p>
            <ul>
              <li>개별 기업을 위한 입점 컨설팅 서비스</li>
              <li>입점 신청 대행 또는 서류 대리 작성 서비스</li>
              <li>법률 자문 또는 법적 의견 제공</li>
              <li>사업 전략 또는 투자 조언</li>
            </ul>
            <p className="mt-3">
              개별 상황에 맞는 전문적인 조언이 필요하신 경우, 관련 분야 전문가(변호사, 공인 컨설턴트 등)와
              별도로 상담하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2>4. 외부 링크에 관한 고지</h2>
            <p>
              본 사이트는 이용자의 편의를 위해 공영홈쇼핑 공식 홈페이지, 정부 기관 사이트 등 외부 링크를
              제공할 수 있습니다. 외부 사이트의 내용, 정확성, 적법성에 대한 책임은 해당 사이트 운영자에게 있으며,
              본 사이트는 이에 대해 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2>5. 정보 최신화 노력</h2>
            <p>
              본 사이트는 정보의 유효성을 유지하기 위해 정기적으로 내용을 검토하고 업데이트하려는 노력을 기울입니다.
              그러나 실시간으로 모든 정책 변화를 반영하는 것은 현실적으로 어려울 수 있습니다.
              각 글의 수정일을 참고하되, 중요한 내용은 공식 채널에서 교차 확인하시기를 권장합니다.
            </p>
          </section>

          <section>
            <h2>6. 오류 제보 및 정보 보완 요청</h2>
            <p>
              본 사이트의 내용 중 오류를 발견하시거나 보완이 필요한 정보가 있으면 언제든지 이메일로 알려주세요.
              적극적으로 반영하여 더 나은 정보를 제공하겠습니다.
            </p>
            <div className="bg-muted/50 rounded-xl p-5 border border-border mt-4">
              <p className="text-sm">
                오류 제보 이메일:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline font-medium">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </section>

          <div className="bg-muted/30 border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              본 사이트를 이용하심으로써 위 면책고지 내용을 확인하고 동의하시는 것으로 간주됩니다.
              궁금하신 점은 <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>로
              문의해 주시기 바랍니다.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
