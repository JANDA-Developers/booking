import React from "react";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {IAssigItem, IAssigGroup} from "../AssigTimelineWrap";
import $ from "jquery";
import {Gender, GuestTypeAdd} from "../../../../types/enum";
import {DEFAULT_ASSIGITEM} from "../../../../types/defaults";
import {roomGenderToGedner} from "./groupDataMenufacture";

export interface ICanvasMenuProps {
  start: number;
  end: number;
  groupId: string;
  group: IAssigGroup;
}

interface IProps {
  guestValue: IAssigItem[];
  setGuestValue: React.Dispatch<React.SetStateAction<IAssigItem[]>>;
  canvasMenuProps: ICanvasMenuProps;
  addBlock(time: number, groupId: string): void;
}

const CanvasMenu: React.FC<IProps> = ({
  canvasMenuProps,
  guestValue,
  setGuestValue,
  addBlock
}) => (
  <div className="assig__tooltips canvasTooltip tooltipList" id="canvasTooltip">
    <ul>
      <li>
        <Button
          label="예약생성"
          onClick={e => {
            e.stopPropagation();
            const stack = guestValue.filter(group => group.bookerId === "make")
              .length;
            guestValue.push({
              ...DEFAULT_ASSIGITEM,
              bookerId: "make",
              id: `make${canvasMenuProps.groupId}${
                canvasMenuProps.start
              }${stack}`,
              gender: roomGenderToGedner(
                canvasMenuProps.group.roomGender,
                canvasMenuProps.group.pricingType
              ),
              type: GuestTypeAdd.MAKE,
              start: canvasMenuProps.start,
              end: canvasMenuProps.end,
              group: canvasMenuProps.groupId
            });
            $("#canvasTooltip").removeClass("canvasTooltip--show");
            // make중에 시작위치가 안맞는거를 제외시킨다.
            setGuestValue([
              ...guestValue.filter(
                item =>
                  item.type !== GuestTypeAdd.MARK &&
                  (item.type !== GuestTypeAdd.MAKE ||
                    item.start === canvasMenuProps.start)
              )
            ]);
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
