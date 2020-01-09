import React, { Fragment, useState } from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import {
  IUseModal,
  useSwitch,
  useSelect,
  useInput,
  LANG
} from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import { smsMsgParser, smsMessageFormatter } from "../../../../utils/utils";
import {
  getSmsInfo_GetSmsInfo_smsInfo,
  SendTarget,
  AutoSendWhen,
  updateSmsTemplate,
  updateSmsTemplateVariables,
  deleteSmsTemplate,
  deleteSmsTemplateVariables,
  createSmsTemplate,
  createSmsTemplateVariables
} from "../../../../types/api";
import { IContext } from "../../BookingHostRouter";
import { DEFAULT_SMS_TEMPLATE } from "../../../../types/defaults";
import InputText from "../../../../atoms/forms/inputText/InputText";
import { MutationFn } from "react-apollo";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDselect, {
  SelectBoxSize
} from "../../../../atoms/forms/selectBox/SelectBox";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import Help from "../../../../atoms/Help/Help";
import {
  AUTO_SEND_OP,
  SMS_TARGET_OP,
  SmsReplaceKeyEnumKeys
} from "../../../../types/const";

export interface ISmsTemplateModalProps {
  templateId: string;
  isAdd: boolean;
}

interface Iprops {
  context: IContext;
  modalHook: IUseModal<ISmsTemplateModalProps>;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo;
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
  };
}

const SmsTemplateModal: React.FC<Iprops> = ({
  smsInfo,
  smsTemplateMutationes,
  context,
  modalHook
}) => {
  const { house } = context;
  const { _id: houseId } = house;
  const { templateId, isAdd } = modalHook.info;
  const { smsTemplates = [] } = smsInfo;
  const {
    createSmsTemplateMu,
    deleteSmsTemplateMu,
    updateSmsTemplateMu
  } = smsTemplateMutationes;
  const templateData =
    smsTemplates!.find(smsTemplate => smsTemplate._id === templateId) ||
    DEFAULT_SMS_TEMPLATE;
  const {
    formatName: defaultFormatName,
    smsFormat: defaultSmsFormat,
    smsSendCase: defulatSmsSendCase
  } = templateData;

  // HOOKS
  const [messageValue, setMessage] = useState(
    smsMsgParser(defaultSmsFormat, LANG("SmsReplaceKey"))
  );
  const enableHook = useSwitch(defulatSmsSendCase?.enable || false);
  const autoSendHook = useSelect<AutoSendWhen | null>({
    value: defulatSmsSendCase?.when || null,
    label: LANG(defulatSmsSendCase?.when || "un_send_Sms")
  });
  const sendTargetHook = useSelect<SendTarget | null>({
    value: defulatSmsSendCase?.who || null,
    label: LANG(defulatSmsSendCase?.who || "un_send_Sms")
  });
  const templateTitleHook = useInput(defaultFormatName);

  const { selectedOption: sendTSO } = sendTargetHook;
  const { selectedOption: sendASO } = autoSendHook;
  const AutoSendWhenTemp =
    sendTSO?.value && sendASO?.value
      ? {
          enable: enableHook.checked,
          when: sendASO.value,
          who: sendTSO.value
        }
      : null;

  const tempTemplateVariables = {
    houseId: houseId,
    params: {
      formatName: templateTitleHook.value,
      smsFormat: smsMessageFormatter(messageValue),
      smsSendCase: AutoSendWhenTemp
    }
  };

  const hanldeTemplateBtnClick = (label: string) => {
    setMessage(`${messageValue} ${label}`);
  };
  const handleCreateBtnClick = () => {
    createSmsTemplateMu({
      variables: tempTemplateVariables
    });
  };
  const handleDeleteBtnClick = () => {
    deleteSmsTemplateMu({
      variables: {
        smsInfoId: smsInfo._id,
        smsTemplateId: templateData._id
      }
    });
  };
  const handleUpdateBtnClick = () => {
    updateSmsTemplateMu({
      variables: {
        ...tempTemplateVariables,
        smsTemplateId: templateData._id
      }
    });
  };

  return (
    <JDmodal className="smsTemplateModal" {...modalHook}>
      <Fragment>
        <div className="smsTemplateModal__contentWrap">
          <div>
            <InputText
              id="TemplateTitleInput"
              {...templateTitleHook}
              label={LANG("template_title")}
            />
          </div>
          <div>
            <InputText
              id="MessageInput"
              value={messageValue}
              onChange={setMessage}
              label={LANG("msg")}
              textarea
              doubleHeight
            />
          </div>
          <div>
            <div>
              <JDLabel txt={LANG("template_msg")} />
            </div>
            {SmsReplaceKeyEnumKeys.map((value: any) => (
              <Button
                onClick={() => {
                  hanldeTemplateBtnClick(LANG("SmsReplaceKey")[value]);
                }}
                disabled={value === ("HM" || "PAYMETHOD" || "PAYMENTSTATUS")}
                size="small"
                mode="border"
                key={`templateBtn${templateData._id}${value}`}
                label={LANG("SmsReplaceKey")
                  [value].replace("[", "")
                  .replace("]", "")}
              />
            ))}
          </div>
          <div className="JDz-index-1 flex-grid flex-grid--start">
            {/* props 로부터 받아서 쓸거임. onChange시에는 뮤테이션을 날리겠지. */}
            <JDselect
              id="AutoSendSelect"
              size={SelectBoxSize.FIVE}
              options={AUTO_SEND_OP}
              {...autoSendHook}
              label={LANG("auto_send")}
            />
            <JDselect
              id="SendTagetSelect"
              size={SelectBoxSize.FOUR}
              options={SMS_TARGET_OP}
              {...sendTargetHook}
              label={LANG("send_target")}
            />
            <JDswitch
              id="EnableSwitch"
              {...enableHook}
              label={
                <span>
                  <span className="JDstandard-small-space">
                    {LANG("is_auto_send_enable")}
                  </span>
                  <Help
                    tooltip={LANG(
                      "if_tou_enable_auto_send_msg_msg_will_send_autoMetically"
                    )}
                    icon={"help"}
                    size={undefined}
                  />
                </span>
              }
            />
          </div>
        </div>
      </Fragment>
      <div className="JDmodal__endSection">
        <Button
          id="CreateTemplateBtn"
          mode="flat"
          size="small"
          label={LANG(isAdd ? "do_create" : "do_copy")}
          thema="primary"
          onClick={handleCreateBtnClick}
        />
        <Button
          id="UpdateTemplateBtn"
          mode="flat"
          size="small"
          label={LANG("do_modify")}
          thema="primary"
          disabled={isAdd}
          onClick={handleUpdateBtnClick}
        />
        <Button
          id="DeleteTemplateBtn"
          mode="flat"
          size="small"
          label={LANG("delete_booking")}
          thema="error"
          disabled={isAdd}
          onClick={handleDeleteBtnClick}
        />
      </div>
    </JDmodal>
  );
};

export default SmsTemplateModal;
