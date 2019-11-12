import { toast } from "react-toastify";
import { LANG } from "../hooks/hook";

// 클리보드에 문자열 복사
const copytoClipboard = (text: string): void => {
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
  toast.success(LANG("url_is_copied"));
};
export default copytoClipboard;
