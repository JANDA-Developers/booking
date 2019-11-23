import isEmpty from "./isEmptyData";

// 결과가 정확한지 반환
// 결과값중 특별히 반활될것이 있다면 T를 반환
function muResult<D, Q extends keyof D, R extends keyof D[Q]>(
  data: D,
  queryName: Q,
  returnKey: R
): "error" | D[Q][R] {
  if (isEmpty(data)) return "error";
  if (isEmpty(data[queryName])) return "error";
  // @ts-ignore
  if (!data[queryName].ok) return "error";

  const returnValue = data[queryName][returnKey];
  return returnValue;
}

export default muResult;
