import React from "react";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import {getMemos_GetMemos_memos as Memo} from "../../../types/api";
import {LANG} from "../../../hooks/hook";

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
          label={LANG("modify")}
        />
      </li>
      <li>
        <Button
          onClick={() => {
            handleClickDelete(memo);
          }}
          label={LANG("delete")}
        />
      </li>
      <li>
        <Button
          onClick={() => {
            handleImportToogle(memo);
          }}
          label={!memo.enableAlert ? LANG("alarm") : LANG("turn_off_alarm")}
        />
      </li>
    </ul>
  </TooltipList>
);

export default MemoTooltip;
