import React, {useState, Fragment} from "react";
import JDbox from "../../atoms/box/JDbox";
import JDmodal from "../../atoms/modal/Modal";
import InputText from "../../atoms/forms/inputText/InputText";
import {useModal} from "../../actions/hook";
import Button from "../../atoms/button/Button";
import {
  createMemo,
  createMemoVariables,
  deleteMemo,
  deleteMemoVariables,
  updateMemo,
  updateMemoVariables,
  getMemos_GetMemos_memos
} from "../../types/api";
import {MutationFn} from "react-apollo";
import {MemoType, Standard_PreloaderFloatingSize} from "../../types/enum";
import MemoBox from "./component/memoBox";
import {s4} from "../../utils/utils";
import {DEFAULT_MEMO} from "../../types/defaults";
import "./Memo.scss";
import Preloader from "../../atoms/preloader/Preloader";

interface Iprops {
  createMemoMu: MutationFn<createMemo, createMemoVariables>;
  deleteMemoMu: MutationFn<deleteMemo, deleteMemoVariables>;
  updateMemoMu: MutationFn<updateMemo, updateMemoVariables>;
  mutationLoading: boolean;
  memos: getMemos_GetMemos_memos[];
  houseId: string;
  memoType: MemoType;
}

const Memo: React.FC<Iprops> = ({
  memos,
  createMemoMu,
  deleteMemoMu,
  updateMemoMu,
  mutationLoading,
  houseId,
  memoType
}) => {
  const handleCreate = (memo: getMemos_GetMemos_memos) => {
    if (!memo.text) return;
    createMemoMu({
      variables: {
        houseId,
        createMemoParams: {
          memoType,
          text: memo.text,
          title: memo.title,
          important: memo.important
        }
      }
    });
  };

  const handleDelete = (memo: getMemos_GetMemos_memos) => {
    deleteMemoMu({
      variables: {
        memoId: memo._id
      }
    });
  };

  const handleUpdate = (memo: getMemos_GetMemos_memos) => {
    if (!memo.text) return;
    updateMemoMu({
      variables: {
        memoId: memo._id,
        updateMemoParams: {
          memoType,
          text: memo.text,
          title: memo.title,
          important: !memo.important
        }
      }
    });
  };

  const handleImportToogle = (memo: getMemos_GetMemos_memos) => {
    updateMemoMu({
      variables: {
        memoId: memo._id,
        updateMemoParams: {
          memoType,
          text: memo.text,
          important: !memo.important
        }
      }
    });
  };

  const sharedMemoBoxProps = {
    handleImportToogle,
    handleCreate,
    handleDelete,
    handleUpdate
  };

  return (
    <div className="memo">
      <div>
        <MemoBox {...sharedMemoBoxProps} memo={DEFAULT_MEMO} add={true} />
      </div>
      <Preloader floating size={"tiny"} loading={mutationLoading} />
      {memos.map(memo => (
        <MemoBox
          {...sharedMemoBoxProps}
          key={memo._id + memo.important ? "--impor" : ""}
          memo={memo}
        />
      ))}
    </div>
  );
};

export default Memo;
