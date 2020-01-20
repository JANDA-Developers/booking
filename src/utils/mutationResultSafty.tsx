import isEmpty from "./isEmptyData";
import { ExecutionResult } from "graphql";

function muResult<D, Q extends keyof D>(
  result: void | undefined | null | ExecutionResult<D>,
  queryName: Q,
  returnKey?: undefined
): false | true;
function muResult<D, Q extends keyof D, R extends keyof D[Q]>(
  result: void | undefined | null | ExecutionResult<D>,
  queryName: Q,
  returnKey: R
): false | D[Q][R];
function muResult(result: any, queryName: any, returnKey: any): any {
  if (isEmpty(result)) return false;
  if (isEmpty(result["data"])) return false;
  if (isEmpty(result["data"][queryName])) return false;
  // @ts-ignore 이것도 ExecutionResult 처럼 만들면 가능하다
  if (!result["data"][queryName].ok) return false;
  if (returnKey === undefined) return true;

  const returnValue = result["data"][queryName][returnKey];
  return returnValue;
}

export default muResult;
