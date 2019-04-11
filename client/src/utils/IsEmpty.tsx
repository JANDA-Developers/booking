/* eslint-disable*/

/**  배열 또는 오브젝트가 비어 있는지 검사합니다..  */
const isEmpty = (obj: Array<any> | undefined | null | object): obj is null | undefined => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};

export default isEmpty;
