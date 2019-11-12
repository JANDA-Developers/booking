import React from "react";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineHooks,
  IAssigTimelineUtils,
  IAssigTimelineContext
} from "../../assigIntrerface";
import {LANG} from "../../../../../hooks/hook";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const BlockItemTooltip: React.FC<IProps> = ({
  assigUtils: {deleteItemById, allTooltipsHide},
  assigHooks: {blockMenuProps}
}) => (
  <div className="assig__tooltips blockMenu tooltipList" id="blockMenu">
    <ul>
      <li>
        <Button
          onClick={() => {
            deleteItemById(blockMenuProps.item.id);
          }}
          label={LANG("delete")}
        />
      </li>
      <li>
        <Button
          onClick={() => {
            allTooltipsHide();
          }}
          label={LANG("cancel")}
        />
      </li>
    </ul>
  </div>
);

export default BlockItemTooltip;
