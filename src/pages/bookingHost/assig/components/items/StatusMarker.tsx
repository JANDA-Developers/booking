import React from "react";
import { LANG } from "../../../../../hooks/hook";
import { Gender } from "../../../../../types/enum";
import imgM from "./img/Memo_01.png";
import imgMan from "./img/m.png";
import imgWoman from "./img/w.png";
import imgB from "./img/icon_B.png";
import imgP from "./img/icon_P.png";

interface IProps {
  darkImg?: boolean;
  isUnpaid?: boolean;
  memo?: string;
  breakfast?: boolean | null;
  gender: null | Gender;
}

const StatusMarker: React.FC<IProps> = ({
  darkImg,
  memo,
  gender,
  isUnpaid,
  breakfast
}) => {
  return (
    <div className="statusMarker">
      {gender && (
        <img title={gender} src={gender === Gender.MALE ? imgMan : imgWoman} />
      )}
      {memo && <img title={memo} src={imgM} />}
      {breakfast && <img title={LANG("breakfast")} src={imgB} />}
      {isUnpaid && <img title={LANG("unPaid")} src={imgP} />}
    </div>
  );
};

export default StatusMarker;
