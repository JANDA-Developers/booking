import classNames from "classnames";
import React, {useRef} from "react";
import InputText from "../../../atoms/forms/inputText/InputText";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import Button from "../../../atoms/button/Button";
import utils from "../../../utils/utils";
import {BookerInput as IBookerInput} from "../../../types/api";
import {ISetBookingInfo} from "../reservation/Reservation";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import JDbox from "../../../atoms/box/JDbox";

interface IProps {
  className?: string;
  bookingInfo: IBookerInput;
  setBookingInfo: ISetBookingInfo;
}

const BookingInfoBox: React.SFC<IProps> = ({
  className,
  bookingInfo,
  setBookingInfo
}) => {
  const classes = classNames("JDbookingInfoBox", className, {});
  const tooltipRef = useRef<any>();

  return (
    <div className={classes}>
      <InputText
        value={bookingInfo.name}
        onChange={(value: string) => {
          setBookingInfo({...bookingInfo, name: value});
        }}
        id="JDbookingInfo__name"
        label="성함"
      />
      <InputText
        value={bookingInfo.phoneNumber}
        onChange={(value: string) => {
          setBookingInfo({...bookingInfo, phoneNumber: value});
        }}
        hyphen
        id="JDbookingInfo__phoneNumber"
        label="연락처"
      />
      <InputText
        value={bookingInfo.password}
        onChange={(value: string) => {
          setBookingInfo({...bookingInfo, password: value});
        }}
        type="password"
        id="JDbookingInfo__password"
        label="비밀번호"
      />
      <InputText
        value={bookingInfo.memo}
        onChange={(value: string) => {
          setBookingInfo({...bookingInfo, memo: value});
        }}
        id="JDbookingInfo__memo"
        textarea
        label="메모"
      />
      <div className="bookerInfoBox__agreePolicyBox">
        <CheckBox
          checked={bookingInfo.agreePrivacyPolicy}
          onChange={(value: boolean) => {
            setBookingInfo({...bookingInfo, agreePrivacyPolicy: value});
          }}
          id="JDbookingInfo__agreeMent"
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
      </div>

      <TooltipList
        scrollNodeClass="paymentModal"
        tooltipRef={tooltipRef}
        id="agreePrivacyPolicy"
      >
        <JDbox className="paymentModal__JDbox" mode="table">
          <div className="JDlarge-text JDstandard-margin-bottom">
            서비스 제공을 위해 귀하의 개인정보를 수집합니다.
          </div>
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
          <p className="JDtiny-text JDtextColor-warring-text">
            {
              "※ 서비스 제공을 위해 필요한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실수 있습니다."
            }
            <br />
            {
              "※ 게스트하우스 규정을 위반할 시 위반내용과 함께 개인정보가 저장됩니다. "
            }
          </p>
        </JDbox>
      </TooltipList>
    </div>
  );
};

export default BookingInfoBox;
