import React, {useState, Fragment} from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDselect, {
  SelectBoxSize
} from "../../../../atoms/forms/selectBox/SelectBox";
import {AUTO_SEND_OP, SMS_TARGET_OP} from "../../../../types/enum";
import {useSelect, useInput} from "../../../../actions/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Switch from "../../../../atoms/forms/switch/Switch";
import Button from "../../../../atoms/button/Button";
import {ErrProtecter} from "../../../../utils/utils";
import {getSmsInfo_GetSmsInfo_smsInfo_smsTemplates} from "../../../../types/api";

interface IProps {
  templateData: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates;
}

const HouseCard: React.SFC<IProps> = ({templateData}) => {
  const [messageValue, setMessage] = useState(templateData.smsFormat);
  const autoSendHook = useSelect({value: templateData.smsFormat, label: ""});
  const sendTargetHook = useSelect({value: templateData.smsFormat, label: ""});

  const onTemplateBtnClick = (label: string) => {
    setMessage(`${messageValue} [${label}]`);
  };

  const tempArr = [
    "숙박날자(월/일)",
    "숙박날자(년/월/일)",
    "방타입(인원수)",
    "예약자명",
    "금액"
  ];

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
        {tempArr.map(value => (
          <Button
            onClick={() => {
              onTemplateBtnClick(value);
            }}
            label={value}
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
        <Button thema="primary" label="추가" />
        <Button thema="primary" label="수정" />
        <Button thema="warn" label="삭제" />
      </div>
    </Fragment>
  );
};

export default ErrProtecter(HouseCard);
