import React, {Fragment} from "react";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import {IContext} from "../../../pages/MiddleServerRouter";
import {IDailyAssigContext} from "../DailyAssig";
import {
  IDailyAssigUtils,
  IDailyAssigDataControl
} from "../../../pages/middleServer/assig/components/assigIntrerface";
import {getAllRoomTypeWithGuest_GetGuests_guests as IG} from "../../../types/api";
import {BookingStatus} from "../../../types/enum";

interface Iprops {
  context: IContext;
  dailyAssigUtils: IDailyAssigUtils;
  dailayAssigContext: IDailyAssigContext;
  dailyAssigDataControl: IDailyAssigDataControl;
  infoBtnCallBack: (guest: IG) => void;
  checkInBtnCallBack: (guest: IG) => void;
  deleteBtnCallBack: (guest: IG) => void;
}

const GuestTooltip: React.FC<Iprops> = ({
  infoBtnCallBack,
  deleteBtnCallBack,
  dailayAssigContext,
  checkInBtnCallBack
}) => {
  const {guestsData} = dailayAssigContext;

  return (
    <TooltipList
      unPadding
      getContent={(guestId: string) => {
        const targetGuest = guestsData.find(guest => guest._id === guestId);
        if (!targetGuest) return;
        const isProgressing =
          targetGuest.booking.status === BookingStatus.PROGRESSING;
        return (
          <ul className="tooltipList__ul">
            {!isProgressing && (
              <Fragment>
                <li>
                  <Button
                    onClick={() => {
                      checkInBtnCallBack(targetGuest);
                    }}
                    label={
                      targetGuest.booking.checkInInfo.isIn
                        ? "체크아웃"
                        : "체크인"
                    }
                  />
                </li>
                <li>
                  <Button
                    onClick={() => {
                      deleteBtnCallBack(targetGuest);
                    }}
                    label="삭제"
                  />
                </li>
              </Fragment>
            )}
            {/* TODO  색상표시 여기 */}
            <li>
              <Button
                onClick={() => {
                  infoBtnCallBack(targetGuest);
                }}
                label="정보보기"
              />
            </li>
          </ul>
        );
      }}
      id="guestTooltip"
      className="guestTooltip"
    />
  );
};

export default GuestTooltip;
