/* eslint-disable*/

/**  배열 또는 오브젝트가 비어 있는지 검사합니다..  */
const isEmpty = obj => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  if (!obj) return true;
  return true;
};

export default isEmpty;
