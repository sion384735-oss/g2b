export type Bid = {
  id: string; category: "공사" | "용역" | "물품"; title: string; number: string;
  agency: string; demand: string; region: string; basePrice: number; estimatePrice: number;
  announced: string; deadline: string; opening: string; status: "신규" | "진행중" | "마감임박";
  method: string; contract: string; license: string; qualification: string;
};

export const bids: Bid[] = [
  {id:"R26BK01527161",category:"용역",title:"2026년 공공데이터 품질관리 및 개방 지원",number:"R26BK01527161-000",agency:"한국지능정보사회진흥원",demand:"한국지능정보사회진흥원",region:"전국",basePrice:320000000,estimatePrice:290909091,announced:"2026-08-24",deadline:"2026-08-24 18:00",opening:"2026-08-25 11:00",status:"마감임박",method:"전자입찰",contract:"협상에 의한 계약",license:"소프트웨어사업자",qualification:"국가계약법 시행령에 따른 경쟁입찰 참가자격을 갖춘 업체"},
  {id:"R26BK01527162",category:"공사",title:"스마트산업단지 통합관제센터 구축공사",number:"R26BK01527162-000",agency:"한국산업단지공단",demand:"대구광역시",region:"대구",basePrice:1874000000,estimatePrice:1703636364,announced:"2026-08-24",deadline:"2026-08-26 10:00",opening:"2026-08-26 11:00",status:"신규",method:"전자입찰",contract:"제한경쟁",license:"정보통신공사업",qualification:"대구광역시에 법인등기부상 본점 소재지를 둔 업체"},
  {id:"R26BK01527163",category:"물품",title:"AI 업무지원용 고성능 서버 구매",number:"R26BK01527163-000",agency:"한국생산기술연구원",demand:"한국생산기술연구원",region:"충남",basePrice:650000000,estimatePrice:590909091,announced:"2026-08-23",deadline:"2026-08-27 14:00",opening:"2026-08-27 15:00",status:"진행중",method:"전자입찰",contract:"일반경쟁",license:"직접생산확인증명",qualification:"나라장터 경쟁입찰 참가자격 등록 업체"},
  {id:"R26BK01527164",category:"용역",title:"지역산업 AI 전환 전략수립 연구용역",number:"R26BK01527164-000",agency:"산업연구원",demand:"산업통상자원부",region:"세종",basePrice:180000000,estimatePrice:163636364,announced:"2026-08-22",deadline:"2026-08-28 16:00",opening:"2026-08-31 10:00",status:"진행중",method:"전자입찰",contract:"협상에 의한 계약",license:"학술연구용역",qualification:"중소기업 확인서를 소지한 학술연구기관"},
  {id:"R26BK01527165",category:"공사",title:"공공청사 에너지효율 개선 전기공사",number:"R26BK01527165-000",agency:"서울특별시",demand:"서울특별시 시설관리공단",region:"서울",basePrice:920000000,estimatePrice:836363636,announced:"2026-08-22",deadline:"2026-08-29 10:00",opening:"2026-08-29 11:00",status:"진행중",method:"전자입찰",contract:"지역제한",license:"전기공사업",qualification:"서울특별시에 주된 영업소를 둔 전기공사업체"},
  {id:"R26BK01527166",category:"물품",title:"학교 디지털 학습기기 1,200대 구매",number:"R26BK01527166-000",agency:"경기도교육청",demand:"경기도교육청",region:"경기",basePrice:1140000000,estimatePrice:1036363636,announced:"2026-08-21",deadline:"2026-08-30 14:00",opening:"2026-08-30 15:00",status:"진행중",method:"전자입찰",contract:"일반경쟁",license:"컴퓨터 제조·공급",qualification:"해당 물품 제조 또는 공급업체로 등록한 업체"},
  {id:"R26BK01527167",category:"용역",title:"2026 대한민국 기술사업화 포럼 운영",number:"R26BK01527167-000",agency:"한국산업기술진흥원",demand:"한국산업기술진흥원",region:"서울",basePrice:275000000,estimatePrice:250000000,announced:"2026-08-20",deadline:"2026-09-01 15:00",opening:"2026-09-02 10:00",status:"진행중",method:"전자입찰",contract:"협상에 의한 계약",license:"행사대행업",qualification:"중소기업자간 경쟁제품 직접생산확인 보유 업체"},
  {id:"R26BK01527168",category:"공사",title:"국립연구시설 노후 냉난방설비 교체공사",number:"R26BK01527168-000",agency:"과학기술정보통신부",demand:"국립중앙과학관",region:"대전",basePrice:2380000000,estimatePrice:2163636364,announced:"2026-08-19",deadline:"2026-09-02 10:00",opening:"2026-09-02 11:00",status:"진행중",method:"전자입찰",contract:"제한경쟁",license:"기계설비·가스공사업",qualification:"대전광역시 소재 전문건설업 등록 업체"},
];

export const won = (value:number) => new Intl.NumberFormat("ko-KR").format(value) + "원";
