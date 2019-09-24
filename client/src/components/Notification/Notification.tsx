import React, {Fragment, ReactNode} from "react";

import {MutationFn} from "react-apollo";
import TooltipList from "../../atoms/tooltipList/TooltipList";
import "./Notification.scss";
import {
  getNotifications_GetNotifications_notifications,
  confirmNotification,
  confirmNotificationVariables
} from "../../types/api";
import NotificationLi from "./component/notificationLi";
import {IContext} from "../../pages/MiddleServerRouter";
import Dot from "../../atoms/dot/dot";
import {NotificationLevel, WindowSize} from "../../types/enum";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import {ReactTooltip} from "../../atoms/tooltip/Tooltip";
import Preloader from "../../atoms/preloader/Preloader";
import JDmodal from "../../atoms/modal/Modal";
import {useModal} from "../../actions/hook";

interface IProps {
  context: IContext;
  notifications: getNotifications_GetNotifications_notifications[];
  confirmMutationMu: MutationFn<
    confirmNotification,
    confirmNotificationVariables
  >;
  icon: any;
  loading: boolean;
}

export const Notification: React.FC<IProps & WindowSizeProps> = ({
  confirmMutationMu,
  notifications,
  loading,
  context,
  icon,
  windowWidth
}) => {
  const isPhabletDown = windowWidth < WindowSize.PHABLET;
  const notiModalHook = useModal(false);

  const doConfirm = () => {
    confirmMutationMu({
      variables: {
        houseId: context.house._id,
        notiIds: notifications
          .filter(noti => !noti.isConfirm)
          .map(noti => noti._id)
      }
    });
  };

  ReactTooltip.rebuild();

  return (
    <div className="notification">
      <div
        data-tip
        data-delay-hide={0}
        data-for={isPhabletDown || "tooltip_notify"}
        data-event={isPhabletDown || "click"}
        data-place="bottom"
        className="notification__iconWrap"
        onClick={() => {
          if (isPhabletDown) notiModalHook.openModal();
        }}
      >
        {icon}
      </div>
      <TooltipList
        mode="custom"
        type="light"
        className="notification__tooltip"
        id="tooltip_notify"
        afterHide={() => {
          doConfirm();
        }}
      >
        <ul className="notification__tooltip_ul">
          {loading && (
            <li className="notiLi">
              <Preloader size="small" loading={loading} />
            </li>
          )}
          {notifications.length === 0 && !loading && (
            <li className="notiLi JDtextColor--placeHolder">
              현재 알림이 없습니다.
            </li>
          )}
          {notifications.map(notification => (
            <NotificationLi
              key={notification._id}
              notification={notification}
            />
          ))}
        </ul>
      </TooltipList>
      <JDmodal
        className="notification__notiModal"
        {...notiModalHook}
        onRequestClose={() => {
          doConfirm();
          notiModalHook.closeModal();
        }}
      >
        <ul className="notification__mpodal_ul">
          {loading && (
            <li className="notiLi">
              <Preloader size="small" loading={loading} />
            </li>
          )}
          {notifications.length === 0 && !loading && (
            <li className="notiLi JDtextColor--placeHolder">
              현재 알림이 없습니다.
            </li>
          )}
          {notifications.map(notification => (
            <NotificationLi
              key={notification._id}
              notification={notification}
            />
          ))}
        </ul>
      </JDmodal>
    </div>
  );
};

export default reactWindowSize(Notification);
