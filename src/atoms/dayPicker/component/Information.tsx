import React from "react";
import { LANG } from "../../../hooks/hook";

// handler는 마우스 오버 이벤트 입니다.
// form 은 시작날자
// to 는 끝날자

interface IProps {
  from?: Date | null;
  to?: Date | null;
  [foo: string]: any;
}

const JDdatePcikerInformation: React.SFC<IProps> = ({ from, to }) => {
  return (
    <div className="JDdatePcikerInformation">
      {!from && !to && LANG("choseCheckInDate")}
      {from && !to && LANG("choseCheckInDate")}
      {from &&
        to &&
        ` ${from.toLocaleDateString()} ${LANG("checkIn")}
               ${to.toLocaleDateString()}`}
      {from && to && LANG("checkOut")}
    </div>
  );
};

JDdatePcikerInformation.defaultProps = {
  from: new Date(),
  to: new Date()
};

export default JDdatePcikerInformation;
