import React from "react";
import {MutationFn} from "react-apollo";
import {createNoti, createNotiVariables} from "../../../../types/api";
import InputText from "../../../../atoms/forms/inputText/InputText";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../atoms/button/Button";
import {
  IUseModal,
  useInput,
  useSelect,
  useDayPicker,
  useModal
} from "../../../../hooks/hook";
import JDbox from "../../../../atoms/box/JDbox";
import {NOTI_LEVEL_OP, NotiType} from "../../../../types/enum";
import {IContext} from "../../../MiddleServerRouter";
import JDmodal from "../../../../atoms/modal/Modal";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import DayPickerModal from "../../../../components/dayPickerModal/DayPickerModal";
import {ICreateNotiModalParam} from "./createNotiModalWrap";

interface Iprops {
  context: IContext;
  createNotiMu: MutationFn<createNoti, createNotiVariables>;
  modalHook: IUseModal<ICreateNotiModalParam>;
}

const CreateNotiModal: React.FC<Iprops> = ({
  context,
  createNotiMu,
  modalHook
}) => {
  const {
    info: {target, targetIds}
  } = modalHook;
  const msgHook = useInput("");
  const titleHook = useInput("");
  const validPeriodHook = useDayPicker(null, null);
  const notiLevelHook = useSelect(NOTI_LEVEL_OP[0]);
  const dayPickerModalHook = useModal(false);

  const handleClickSendBtn = () => {
    createNotiMu({
      variables: {
        houseIds: targetIds || [],
        createNotiParams: {
          msg: msgHook.value,
          notiLevel:
            notiLevelHook.selectedOption && notiLevelHook.selectedOption.value,
          title: titleHook.value,
          validPeriod: validPeriodHook.from,
          notiType: target === NotiType.TO_ALL ? NotiType.TO_ALL : NotiType.ELSE
        }
      }
    });
  };

  return (
    <JDmodal visibleOverflow {...modalHook}>
      <h6>알림 보내기</h6>
      <div>
        <JDbox label="알림 대상" mode="border">
          <JDbox>{target}</JDbox>
        </JDbox>
      </div>
      <div>
        <JDselect
          options={NOTI_LEVEL_OP}
          {...notiLevelHook}
          label="알람 중요도"
        />
      </div>
      <div>
        <div
          onClick={() => {
            dayPickerModalHook.openModal();
          }}
        >
          <JDdayPicker
            readOnly
            canSelectBeforeDay={false}
            isRange={false}
            input
            format={"YY년 MMLANG("month") DD일 까지"}
            calenaderPosition="center"
            {...validPeriodHook}
            label="알람 기간"
          />
        </div>
      </div>
      <div>
        <InputText {...titleHook} label="알림제목" />
      </div>
      <div>
        <InputText {...msgHook} textarea label="알림내용" />
      </div>
      <div className="JDmodal__endSection">
        <Button
          size="small"
          mode="flat"
          onClick={handleClickSendBtn}
          thema="primary"
          label="전송"
        />
        <DayPickerModal
          displayInfo={false}
          canSelectBeforeDay={false}
          isRange={false}
          {...validPeriodHook}
          modalHook={dayPickerModalHook}
        />
      </div>
    </JDmodal>
  );
};

export default CreateNotiModal;
