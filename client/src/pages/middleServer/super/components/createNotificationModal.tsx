import React from "react";
import {MutationFn} from "react-apollo";
import {
  createNotification,
  createNotificationVariables
} from "../../../../types/api";
import InputText from "../../../../atoms/forms/inputText/InputText";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../atoms/button/Button";
import {
  IUseModal,
  useInput,
  useSelect,
  useDayPicker
} from "../../../../actions/hook";
import JDbox from "../../../../atoms/box/JDbox";
import {NOTI_LEVEL_OP, NotificationType} from "../../../../types/enum";
import {IContext} from "../../../MiddleServerRouter";
import JDmodal from "../../../../atoms/modal/Modal";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";

interface Iprops {
  context: IContext;
  createNotiMu: MutationFn<createNotification, createNotificationVariables>;
  modalHook: IUseModal;
  target: string | NotificationType.TO_ALL;
}

const CreateNotificationModal: React.FC<Iprops> = ({
  context,
  createNotiMu,
  modalHook,
  target
}) => {
  const houseId = context.house._id;
  const msgHook = useInput("");
  const titleHook = useInput("");
  const validPeriodHook = useDayPicker(null, null);
  const notiLevelHook = useSelect(NOTI_LEVEL_OP[0]);

  const handleClickSendBtn = () => {
    createNotiMu({
      variables: {
        houseId,
        createNotificationParams: {
          msg: msgHook.value,
          notiLevel:
            notiLevelHook.selectedOption && notiLevelHook.selectedOption.value,
          title: titleHook.value,
          validPeriod: validPeriodHook.from,
          notiType:
            target === NotificationType.TO_ALL
              ? NotificationType.TO_ALL
              : NotificationType.ELSE
        }
      }
    });
  };

  return (
    <JDmodal {...modalHook}>
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
        <JDdayPicker
          selectBeforeDay={false}
          isRange={false}
          input
          {...validPeriodHook}
          label="알람 기간"
        />
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
      </div>
    </JDmodal>
  );
};

export default CreateNotificationModal;
