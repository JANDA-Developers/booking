import React from "react";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineHooks,
  IAssigTimelineUtils,
  IAssigTimelineContext,
} from "../assigIntrerface";
import { LANG } from "../../../../../hooks/hook";
import { TooltipButtons } from "../../../../../atoms/tooltipList/TooltipList";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const BlockItemTooltip: React.FC<IProps> = ({
  assigUtils: { deleteItemById, allTooltipsHide },
  assigHooks: { blockMenuProps },
}) => (
  <div className="assig__tooltips blockMenu tooltipList" id="blockMenu">
    <TooltipButtons
      Buttons={[
        {
          onClick: () => {
            deleteItemById(blockMenuProps.item.id);
          },
          label: LANG("delete"),
        },
        {
          onClick: () => {
            allTooltipsHide();
          },
          label: LANG("cancel"),
        },
      ]}
    />
  </div>
);

export default BlockItemTooltip;
