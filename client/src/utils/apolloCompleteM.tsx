import {toast} from "react-toastify";

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
  if (result.ok) {
    toast.success(resultOK);
  } else {
    console.error(`BackEnd::${result.error}`);
    toast.warn(result.error);
    resultFale && toast.warn(resultFale);
  }
};

export default onCompletedMessage;
