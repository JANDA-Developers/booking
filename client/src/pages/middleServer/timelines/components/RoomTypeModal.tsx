/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../../../atoms/modal/Modal';
import SelectBox, { IselectedOption } from '../../../../atoms/forms/SelectBox';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Button';
import JDLabel from '../../../../atoms/label/JDLabel';
import ImageUploader from '../../../../components/imageUploader/ImageUploader';
import {
  PricingType,
  RoomGender,
  PricingTypeKr,
  RoomGenderKr,
  MAX_PEOPLE_COUNT_OP_FN,
  ROOM_GENDER_OP,
  PRICING_TYPE_OP,
} from '../../../../types/apiEnum';

interface IProps {
  createRoomTypeMutation: any;
  deleteRoomTypeMutation: any;
  updateRoomTypeMutation: any;
  modalHook: any;
  roomData: any;
  setValue: any;
  value: any;
  roomImageHook: any;
}

const RoomTypeModal: React.SFC<IProps> = ({
  modalHook,
  createRoomTypeMutation,
  deleteRoomTypeMutation,
  updateRoomTypeMutation,
  roomData,
  setValue,
  value,
  roomImageHook,
}) => {
  const [peopleCountOption, setPeopleCountOption] = useState<IselectedOption[]>([]);

  const validater = () => {
    if (value.name === '') {
      toast.error('방타입명을 입력해주세요.');
      return false;
    }
    return true;
  };

  const onCreateRoomType = async () => {
    if (await validater()) {
      createRoomTypeMutation();
      modalHook.closeModal();
    }
  };

  const onDeleteRoomType = async () => {
    if (await validater()) {
      deleteRoomTypeMutation();
      modalHook.closeModal();
    }
  };

  const onUpdateRoomType = async () => {
    if (await validater()) {
      updateRoomTypeMutation();
      modalHook.closeModal();
    }
  };

  const onChangeMaxPeople = (inValue: any) => {
    setValue({ ...value, peopleCountMax: inValue });

    // 🔶 Deprecated
    const inPeopleCountOption = [];
    for (let i = 1; i <= inValue.value; i += 1) {
      const tmp = { value: i, label: `${i}명` };
      inPeopleCountOption.push(tmp);
    }

    setPeopleCountOption(inPeopleCountOption);
  };

  const maxPeopleCountOption = MAX_PEOPLE_COUNT_OP_FN();

  const pricingTypeOptions = PRICING_TYPE_OP;

  const genderOptions = ROOM_GENDER_OP;

  return (
    <Modal
      onRequestClose={modalHook.closeModal}
      overlayClassName="Overlay"
      isOpen={modalHook.isOpen}
      center={false} // 이거 제거 필요
      className="Modal"
      style={{
        content: {
          maxWidth: '600px',
        },
      }}
    >
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <InputText
            label="방타입이름"
            value={value.name}
            onChange={(inValue: any) => {
              setValue({ ...value, name: inValue });
            }}
          />
        </div>
        {/* <div className="flex-grid__col  col--full-3 col--lg-6 col--md-12">
          <SelectBox
            label="수용인원"
            disabled={false}
            onChange={(inValue: any) => {
              setValue({ ...value, peopleCount: inValue });
            }}
            options={peopleCountOption}
            selectedOption={value.peopleCount}
          />
        </div> */}
        <div className="flex-grid__col  col--full-6 col--lg-6 col--md-12">
          <SelectBox
            label="수용인원"
            disabled={false}
            onChange={onChangeMaxPeople}
            options={maxPeopleCountOption}
            selectedOption={value.peopleCountMax}
          />
        </div>
        <div className="flex-grid__col  col--full-6 col--lg-6 col--md-12">
          <SelectBox
            label="방타입선택"
            disabled={false}
            onChange={(inValue: any) => {
              setValue({ ...value, pricingType: inValue });
            }}
            options={pricingTypeOptions}
            selectedOption={value.pricingType}
          />
        </div>
        <div className="flex-grid__col  col--full-6 col--lg-6 col--md-12">
          <SelectBox
            label="방성별선택"
            disabled={false}
            onChange={(inValue: IselectedOption) => {
              setValue({ ...value, roomGender: inValue });
            }}
            options={genderOptions}
            selectedOption={value.roomGender}
          />
        </div>
        <div className="flex-grid__col flex-grid__col--vertical col--full-12 col--lg-12 col--md-12">
          <JDLabel txt="방사진" />
          <ImageUploader {...roomImageHook} minHeight="200px" />
        </div>
        <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
          <InputText
            onChange={(inValue: any) => {
              setValue({ ...value, description: inValue });
            }}
            value={value.description}
            textarea
            label="방타입 추가설명"
          />
        </div>
      </div>
      <div className="JDmodal__endSection">
        <Button thema="primary" label="생성하기" mode="flat" onClick={onCreateRoomType} />
        <Button thema="primary" label="수정하기" mode="flat" onClick={onUpdateRoomType} />
        <Button thema="warn" label="삭제하기" mode="flat" onClick={onDeleteRoomType} />
        {/* <Button label="닫기" mode="flat" onClick={modalHook.closeModal} /> */}
      </div>
    </Modal>
  );
};

RoomTypeModal.defaultProps = {
  roomData: {},
  setValue: () => {},
  value: {},
};

export default RoomTypeModal;
