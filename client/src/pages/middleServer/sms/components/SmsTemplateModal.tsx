
import React, { Fragment } from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import {IUseModal} from "../../../../actions/hook";
import SmsTemplate from "./smsTemplate";
import Button from "../../../../atoms/button/Button";
interface Iprops {
  context: IContext;
  modalHook: IUseModal;
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

const SmsTemplateModal: React.FC<Iprops> = ({context, modalHook}) => {
  const [messageValue, setMessage] = useState(
    smsMsgParser(templateData.smsFormat, KR_SMS_PARSER)
  );
  const enableHook = useSwitch(
    templateData.smsSendCase ? templateData.smsSendCase.enable : false
  );
  const autoSendHook = useSelect<AutoSendWhen | null>({
    value: templateData.smsSendCase ? templateData.smsSendCase.when : null,
    label: templateData.smsSendCase
      ? AutoSendWhenKr[templateData.smsSendCase.when]
      : "발송안함"
  });
  const sendTargetHook = useSelect<SendTarget | null>({
    value: templateData.smsSendCase ? templateData.smsSendCase.who : null,
    label: templateData.smsSendCase
      ? SendTargetKr[templateData.smsSendCase.who]
      : "발송안함"
  });

  const AutoSendWhenTemp =
    sendTargetHook.selectedOption &&
    sendTargetHook.selectedOption.value &&
    autoSendHook.selectedOption &&
    autoSendHook.selectedOption.value
      ? {
          enable: enableHook.checked,
          when: autoSendHook.selectedOption.value!,
          who: sendTargetHook.selectedOption.value!
        }
      : null;

  const tempTemplateVariables = {
    houseId: houseId,
    params: {
      formatName: templateTitle,
      smsFormat: smsMessageFormatter(messageValue),
      smsSendCase: AutoSendWhenTemp
    }
  };

  const hanldeTemplateBtnClick = (label: string) => {
    setMessage(`${messageValue} ${label}`);
  };
  const handleCreateBtnClick = () => {
    smsTemplateMutationes.createSmsTemplateMu({
      variables: tempTemplateVariables
    });
  };
  const handleDeleteBtnClick = () => {
    smsTemplateMutationes.deleteSmsTemplateMu({
      variables: {
        smsInfoId: smsInfo._id,
        smsTemplateId: templateData._id
      }
    });
  };
  const handleUpdateBtnClick = () => {
    smsTemplateMutationes.updateSmsTemplateMu({
      variables: {
        ...tempTemplateVariables,
        smsTemplateId: templateData._id
      }
    });
  };

  const tempArr = SmsReplaceKeyEnumKeys;

  return (
    <JDmodal {...modalHook}>
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
                hanldeTemplateBtnClick(SmsReplaceKeyEnumKr[value]);
              }}
              key={`templateBtn${templateData._id}${value}`}
              label={SmsReplaceKeyEnumKr[value]
                .replace("[", "")
                .replace("]", "")}
            />
          ))}
        </div>
        <div className="JDz-index-1 flex-grid flex-grid--start">
          {/* props 로부터 받아서 쓸거임. onChange시에는 뮤테이션을 날리겠지. */}
          <JDselect
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
          <Switch {...enableHook} label="자동발신 활성화" />
        </div>
        <div>
          {/* <Button onClick={handleCreateBtnClick} thema="primary" label="추가" /> */}
          <Button onClick={handleUpdateBtnClick} thema="primary" label="수정" />
          <Button onClick={handleDeleteBtnClick} thema="error" label="삭제" />
        </div>
      </Fragment>
      <div className="JDmodal__endSection">
        <Button
          size="small"
          label="생성하기"
          thema="primary"
          onClick={handleCreateBtnClick}
        />
        <Button
          size="small"
          label="수정하기"
          thema="primary"
          onClick={handleUpdateBtnClick}
        />
        <Button
          size="small"
          label="예약삭제"
          thema="error"
          onClick={handleDeletBtnClick}
        />
      </div>
    </JDmodal>
  );
};

export default SmsTemplateModal;
