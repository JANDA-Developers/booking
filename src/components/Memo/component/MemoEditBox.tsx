import React, {useState, useEffect} from "react";
import InputText from "../../../atoms/forms/inputText/InputText";
import {getMemos_GetMemos_memos} from "../../../types/api";
import Button from "../../../atoms/button/Button";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import {LANG} from "../../../hooks/hook";
interface Iprops {
  memo: getMemos_GetMemos_memos;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreate: (memo: getMemos_GetMemos_memos) => void;
  handleUpdate: (memo: getMemos_GetMemos_memos) => void;
  add?: boolean;
}

const MemoEditBox: React.FC<Iprops> = ({
  memo,
  handleCreate,
  handleUpdate,
  add,
  setEditMode
}) => {
  const [enableAlert, setenableAlert] = useState(memo.enableAlert);
  const [memoText, SetMemoText] = useState(memo.text);

  return (
    <div style={{flex: 1}}>
      <InputText
        label={LANG("memo_content")}
        size="fullWidth"
        textarea
        autoHeight
        value={memoText}
        onChange={SetMemoText}
      />
      <div className="JDflex--vCenter JDflex--between">
        <span className="JDflex--vCenter">
          <span
            data-tip=""
            data-for="siginificantExplicateTooltip"
            className="JDstandard-space"
          >
            {LANG("noti_setting")}}
          </span>
          <CheckBox
            className="JDstandard-margin0"
            onChange={setenableAlert}
            checked={enableAlert}
          />
        </span>
        <Button
          thema="primary"
          size="small"
          label={LANG("completed")}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setEditMode(false);
            // 👿 assing or 새로운 모듈을 써보자
            memo.text = memoText;
            memo.enableAlert = enableAlert;
            if (add) {
              handleCreate(memo);
            } else {
              handleUpdate(memo);
            }
          }}
        />
      </div>
    </div>
  );
};
export default MemoEditBox;
