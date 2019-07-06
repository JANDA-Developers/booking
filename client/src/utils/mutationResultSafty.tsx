import isEmpty from "./isEmptyData";

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
