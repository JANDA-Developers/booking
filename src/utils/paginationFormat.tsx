import {toast} from "react-toastify";
import {IPageResult} from "../types/interface";
import isEmpty from "./isEmptyData";

//  🔴 보류
function pageNationFormater<T>(
  data: any,
  queryName: string,
  falsyReturn: T,
  getOrigin: boolean = false
): IPageResult | T {
  if (!isEmpty(data)) {
    if (!isEmpty(data[queryName])) {
      const upData = data[queryName];
      if (upData.error) {
        console.error("queryDataFormater: Error From BackEnd");
        console.error(upData.error);
        toast.error(upData.error);
        return falsyReturn;
      }

      let origin: any = null;
      if (getOrigin) {
        origin = upData.result.edges.map((edge: any) => edge.node);
      }
      const inData: any = upData.result.edges;
      const {pageInfo, totalCount} = upData.result;
      const inPageInfo = {
        pageInfo,
        totalCount
      };
      const result: IPageResult = {
        origin,
        data: inData,
        pageInfo: inPageInfo
      };
      return result;
    }
    console.info("pageNationFormater - 1");
    return falsyReturn;
  }
  console.info("pageNationFormater - 2");
  return falsyReturn;
}
export default pageNationFormater;
