import {toast} from "react-toastify";
import languagedetect from "languagedetect";

const langDetecter = new languagedetect();

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
    console.error(`Error From BackEnd Message  : ${result.error}`);
    resultFale && toast.warn(resultFale);
    resultFale || toast.warn(result.error);
  }
};

export default onCompletedMessage;
