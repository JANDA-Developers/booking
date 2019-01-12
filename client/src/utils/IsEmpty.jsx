/* eslint-disable*/
// 여기서는 굳이 eslint 의 문법을 따르지 않도록 합니다.
// 이유는 가져온 코드가 대부분 이기떄문입니다.

// 배열 또는 오브젝트가 비어 있는지 검사합니다..
const isEmpty = obj => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};

export default isEmpty;
