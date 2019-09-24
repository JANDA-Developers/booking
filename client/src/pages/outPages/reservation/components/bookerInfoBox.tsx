import classNames from "classnames";
import React, {useRef} from "react";
import InputText from "../../../../atoms/forms/inputText/InputText";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import Button from "../../../../atoms/button/Button";
import utils from "../../../../utils/utils";
import {ISetBookingInfo, IBookerInfo} from "../Reservation";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import JDbox from "../../../../atoms/box/JDbox";
import AgreePolicyModal from "./AgreePolicyModal";
import {useModal} from "../../../../actions/hook";

export interface IBookerInfoBoxProps {
  className?: string;
  bookerInfo: IBookerInfo;
  setBookerInfo: React.Dispatch<React.SetStateAction<IBookerInfo>>;
}

const BookerInfoBox: React.FC<IBookerInfoBoxProps> = ({
  className,
  bookerInfo,
  setBookerInfo
}) => {
  const agreePolicyModalHook = useModal(false);
  const classes = classNames("JDbookerInfoBox", className, {});
  const tooltipRef = useRef<any>();

  return (
    <div className={classes}>
      <div>
        <InputText
          value={bookerInfo.name}
          onChange={(value: string) => {
            setBookerInfo({...bookerInfo, name: value});
          }}
          id="JDbookerInfo__name"
          label="성함"
        />
      </div>
      <div>
        <InputText
          value={bookerInfo.phoneNumber}
          onChange={(value: string) => {
            setBookerInfo({...bookerInfo, phoneNumber: value});
          }}
          hyphen
          id="JDbookerInfo__phoneNumber"
          label="연락처"
        />
      </div>
      <div>
        <InputText
          value={bookerInfo.password}
          onChange={(value: string) => {
            setBookerInfo({...bookerInfo, password: value});
          }}
          type="password"
          id="JDbookerInfo__password"
          label="비밀번호"
        />
      </div>
      <div>
        <InputText
          value={bookerInfo.memo}
          onChange={(value: string) => {
            setBookerInfo({...bookerInfo, memo: value});
          }}
          id="JDbookerInfo__memo"
          textarea
          label="메모"
        />
      </div>
      <div className="bookerInfoBox__agreePolicyBox">
        <CheckBox
          checked={bookerInfo.agreePrivacyPolicy}
          onChange={(value: boolean) => {
            setBookerInfo({...bookerInfo, agreePrivacyPolicy: value});
          }}
          id="JDbookerInfo__agreeMent"
          label="개인정보 수집 동의"
        />
        <Button
          onClick={() => {
            agreePolicyModalHook.openModal();
          }}
          label="약관보기"
          className="JDstandard-space0"
          mode="border"
        />
      </div>
      <AgreePolicyModal modalHook={agreePolicyModalHook} />
    </div>
  );
};

export default BookerInfoBox;
