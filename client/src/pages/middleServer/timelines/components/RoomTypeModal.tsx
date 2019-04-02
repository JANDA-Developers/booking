import React, { useState } from 'react';
import Modal from '../../../../atoms/modal/Modal';
import { useInput, useSelect } from '../../../../actions/hook';
import SelectBox from '../../../../atoms/forms/SelectBox';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Buttons';

interface IProps {
  createRoomTypeMutation: any;
  modalHook: any;
  roomData: any;
  setValue: any;
  value: any;
}

const RoomTypeModal: React.SFC<IProps> = ({ modalHook, createRoomTypeMutation, roomData, setValue, value }) => {
  const bookerNameHook = useInput('');
  const bookerPhoneHook = useInput('');
  const bookerPrice = useInput('');
  const bookerStatueHook = useSelect('');

  return (
    <Modal
      center={false} //이거 제거 필요
      style={{
        content: {
          maxWidth: '800px',
        },
      }}
      isOpen={modalHook.isOpen}
      onRequestClose={modalHook.closeModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <InputText value={value.name} label="타입이름" />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <InputText value={value.peopleCountMax} label="최대인원" />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <InputText label="" />
        </div>
        <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
          <InputText textarea label="방타입 추가설명" />
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

export default RoomTypeModal;
