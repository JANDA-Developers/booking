// 단순 변환 함수
const JDMonthTextChanger = (Month: string | number): string => {
  if (Month === 'December' || Month === 11) return '12월';
  if (Month === 'November' || Month === 10) return '11월';
  if (Month === 'October' || Month === 9) return '10월';
  if (Month === 'September' || Month === 8) return '9월';
  if (Month === 'August' || Month === 7) return '8월';
  if (Month === 'July' || Month === 6) return '7월';
  if (Month === 'June' || Month === 5) return '6월';
  if (Month === 'May' || Month === 4) return '5월';
  if (Month === 'April' || Month === 3) return '4월';
  if (Month === 'March' || Month === 2) return '3월';
  if (Month === 'February' || Month === 1) return '2월';
  if (Month === 'January' || Month === 0) return '1월';
  console.error('JDMonthTextChanger');
  return '';
};

//  숫자(0~6)를 받아서 무슨 요일인지 반환
const JDWeekChanger = (number: number): string => {
  const weekLanguage = ['일', '월', '화', '수', '목', '금', '토'];
  return weekLanguage[number % 7];
};

//  숫자 이넘
export enum DayOfWeekEnum {
  SUN = 1, // 1
  MON = SUN << 1, // 2
  TUE = MON << 1, // 4
  WED = TUE << 1, // 8
  THU = WED << 1, // 16
  FRI = THU << 1, // 32
  SAT = FRI << 1, // 64
  ALL_DAY = (SAT << 1) - 1, // 127
}

export { JDMonthTextChanger, JDWeekChanger };
