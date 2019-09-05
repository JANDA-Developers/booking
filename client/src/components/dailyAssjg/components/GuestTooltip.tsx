import React from "react";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import {ReactTooltip} from "../../../atoms/tooltip/Tooltip";
import {IContext} from "../../../pages/MiddleServerRouter";
import {IDailyAssigProp, IDailyAssigDataControl} from "../DailyAssigWrap";
import {IDailyAssigContext} from "../DailyAssigNew";

interface Iprops {
  context: IContext;
  dailayAssigContext: IDailyAssigContext;
  dailyAssigDataControl: IDailyAssigDataControl;
}

const GuestTooltip: React.FC<Iprops> = ({
  context,
  dailyAssigDataControl,
  dailayAssigContext
}) => {
  const {guestsData, bookingModalHook} = dailayAssigContext;
  return (
    <TooltipList
      unPadding
      getContent={(guestId: string) => {
        const targetGuest = guestsData.find(guest => guest._id === guestId);
        if (!targetGuest) return;
        return (
          <ul className="tooltipList__ul">
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  //   TODO  do check IN/Out toogle
                }}
                label={
                  targetGuest.booking.checkInInfo.isIn ? "체크아웃" : "체크인"
                }
              />
            </li>
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  //  TODO  do Delete Here
                }}
                label="삭제"
              />
            </li>
            {/* TODO  색상표시 여기 */}
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  bookingModalHook.openModal({
                    bookingId: targetGuest.booking._id
                  });
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
