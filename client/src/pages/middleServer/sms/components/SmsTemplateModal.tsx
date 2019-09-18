import React, {Fragment, useState} from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import {
  IUseModal,
  useSwitch,
  useSelect,
  useInput
} from "../../../../actions/hook";
import SmsTemplate from "./smsTemplate";
import Button from "../../../../atoms/button/Button";
import {smsMsgParser, smsMessageFormatter} from "../../../../utils/utils";
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
import {IContext} from "../../../MiddleServerRouter";
import {DEFAULT_SMS_TEMPLATE} from "../../../../types/defaults";
import {
  AutoSendWhenKr,
  SmsReplaceKeyEnumKr,
  SmsReplaceKeyEnumKeys,
  SendTargetKr,
  KR_SMS_PARSER,
  AUTO_SEND_OP,
  SMS_TARGET_OP,
  SmsReplaceKeyEnum
} from "../../../../types/enum";
import InputText from "../../../../atoms/forms/inputText/InputText";
import {MutationFn} from "react-apollo";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDselect, {
  SelectBoxSize
} from "../../../../atoms/forms/selectBox/SelectBox";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import Help from "../../../../atoms/Help/Help";
import {IconSize} from "../../../../atoms/icons/Icons";

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
  const {house} = context;
  const {_id: houseId} = house;
  const {templateId, isAdd} = modalHook.info;
  const {smsTemplates = []} = smsInfo;
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
    smsMsgParser(defaultSmsFormat, KR_SMS_PARSER)
  );
  const enableHook = useSwitch(
    defulatSmsSendCase ? defulatSmsSendCase.enable : false
  );
  const autoSendHook = useSelect<AutoSendWhen | null>({
    value: defulatSmsSendCase ? defulatSmsSendCase.when : null,
    label: defulatSmsSendCase
      ? AutoSendWhenKr[defulatSmsSendCase.when]
      : "발송안함"
  });
  const sendTargetHook = useSelect<SendTarget | null>({
    value: defulatSmsSendCase ? defulatSmsSendCase.who : null,
    label: defulatSmsSendCase
      ? SendTargetKr[defulatSmsSendCase.who]
      : "발송안함"
  });
  const templateTitleHook = useInput(defaultFormatName);

  const {selectedOption: sendTSO} = sendTargetHook;
  const {selectedOption: sendASO} = autoSendHook;
  const AutoSendWhenTemp =
    sendTSO && sendTSO.value && sendASO && sendASO.value
      ? {
          enable: enableHook.checked,
          when: sendASO.value!,
          who: sendTSO.value!
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
    <JDmodal visibleOverflow {...modalHook}>
      <Fragment>
        <div>
          <InputText {...templateTitleHook} label="템플릿 타이틀" />
        </div>
        <div>
          <InputText
            value={messageValue}
            onChange={setMessage}
            label="발신 메세지"
            textarea
            doubleHeight
          />
        </div>
        <div>
          <div>
            <JDLabel txt="템플릿 메세지" />
          </div>
          {SmsReplaceKeyEnumKeys.map((value: any) => (
            <Button
              onClick={() => {
                hanldeTemplateBtnClick(
                  // @ts-ignore
                  SmsReplaceKeyEnumKr[value]
                );
              }}
              key={`templateBtn${templateData._id}${value}`}
              label={
                // @ts-ignore
                SmsReplaceKeyEnumKr[value].replace("[", "").replace("]", "")
              }
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
          <JDswitch
            {...enableHook}
            label={
              <span>
                <span className="JDstandard-small-space">
                  자동발신 활성화 여부
                </span>
                <Help
                  tooltip="자동 발신을 해두시면해당 메세지는 설정된 상황에 맞게 자동으로 발송됨니다."
                  icon={"help"}
                  size={IconSize.DEFAULT}
                />
              </span>
            }
          />
        </div>
        <div></div>
      </Fragment>
      <div className="JDmodal__endSection">
        <Button
          size="small"
          label={isAdd ? "생성하기" : "복제하기"}
          thema="primary"
          onClick={handleCreateBtnClick}
        />
        <Button
          size="small"
          label="수정하기"
          thema="primary"
          disabled={isAdd}
          onClick={handleUpdateBtnClick}
        />
        <Button
          size="small"
          label="예약삭제"
          thema="error"
          disabled={isAdd}
          onClick={handleDeleteBtnClick}
        />
      </div>
    </JDmodal>
  );
};

export default SmsTemplateModal;
