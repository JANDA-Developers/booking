// 삼항연산자의 다른표현
function C<T, F>(condition: any, trueReturn: T, falseReutrn: F) {
  return condition ? trueReturn : falseReutrn;
}

export default C;

type falsy = null | undefined;

// 삼항연산자 변형 단축
function inOr<Q, T extends keyof Q, F>(
  condition: Q | falsy,
  trueReturn: T,
  falseReutrn: F
): Q[T] | F {
  return condition ? condition[trueReturn] : falseReutrn;
}

// 안쪽 프로퍼티 까지검사
function Check<Q, T extends keyof Q>(
  condition: Q | falsy,
  key: T
): Q[T] | undefined {
  if (!condition) return undefined;
  if (!condition[key]) return undefined;
  return condition[key];
}
export {Check};

export {inOr};
