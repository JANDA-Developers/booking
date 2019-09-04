import React, {useRef, useState} from "react";
import {RowInfo, CellInfo} from "react-table";
import {Tab, TabList, TabPanel, JDtabs} from "../../../atoms/tabs/tabs";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import Icon from "../../../atoms/icons/Icons";
import InputText from "../../../atoms/forms/inputText/InputText";

import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import {useInput, useModal} from "../../../actions/hook";
import Switch from "../../../atoms/forms/switch/Switch";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import SmsTemplate from "./components/smsTemplate";
import {MutationFn} from "react-apollo";
import {
  updateSmsTemplate,
  updateSmsTemplateVariables,
  deleteSmsTemplate,
  deleteSmsTemplateVariables,
  createSmsTemplate,
  createSmsTemplateVariables,
  getSmsInfo_GetSmsInfo_smsInfo,
  updateSender,
  updateSenderVariables
} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import {onCompletedMessage, isEmpty} from "../../../utils/utils";
import {isPhone} from "../../../utils/inputValidations";
import {toast} from "react-toastify";
import PhoneVerificationModalWrap from "../../../components/phoneVerificationModal/PhoneVerificationModalWrap";
import {Link} from "react-router-dom";
import {IContext} from "../../MiddleServerRouter";

interface IProps {
  smsTemplateMutationes: {
    updateSmsTemplateMu: MutationFn<
      updateSmsTemplate,
      updateSmsTemplateVariables
    >;
    deleteSmsTemplateMu: MutationFn<
      deleteSmsTemplate,
      deleteSmsTemplateVariables
    >;
    createSmsTemplateMu: MutationFn<
      createSmsTemplate,
      createSmsTemplateVariables
    >;
    updateSenderMu: MutationFn<updateSender, updateSenderVariables>;
  };
  loading: boolean;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
  context: IContext;
}

const Sms: React.FC<IProps> = ({
  smsTemplateMutationes,
  loading,
  smsInfo,
  context
}) => {
  if (!smsInfo) return <h3>SMS 신청을 먼저 완료해주세요.</h3>;

  const {house} = context;
  const senderNumber = smsInfo.sender && smsInfo.sender.phoneNumber;

  const updateSenderFn = async () => {
    const result = await smsTemplateMutationes.updateSenderMu({
      variables: {
        houseId: house._id,
        sender: {
          phoneNumber: senderNumber,
          registered: true
        }
      }
    });
  };

  const updateSenderValidater = (): boolean => hostSenderHook.isValid;

  const handleRegistBtnClick = () => {
    if (updateSenderValidater()) {
      updateSenderFn();
    } else {
      toast.warn("올바른 휴대폰 번호가 아닙니다.");
    }
  };

  const handleCreateBtnClick = () => {
    smsTemplateMutationes.createSmsTemplateMu({
      variables: {
        houseId: house._id,
        params: {
          formatName: "",
          smsFormat: ""
        }
      }
    });
  };

  return (
    <div id="seasonTable" className="seasonT container">
      <div className="docs-section">
        {/* <div className="docs-section__box"> */}
        <h3>SMS 설정</h3>
        <Button
          onClick={() => {
            handleCreateBtnClick();
          }}
          label="템플릿 추가하기"
          thema="primary"
        />
        <Link to="/smsHistory">
          <Button mode="border" label="SMS 내역보기" />
        </Link>
        <div className="docs-section__box">
          {/* <h6>문자 템플릿 설정</h6> */}
          {isEmpty(smsInfo.smsTemplates) || (
            <JDtabs>
              {templateTitles.map((title: string, index: number) => (
                <Button onClick={() => {}} />
              ))}
              {smsInfo.smsTemplates.map((smsTemplate, index) => (
                <TabPanel key={`smsTemplate${smsTemplate._id}`}>
                  <SmsTemplate
                    smsInfo={smsInfo}
                    templateTitle={templateTitles[index]}
                    smsTemplateMutationes={smsTemplateMutationes}
                    templateData={smsTemplate}
                    houseId={house._id}
                  />
                </TabPanel>
              ))}
              {isEmpty(smsInfo.smsTemplates) && (
                <h4 className="JDtextColor--placeHolder">
                  새로운 템플릿을 생성하세요.
                </h4>
              )}
            </JDtabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sms;




