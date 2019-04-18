import { any } from 'prop-types';
import { toast } from './utils';
import isEmpty from './IsEmpty';

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
      if (dataName) {
        if (!isEmpty(data[queryName][dataName])) {
          return data[queryName][dataName];
        }
      }
      return data[queryName];
    }
    if (data.error) {
      console.error('QueryDataFormater: Error From BackEnd');
      console.error(data.error);
      toast.error(data.error);
    } else {
      console.error('QueryDataFormater: Error From Front');
    }
  }
  return falsyReturn;
};

export default QueryDataFormater;
