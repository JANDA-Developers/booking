import React from "react";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import {getMemos_GetMemos_memos as Memo} from "../../../types/api";

interface Iprops {
  handleClickUpdate: (memo: Memo) => void;
  handleClickDelete: (memo: Memo) => void;
  handleImportToogle: (memo: Memo) => void;
  memo: Memo;
}

const MemoTooltip: React.FC<Iprops> = ({
  handleClickUpdate,
  handleClickDelete,
  handleImportToogle,
  memo
}) => (
  <TooltipList id={`memoTooltip${memo._id}`} className="memoTooltip">
    <ul>
      <li>
        <Button
          onClick={() => {
            handleClickUpdate(memo);
          }}
          label="수정"
        />
      </li>
      <li>
        <Button
          onClick={() => {
            handleClickDelete(memo);
          }}
          label="삭제"
        />
      </li>
      <li>
        <Button
          onClick={() => {
            handleImportToogle(memo);
          }}
          label={!memo.enableAlert ? "알람" : "알람해제"}
        />
      </li>
    </ul>
  </TooltipList>
);

export default MemoTooltip;
