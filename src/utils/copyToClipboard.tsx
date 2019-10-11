import { toast } from "react-toastify";

const copytoClipboard = (text: string): void => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("URL이 복사되었습니다.");
};
export default copytoClipboard;
