import React, {Fragment} from "react";
import TooltipList from "../../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../../atoms/button/Button";
import $ from "jquery";
import {DEFAULT_ASSIG_ITEM} from "../../../../../types/defaults";
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
  assigHooks: {guestValue, setMakeMenuProps, canvasMenuProps, setGuestValue},
  assigUtils: {
    addBlock,
    getGroupById,
    resizeLinkedItems,
    getItemById,
    allTooltipsHide
  }
}) => {
  if (!canvasMenuProps.groupId || canvasMenuProps.groupId === "noneGroup")
    return <div />;
  const targetPricingType = getGroupById(canvasMenuProps.groupId).roomType
    .pricingType;

  const makeMakeItem = (gender?: Gender) => {
    allTooltipsHide();
    const linkedItems = guestValue.filter(
      item =>
        item.type === GuestTypeAdd.MAKE &&
        item.start <= canvasMenuProps.start &&
        item.end >= canvasMenuProps.end
    );

    const getTime = (flag: "start" | "end") => {
      if (!linkedItems[0]) return canvasMenuProps[flag];
      if (
        linkedItems[0].start <= canvasMenuProps.start &&
        linkedItems[0].end >= canvasMenuProps.end
      )
        return linkedItems[0][flag];
      return canvasMenuProps[flag];
    };

    const newItem = {
      ...DEFAULT_ASSIG_ITEM,
      bookingId: "make",
      id: `make${canvasMenuProps.groupId}${canvasMenuProps.start}${s4()}`,
      gender:
        gender ||
        roomGenderToGedner(
          canvasMenuProps.group.roomGender,
          canvasMenuProps.group.pricingType
        ),
      type: GuestTypeAdd.MAKE,
      start: getTime("start"),
      end: getTime("end"),
      group: canvasMenuProps.groupId
    };

    linkedItems.push(newItem);

    $("#canvasMenu").removeClass("canvasMenu--show");

    setGuestValue([
      ...guestValue.filter(
        item =>
          item.type !== GuestTypeAdd.MAKE && item.type !== GuestTypeAdd.MARK
      ),
      ...linkedItems
    ]);

    setMakeMenuProps({item: newItem});
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
                makeMakeItem();
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
                  makeMakeItem(Gender.MALE);
                }}
              />
            </li>
            <li>
              <Button
                label="예약생성(여)"
                onClick={e => {
                  e.stopPropagation();
                  makeMakeItem(Gender.FEMALE);
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
