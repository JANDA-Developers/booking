/* eslint-disable react/prop-types */
import { MutationFn } from 'react-apollo';
import React, { useState, Fragment, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../../../atoms/modal/Modal';
import SelectBox, { IselectedOption } from '../../../../atoms/forms/SelectBox';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Button';
import JDLabel from '../../../../atoms/label/JDLabel';
import ImageUploader from '../../../../atoms/imageUploader/ImageUploader';
import {
  PricingType,
  RoomGender,
  PricingTypeKr,
  RoomGenderKr,
  MAX_PEOPLE_COUNT_OP_FN,
  ROOM_GENDER_OP,
  PRICING_TYPE_OP,
} from '../../../../types/enum';
import { IUseModal, useImageUploader } from '../../../../actions/hook';
import {
  createRoomType,
  createRoomTypeVariables,
  deleteRoomType,
  deleteRoomTypeVariables,
  updateRoomType,
  updateRoomTypeVariables,
  getRoomTypeById_GetRoomTypeById_roomType as IRoomType,
} from '../../../../types/api';
import { IDefaultRoomType } from './RoomTypeModalWrap';
import Preloader from '../../../../atoms/preloader/Preloader';

interface IProps {
  houseId: string;
  createRoomTypeMutation: MutationFn<createRoomType, createRoomTypeVariables>;
  deleteRoomTypeMutation: MutationFn<deleteRoomType, deleteRoomTypeVariables>;
  updateRoomTypeMutation: MutationFn<updateRoomType, updateRoomTypeVariables>;
  loading: boolean;
  modalHook: IUseModal;
  roomTypeData: IRoomType | IDefaultRoomType;
}

const RoomTypeModal: React.SFC<IProps> = ({
  modalHook,
  houseId,
  loading,
  createRoomTypeMutation,
  deleteRoomTypeMutation,
  updateRoomTypeMutation,
  roomTypeData,
}) => {
  const roomImageHook = useImageUploader();
  const [value, setValue] = useState({
    name: roomTypeData.name,
    description: roomTypeData.description,
    pricingType: { label: PricingTypeKr[roomTypeData.pricingType], value: roomTypeData.pricingType },
    peopleCount: { label: `${roomTypeData.peopleCount}개`, value: roomTypeData.peopleCount },
    roomGender: { label: RoomGenderKr[roomTypeData.roomGender], value: roomTypeData.roomGender },
    peopleCountMax: { label: '', value: 0 },
    defaultPrice: roomTypeData.defaultPrice || 0,
  });

  const updateRoomTypeValue = {
    houseId,
    name: value.name,
    img: roomImageHook.fileUrl || undefined,
    pricingType: value.pricingType.value,
    roomGender: value.roomGender.value,
    peopleCount: value.peopleCountMax.value,
    peopleCountMax: value.peopleCountMax.value,
    description: value.description,
    defaultPrice: value.defaultPrice,
  };

  // const [peopleCountOption, setPeopleCountOption] = useState<IselectedOption[]>([]);

  const validater = () => {
    if (value.name === '') {
      toast.error('방타입명을 입력해주세요.');
      return false;
    }
    return true;
  };

  const onCreateRoomType = async () => {
    if (validater()) {
      createRoomTypeMutation({
        variables: updateRoomTypeValue,
      });
      modalHook.closeModal();
    }
  };

  const onDeleteRoomType = async () => {
    deleteRoomTypeMutation();
    modalHook.closeModal();
  };

  const onUpdateRoomType = async () => {
    if (validater()) {
      updateRoomTypeMutation({
        variables: { ...updateRoomTypeValue, roomTypeId: modalHook.info.roomTypeId },
      });
      modalHook.closeModal();
    }
  };

  const onChangeMaxPeople = (inValue: any) => {
    setValue({ ...value, peopleCountMax: inValue });

    // // 🔶 Deprecated
    // const inPeopleCountOption = [];
    // for (let i = 1; i <= inValue.value; i += 1) {
    //   const tmp = { value: i, label: `${i}명` };
    //   inPeopleCountOption.push(tmp);
    // }

    // setValue({ ...value, peopleCount: inValue });
  };

  const maxPeopleCountOption = MAX_PEOPLE_COUNT_OP_FN();

  const pricingTypeOptions = PRICING_TYPE_OP;

  const genderOptions = ROOM_GENDER_OP;

  return (
    <Modal
      overlayClassName="Overlay"
      center={false} // 이거 제거 필요
      className="Modal"
      {...modalHook}
      style={{
        content: {
          maxWidth: '600px',
        },
      }}
    >
      {loading ? (
        <Preloader size="medium" />
      ) : (
        <Fragment>
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
                defaultValue={value.peopleCount}
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
                defaultValue={value.pricingType}
              />
            </div>
            <div className="flex-grid__col  col--full-6 col--lg-6 col--md-12">
              <SelectBox
                label="방성별선택"
                disabled={false}
                onChange={(inValue: IselectedOption) => {
                  setValue({ ...value, roomGender: inValue.value });
                }}
                options={genderOptions}
                defaultValue={value.roomGender}
              />
            </div>
            <div className="flex-grid__col flex-grid__col--vertical col--full-12 col--lg-12 col--md-12">
              <JDLabel txt="방사진" />
              <ImageUploader {...roomImageHook} minHeight="200px" />
            </div>
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
              <InputText
                onChange={(inValue: any) => {
                  setValue({ ...value, description: inValue });
                }}
                value={value.description}
                textarea
                label="방타입 추가설명"
              />
            </div>
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
              <InputText
                onChange={(inValue: any) => {
                  setValue({ ...value, defaultPrice: inValue });
                }}
                comma
                value={value.defaultPrice}
                label="방 기본가격"
              />
              <p className="JDsmall-text">* 가격이 설정되어 있지않은기간 에서 기본으로 적용됨</p>
            </div>
          </div>
          <div className="JDmodal__endSection">
            <Button thema="primary" label="생성하기" mode="flat" onClick={onCreateRoomType} />
            <Button thema="primary" label="수정하기" mode="flat" onClick={onUpdateRoomType} />
            <Button thema="warn" label="삭제하기" mode="flat" onClick={onDeleteRoomType} />
            {/* <Button label="닫기" mode="flat" onClick={modalHook.closeModal} /> */}
          </div>
        </Fragment>
      )}
    </Modal>
  );
};

export default RoomTypeModal;
