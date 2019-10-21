import React from "react";
import {IconSize} from "../../../atoms/icons/Icons";

import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import {useModal, LANG} from "../../../hooks/hook";
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
import {DEFAUT_SMS_INFO} from "../../../types/defaults";
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
  const {smsTemplates} = smsInfo || DEFAUT_SMS_INFO;
  const smsTemplateModal = useModal<ISmsTemplateModalProps>(false);
  if (!smsInfo) throw Error("non SMS info");

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
                  <span>
                    {LANG("auto_send_whether")} : {enable ? "Y" : "N"}
                  </span>,
                  <span>
                    {LANG("auto_send_target")} : {who}{" "}
                  </span>,
                  <span>
                    {LANG("auto_send_condition")} : {when}
                  </span>
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
          <span className="JDstandard-space">{LANG("sms_setting")}}</span>
          <Help
            tooltip={LANG(
              "if_you_set_up_an_SMS_template_you_can_conveniently_send_the_template_when_you_send_a_message"
            )}
            icon={"help"}
            size={IconSize.MEDIUM}
          />
        </h3>
        <Button
          onClick={() => {
            handleCreateBtnClick();
          }}
          label={LANG("create_template")}
          thema="primary"
        />
        <Link to="/smsHistory">
          <Button
            mode="border"
            icon="arrowTo"
            label={LANG("view_SMS_history")}
          />
        </Link>
        <div className="docs-section__box">
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
              {LANG("create_a_new_template")}
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
