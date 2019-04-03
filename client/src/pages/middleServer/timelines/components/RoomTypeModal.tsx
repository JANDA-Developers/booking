/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from '../../../../atoms/modal/Modal';
import { useInput, useSelect, useImageUploader } from '../../../../actions/hook';
import SelectBox from '../../../../atoms/forms/SelectBox';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Buttons';
import JDLabel from '../../../../atoms/label/JDLabel';
import ImageUploader from '../../../../components/imageUploader/ImageUploader';

interface IProps {
  createRoomTypeMutation: any;
  modalHook: any;
  roomData: any;
  setValue: any;
  value: any;
  roomImageHook: any;
}

const RoomTypeModal: React.SFC<IProps> = ({
  modalHook,
  createRoomTypeMutation,
  roomData,
  setValue,
  value,
  roomImageHook,
}) => {
  const maxPeopleCountOption = [
    { value: 1, label: '1명' },
    { value: 2, label: '2명' },
    { value: 3, label: '3명' },
    { value: 4, label: '4명' },
    { value: 5, label: '5명' },
    { value: 6, label: '6명' },
    { value: 7, label: '7명' },
    { value: 8, label: '8명' },
    { value: 9, label: '9명' },
    { value: 10, label: '10명' },
  ];

  return (
    <Modal
      onRequestClose={modalHook.closeModal}
      overlayClassName="Overlay"
      isOpen={modalHook.isOpen}
      center={false} // 이거 제거 필요
      className="Modal"
      style={{
        content: {
          maxWidth: '800px',
        },
      }}
    >
      <div className="flex-grid">
        <div className="flex-grid__col col--full-9 col--lg-6 col--md-12">
          <InputText
            onChange={(inValue:any) => {
              setValue({ ...value, name: inValue });
            }}
            value={value.name}
            label="방타입이름"
          />
        </div>
        <div className="flex-grid__col  col--full-3 col--lg-6 col--md-12">
          <SelectBox
            onChange={(inValue:any) => {
              setValue({ ...value, peopleCountMax: inValue });
            }}
            disabled={false}
            options={maxPeopleCountOption}
            selectedOption={value.peopleCountMax}
            label="최대인원"
            />
        </div>
        <div className="flex-grid__col flex-grid__col--vertical col--full-12 col--lg-12 col--md-12">
          <JDLabel txt="방사진업로드" />
          <ImageUploader {...roomImageHook} minHeight="200px" />
        </div>
        <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
          <InputText
            onChange={(inValue:any) => {
              setValue({ ...value, description: inValue });
            }}
            value={value.description}
            textarea
            label="방타입 추가설명"
          />
        </div>
      </div>
      <div className="ReactModal__EndSection">
        <Button label="생성하기" mode="flat" onClick={modalHook.closeModal} />
        <Button label="수정하기" mode="flat" onClick={modalHook.closeModal} />
        <Button label="삭제하기" mode="flat" onClick={modalHook.closeModal} />
        <Button label="닫기" mode="flat" onClick={modalHook.closeModal} />
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
