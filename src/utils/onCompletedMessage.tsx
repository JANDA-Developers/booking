import {toast} from "react-toastify";

const isIncludeKr = (str: string | null): boolean => {
  if (!str) return false;
  const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  if (check.test(str)) return true;
  return false;
};

interface result {
  error: string | null;
  ok: boolean | null;
  [data: string]: any;
}

const onCompletedMessage = (
  result: result,
  resultOK: string,
  resultFale: string | undefined
) => {
  if (!result) {
    return;
  }
  const haveKr = isIncludeKr(result.error);
  if (result.ok) {
    toast.success(resultOK);
    // 한글이 있다면 에러 메세지는 백엔드에서 온것
  } else if (haveKr) {
    toast.warn(result.error);
    // 한글이 없다면 에러 메세지는 프론트에서 기입한것
  } else {
    console.error(`Error From BackEnd Message  : ${result.error}`);
    resultFale && toast.warn(resultFale);
    resultFale || toast.warn(result.error);
  }
};

export default onCompletedMessage;
