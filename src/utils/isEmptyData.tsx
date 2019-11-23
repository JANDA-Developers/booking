/* eslint-disable*/

/**  배열 또는 오브젝트가 또는 스트링이 비어 있는지 검사합니다..  */
const isEmpty = (
  data: Date | any | undefined | null | object | string
): data is null | undefined | "" | void => {
  if (typeof data === "string") {
    if (data === "") return true;
    return false;
  } else {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) return false;
    }
  }

  if (typeof data === "object") {
    if (Object.prototype.toString.call(data) === "[object Date]") return false;
  }
  return true;
};

export default isEmpty;
