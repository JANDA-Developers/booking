import React from "react";
import { toast } from "react-toastify";
import isEmpty from "./isEmptyData";
import ToastError from "../components/toasts/ErrorToast";
import { isIncludeKr } from "./onCompletedMessage";
import { DEFAULT_PAGE_INFO } from "../types/defaults";
import { JDpageInfo, TP } from "../types/interface";

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
        if (isIncludeKr(inData.error)) {
          toast.warn(inData.error);
        } else {
          toast.warn(<ToastError />);
        }
        return falsyReturn as any;
      }
      return inData;
    }
  }
  // console.error('queryDataFormater: EMPTY DATA');
  return falsyReturn as any;
}

interface ResultWithPaging<T, K extends keyof T, D> {
  data: T[K] | D;
  pageInfo: JDpageInfo;
}

// this is used for pagination
function getFromResult<T, K extends keyof T, D>(
  result: (T & TP) | undefined | null,
  dataKey: K,
  falsyData: D
): ResultWithPaging<T, K, D> {
  if (isEmpty(result)) {
    return {
      data: falsyData,
      pageInfo: DEFAULT_PAGE_INFO
    };
  }
  if (isEmpty(result[dataKey])) {
    return {
      data: falsyData,
      pageInfo: DEFAULT_PAGE_INFO
    };
  }

  return {
    data: result[dataKey],
    pageInfo: result["pageInfo"]
  };
  // console.error('queryDataFormater: EMPTY DATA');
}

// 페이지네이션 ok error 처리,
// 순수정보까지 도달하게해줌
//  원본 data 객체 찾기 기능이 있음
export { getFromResult };
export default queryDataFormater;
// export {copyFindReplace};
