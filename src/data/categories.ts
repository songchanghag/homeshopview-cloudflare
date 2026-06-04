type Category = {
  slug: string;
  name: string;
  description: string;
  emoji?: string;
};

export const categories: Category[] = [
  {
    slug: "ipjeom-jeonbeob",
    name: "입점 전 준비사항",
    description: "공영홈쇼핑 입점을 신청하기 전에 반드시 알아야 할 서류·자격·조건을 정리했습니다."
  },
  {
    slug: "sincheon-jeolcha",
    name: "신청·심사 절차",
    description: "입점 신청부터 심사 완료까지 단계별 절차와 유의사항을 설명합니다."
  },
  {
    slug: "sang-pum-jeonryak",
    name: "상품 전략",
    description: "홈쇼핑에서 잘 팔리는 상품의 특징과 가격·구성 전략을 다룹니다."
  },
  {
    slug: "bang-song-jun-bi",
    name: "방송 준비",
    description: "방송 협의, 큐시트 작성, 쇼호스트 소통, 생방송 대응 등 방송 전 준비를 안내합니다."
  },
  {
    slug: "ipjeom-ihu",
    name: "입점 이후 관리",
    description: "입점 후 정산, 재고 관리, 재방송 전략, CS 처리 방법을 다룹니다."
  }
];
