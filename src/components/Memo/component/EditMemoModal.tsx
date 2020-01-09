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

export interface IEditMemoInfo {
  memo?: getMemos_GetMemos_memos;
  mode: "update" | "create";
}

interface Iprops {
  context: IContext;
  modalHook: IUseModal<IEditMemoInfo>;
  createMu: MutationFn<createMemo, createMemoVariables>;
  updateMu: MutationFn<updateMemo, updateMemoVariables>;
}

const EditMemoModal: React.FC<Iprops> = ({
  modalHook,
  createMu,
  updateMu,
  context
}) => {
  const { memo, mode } = modalHook.info;
  const isCreateMode = mode === "create";
  const { house } = context;
  const textHook = useInput(memo?.text || "");

  const handleSubmitBtn = () => {
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
            text: textHook.value,
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
            isCreateMode ? handleSubmitBtn() : handleUpdateBtn();
          }}
          mode="flat"
          thema="primary"
          label={isCreateMode ? LANG("create") : LANG("update")}
        />
      </div>
    </JDmodal>
  );
};

export default React.memo(
  EditMemoModal,
  (prevProp, nextProp) =>
    prevProp.modalHook.isOpen === nextProp.modalHook.isOpen
);
