type TVar = {
  [key: string]: string;
};

export let L_DEFAULT: TVar = {
  BT: "방타입",
  B: "방",
  SB: "숙박",
  SS: "숙소",
  GS: "객실",
  R: "룸",
  DM: "도미토리",
  G: "게스트",
  H: "호스트",
  CI: "체크인",
  CO: "체크아웃"
};

export const L_STROE: TVar = {
  BT: "상품타입",
  B: "상품",
  SB: "방문",
  SS: "업소",
  DM: "남녀예약",
  GS: "자리",
  R: "상품",
  G: "예약자",
  H: "상점주",
  CI: "방문일",
  CO: "종료일"
};

export const L_GANG: TVar = {
  BT: "상품타입",
  B: "상품",
  SB: "방문",
  SS: "업소",
  DM: "남녀예약",
  GS: "자리",
  R: "상품",
  G: "예약자",
  H: "상점주",
  CI: "방문일",
  CO: "종료일"
};

export const L_PROGRAM: TVar = {
  BT: "프로그램타입",
  B: "프로그램",
  SB: "방문",
  SS: "업소",
  DM: "남녀예약",
  GS: "자리",
  R: "상품",
  G: "예약자",
  H: "상점주",
  CI: "방문일",
  CO: "종료일"
};

export type TLangVarSet = {
  default: TVar;
  store: TVar;
  gang: TVar;
  program: TVar;
};


export const LANG_VAR_SETS: TLangVarSet = {
  default: L_DEFAULT,
  store: L_STROE,
  gang: L_GANG,
  program: L_PROGRAM
};


