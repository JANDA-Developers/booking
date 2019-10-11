import React from "react";
import Button from "../../../../../atoms/button/Button";
import {PricingType} from "../../../../../types/api";
import {
  IAssigTimelineHooks,
  IAssigTimelineUtils,
  IAssigTimelineContext
} from "../assigIntrerface";

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
          label="삭제"
        />
      </li>
      <li>
        <Button
          onClick={() => {
            allTooltipsHide();
          }}
          label="취소"
        />
      </li>
    </ul>
  </div>
);

export default BlockItemTooltip;
