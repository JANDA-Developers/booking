import React, {useState, Fragment} from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDselect, {
  SelectBoxSize
} from "../../../../atoms/forms/selectBox/SelectBox";
import {
  AUTO_SEND_OP,
  SMS_TARGET_OP,
  SmsReplaceKeyEnumKeys,
  SmsReplaceKeyEnumKr,
  SendTarget,
  SmsSendCase,
  SendTargetKr,
  SmsSendCaseKr,
  SendSmsWhen
} from "../../../../types/enum";
import {useSelect, useInput, useSwitch} from "../../../../actions/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Switch from "../../../../atoms/forms/switch/Switch";
import Button from "../../../../atoms/button/Button";
import {ErrProtecter, smsMessageFormatter} from "../../../../utils/utils";
import {
  getSmsInfo_GetSmsInfo_smsInfo_smsTemplates,
  updateSmsTemplate,
  updateSmsTemplateVariables,
  deleteSmsTemplate,
  deleteSmsTemplateVariables,
  templateTitle,
  createSmsTemplate,
  createSmsTemplateVariables
} from "../../../../types/api";
import {MutationFn} from "react-apollo";

interface IProps {
  templateData: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates;
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
  houseId: string;
  templateTitle: string;
}

const HouseCard: React.SFC<IProps> = ({
  templateData,
  smsTemplateMutationes,
  templateTitle,
  houseId
}) => {
  const [messageValue, setMessage] = useState(templateData.smsFormat);
  const enableHook = useSwitch(false);
  const autoSendHook = useSelect<SendSmsWhen | null>({
    value: templateData.smsSendCase ? templateData.smsSendCase.when : null,
    label: templateData.smsSendCase
      ? SmsSendCaseKr[templateData.smsSendCase.when]
      : "발송안함"
  });
  const sendTargetHook = useSelect<SendTarget | null>({
    value: templateData.smsSendCase ? templateData.smsSendCase.who : null,
    label: templateData.smsSendCase
      ? SendTargetKr[templateData.smsSendCase.who]
      : "발송안함"
  });

  const onTemplateBtnClick = (label: string) => {
    setMessage(`${messageValue} [${label}]`);
  };

  const smsSendCaseTemp =
    sendTargetHook.selectedOption && autoSendHook.selectedOption
      ? {
          enable: enableHook.checked,
          when: autoSendHook.selectedOption.value!,
          who: sendTargetHook.selectedOption.value!
        }
      : null;

  const handleCreateBtnClick = () => {
    smsTemplateMutationes.createSmsTemplateMu({
      variables: {
        houseId: houseId,
        params: {
          formatName: templateTitle,
          smsFormat: smsMessageFormatter(messageValue),
          smsSendCase: smsSendCaseTemp
        }
      }
    });
  };
  const handleDeleteBtnClick = () => {
    smsTemplateMutationes.deleteSmsTemplateMu();
  };
  const updateDeleteBtnClick = () => {
    smsTemplateMutationes.updateSmsTemplateMu();
  };

  const tempArr = SmsReplaceKeyEnumKeys;

  return (
    <Fragment>
      <InputText
        value={messageValue}
        onChange={setMessage}
        label="발신 메세지"
        textarea
        doubleHeight
      />
      <div>
        <div>
          <JDLabel txt="템플릿 메세지" />
        </div>
        {tempArr.map((value: any) => (
          <Button
            onClick={() => {
              onTemplateBtnClick(value);
            }}
            label={SmsReplaceKeyEnumKr[value]}
          />
        ))}
      </div>
      <div className="JDz-index-1 flex-grid flex-grid--start">
        {/* props 로부터 받아서 쓸거임. onChange시에는 뮤테이션을 날리겠지. */}
        <JDselect
          isMulti
          size={SelectBoxSize.FIVE}
          options={AUTO_SEND_OP}
          {...autoSendHook}
          label="자동발신"
        />
        <JDselect
          size={SelectBoxSize.FOUR}
          options={SMS_TARGET_OP}
          {...sendTargetHook}
          label="발신대상"
        />
        <Switch label="활성화" />
      </div>
      <div>
        <Button onClick={handleCreateBtnClick} thema="primary" label="추가" />
        <Button onClick={handleUpdateBtnClick} thema="primary" label="수정" />
        <Button onClick={handleDeleteBtnClick} thema="warn" label="삭제" />
      </div>
    </Fragment>
  );
};

export default ErrProtecter(HouseCard);
