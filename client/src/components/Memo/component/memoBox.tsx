import React, {useState, Fragment} from "react";
import JDbox from "../../../atoms/box/JDbox";
import {getMemos_GetMemos_memos} from "../../../types/api";
import InputText from "../../../atoms/forms/inputText/InputText";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import moment from "moment-timezone";
import {findFieldsThatChangedTypeOnInputObjectTypes} from "graphql/utilities/findBreakingChanges";
import textReader from "../../../utils/textReader";
moment.tz.setDefault("Asia/Seoul");

interface Iprops {
  memo: getMemos_GetMemos_memos;
  handleDelete: (memo: getMemos_GetMemos_memos) => void;
  handleUpdate: (memo: getMemos_GetMemos_memos) => void;
  handleCreate: (memo: getMemos_GetMemos_memos) => void;
  add?: boolean;
}

const MemoBox: React.FC<Iprops> = ({
  memo,
  handleDelete,
  handleCreate,
  handleUpdate,
  add
}) => {
  const [editMode, setEditMode] = useState(false);
  const message = add ? (
    <span className="JDstandard-space">
      <span className="JDstandard-small-space">새로운 메모</span>
      <JDIcon icon="edit" />
    </span>
  ) : (
    <span className="JDstandard-small-space">{textReader(memo.text)}</span>
  );

  const EditInput = () => (
    <InputText
      size="fullWidth"
      textarea
      autoHeight
      defaultValue={add ? "" : memo.text}
      onBlur={e => {
        setEditMode(false);
        const vlaue = e.currentTarget.value;
        memo.text = vlaue;
        if (add) {
          handleCreate(memo);
        } else {
          handleUpdate(memo);
        }
      }}
    />
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

  const Tooltip = () => (
    <TooltipList id={`memoTooltip${memo._id}`} className="memoTooltip">
      <ul>
        <li>
          <Button
            onClick={() => {
              setEditMode(true);
            }}
            label="수정"
          />
        </li>
        <li>
          <Button
            onClick={() => {
              handleDelete(memo);
            }}
            label="삭제"
          />
        </li>
      </ul>
    </TooltipList>
  );

  // ⭐️ 메인 리턴
  return (
    <Fragment>
      <JDbox
        tooltip={
          !add && !editMode
            ? moment(memo.createdAt).format("MM:DD HH:MM")
            : undefined
        }
        tooltipDirection="left"
        className="memoBox"
        clickable={add && !editMode}
        onClick={() => {
          if (add) {
            setEditMode(true);
          }
        }}
        mode={add && !editMode ? "dashBorder" : undefined}
      >
        {editMode ? <EditInput /> : message}
        {!add && !editMode && <ToolTipIcon />}
      </JDbox>
      {/* 툴팁 */}
      <Tooltip />
    </Fragment>
  );
};

export default MemoBox;
