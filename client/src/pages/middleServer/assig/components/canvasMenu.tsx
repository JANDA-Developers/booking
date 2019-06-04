import React from "react";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import $ from "jquery";
import {DEFAULT_ASSIG_ITEM} from "../../../../types/defaults";
import {roomGenderToGedner} from "./groupDataMenufacture";
import {
  GuestTypeAdd,
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks
} from "./assigIntrerface";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const CanvasMenu: React.FC<IProps> = ({
  assigHooks: {guestValue, setMakeMenuProps, canvasMenuProps, setGuestValue},
  assigUtils: {addBlock, resizeLinkedItems, findItemById}
}) => (
  <div className="assig__tooltips canvasMenu tooltipList" id="canvasMenu">
    <ul>
      <li>
        <Button
          label="예약생성"
          onClick={e => {
            e.stopPropagation();
            const linkedItems = guestValue.filter(
              group => group.bookingId === "make"
            );
            const stack = linkedItems.length;

            const newItem = {
              ...DEFAULT_ASSIG_ITEM,
              bookingId: "make",
              id: `make${canvasMenuProps.groupId}${
                canvasMenuProps.start
              }${stack}`,
              gender: roomGenderToGedner(
                canvasMenuProps.group.roomGender,
                canvasMenuProps.group.pricingType
              ),
              type: GuestTypeAdd.MAKE,
              start: canvasMenuProps.start,
              end: linkedItems[0] ? linkedItems[0].end : canvasMenuProps.end,
              group: canvasMenuProps.groupId
            };

            guestValue.push(newItem);

            $("#canvasMenu").removeClass("canvasMenu--show");
            // make중에 시작위치가 안맞는거를 제외시킨다.
            setGuestValue([
              ...guestValue.filter(
                item =>
                  item.type !== GuestTypeAdd.MARK &&
                  (item.type !== GuestTypeAdd.MAKE ||
                    item.start === canvasMenuProps.start)
              )
            ]);
            setMakeMenuProps({item: newItem});
          }}
          mode="flat"
          color="white"
        />
      </li>
      <li>
        <Button
          onClick={() => {
            addBlock(canvasMenuProps.start, canvasMenuProps.groupId);
          }}
          label="방막기"
          mode="flat"
          color="white"
        />
      </li>
    </ul>
  </div>
);

export default CanvasMenu;
