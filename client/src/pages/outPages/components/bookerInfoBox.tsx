import classNames from 'classnames';
import React, { useRef } from 'react';
import InputText from '../../../atoms/forms/InputText';
import CheckBox from '../../../atoms/forms/CheckBox';
import Button from '../../../atoms/button/Button';
import utils from '../../../utils/utils';
import { BookerInput as IBookerInput } from '../../../types/api';
import { ISetBookerInfo } from '../reservation/Reservation';
import TooltipList from '../../../atoms/tooltipList/TooltipList';
import JDbox from '../../../atoms/box/JDbox';

interface IProps {
  className?: string;
  bookerInfo: IBookerInput;
  setBookerInfo: ISetBookerInfo;
}

const BookerInfoBox: React.SFC<IProps> = ({ className, bookerInfo, setBookerInfo }) => {
  const classes = classNames('JDbookerInfoBox', className, {});
  const tooltipRef = useRef<any>();

  return (
    <div className={classes}>
      <InputText
        value={bookerInfo.name}
        onChange={(value: string) => {
          setBookerInfo({ ...bookerInfo, name: value });
        }}
        id="JDbookerInfo__name"
        label="성함"
      />
      <InputText
        value={bookerInfo.phoneNumber}
        onChange={(value: string) => {
          setBookerInfo({ ...bookerInfo, phoneNumber: value });
        }}
        hyphen
        id="JDbookerInfo__phoneNumber"
        label="연락처"
      />
      <InputText
        value={bookerInfo.password}
        onChange={(value: string) => {
          setBookerInfo({ ...bookerInfo, password: value });
        }}
        type="password"
        id="JDbookerInfo__password"
        label="비밀번호"
      />
      <InputText
        value={bookerInfo.memo}
        onChange={(value: string) => {
          setBookerInfo({ ...bookerInfo, memo: value });
        }}
        id="JDbookerInfo__memo"
        textarea
        label="메모"
      />
      <CheckBox
        checked={bookerInfo.agreePrivacyPolicy}
        onChange={(value: boolean) => {
          setBookerInfo({ ...bookerInfo, agreePrivacyPolicy: value });
        }}
        id="JDbookerInfo__agreeMent"
        label="개인정보 수집 동의"
      />
      <span
        ref={tooltipRef}
        data-place="top"
        data-offset="{'top': 5, 'left': 0}"
        data-tip
        data-delay-hide={0}
        data-for="agreePrivacyPolicy"
        data-event="click"
      >
        <Button label="약관보기" mode="flat" thema="grey" />
      </span>

      <TooltipList scrollNodeClass="paymentModal" tooltipRef={tooltipRef} id="agreePrivacyPolicy">
        <JDbox className="paymentModal__JDbox" mode="table">
          <div className="JDlarge-text JDstandard-margin-bottom">서비스 제공을 위해 귀하의 개인정보를 수집합니다.</div>
          <table>
            <thead>
              <tr>
                <th>개인정보 항목</th>
                <th>수집 목적</th>
                <th>보유 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이름,연락처</td>
                <td>원활한 예약관리</td>
                <td>숙박후 6개월</td>
              </tr>
            </tbody>
          </table>
          <p className="JDtiny-text JDlarge-warring-text">
            {'※ 서비스 제공을 위해 필요한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실수 있습니다.'}
            <br />
            {'※ 게스트하우스 규정을 위반할 시 위반내용과 함께 개인정보가 저장됩니다. '}
          </p>
        </JDbox>
      </TooltipList>
    </div>
  );
};

export default BookerInfoBox;
