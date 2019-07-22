import isEmpty from "./isEmptyData";

// 결과가 정확한지 반환
// 결과값중 특별히 반활될것이 있다면 T를 반환
function muResult<T>(
  data: any,
  queryName: string,
  returnKey?: string
): boolean | T {
  if (isEmpty(data)) return false;
  if (isEmpty(data.data)) return false;
  if (isEmpty(data.data[queryName])) return false;
  if (!data.data[queryName].ok) return false;

  if (!returnKey) return true;

  const returnValue = data.data[queryName][returnKey];
  return returnValue as T;
}

export default muResult;
