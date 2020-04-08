import React from "react";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks
} from "../assigIntrerface";
import { makeBooking_MakeBooking } from "../../../../../types/api";
import { LANG } from "../../../../../hooks/hook";
import { ToastContainer, toast } from "react-toastify";
import { TooltipButtons } from "../../../../../atoms/tooltipList/TooltipList";

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
    makeBookingModalWithMark,
    allTooltipsHide,
    markValidation
  }
}) => {
  const { groupIds, end, start } = getInfoesFromMarks();

  const onMakeBookingStart = () => {
    changeMarkToGhost();
  };

  const bookingCallBack = async (result: "error" | makeBooking_MakeBooking) => {
    if (result === "error") return;

    hilightGuestBlock({ bookingId: result.booking?._id });
  };

  const validater = () => {
    if (!markValidation()) {
      toast.error(LANG("drag_failed_msg"));
      return false;
    } else {
      return true;
    }
  };

  const createBtnHandler = () => {
    if (validater())
      makeBookingModalWithMark({
        makeBookingCallBack: bookingCallBack,
        onMakeBookingStart
      });
  };

  return (
    <div className="assig__tooltips canvasMenu tooltipList" id="canvasMenu">
      <TooltipButtons
        Buttons={[
          {
            label: LANG("create_booking"),
            onClick: (e: any) => {
              allTooltipsHide();
              e.stopPropagation();
              createBtnHandler();
            }
          },
          {
            onClick: () => {
              allTooltipsHide();
              if (validater()) {
                addBlock(start, end, groupIds);
              }
            },
            label: LANG("block_room")
          }
        ]}
      />
    </div>
  );
};

export default CanvasMenuTooltip;
