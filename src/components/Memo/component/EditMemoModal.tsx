import React from "react";
import JDmodal from "../../../atoms/modal/Modal";
import { LANG, IUseModal, useInput } from "../../../hooks/hook";
import Button from "../../../atoms/button/Button";
import InputText from "../../../atoms/forms/inputText/InputText";
import { toast } from "react-toastify";
import { MutationFn } from "react-apollo";
import {
  updateMemo,
  createMemo,
  updateMemoVariables,
  createMemoVariables,
  getMemos_GetMemos_memos
} from "../../../types/api";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import { MemoType } from "../../../types/enum";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
  createMu: MutationFn<createMemo, createMemoVariables>;
  updateMu: MutationFn<updateMemo, updateMemoVariables>;
  memo?: getMemos_GetMemos_memos;
}

const EditMemoModal: React.FC<Iprops> = ({
  modalHook,
  createMu,
  updateMu,
  memo,
  context
}) => {
  const { house } = context;
  const textHook = useInput("");

  const handleCreateBtn = () => {
    createMu({
      variables: {
        houseId: house._id,
        createMemoParams: {
          text: textHook.value,
          title: "",
          enableAlert: false,
          memoType: MemoType.HOST
        }
      }
    });
    modalHook.closeModal();
  };

  const handleUpdateBtn = () => {
    if (memo) {
      updateMu({
        variables: {
          memoId: memo._id,
          updateMemoParams: {
            enableAlert: memo.enableAlert,
            memoType: memo.memoType,
            text: memo.text,
            title: memo.title
          }
        }
      });
      modalHook.closeModal();
    }
  };

  const validate = () => {
    if (!textHook.value) {
      toast.warn("");
      return false;
    }

    return true;
  };

  return (
    <JDmodal {...modalHook}>
      <div>
        <InputText label={LANG("memo")} {...textHook} autoHeight textarea />
      </div>
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            handleCreateBtn();
          }}
          mode="flat"
          thema="primary"
          label={LANG("create")}
        />
        <Button
          onClick={() => {
            handleUpdateBtn();
          }}
          mode="flat"
          thema="grey"
          label={LANG("update")}
        />
      </div>
    </JDmodal>
  );
};

export default EditMemoModal;
