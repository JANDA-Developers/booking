import React from "react";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {IUseModal} from "../../../../actions/hook";
import {Gender, BookingModalType, PricingType} from "../../../../types/enum";
import {
  GuestTypeAdd,
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  ICreateBookingInfo
} from "./assigIntrerface";
import {DEFAULT_ASSIG_GROUP} from "../../../../types/defaults";
import {isEmpty} from "../../../../utils/utils";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const MakeItemMenu: React.FC<IProps> = ({
  assigUtils: {genderToggleById, findGroupById, deleteItemById},
  assigHooks: {guestValue, bookingModal, makeMenuProps},
  assigContext: {groupData, isMobile}
}) => {
  const target = makeMenuProps.item;
  let targetGroup = DEFAULT_ASSIG_GROUP;
  if (!isEmpty(target.group)) {
    targetGroup = findGroupById(target.group);
  }

  return (
    <div className="assig__tooltips makeMenu tooltipList" id="makeMenu">
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

                if (!targetGroup) throw new Error("뀨");

                return {
                  group: targetGroup,
                  roomTypeName: targetGroup ? targetGroup.roomType.name : "",
                  roomTypeId: targetGroup ? targetGroup.roomTypeId : "",
                  gender: item.gender
                };
              });

              const modalParam: ICreateBookingInfo = {
                type: BookingModalType.CREATE_WITH_ASSIG,
                start: makeItems[0].start,
                end: makeItems[0].end,
                resvInfoes,
                assigInfo: makeItems
                  .map(item => {
                    const group = groupData.find(
                      group => group.id === item.group
                    );
                    return {
                      bedIndex: group!.bedIndex!,
                      roomId: group!.roomId,
                      gender: item.gender
                    };
                  })
                  .filter(group => group.bedIndex !== -1)
              };
              bookingModal.openModal(modalParam);
            }}
            mode="flat"
            color="white"
          />
        </li>
        {isMobile && targetGroup.pricingType === PricingType.DOMITORY && (
          <li>
            <Button
              onClick={() => genderToggleById(target.id)}
              label="성별 반전"
              mode="flat"
              color="white"
            />
          </li>
        )}
        <li>
          <Button
            label="삭제"
            onClick={() => deleteItemById(target.id)}
            mode="flat"
            color="white"
          />
        </li>
      </ul>
    </div>
  );
};

export default MakeItemMenu;
