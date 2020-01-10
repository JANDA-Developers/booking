import classNames from "classnames";
import React from "react";
import InputText from "../../../../atoms/forms/inputText/InputText";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import Button from "../../../../atoms/button/Button";
import AgreePolicyModal from "./AgreePolicyModal";
import { useModal, LANG } from "../../../../hooks/hook";
import { IBookerInfo } from "../declation";

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

  return (
    <div className={classes}>
      <div>
        <InputText
          value={bookerInfo.name}
          onChange={(value: string) => {
            setBookerInfo({ ...bookerInfo, name: value });
          }}
          id="JDbookerInfo__name"
          label={LANG("name")}
        />
      </div>
      <div>
        <InputText
          value={bookerInfo.phoneNumber}
          onChange={(value: string) => {
            setBookerInfo({ ...bookerInfo, phoneNumber: value });
          }}
          hyphen
          id="JDbookerInfo__phoneNumber"
          label={LANG("contact")}
        />
      </div>
      <div>
        <InputText
          value={bookerInfo.password}
          onChange={(value: string) => {
            setBookerInfo({ ...bookerInfo, password: value });
          }}
          type="password"
          id="JDbookerInfo__password"
          label={LANG("password")}
        />
      </div>
      <div>
        <InputText
          value={bookerInfo.memo}
          onChange={(value: string) => {
            setBookerInfo({ ...bookerInfo, memo: value });
          }}
          label={LANG("memo")}
          id="JDbookerInfo__memo"
          textarea
        />
      </div>
      <div className="bookerInfoBox__agreePolicyBox">
        <CheckBox
          checked={bookerInfo.agreePrivacyPolicy}
          onChange={(value: boolean) => {
            setBookerInfo({ ...bookerInfo, agreePrivacyPolicy: value });
          }}
          id="JDbookerInfo__agreeMent"
          label={LANG("consent_to_collection_of_personal_information")}
        />
        <Button
          onClick={() => {
            agreePolicyModalHook.openModal();
          }}
          label={LANG("view_terms")}
          className="JDstandard-space0"
          mode="border"
        />
      </div>
      <AgreePolicyModal modalHook={agreePolicyModalHook} />
    </div>
  );
};

export default BookerInfoBox;
