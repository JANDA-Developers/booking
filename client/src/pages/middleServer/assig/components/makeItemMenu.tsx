import React from "react";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {IAssigItem, defaultItemProps, IAssigGroup} from "../AssigTimelineWrap";
import $ from "jquery";
import {ICanvasMenuProps} from "./canvasMenu";
import {IUseModal} from "../../../../actions/hook";
import {Gender} from "../../../../types/enum";

interface IProps {
  bookerModalHook: IUseModal;
  guestValue: IAssigItem[];
  groupData: IAssigGroup[];
}

const MakeItemMenu: React.FC<IProps> = ({
  bookerModalHook,
  guestValue,
  groupData
}) => (
  <div className="makeTooltip tooltipList" id="makeTooltip">
    <ul>
      <li>
        <Button
          label="생성"
          onClick={e => {
            e.stopPropagation();
            const makeItems = guestValue.filter(guest => guest.type === "make");
            const roomTypes = makeItems.map(item => item.roomTypeId);
            const resvInfoes = roomTypes.map(roomTypeId => ({
              roomTypeId: roomTypeId,
              male: makeItems.filter(item => item.gender === Gender.MALE)
                .length,
              female: makeItems.filter(item => item.gender === Gender.FEMALE)
                .length,
              count: makeItems.filter(item => !item.gender).length
            }));
            bookerModalHook.openModal({
              type: "make",
              makeInfo: {
                start: makeItems[0].start,
                end: makeItems[0].end,
                resvInfoes
              },
              assigInfo: makeItems.map(item => {
                const group = groupData.find(group => group.id === item.group);
                if (group) {
                  return {
                    bedIndex: group.bedIndex,
                    roomId: group.roomId,
                    gender: item.gender
                  };
                }
              })
            });
          }}
          mode="flat"
          color="white"
        />
      </li>
      <li>
        <Button label="취소" mode="flat" color="white" />
      </li>
    </ul>
  </div>
);

export default MakeItemMenu;
