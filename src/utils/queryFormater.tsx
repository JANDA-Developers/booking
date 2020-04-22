import React from "react";
import { toast } from "react-toastify";
import isEmpty from "./isEmptyData";
import ToastError from "../components/toasts/ErrorToast";
import { isIncludeKr } from "./onCompletedMessage";
import { DEFAULT_PAGE_INFO } from "../types/defaults";
import { JDpageInfo, TP } from "../types/interface";

// If has KR => toast Message or another
const dataErrorToast = (error: string) => {
  if (isIncludeKr(error)) {
    toast.warn(error);
  } else {
    toast.warn(<ToastError />);
  }
};

function queryDataFormater<T, K extends keyof T, C extends keyof T[K], D>(
  data: T | undefined,
  queryName: K,
  dataName: C | undefined,
  falsyReturn: D,
  skipErrorMessage?: boolean
): C extends undefined ? T[K] | D : T[K][C] | D {
  if (isEmpty(data) || isEmpty(data[queryName])) return falsyReturn as any;

  let inData: any = data[queryName];

  const { error } = inData;

  if (error) {
    if (process.env.NODE_ENV === "development") {
      toast.warn(`개발메시지 ERR 쿼리:${queryName} 자세한건 콘솔에`);
      console.error(error);
    } else if (!skipErrorMessage) {
      dataErrorToast(error);
    }
    return falsyReturn as any;
  }

  if (dataName && inData[dataName]) return inData[dataName];

  return inData;
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
