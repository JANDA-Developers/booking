// ⭕️ 삭제예정
const stringToPrice = (string: string): number => parseInt(string.replace(/,/gi, ''), 10);

export default stringToPrice;
