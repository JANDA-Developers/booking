import React from "react";
import {Fragment} from "react";
import JDIcon, {IconSize} from "../../../../../atoms/icons/Icons";
import ConfirmBadgeWrap from "../../../../../components/confirmBadge/ConfirmBadgeWrap";
import {
  IAssigItem,
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks
} from "../assigIntrerface";
import Gender from "./gender";
import {getAssigUtils} from "../assigUtils";
import {
  DEFAULT_ADDITION_BLOCKOP,
  DEFAULT_HOUSE_CONFIG
} from "../../../../../types/defaults";

interface IProps {
  item: IAssigItem;
  itemContext: any;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
  assigHooks: IAssigTimelineHooks;
}

const guestBlock: React.FC<IProps> = ({
  assigContext,
  assigUtils: {bookingCheckedNew, getGuestsByBookingId},
  item,
  itemContext,
  assigHooks: {setGuestValue}
}) => {
  const bookingConfig = assigContext.houseConfig.bookingConfig;
  const newBookingMark = bookingConfig
    ? bookingConfig.newBookingMark
    : DEFAULT_HOUSE_CONFIG.bookingConfig.newBookingMark;
  const bookingMarkEnable = newBookingMark && newBookingMark.enable;

  return (
    <Fragment>
      <div
        className="rct-item-content assigItem__content myClasses"
        style={{
          maxHeight: `${itemContext.dimensions.height}`
        }}
      >
        {bookingMarkEnable && (
          <span className="assigItem__badgeWrap">
            <ConfirmBadgeWrap
              show={item.showNewBadge}
              whenClickBadge={bookingCheckedNew}
              badgeSize="tiny"
              bookingId={item.bookingId}
            />
          </span>
        )}
        <span className="assigItem__titleWrap">
          <Gender gender={item.gender} />
          <span
            style={{
              color: item.blockOption.color ? "white" : undefined,
              backgroundColor: item.blockOption.color || undefined
            }}
            className="assigItem__title assigItem__title--guest"
          >
            {item.name}
          </span>
        </span>
      </div>
      <span
        data-tip={item.id}
        data-place="top"
        data-for="itemTooltip"
        data-event="click"
        id={`assigItem__configIconWrapId${item.id}`}
        className="assigItem__configIconWrap"
      >
        <JDIcon icon="dotMenuVertical" size={IconSize.MEDEIUM_SMALL} />
      </span>
    </Fragment>
  );
};

export default guestBlock;
