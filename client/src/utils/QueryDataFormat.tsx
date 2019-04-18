import { any } from 'prop-types';
import { toast } from './utils';
import isEmpty from './IsEmpty';
import { IPageResult } from '../types/interface';

// ⛔️ 이거를 넣을려고했는데 도무지 들어갈 생각을 안한다 왜그런지 모르겠다.
// TODO:그냥 에러처리 다른걸로 하자? STO gogo

// interface InData {
//   __typename: any;
//   error: string | null;
//   ok: boolean;
//   [foo: string]: any;
// }

export interface Data {
  [foo: string]: any;
}

const QueryDataFormater = (
  data: Data | undefined,
  queryName: string,
  dataName: string | undefined,
  falsyReturn: any,
): any => {
  if (!isEmpty(data)) {
    if (!isEmpty(data[queryName])) {
      const inData = data[queryName];
      if (dataName) {
        if (!isEmpty(inData[dataName])) {
          return inData[dataName];
        }
      }
      if (inData.error) {
        console.error('QueryDataFormater: Error From BackEnd');
        console.error(inData.error);
        toast.error(inData.error);
        return falsyReturn;
      }
      return inData;
    }
  }
  console.error('QueryDataFormater: Error From Front');
  return falsyReturn;
};

// 페이지네이션 ok error 처리,
// 순수정보까지 도달하게해줌
//  원본 data 객체 찾기 기능이 있음
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

export default QueryDataFormater;
export { QueryDataFormater, pageNationFormater };
