import React, {useEffect} from "react";
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
import {MemoType} from "../../types/enum";
import MemoBox from "./component/MemoBox";
import {isEmpty, s4} from "../../utils/utils";
import {DEFAULT_MEMO} from "../../types/defaults";
import "./Memo.scss";
import Preloader from "../../atoms/preloader/Preloader";
import isLast from "../../utils/isLast";
import JDToolTip, {ReactTooltip} from "../../atoms/tooltip/Tooltip";
import {useModal, LANG} from "../../hooks/hook";
import MemoAlertModal from "./component/MemoAlertModal";
import {IContext} from "../../pages/MiddleServerRouter";

export interface IConfigMemo {
  showOnlyAlert?: boolean;
}

interface Iprops {
  createMemoMu: MutationFn<createMemo, createMemoVariables>;
  deleteMemoMu: MutationFn<deleteMemo, deleteMemoVariables>;
  updateMemoMu: MutationFn<updateMemo, updateMemoVariables>;
  mutationLoading: boolean;
  memos: getMemos_GetMemos_memos[];
  houseId: string;
  memoType: MemoType;
  context: IContext;
}

const Memo: React.FC<Iprops & IConfigMemo> = ({
  memos,
  context,
  createMemoMu,
  deleteMemoMu,
  updateMemoMu,
  mutationLoading,
  houseId,
  memoType,
  showOnlyAlert
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
          enableAlert: memo.enableAlert
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
          enableAlert: !memo.enableAlert
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
          enableAlert: !memo.enableAlert
        }
      }
    });
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const sharedMemoBoxProps = {
    handleImportToogle,
    handleCreate,
    handleDelete,
    handleUpdate
  };

  const filteredMemos = (() => {
    if (showOnlyAlert) return memos.filter(memo => memo.enableAlert);
    return memos;
  })();

  return (
    <div className="memo">
      <div>
        <MemoBox {...sharedMemoBoxProps} memo={DEFAULT_MEMO} add={true} />
      </div>
      <JDToolTip type="dark" effect="solid" id="siginificantExplicateTooltip">
        {LANG("the_memo_gives_an_alarm_on_the_next_connection")}
      </JDToolTip>
      <Preloader floating size={"tiny"} loading={mutationLoading} />
      {!isEmpty(filteredMemos) ? (
        filteredMemos.map((memo, index) => (
          <MemoBox
            className={isLast(index, memos) ? "JDmargin-bottom0" : undefined}
            {...sharedMemoBoxProps}
            key={s4()}
            memo={memo}
          />
        ))
      ) : (
        <span className="JDtextColor--placeHolder">
          {LANG("no_notes_are_currently_created")}
        </span>
      )}
    </div>
  );
};

export default Memo;
