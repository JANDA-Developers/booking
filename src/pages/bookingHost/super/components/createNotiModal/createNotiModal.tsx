import React from "react";
import { MutationFn } from "react-apollo";
import { createNoti, createNotiVariables } from "../../../../../types/api";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import JDselect from "../../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../../atoms/button/Button";
import {
  IUseModal,
  useInput,
  useSelect,
  useDayPicker,
  useModal,
  LANG
} from "../../../../../hooks/hook";
import JDbox from "../../../../../atoms/box/JDbox";
import { NotiType } from "../../../../../types/enum";
import { NOTI_LEVEL_OP } from "../../../../../types/const";
import { IContext } from "../../../BookingHostRouter";
import JDmodal from "../../../../../atoms/modal/Modal";
import JDdayPicker from "../../../../../atoms/dayPicker/DayPicker";
import DayPickerModal from "../../../../../components/dayPickerModal/DayPickerModal";
import { ICreateNotiModalParam } from "./createNotiModalWrap";
import ModalEndSection from "../../../../../atoms/modal/components/ModalEndSection";

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
    info: { target, targetIds }
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
      <h6>{LANG("send_notification")}</h6>
      <div>
        <JDbox label={LANG("noti_target")} mode="border">
          <JDbox>{target}</JDbox>
        </JDbox>
      </div>
      <div>
        <JDselect
          options={NOTI_LEVEL_OP}
          {...notiLevelHook}
          label={LANG("noti_level")}
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
            mode="input"
            format={`YY${LANG("year")} MM${LANG("month")} DD${LANG(
              "date"
            )} ${LANG("till")}`}
            calenaderPosition="center"
            {...validPeriodHook}
            label={LANG("noti_period")}
          />
        </div>
      </div>
      <div>
        <InputText {...titleHook} label={LANG("noti_title")} />
      </div>
      <div>
        <InputText {...msgHook} textarea label={LANG("noti_msg")} />
      </div>
      <ModalEndSection>
        <Button
          size="small"
          mode="flat"
          onClick={handleClickSendBtn}
          thema="primary"
          label={LANG("send")}
        />
        <DayPickerModal
          canSelectBeforeDay={false}
          isRange={false}
          {...validPeriodHook}
          modalHook={dayPickerModalHook}
        />
      </ModalEndSection>
    </JDmodal>
  );
};

export default CreateNotiModal;
