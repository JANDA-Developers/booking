import { toast } from "react-toastify";

// 한국어인지 검사한다 한국어검사
export const isIncludeKr = (str: string | null): boolean => {
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

// 아폴로 완료메세지를 반환 (백엔드 인터페이스에 의존하고 있음)
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
    console.log("aaaas");
    toast.warn(result.error);
    // 한글이 없다면 에러 메세지는 프론트에서 기입한것
  } else {
    console.error(`Error From BackEnd Message  : ${result.error}`);
    resultFale && toast.warn(resultFale);
    resultFale || toast.warn(result.error);
  }
};

export default onCompletedMessage;
