// 어레이 전부 더해줌
export const arraySum = (arr: Array<number>): number => {
  let result = 0;

  for (let i = 0; i < arr.length; i += 1) result += arr[i];

  return result;
};

export const getByteLength = (s: string = ''): number => {
  let i;
  let b;
  let c;
  for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
  return b;
};
