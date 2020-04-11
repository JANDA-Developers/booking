import React, { Fragment } from "react";
import TooltipList, {
  TooltipButtons
} from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import { IDailyAssigContext } from "../DailyAssig";
import {
  IDailyAssigUtils,
  IDailyAssigDataControl
} from "../../../pages/bookingHost/assig/components/assigIntrerface";
import { getGuests_GetGuests_guests as IG } from "../../../types/api";
import { BookingStatus } from "../../../types/enum";
import { LANG } from "../../../hooks/hook";

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
  const { guestsData } = dailayAssigContext;

  return (
    <TooltipList
      unPadding
      getContent={(guestId: string) => {
        const targetGuest = guestsData.find(guest => guest._id === guestId);
        if (!targetGuest) return;

        return (
          <TooltipButtons
            Buttons={[
              {
                onClick: () => {
                  infoBtnCallBack(targetGuest);
                },
                label: LANG("view_info")
              }
            ]}
          />
        );
      }}
      id="guestTooltip"
      className="guestTooltip"
    />
  );
};

export default GuestTooltip;
