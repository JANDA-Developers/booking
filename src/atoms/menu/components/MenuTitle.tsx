import React from "react";
import JDIcon from "../../icons/Icons";
import "./MenuTitle.scss";
import { IconConifgProps, IIcons } from "../../icons/declation";
import { capitalizeFirstLetter } from "../../../utils/autoFormat";

interface Iprops extends IconConifgProps {
  className?: string;
  title?: string | JSX.Element;
  icon?: IIcons;
}
// 정형호된 메뉴타이틀이 필요없을 경우에는
// 사용하지 않아도 됩니다..
// 분리가 필요할경우 안에서 여러개로 나누자
const JDmenuTitle: React.FC<Iprops> = ({ className, icon, title, size }) => {
  return (
    <div className={`JDmenuTitle ${className}`}>
      <div className="JDflex--vCenter">
        {icon && (
          <JDIcon
            className="JDstandard-space"
            size={size || "small"}
            icon={icon}
          />
        )}
        <span>{title}</span>
        <span></span>
      </div>
    </div>
  );
};

export default JDmenuTitle;
