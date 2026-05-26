export type ReservationStatus = '접수' | '상담완료' | '진행중' | '취소';

export interface Reservation {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  phone: string;
  area: string; // '민사' | '형사' | '가사' | '회생·파산'
  details: string; // Brief consultation description
  status: ReservationStatus;
  memo: string; // Internal admin notes
  createdAt: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  iconName: string;
  description: string;
  subfields: string[];
  detailedIntro: string;
  strategy: string; // 현실적인 대응 전략
}

export interface SuccessCase {
  id: string;
  area: string; // e.g. '형사', '가사', '회생'
  title: string;
  resultBadge: string;
  caseContent: string; // 1. 사건 내용
  defenseContent: string; // 2. 변론 내용
  resultContent: string; // 3. 판결/처분 결과
  resultLabel: string; // '판결 결과' | '처분 결과'
}

export interface Lawyer {
  id: string;
  name: string;
  position: string;
  avatarUrl: string;
  quote: string;
  philosophy: string;
  specialFields: string[];
  careers: string[];
}
