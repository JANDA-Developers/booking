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

// ⛔️ [https://github.com/Microsoft/TypeScript/issues/24929]

function QueryDataFormater<T, K extends keyof T, C extends keyof T[K], D>(
  data: T | undefined,
  queryName: K,
  dataName: C | undefined,
  falsyReturn: D,
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
        console.error('QueryDataFormater: Error From BackEnd');
        toast.error(inData.error);
        return falsyReturn as any;
      }
      return inData;
    }
  }
  console.error('QueryDataFormater: EMPTY DATA');
  return falsyReturn as any;
}

// 페이지네이션 ok error 처리,
// 순수정보까지 도달하게해줌
//  원본 data 객체 찾기 기능이 있음

export default QueryDataFormater;
