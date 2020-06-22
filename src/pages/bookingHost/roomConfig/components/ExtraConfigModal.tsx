import React from "react";
import {
  JDmodal,
  JDbutton,
  IUseModal,
  useInput,
  JDalign,
  JDlabel,
} from "@janda-com/front";
import { InputText } from "@janda-com/front";
import { TChangeTags } from "../RoomConfigWrap";
import { ExtraRoomTypeConfig } from "../../../../types/enum";
import ModalEndSection from "../../../../atoms/modal/components/ModalEndSection";
import JDradio from "../../../../atoms/forms/radio/Radio";
import { useRadio } from "@janda-com/front";

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
  const [value, setValue] = useRadio("");
  
  return (
    <JDmodal {...tagModalHook}>
      <JDalign>
        <JDalign flex>
          <div>
            <InputText label="부가설명" textarea {...inputTextHook} />
          </div>
          <div>
            <InputText label="상세설명" textarea {...detailTextHook} />
          </div>
        </JDalign>
        <JDlabel txt="이미지 비율" />
        <div>
        <JDradio 
          selectedValue={value}
          onChange={setValue}
          value="16:9"
          id="RD1--1"
          label="16:9" 
          groupName="ImgRatio"
        />
        <JDradio 
        selectedValue={value}
        onChange={setValue} value="16:9" groupName="ImgRatio" id="RD1--2" label="3:4" />
        </div>
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
