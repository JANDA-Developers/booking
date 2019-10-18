import React from "react";
import PropTypes from "prop-types";
import {JDlang} from "../../../langs/JDlang";
import {CURRENT_LANG, LANG} from "../../../hooks/hook";

// handler는 마우스 오버 이벤트 입니다.
// form 은 시작날자
// to 는 끝날자

interface IProps {
  from?: Date | null;
  to?: Date | null;
  [foo: string]: any;
}

const JDdatePcikerInformation: React.SFC<IProps> = ({from, to}) => {
  const lang = LANG.bind(LANG, "components");
  return (
    <div className="JDdatePcikerInformation">
      {!from && !to && lang("choseCheckInDate")}
      {from && !to && lang("choseCheckInDate")}
      {from &&
        to &&
        ` ${from.toLocaleDateString()} ${LANG("common", "checkIn")}
               ${to.toLocaleDateString()}`}
      {from && to && LANG("common", "checkOut")}
    </div>
  );
};

JDdatePcikerInformation.defaultProps = {
  from: new Date(),
  to: new Date()
};

export default JDdatePcikerInformation;
