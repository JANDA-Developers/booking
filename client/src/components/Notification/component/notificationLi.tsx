import React from "react";
import {getNotifications_GetNotifications_notifications} from "../../../types/api";
import {NotificationType, NotificationLevel} from "../../../types/enum";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import classNames from "classnames";
import JDbadge from "../../../atoms/badge/Badge";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import Tooltip from "../../../atoms/tooltip/Tooltip";
import moment from "moment";

interface IProps {
  notification: getNotifications_GetNotifications_notifications;
}

const NotificationLi: React.FC<IProps> = ({notification}) => {
  const classes = classNames("notiLi", undefined, {
    "notiLi--confirmed": notification.isConfirm
  });

  const SharedNoti = () => (
    <span>
      <span className="notiLi__badgeWrap">
        {notification.notiLevel === NotificationLevel.WARN && (
          <JDbadge thema="error">주의</JDbadge>
        )}
        {!notification.isConfirm && <JDbadge thema="new">새로운</JDbadge>}
      </span>
      <h6 className="notiLi__title">{notification.title}</h6>
      <span className="notiLi__msg">{notification.msg}</span>
    </span>
  );

  const sharedSymbolProp = {
    className: "notiLi__symbol",
    size: IconSize.MEDEIUM_SMALL
  };

  return (
    <li
      onClick={() => {}}
      data-tip={moment(notification.createdAt).format("MM월 DD일")}
      data-for="notiCreateDateToolTip"
      className="notiLi"
    >
      {(() => {
        switch (notification.notiType) {
          case NotificationType.TO_ALL:
            return (
              <div className="notiLi__contents">
                <CircleIcon
                  thema="border"
                  className="notiLi__symbolWrap"
                  size={sharedSymbolProp.size}
                >
                  <JDIcon color="primary" {...sharedSymbolProp} icon="notify" />
                </CircleIcon>
                <SharedNoti />
              </div>
            );
          case NotificationType.ELSE:
            return (
              <div className="notiLi__contents">
                <CircleIcon
                  className="notiLi__symbolWrap"
                  thema="border"
                  size={sharedSymbolProp.size}
                >
                  <JDIcon {...sharedSymbolProp} icon="notify" />
                </CircleIcon>
                <SharedNoti />
              </div>
            );

          default:
            return <div>as</div>;
        }
      })()}
      <Tooltip type="dark" effect="solid" id="notiCreateDateToolTip" />
    </li>
  );
};

export default NotificationLi;
