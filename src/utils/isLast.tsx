// 해당 인덱스가 배열의 마지막인지 검사하고 각기 다른 리턴을 합니다.
const isLast = (
  index: number,
  arr: any[],
  trueReturn?: any,
  falsereturn?: any
) => {
  if (index + 1 === arr.length) {
    return trueReturn || true;
  } else {
    return falsereturn;
  }
};

export default isLast;
