import React from "react";
import { LANG } from "../../../hooks/hook";
import JDbox from "../../box/JDbox";

// handler는 마우스 오버 이벤트 입니다.
// form 은 시작날자
// to 는 끝날자

interface IProps {
  from?: Date | null;
  to?: Date | null;
  [foo: string]: any;
}

const JDdatePcikerInformation: React.SFC<IProps> = ({ from, to }) => {
  interface wrapProp {
    condition: any;
    children: any;
  }
  const Wrapper = ({ condition, children }: wrapProp) => {
    if (!condition) return null;

    return (
      <JDbox align="flexVcenter" size="small">
        {children}
      </JDbox>
    );
  };

  return (
    <div className="JDflex JDdatePcikerInformation">
      <Wrapper condition={!from && !to} children={LANG("choseCheckInDate")} />
      <Wrapper
        condition={from}
        children={from?.toLocaleDateString() + " " + LANG("checkIn")}
      />
      <Wrapper condition={from && !to} children={LANG("choseCheckOutDate")} />
      <Wrapper
        condition={from && to}
        children={to?.toLocaleDateString() + " " + LANG("checkOut")}
      />
    </div>
  );
};

JDdatePcikerInformation.defaultProps = {
  from: new Date(),
  to: new Date()
};

export default JDdatePcikerInformation;
