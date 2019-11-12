import React from "react";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  IStartBookingCallBack
} from "../../assigIntrerface";
import {Gender} from "../../../../../types/enum";
import {startBooking_StartBooking} from "../../../../../types/api";
import {LANG} from "../../../../../hooks/hook";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const CanvasMenuTooltip: React.FC<IProps> = ({
  assigHooks: {},
  assigUtils: {
    hilightGuestBlock,
    changeMarkToGhost,
    addBlock,
    getInfoesFromMarks,
    startBookingModalWithMark,
    allTooltipsHide
  }
}) => {
  const {groupIds, end, start} = getInfoesFromMarks();

  const bookingCallBack = async (
    result: "error" | startBooking_StartBooking
  ) => {
    if (result === "error") return;
    if (!result.bookingTransaction) return;
    if (!result.bookingTransaction.booking) return;
    await changeMarkToGhost();

    hilightGuestBlock({bookingId: result.bookingTransaction.booking._id});
  };

  const createBtnHandler = () => {
    startBookingModalWithMark(bookingCallBack);
  };

  return (
    <div className="assig__tooltips canvasMenu tooltipList" id="canvasMenu">
      <ul>
        <li>
          <Button
            label={LANG("create_booking")}
            onClick={e => {
              allTooltipsHide();
              e.stopPropagation();
              createBtnHandler();
            }}
          />
        </li>
        <li>
          <Button
            onClick={() => {
              allTooltipsHide();
              addBlock(start, end, groupIds);
            }}
            label={LANG("block_room")}
          />
        </li>
      </ul>
    </div>
  );
};

export default CanvasMenuTooltip;
