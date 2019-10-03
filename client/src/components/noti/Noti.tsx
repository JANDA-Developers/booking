import React, {Fragment, ReactNode} from "react";

import {MutationFn} from "react-apollo";
import TooltipList from "../../atoms/tooltipList/TooltipList";
import "./Noti.scss";
import {
  getNotis_GetNotis_notis,
  confirmNoti,
  confirmNotiVariables
} from "../../types/api";
import NotiLi from "./component/NotiLi";
import {IContext} from "../../pages/MiddleServerRouter";
import {WindowSize} from "../../types/enum";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import {ReactTooltip} from "../../atoms/tooltip/Tooltip";
import Preloader from "../../atoms/preloader/Preloader";
import JDmodal from "../../atoms/modal/Modal";
import {useModal} from "../../hooks/hook";

interface IProps {
  context: IContext;
  notis: getNotis_GetNotis_notis[];
  confirmMutationMu: MutationFn<confirmNoti, confirmNotiVariables>;
  icon: any;
  loading: boolean;
}

export const Noti: React.FC<IProps & WindowSizeProps> = ({
  confirmMutationMu,
  notis,
  loading,
  context,
  icon,
  windowWidth
}) => {
  const isPhabletDown = windowWidth < WindowSize.PHABLET;
  const NotiModalHook = useModal(false);

  const doConfirm = () => {
    confirmMutationMu({
      variables: {
        houseId: context.house._id,
        notiIds: notis.filter(noti => !noti.isConfirm).map(noti => noti._id)
      }
    });
  };

  ReactTooltip.rebuild();

  return (
    <div className="noti">
      <div
        data-tip
        data-delay-hide={0}
        data-for={isPhabletDown || "tooltip_Notify"}
        data-event={isPhabletDown || "click"}
        data-place="bottom"
        className="noti__iconWrap"
        onClick={() => {
          if (isPhabletDown) NotiModalHook.openModal();
        }}
      >
        {icon}
      </div>
      <TooltipList
        mode="custom"
        type="light"
        className="noti__tooltip"
        id="tooltip_Notify"
        afterHide={() => {
          doConfirm();
        }}
      >
        <ul className="noti__tooltip_ul">
          {loading && (
            <li className="notiLi">
              <Preloader size="small" loading={loading} />
            </li>
          )}
          {notis.length === 0 && !loading && (
            <li className="notiLi JDtextColor--placeHolder">
              현재 알림이 없습니다.
            </li>
          )}
          {notis.map(noti => (
            <NotiLi key={noti._id} noti={noti} />
          ))}
        </ul>
      </TooltipList>
      <JDmodal
        className="noti__notiModal"
        {...NotiModalHook}
        onRequestClose={() => {
          doConfirm();
          NotiModalHook.closeModal();
        }}
      >
        <ul className="noti__mpodal_ul">
          {loading && (
            <li className="notiLi">
              <Preloader size="small" loading={loading} />
            </li>
          )}
          {notis.length === 0 && !loading && (
            <li className="notiLi JDtextColor--placeHolder">
              현재 알림이 없습니다.
            </li>
          )}
          {notis.map(noti => (
            <NotiLi key={noti._id} noti={noti} />
          ))}
        </ul>
      </JDmodal>
    </div>
  );
};

const ForWardNoti = React.forwardRef((props: any, ref: any) => (
  <div ref={ref}>
    <Noti {...props} />
  </div>
));

export default reactWindowSize(ForWardNoti);
