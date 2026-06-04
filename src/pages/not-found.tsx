import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">페이지를 찾을 수 없습니다</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            요청하신 주소가 변경되었거나 삭제되었을 수 있습니다. 아래 버튼을 눌러 홈으로 이동해 주세요.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} />
            홈으로 돌아가기
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
