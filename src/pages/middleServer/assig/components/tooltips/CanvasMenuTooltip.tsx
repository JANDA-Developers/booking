import React from "react";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks
} from "../assigIntrerface";
import {Gender} from "../../../../../types/enum";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const CanvasMenuTooltip: React.FC<IProps> = ({
  assigHooks: {canvasMenuProps},
  assigUtils: {addBlock, createCreateItem}
}) => {
  if (!canvasMenuProps.groupIds) return <div />;
  const {groupIds, end, start} = canvasMenuProps;

  const createBtnHandler = (gender?: Gender) => {
    createCreateItem(canvasMenuProps, gender);
  };

  return (
    <div className="assig__tooltips canvasMenu tooltipList" id="canvasMenu">
      <ul>
        <li>
          <Button
            label="예약생성"
            onClick={e => {
              e.stopPropagation();
              createBtnHandler();
            }}
          />
        </li>
        <li>
          <Button
            onClick={() => {
              addBlock(start, end, groupIds);
            }}
            label="방막기"
          />
        </li>
      </ul>
    </div>
  );
};

export default CanvasMenuTooltip;
