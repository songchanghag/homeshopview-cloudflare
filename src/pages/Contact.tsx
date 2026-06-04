import { Mail, Clock, MessageSquare, AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/layout/SeoHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { siteConfig } from "@/data/siteConfig";

export default function Contact() {
  return (
    <Layout>
      <SeoHead
        title="문의하기"
        description="공영홈쇼핑 입점 가이드(homeshopview.com)에 문의사항이 있으시면 이메일로 연락해 주세요. 영업일 기준 2~3일 내에 답변드립니다."
        path="/contact"
      />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: "문의하기" }]} />
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-3">문의하기</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          사이트 내용에 대한 질문, 오류 제보, 정보 보완 제안, 기타 문의사항이 있으시면 아래 연락처로 연락해 주세요.
          확인 후 성실히 답변해 드리겠습니다.
        </p>

        <div className="space-y-5">

          <div className="bg-card border border-card-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">이메일 문의</p>
                <p className="text-sm text-muted-foreground">가장 확실한 연락 방법입니다</p>
              </div>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-center bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-opacity"
              data-testid="link-email-contact"
            >
              {siteConfig.email}로 이메일 보내기
            </a>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Clock size={18} className="text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">답변 안내</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• 이메일 문의에 대한 답변은 영업일 기준 <strong className="text-foreground">2~3일 이내</strong>를 원칙으로 합니다.</p>
              <p>• 문의량에 따라 다소 지연될 수 있으며, 이 점 양해 부탁드립니다.</p>
              <p>• 주말·공휴일에는 답변이 지연될 수 있습니다.</p>
              <p>• 이 사이트의 연락 수단은 이메일로만 운영되며 전화 상담이나 방문 상담은 제공하지 않습니다.</p>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <MessageSquare size={18} className="text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">문의 유형별 안내</p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">정보 오류 제보:</strong> 잘못된 정보를 발견하셨다면 구체적인 내용과 함께 알려주세요. 빠르게 수정하겠습니다.</li>
              <li>• <strong className="text-foreground">정보 보완 제안:</strong> 다루었으면 하는 주제나 보완할 내용에 대한 제안을 환영합니다.</li>
              <li>• <strong className="text-foreground">사이트 이용 문의:</strong> 사이트 이용 중 불편하신 점이 있으면 말씀해 주세요.</li>
              <li>• <strong className="text-foreground">기타 문의:</strong> 위에 해당하지 않는 내용도 자유롭게 문의해 주세요.</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-600 mt-0.5 shrink-0" />
              <div className="space-y-1 text-sm text-amber-800">
                <p className="font-semibold">반드시 확인해 주세요</p>
                <p>• 본 사이트는 공영홈쇼핑 공식 채널이 아닙니다. 입점 신청은 반드시 공영홈쇼핑 공식 홈페이지를 통해 진행해 주세요.</p>
                <p>• 개별 입점 컨설팅 또는 대행 서비스는 제공하지 않습니다.</p>
                <p>• 이 문의 양식은 이메일 기반으로만 운영됩니다. 실시간 채팅 기능은 없습니다.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
