import {toast} from "react-toastify";
import isEmpty from "./isEmptyData";

// ⛔️ [https://github.com/Microsoft/TypeScript/issues/24929]

// 객체 배열에서 값을 복사하고 찾아서 일부 변경해주는 함수
// function copyFindReplace<T, K extends keyof T>(copy: Array<T>, findKey: K, findValue: any, replace?: undefined): number;
// function copyFindReplace<T, K extends keyof T>(
//   copy: Array<T>,
//   findKey: K,
//   findValue: any,
//   replace?: { [foo: string]: any } | undefined,
// ) {
//   const value = Object.assign(copy, {});
//   const index = value.findIndex(cv => cv[findKey] === findValue);
//   if (index === -1) return -1;
//   if (!replace) return index;
//   value[index] = {
//     ...value[index],
//     ...replace,
//   };
//   return { value, index };
// }

function queryDataFormater<T, K extends keyof T, C extends keyof T[K], D>(
  data: T | undefined,
  queryName: K,
  dataName: C | undefined,
  falsyReturn: D
): C extends undefined ? T[K] | D : T[K][C] | D {
  if (!isEmpty(data)) {
    if (!isEmpty(data[queryName])) {
      const inData: any = data[queryName];
      if (dataName) {
        if (inData[dataName]) {
          return inData[dataName];
        }
      }
      if (inData.error) {
        console.error("queryDataFormater: Error From BackEnd");
        console.error(inData.error);
        toast.error('오류발생');
        return falsyReturn as any;
      }
      return inData;
    }
  }
  // console.error('queryDataFormater: EMPTY DATA');
  return falsyReturn as any;
}

// 페이지네이션 ok error 처리,
// 순수정보까지 도달하게해줌
//  원본 data 객체 찾기 기능이 있음

export default queryDataFormater;
// export {copyFindReplace};
