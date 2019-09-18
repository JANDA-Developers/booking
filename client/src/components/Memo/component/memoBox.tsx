import React, {useState, Fragment} from "react";
import JDbox from "../../../atoms/box/JDbox";
import {getMemos_GetMemos_memos} from "../../../types/api";
import InputText from "../../../atoms/forms/inputText/InputText";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import moment from "moment-timezone";
import textReader from "../../../utils/textReader";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import JDbadge from "../../../atoms/badge/Badge";
import Dot from "../../../atoms/dot/dot";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
moment.tz.setDefault("Asia/Seoul");

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
  const [important, setImportant] = useState(memo.important);
  const [editMode, setEditMode] = useState(false);
  const [memoText, SetMemoText] = useState(memo.text);

  const message = add ? (
    <span className="JDstandard-space">
      <span className="JDstandard-small-space">새로운 메모</span>
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
        <li>
          <Button
            onClick={() => {
              handleImportToogle(memo);
            }}
            label={!memo.important ? "중요메모" : "중요해제"}
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
        className={`memoBox ${className}`}
        clickable={add && !editMode}
        onClick={() => {
          if (add) {
            setEditMode(true);
          }
        }}
        mode={add && !editMode ? "dashBorder" : undefined}
      >
        {editMode ? (
          <div style={{flex: 1}}>
            <InputText
              size="fullWidth"
              textarea
              autoHeight
              value={memoText}
              onChange={SetMemoText}
            />
            <div className="JDflex--vCenter JDflex--between">
              <span className="JDflex--vCenter">
                <span className="JDstandard-space">중요한 메모 인가요?</span>
                <CheckBox
                  className="JDstandard-margin0"
                  onChange={setImportant}
                  checked={important}
                />
              </span>
              <Button
                size="small"
                label="작성완료"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditMode(false);
                  // 👿 assing or 새로운 모듈을 써보자
                  memo.text = memoText;
                  memo.important = important;
                  if (add) {
                    handleCreate(memo);
                  } else {
                    handleUpdate(memo);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          message
        )}
        {!add && !editMode && (
          <div className="JDflex JDflex--vCenter">
            <div>{important && <JDbadge thema="point">중요</JDbadge>}</div>
            <CircleIcon>
              <ToolTipIcon />
            </CircleIcon>
          </div>
        )}
      </JDbox>
      {/* 툴팁 */}
      <Tooltip />
    </Fragment>
  );
};

export default MemoBox;
