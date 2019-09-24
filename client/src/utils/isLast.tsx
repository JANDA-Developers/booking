// 해당인덱스가
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
