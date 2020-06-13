import React from "react";
import {
  JDmodal,
  JDbutton,
  IUseModal,
  useInput,
  JDalign
} from "@janda-com/front";
import { InputText } from "@janda-com/front";
import { TChangeTags } from "../RoomConfigWrap";
import { ExtraRoomTypeConfig } from "../../../../types/enum";
import ModalEndSection from "../../../../atoms/modal/components/ModalEndSection";

export interface IExtraConfigProp {
  describ: string;
  roomTypeId: string;
}

interface IProp {
  tagModalHook: IUseModal<IExtraConfigProp>;
  handleChangTags: TChangeTags;
}

export const ExtraConfigModal: React.FC<IProp> = ({
  tagModalHook,
  handleChangTags
}) => {
  if (!tagModalHook.info) return <div />;
  const { describ, roomTypeId } = tagModalHook.info!;
  const inputTextHook = useInput(describ);
  const detailTextHook = useInput(describ);

  return (
    <JDmodal {...tagModalHook}>
      <JDalign>
        <InputText mr="no" label="부가설명" textarea {...inputTextHook} />
        <InputText label="상세설명" textarea {...detailTextHook} />
      </JDalign>
      <ModalEndSection>
        <JDbutton
          onClick={() => {
            handleChangTags(
              roomTypeId,
              [
                {
                  key: ExtraRoomTypeConfig.ExtraDescrib,
                  value: inputTextHook.value
                },
                {
                  key: ExtraRoomTypeConfig.Detail,
                  value: detailTextHook.value
                }
              ],
              []
            );
          }}
          thema="primary"
          mode="flat"
        >
          확인
        </JDbutton>
        <JDbutton onClick={tagModalHook.closeModal} mode="flat">
          취소
        </JDbutton>
      </ModalEndSection>
    </JDmodal>
  );
};
export default ExtraConfigModal;
