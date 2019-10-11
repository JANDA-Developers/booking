import React from "react";
import {getNotis_GetNotis_notis} from "../../../types/api";
import {NotiType, NotiLevel} from "../../../types/enum";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import classNames from "classnames";
import JDbadge from "../../../atoms/badge/Badge";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import Tooltip from "../../../atoms/tooltip/Tooltip";
import moment from "moment";

interface IProps {
  noti: getNotis_GetNotis_notis;
}

const NotiLi: React.FC<IProps> = ({noti}) => {
  const classes = classNames("notiLi", undefined, {
    "notiLi--confirmed": noti.isConfirm
  });

  const SharedNoti = () => (
    <span>
      <span className="notiLi__badgeWrap">
        {noti.notiLevel === NotiLevel.WARN && (
          <JDbadge thema="error">주의</JDbadge>
        )}
        {!noti.isConfirm && <JDbadge thema="new">새로운</JDbadge>}
      </span>
      <h6 className="notiLi__title">{noti.title}</h6>
      <span className="notiLi__msg">{noti.msg}</span>
    </span>
  );

  const sharedSymbolProp = {
    className: "notiLi__symbol",
    size: IconSize.MEDEIUM_SMALL
  };

  return (
    <li
      onClick={() => {}}
      data-tip={moment(noti.createdAt).format("MM월 DD일")}
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

          default:
            return <div>as</div>;
        }
      })()}
      <Tooltip type="dark" effect="solid" id="NotiCreateDateToolTip" />
    </li>
  );
};

export default NotiLi;
