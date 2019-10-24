import { isNetworkRequestInFlight as APL } from "apollo-client/core/networkStatus";
import { toast } from "react-toastify";
import { LANG } from "../hooks/hook";

//5 풀링 중
//6 풀링 중
//7 모든게 정상
//8 에러가 감지되었다.
const JDisNetworkRequestInFlight = (
  netWrokStatus: number,
  msg: string = LANG("your_request_cannot_be_fulfilled_right_now")
): boolean => {
  if (netWrokStatus < 7) toast(msg);
  return APL(netWrokStatus);
};

export default JDisNetworkRequestInFlight;
