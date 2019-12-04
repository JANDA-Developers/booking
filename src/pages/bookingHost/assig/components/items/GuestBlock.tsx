import React from "react";
import { Fragment } from "react";
import JDIcon from "../../../../../atoms/icons/Icons";
import ConfirmBadgeWrap from "../../../../../components/confirmBadge/ConfirmBadgeWrap";
import {
  IAssigItem,
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks
} from "../assigIntrerface";
import { DEFAULT_HOUSE_CONFIG } from "../../../../../types/defaults";
import { BookingStatus } from "../../../../../types/enum";
import Gender from "./Gender";
import StatusMarker from "./StatusMarker";

interface IProps {
  item: IAssigItem;
  itemContext: any;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
  assigHooks: IAssigTimelineHooks;
}

const guestBlock: React.FC<IProps> = ({
  assigContext,
  assigUtils: { bookingCheckedNew, getGuestsByBookingId },
  item,
  itemContext,
  assigHooks: { setGuestValue }
}) => {
  const bookingConfig = assigContext.houseConfig.bookingConfig;
  const newBookingMark = bookingConfig
    ? bookingConfig.newBookingMark
    : DEFAULT_HOUSE_CONFIG.bookingConfig.newBookingMark;
  const bookingMarkEnable = newBookingMark && newBookingMark.enable;

  const {
    blockOption,
    status,
    bookingId,
    gender,
    id,
    showNewBadge,
    memo,
    isUnpaid
  } = item;

  const isReady = status === BookingStatus.PROGRESSING;

  return (
    <Fragment>
      <div
        data-tip={isReady && true}
        data-for={isReady && "tooltipReadyBlock"}
        className="rct-item-content assigItem__content"
        style={{
          maxHeight: `${itemContext.dimensions.height}`
        }}
      >
        {bookingMarkEnable && (
          <span className="assigItem__badgeWrap">
            <ConfirmBadgeWrap
              show={showNewBadge}
              whenClickBadge={bookingCheckedNew}
              badgeSize="tiny"
              bookingId={bookingId}
            />
          </span>
        )}
        <span className="assigItem__titleWrap">
          <Gender gender={gender} />
          <span
            style={{
              color: blockOption.color ? "white" : undefined,
              backgroundColor: blockOption.color || undefined
            }}
            className="assigItem__title assigItem__title--guest"
          >
            <StatusMarker isUnpaid={isUnpaid} memo={memo} />
            {item.name}
          </span>
        </span>
      </div>
      <span
        data-tip={id}
        data-place="top"
        data-for="itemTooltip"
        data-event="click"
        id={`assigItem__configIconWrapId${id}`}
        className="assigItem__configIconWrap"
      >
        <JDIcon icon="dotMenuVertical" size={"small"} />
      </span>
    </Fragment>
  );
};

export default guestBlock;
