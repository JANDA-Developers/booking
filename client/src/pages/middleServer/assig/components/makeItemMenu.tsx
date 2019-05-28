import React from "react";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {IAssigItem, IAssigGroup} from "../AssigTimelineWrap";
import $ from "jquery";
import {ICanvasMenuProps} from "./canvasMenu";
import {IUseModal} from "../../../../actions/hook";
import {Gender, BookerModalType, GuestTypeAdd} from "../../../../types/enum";

interface IProps {
  bookerModalHook: IUseModal;
  guestValue: IAssigItem[];
  groupData: IAssigGroup[];
}

export interface IAssigInfo {
  bedIndex: number;
  roomId: string;
  gender: Gender | null;
}
// ⭐️ 배정달력에서 예약 생성시사용
export interface ICreateBookerInfo {
  type: BookerModalType.CREATE | BookerModalType.CREATE_WITH_ASSIG;
  start: number;
  end: number;
  resvInfoes: {
    roomTypeName: string;
    roomTypeId: string;
    gender: Gender | null;
  }[];
  assigInfo: IAssigInfo[];
}

const MakeItemMenu: React.FC<IProps> = ({
  bookerModalHook,
  guestValue,
  groupData
}) => (
  <div className="assig__tooltips makeTooltip tooltipList" id="makeTooltip">
    <ul>
      <li>
        <Button
          label="생성"
          onClick={e => {
            e.stopPropagation();
            const makeItems = guestValue.filter(
              guest => guest.type === GuestTypeAdd.MAKE
            );
            const resvInfoes = makeItems.map(item => {
              const targetGroup = groupData.find(
                group => group.id === item.group
              );

              return {
                roomTypeName: targetGroup ? targetGroup.roomType.name : "",
                roomTypeId: targetGroup ? targetGroup.roomTypeId : "",
                gender: item.gender
              };
            });

            const modalParam: ICreateBookerInfo = {
              type: BookerModalType.CREATE_WITH_ASSIG,
              start: makeItems[0].start,
              end: makeItems[0].end,
              resvInfoes,
              assigInfo: makeItems
                .map(item => {
                  const group = groupData.find(
                    group => group.id === item.group
                  );
                  if (group) {
                    return {
                      bedIndex: group.bedIndex,
                      roomId: group.roomId,
                      gender: item.gender
                    };
                  } else {
                    // 아래코드는 타입스크립트 때문
                    return {
                      bedIndex: -1,
                      roomId: "",
                      gender: Gender.FEMALE
                    };
                  }
                })
                .filter(group => group.bedIndex !== -1)
            };
            bookerModalHook.openModal(modalParam);
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
