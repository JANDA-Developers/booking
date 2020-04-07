import React from "react";
import TooltipList, {
  TooltipButtons,
} from "../../../atoms/tooltipList/TooltipList";
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
      <TooltipButtons
        Buttons={[
          {
            onClick: () => {
              handleEditBtn(id);
            },
            label: LANG("modify"),
          },
          {
            onClick: () => {
              handleDeleteBtn(id);
            },
            label: LANG("delete"),
          },
        ]}
      />
    )}
  />
);

export default MemoTooltip;
