import React from "react";

import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import { useModal, LANG } from "../../../hooks/hook";
import { MutationFn } from "react-apollo";
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
import { isEmpty, smsMsgParser } from "../../../utils/utils";
import { Link } from "react-router-dom";
import { IContext } from "../BookingHostRouter";
import SmsTemplateModal, {
  ISmsTemplateModalProps
} from "./components/SmsTemplateModal";
import { DEFAULT_SMS_INFO } from "../../../types/defaults";
import Help from "../../../atoms/Help/Help";
import "./SmsTemplateSetting.scss";
import JDlist from "../../../atoms/list/List";
import JDpreloader from "../../../atoms/preloader/Preloader";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";

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

const SmsTemplateSetting: React.FC<IProps> = ({
  smsTemplateMutationes,
  loading,
  smsInfo,
  context
}) => {
  const { smsTemplates } = smsInfo || DEFAULT_SMS_INFO;
  const smsTemplateModal = useModal<ISmsTemplateModalProps>(false);

  // 로딩상태일때.
  if (!smsInfo) return <JDpreloader loading={true} page />;

  const { house } = context;

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
  const SmsTemplateViewCard: React.FC<IPP> = ({ template, ...prop }) => {
    const { smsSendCase } = template;
    const { enable, when, who } = smsSendCase || {
      enable: false,
      when: "",
      who: ""
    };
    return (
      <Card className="sms__templateViewCard" hover {...prop}>
        <h6>
          <span className="JDstandard-small-space">{template.formatName} </span>
          <Help
            size={"small"}
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
          {smsMsgParser(template.smsFormat, LANG("SmsReplaceKey"))}
        </p>
      </Card>
    );
  };

  return (
    <div id="sms" className="sms">
      <PageHeader title={LANG("sms_setting")} desc={LANG("sms__decs")} />
      <PageBody>
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
      </PageBody>
    </div>
  );
};

export default SmsTemplateSetting;
