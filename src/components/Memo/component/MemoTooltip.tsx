import React from "react";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import { LANG } from "../../../hooks/hook";

interface Iprops {
  handleEditBtn: (id: string) => void;
  handleDeleteBtn: (id: string) => void;
}

const MemoTooltip: React.FC<Iprops> = ({ handleEditBtn, handleDeleteBtn }) => (
  <TooltipList
    id="memoTooltip"
    className="memoTooltip"
    getContent={(id: string) => (
      <ul>
        <li>
          <Button
            onClick={() => {
              handleEditBtn(id);
            }}
            label={LANG("modify")}
          />
        </li>
        <li>
          <Button
            onClick={() => {
              handleDeleteBtn(id);
            }}
            label={LANG("delete")}
          />
        </li>
      </ul>
    )}
  />
);

export default MemoTooltip;
