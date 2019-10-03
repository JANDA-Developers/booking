import React from "react";
import {IconSize} from "../../../atoms/icons/Icons";

import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import {useModal} from "../../../hooks/hook";
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
  updateSenderVariables,
  getSmsInfo_GetSmsInfo_smsInfo_smsTemplates
} from "../../../types/api";
import {isEmpty, smsMsgParser} from "../../../utils/utils";
import {Link} from "react-router-dom";
import {IContext} from "../../MiddleServerRouter";
import SmsTemplateModal, {
  ISmsTemplateModalProps
} from "./components/SmsTemplateModal";
import {DEFAULT_SMS_INFO} from "../../../types/defaults";
import Help from "../../../atoms/Help/Help";
import {KR_SMS_PARSER} from "../../../types/enum";
import "./Sms.scss";
import JDlist from "../../../atoms/list/List";

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
  const {smsTemplates} = smsInfo || DEFAULT_SMS_INFO;
  const smsTemplateModal = useModal<ISmsTemplateModalProps>(false);
  if (!smsInfo) return <h3>SMS 신청을 먼저 완료해주세요.</h3>;

  const {house} = context;

  const handleCreateBtnClick = () => {
    smsTemplateModal.openModal({
      isAdd: true,
      templateId: ""
    });
  };

  const handleSmsViewCardClick = (id: string) => {
    smsTemplateModal.openModal({
      isAdd: false,
      templateId: id
    });
  };

  interface IPP {
    template: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates;
    [key: string]: any;
  }
  const SmsTemplateViewCard: React.FC<IPP> = ({template, ...prop}) => {
    const {smsSendCase} = template;
    const {enable, when, who} = smsSendCase || {
      enable: false,
      when: "",
      who: ""
    };
    return (
      <Card className="sms__templateViewCard" hover {...prop}>
        <h6>
          <span className="JDstandard-small-space">{template.formatName} </span>
          <Help
            size={IconSize.NORMAL}
            icon="info"
            tooltip={
              <JDlist
                contents={[
                  <span>자동발신 여부 : {enable ? "Y" : "N"}</span>,
                  <span>자동발신 대상 : {who} </span>,
                  <span>자동발신 상황 : {when}</span>
                ]}
              />
            }
          />
        </h6>
        <p className="sms__templateViewCard_smsFormat">
          {smsMsgParser(template.smsFormat, KR_SMS_PARSER)}
        </p>
      </Card>
    );
  };

  return (
    <div id="sms" className="sms container">
      <div className="docs-section">
        <h3>
          <span className="JDstandard-space">SMS 설정</span>
          <Help
            tooltip="SMS 템플릿을 설정해두시면 메세지를 보낼떄 해당 템플릿을 편리하게 보낼수 있습니다."
            icon={"help"}
            size={IconSize.MEDIUM}
          />
        </h3>
        <Button
          onClick={() => {
            handleCreateBtnClick();
          }}
          label="템플릿 추가하기"
          thema="primary"
        />
        <Link to="/smsHistory">
          <Button mode="border" icon="arrowTo" label="SMS 내역보기" />
        </Link>
        <div className="docs-section__box">
          {/* <h6>문자 템플릿 설정</h6> */}
          <div className="row sms__templateCardWrap">
            {isEmpty(smsTemplates) ||
              smsTemplates.map(template => (
                <div className="col col--float col--full-3 col--lg-4 col--md-6">
                  <SmsTemplateViewCard
                    onClick={() => {
                      handleSmsViewCardClick(template._id);
                    }}
                    template={template}
                  />
                </div>
              ))}
          </div>
          {isEmpty(smsTemplates) && (
            <h4 className="JDtextColor--placeHolder">
              새로운 템플릿을 생성하세요.
            </h4>
          )}
        </div>
        <SmsTemplateModal
          key={smsTemplateModal.info.templateId}
          context={context}
          smsInfo={smsInfo}
          smsTemplateMutationes={smsTemplateMutationes}
          modalHook={smsTemplateModal}
        />
      </div>
    </div>
  );
};

export default Sms;
