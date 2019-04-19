/* eslint-disable*/

/**  배열 또는 오브젝트가 또는 스트링이 비어 있는지 검사합니다..  */
const isEmpty = (data: any | undefined | null | object | string): data is null | undefined => {
  if (typeof data === 'string') {
    if (data === '') return true;
  } else {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) return false;
    }
  }
  return true;
};

export default isEmpty;
