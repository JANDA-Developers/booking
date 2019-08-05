import {isNetworkRequestInFlight as APL} from "apollo-client/core/networkStatus";
import {toast} from "react-toastify";

//5 풀링 중
//6 풀링 중
//7 모든게 정상
//8 에러가 감지되었다.
const JDisNetworkRequestInFlight = (
  netWrokStatus: number,
  msg: string = "지금은 요청사항을 수행수 없습니다."
): boolean => {
  if (netWrokStatus < 7) toast(msg);
  return APL(netWrokStatus);
};

export default JDisNetworkRequestInFlight;
