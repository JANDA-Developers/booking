import { IPageResult } from '../types/interface';
import isEmpty from './IsEmpty';
import toast from './Toast';

//  🔴 보류
function pageNationFormater<T>(
  data: any,
  queryName: string,
  falsyReturn: T,
  getOrigin: boolean = false,
): IPageResult | T {
  if (!isEmpty(data)) {
    if (!isEmpty(data[queryName])) {
      const upData = data[queryName];
      if (upData.error) {
        console.error('QueryDataFormater: Error From BackEnd');
        console.error(upData.error);
        toast.error(upData.error);
        return falsyReturn;
      }

      let origin: any = null;
      if (getOrigin) {
        origin = upData.result.edges.map((edge: any) => edge.node);
      }
      const inData: any = upData.result.edges;
      const { pageInfo, totalCount } = upData.result;
      const inPageInfo = {
        pageInfo,
        totalCount,
      };
      const result: IPageResult = {
        origin,
        data: inData,
        pageInfo: inPageInfo,
      };
      return result;
    }
    console.log('errorCode utils 901');
    return falsyReturn;
  }
  console.log('errorCode utils 902');
  return falsyReturn;
}
export default pageNationFormater;
