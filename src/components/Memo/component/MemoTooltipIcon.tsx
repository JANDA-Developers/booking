import JDIcon from "../../../atoms/icons/Icons";
import React, { FC } from "react";

interface IProps {
  id: string;
}

export const MemoToolTipIcon: FC<IProps> = ({ id }) => (
  <span
    data-tip={id}
    data-place="top"
    data-for="memoTooltip"
    data-event="click"
    className="JDhoverBox__"
  >
    <JDIcon hover icon="dotMenuVertical" size={"tiny"} />
  </span>
);
