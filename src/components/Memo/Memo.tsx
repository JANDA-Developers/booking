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
import {isEmpty} from "../../utils/utils";
import {DEFAUT_MEMO} from "../../types/defaults";
import "./Memo.scss";
import Preloader from "../../atoms/preloader/Preloader";
import isLast from "../../utils/isLast";
import JDToolTip, {ReactTooltip} from "../../atoms/tooltip/Tooltip";
import {useModal} from "../../hooks/hook";
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
        <MemoBox {...sharedMemoBoxProps} memo={DEFAUT_MEMO} add={true} />
      </div>
      <JDToolTip type="dark" effect="solid" id="siginificantExplicateTooltip">
        해당 메모는 다음 접속시 알람을 줍니다.
      </JDToolTip>
      <Preloader floating size={"tiny"} loading={mutationLoading} />
      {!isEmpty(filteredMemos) ? (
        filteredMemos.map((memo, index) => (
          <MemoBox
            className={isLast(index, memos) ? "JDmargin-bottom0" : undefined}
            {...sharedMemoBoxProps}
            key={memo._id + memo.enableAlert ? "--impor" : ""}
            memo={memo}
          />
        ))
      ) : (
        <span className="JDtextColor--placeHolder">
          현재 작성된 메모가 없습니다.
        </span>
      )}
    </div>
  );
};

export default Memo;
