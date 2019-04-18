import React from 'react';
import PropTypes from 'prop-types';

// handler는 마우스 오버 이벤트 입니다.
// form 은 시작날자
// to 는 끝날자

interface IProps {
  from?: Date | null;
  to?: Date | null;
  [foo: string]: any;
}

const JDdatePcikerInformation: React.SFC<IProps> = ({ from, to }) => (
  <div className="JDdatePcikerInformation">
    {!from && !to && '체크인 날자를 선택해 주세요.'}
    {from && !to && '체크아웃 날자를 선택해 주세요.'}
    {from
      && to
      && ` ${from.toLocaleDateString()} 체크인
               ${to.toLocaleDateString()}`}
    {from && to && '체크아웃'}
  </div>
);

JDdatePcikerInformation.defaultProps = {
  from: new Date(),
  to: new Date(),
};

export default JDdatePcikerInformation;
