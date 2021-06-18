import React from "react";
import { getNotis_GetNotis_notis } from "../../../types/api";
import { NotiType, NotiLevel, IconSize } from "../../../types/enum";
import JDIcon from "../../../atoms/icons/Icons";
import classNames from "classnames";
import JDbadge from "../../../atoms/badge/Badge";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import Tooltip from "../../../atoms/tooltip/Tooltip";
import dayjs from "dayjs";
import { LANG } from "../../../hooks/hook";

interface IProps {
  noti: getNotis_GetNotis_notis;
}

const NotiLi: React.FC<IProps> = ({ noti }) => {
  const classes = classNames("notiLi", undefined, {
    "notiLi--confirmed": noti.isConfirm
  });

  const SharedNoti = () => (
    <span>
      <div>
        <h6 className="notiLi__title">
          <span className="notiLi__title_txt">{noti.title}</span>
          <div className="notiLi__badgeWrap">
            {noti.notiLevel === NotiLevel.WARN && (
              <JDbadge thema="error">{LANG("caution")}</JDbadge>
            )}
            {!noti.isConfirm && <JDbadge thema="new">{LANG("new")}</JDbadge>}
          </div>
        </h6>
      </div>
      <span className="notiLi__msg">{noti.msg}</span>
    </span>
  );

  const sharedSymbolProp: {
    className: string;
    size: IconSize;
  } = {
    className: "notiLi__symbol",
    size: "small"
  };

  return (
    <li
      onClick={() => {}}
      data-tip={dayjs(noti.createdAt).format(
        `MM${LANG("month")} DD${LANG("date")}`
      )}
      data-for="notiCreateDateToolTip"
      className="notiLi"
    >
      {(() => {
        switch (noti.notiType) {
          case NotiType.TO_ALL:
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
          case NotiType.ELSE:
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
          // 노티가 익스파이어 될떄
          default:
            NotiType.PRODUCT_EXPIRE;
            return (
              <div className="notiLi__contents">
                <CircleIcon
                  className="notiLi__symbolWrap"
                  thema="border"
                  size={sharedSymbolProp.size}
                >
                  <JDIcon color="error" {...sharedSymbolProp} icon="notify" />
                </CircleIcon>
                <SharedNoti />
              </div>
            );
        }
      })()}
      <Tooltip type="dark" effect="solid" id="NotiCreateDateToolTip" />
    </li>
  );
};

export default NotiLi;
