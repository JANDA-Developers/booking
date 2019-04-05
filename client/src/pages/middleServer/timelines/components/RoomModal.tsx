/* eslint-disable react/prop-types */
import React from 'react';
import { toast } from 'react-toastify';
import Modal from '../../../../atoms/modal/Modal';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Buttons';
import utils from '../../../../utils/utils';

interface IProps {
  modalHook: any;
  roomNameHook: any;
  onCreateRoom: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const RoomTypeModal: React.SFC<IProps> = ({ modalHook, roomNameHook, onCreateRoom }) => {

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
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <InputText label="방이름" {...roomNameHook} validation={utils.isMaxOver} max="10" />
        </div>
      </div>
      <div className="ReactModal__EndSection">
        <Button label="생성하기" mode="flat" onClick={onCreateRoom} />
        <Button label="수정하기" mode="flat" onClick={modalHook.closeModal} />
        <Button label="삭제하기" mode="flat" onClick={modalHook.closeModal} />
        <Button label="닫기" mode="flat" onClick={modalHook.closeModal} />
      </div>
    </Modal>
  );
};

export default RoomTypeModal;
