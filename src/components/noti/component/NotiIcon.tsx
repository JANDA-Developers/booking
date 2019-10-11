import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_MEMO, GET_NOTI} from "../../../queries";
import {
  getMemos,
  getMemosVariables,
  getNotis,
  getNotisVariables
} from "../../../types/api";
import {queryDataFormater, s4} from "../../../utils/utils";
import JDIcon, {IconConifgProps} from "../../../atoms/icons/Icons";
import {IContext} from "../../../pages/MiddleServerRouter";
import {MemoType, NotiLevel} from "../../../types/enum";
import client from "../../../apolloClient";
import JDbadge from "../../../atoms/badge/Badge";

interface Iprops extends IconConifgProps {
  context: IContext;
}

const NotiIcon: React.FC<Iprops> = ({context, ...props}) => {
  const {house} = context;
  const {data} = useQuery<getNotis, getNotisVariables>(GET_NOTI, {
    client,
    variables: {houseId: house._id, count: 20}
  });

  const notis = queryDataFormater(data, "GetNotis", "notis", []) || [];

  let countNew = 0;
  let countWarn = 0;

  notis.forEach(noti => {
    if (!noti.isConfirm) {
      if (noti.notiLevel === NotiLevel.NORMAL) countNew++;
      if (noti.notiLevel === NotiLevel.WARN) countWarn++;
    }
  });

  const badges = (() => {
    let tempbadges = [];
    if (countNew !== 0 && countWarn === 0)
      tempbadges.push(<JDbadge key={`badgeNotiNew`} thema="new" />);
    if (countWarn !== 0)
      tempbadges.push(<JDbadge key={`badgeNotiWarn`} thema="error" />);
    return tempbadges;
  })();

  return <JDIcon icon="notify" {...props} dots={badges} />;
};

export default NotiIcon;
