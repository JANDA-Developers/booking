import {IContext} from "../pages/MiddleServerRouter";
import {IUseModal} from "../actions/hook";
import {useQuery} from "@apollo/react-hooks";
import {
  getMemos,
  getMemosVariables,
  getMemos_GetMemos_memos
} from "../types/api";
import {getCookie} from "./cookies";

const alertMemo = (modalHook: IUseModal, memos: getMemos_GetMemos_memos[]) => {
  if (
    !sessionStorage.getItem("dontShowMemoAlert") &&
    !getCookie("dontShowMemoToday")
  ) {
    if (memos) {
      const haveAlert = memos.find(data => data.enableAlert);
      haveAlert && modalHook.openModal();
    }
  }
};

export default alertMemo;
