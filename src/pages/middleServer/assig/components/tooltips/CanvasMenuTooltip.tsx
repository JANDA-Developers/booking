import React, {Fragment} from "react";
import TooltipList from "../../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../../atoms/button/Button";
import $ from "jquery";
import {DEFAUT_ASSIG_ITEM} from "../../../../../types/defaults";
import {roomGenderToGedner} from "../groupDataMenufacture";
import {
  GuestTypeAdd,
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks
} from "../assigIntrerface";
import {s4} from "../../../../../utils/utils";
import {Gender, PricingType} from "../../../../../types/enum";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const CanvasMenuTooltip: React.FC<IProps> = ({
  assigHooks: {guestValue, setCreateMenuProps, canvasMenuProps, setGuestValue},
  assigUtils: {
    addBlock,
    getGroupById,
    resizeLinkedItems,
    getItemById,
    allTooltipsHide,
    createCreateItem
  }
}) => {
  if (!canvasMenuProps.groupId || canvasMenuProps.groupId === "noneGroup")
    return <div />;
  const targetPricingType = getGroupById(canvasMenuProps.groupId).roomType
    .pricingType;

  const createBtnHandler = (gender?: Gender) => {
    createCreateItem(canvasMenuProps, gender);
  };

  return (
    <div className="assig__tooltips canvasMenu tooltipList" id="canvasMenu">
      <ul>
        {targetPricingType === PricingType.ROOM && (
          <li>
            <Button
              label="예약생성"
              onClick={e => {
                e.stopPropagation();
                createBtnHandler();
              }}
            />
          </li>
        )}
        {targetPricingType === PricingType.DOMITORY && (
          <Fragment>
            <li>
              <Button
                label="예약생성(남)"
                onClick={e => {
                  e.stopPropagation();
                  createBtnHandler(Gender.MALE);
                }}
              />
            </li>
            <li>
              <Button
                label="예약생성(여)"
                onClick={e => {
                  e.stopPropagation();
                  createBtnHandler(Gender.FEMALE);
                }}
              />
            </li>
          </Fragment>
        )}
        <li>
          <Button
            onClick={() => {
              addBlock(canvasMenuProps.start, canvasMenuProps.groupId);
            }}
            label="방막기"
          />
        </li>
      </ul>
    </div>
  );
};

export default CanvasMenuTooltip;
