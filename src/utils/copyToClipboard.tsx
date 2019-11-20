import {toast} from "react-toastify";
import {LANG} from "../hooks/hook";

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
