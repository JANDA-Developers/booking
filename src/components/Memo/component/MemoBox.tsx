import React, {useState, Fragment} from "react";
import JDbox from "../../../atoms/box/JDbox";
import {getMemos_GetMemos_memos} from "../../../types/api";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import moment from "moment";
import textReader from "../../../utils/textReader";
import MemoTooltip from "./MemoTooltip";
import MemoEditBox from "./MemoEditBox";
import {LANG} from "../../../hooks/hook";

interface Iprops {
  memo: getMemos_GetMemos_memos;
  handleDelete: (memo: getMemos_GetMemos_memos) => void;
  handleUpdate: (memo: getMemos_GetMemos_memos) => void;
  handleCreate: (memo: getMemos_GetMemos_memos) => void;
  handleImportToogle: (memo: getMemos_GetMemos_memos) => void;
  add?: boolean;
  className?: string;
}

const MemoBox: React.FC<Iprops> = ({
  memo,
  handleDelete,
  handleCreate,
  handleUpdate,
  handleImportToogle,
  add,
  className
}) => {
  const {enableAlert} = memo;
  const [editMode, setEditMode] = useState(false);

  const MessageInMemo = () =>
    add ? (
      <span className="JDstandard-space">
        <span className="JDstandard-small-space">
          {LANG("create_new_memo")}
        </span>
        <JDIcon icon="edit" />
      </span>
    ) : (
      <span className="JDstandard-small-space">{textReader(memo.text)}</span>
    );

  const ToolTipIcon = () => (
    <span
      data-tip={memo._id}
      data-place="top"
      data-for={`memoTooltip${memo._id}`}
      data-event="click"
    >
      <JDIcon hover icon="dotMenuVertical" size={IconSize.MEDEIUM_SMALL} />
    </span>
  );

  const MemoToolAndBadge = () => (
    <div className="JDflex">
      <div>
        <div className={`${enableAlert || "JDhoverBox__"} zJDflex--vCenter`}>
          <JDIcon
            className="JDstandard-small-space "
            hover
            onClick={() => {
              handleImportToogle(memo);
            }}
            icon={enableAlert ? "notify" : "unNotify"}
          />
          <ToolTipIcon />
        </div>
      </div>
    </div>
  );

  const norAddAndEditMode = !add && !editMode;
  const addAndNotEditMode = add && !editMode;
  // ⭐️ 메인 리턴
  return (
    <Fragment>
      <JDbox
        tooltip={
          norAddAndEditMode
            ? moment(memo.createdAt)
                .local()
                .format("작성 MM/DD HH:MM")
            : undefined
        }
        tooltipDirection="left"
        className={`memoBox JDhoverBox ${className}`}
        clickable={addAndNotEditMode}
        onClick={() => {
          if (add) {
            setEditMode(true);
          }
        }}
        mode={addAndNotEditMode ? "dashBorder" : undefined}
      >
        {editMode ? (
          <MemoEditBox
            setEditMode={setEditMode}
            handleUpdate={handleUpdate}
            handleCreate={handleCreate}
            add={add}
            memo={memo}
          />
        ) : (
          <MessageInMemo />
        )}
        {norAddAndEditMode && <MemoToolAndBadge />}
      </JDbox>
      {/* 툴팁 */}
      <MemoTooltip
        handleClickDelete={handleDelete}
        handleClickUpdate={() => {
          setEditMode(true);
        }}
        handleImportToogle={handleImportToogle}
        memo={memo}
      />
    </Fragment>
  );
};

export default MemoBox;
