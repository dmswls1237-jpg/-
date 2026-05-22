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
  clientSituation: string; // 의뢰인의 불안한 상황
  processSteps: string[]; // 사건 진행 흐름
  finalResult: string; // 성공 결과
  keyFocusPoint: string; // 핵심 해결 포인트
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
