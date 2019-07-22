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
import {onCompletedMessage} from "../../../utils/utils";
import {isPhone} from "../../../utils/inputValidations";
import {toast} from "react-toastify";
import PhoneVerificationModalWrap from "../../../components/phoneVerificationModal/PhoneVerificationModalWrap";
import {Link} from "react-router-dom";

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
  houseId: string;
}

const Sms: React.FC<IProps> = ({
  smsTemplateMutationes,
  loading,
  smsInfo,
  houseId
}) => {
  const senderNumber = smsInfo && smsInfo.sender && smsInfo.sender.phoneNumber;
  const reciverNumber = smsInfo && smsInfo.receivers && smsInfo.receivers[0];
  const phoneVerificationModalHook = useModal(false);
  const hostSenderHook = useInput(senderNumber || "");
  const hostReciverHook = useInput(reciverNumber || "");

  const templateNames =
    (smsInfo &&
      smsInfo.smsTemplates &&
      smsInfo.smsTemplates.map(smsTemplate => smsTemplate.formatName)) ||
    [];

  const [templateTitles, setTemplateTitles] = useState<string[]>(
    templateNames || []
  );

  const updateSenderFn = async () => {
    const result = await smsTemplateMutationes.updateSenderMu({
      variables: {
        houseId: houseId,
        sender: {
          phoneNumber: hostSenderHook.value,
          registered: true
        }
      }
    });

    // 인증이 안된경우 인증 모달 팝
    // updateSenderFn을 다시 인증완료 컬백으로 호출함
    if (result && result.data) {
      if (!result.data.UpdateSender.verified) {
        phoneVerificationModalHook.openModal({
          phoneNumber: hostSenderHook.value,
          onPhoneVerified: updateSenderFn
        });
      } else {
        onCompletedMessage(result.data.UpdateSender, "신청완료", "신청실패");
      }
    }
  };

  const updateSenderValidater = (): boolean => hostSenderHook.isValid;

  const handleRegistBtnClick = () => {
    if (updateSenderValidater()) {
      updateSenderFn();
    } else {
      toast.warn("올바른 핸드폰 번호가 아닙니다.");
    }
  };

  return (
    <div id="seasonTable" className="seasonT container">
      <div className="docs-section">
        {/* <div className="docs-section__box"> */}
        <h3>
          SMS 설정
          {loading && <Preloader size="medium" />}
        </h3>
        <Link to="/smsHistory">
          <Button mode="border" label="SMS 내역보기" />
        </Link>
        {/* <div className="flex-grid"> */}
        {/* <div className="flex-grid__col col--full-6 col--md-12">
              <Card>
                <h6>SMS 신청하기</h6>
                {/* direct Mu */}
        {/* <InputText
                  {...hostSenderHook}
                  validation={isPhone}
                  hyphen
                  label="관리자 발신번호"
                />
                <InputText
                  {...hostReciverHook}
                  validation={isPhone}
                  hyphen
                  label="관리자 수신번호"
                />
                <Button
                  onClick={handleRegistBtnClick}
                  thema="primary"
                  label="등록신청"
                />
                <Button thema="warn" label="신청취소" />
              </Card>
            </div> */}
        {/* <div className="flex-grid__col col--full-6 col--md-12">
              <Card>
                <h6>SMS 등록안내</h6>
                <p>
                  본 서비스는 알리고 API 를 활용한 서비스로 가격정책은
                  알리고정책을 따릅니다. 서비스 신청후 SMS 등록까지 평균 1일
                  소요됨을 안내드립니다. (공휴일 제외)
                </p>
                <a
                  className="JDanchor"
                  href="https://smartsms.aligo.in/index.html"
                >
                  알리고이동
                </a>
                <a
                  className="JDanchor"
                  href="https://smartsms.aligo.in/index.html"
                >
                  비용정책 확인
                </a>
              </Card>
            </div>
          </div>*/}
        {/* </div> */}
        <div className="docs-section__box">
          {/* <h6>문자 템플릿 설정</h6> */}
          {smsInfo ? (
            <JDtabs>
              <TabList>
                {templateTitles.map((title: string, index: number) => (
                  <Tab
                    key={`smsTemplateTitle${index}${smsInfo &&
                      smsInfo.smsTemplates![index]._id}`}
                  >
                    <InputText
                      onBlur={e => {
                        templateTitles[index] = e.currentTarget.value;
                        setTemplateTitles([...templateTitles]);
                      }}
                      defaultValue={title}
                      placeholder="NAME"
                    />
                  </Tab>
                ))}
              </TabList>
              {smsInfo &&
                smsInfo.smsTemplates &&
                smsInfo.smsTemplates.map((smsTemplate, index) => (
                  <TabPanel key={`smsTemplate${smsTemplate._id}`}>
                    <SmsTemplate
                      smsInfo={smsInfo}
                      templateTitle={templateTitles[index]}
                      smsTemplateMutationes={smsTemplateMutationes}
                      templateData={smsTemplate}
                      houseId={houseId}
                    />
                  </TabPanel>
                ))}
            </JDtabs>
          ) : (
            <h3>SMS 신청을 먼저 완료해주세요.</h3>
          )}
        </div>
      </div>
      <PhoneVerificationModalWrap modalHook={phoneVerificationModalHook} />
    </div>
  );
};

export default Sms;
