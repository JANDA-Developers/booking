/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../../../atoms/modal/Modal';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Button';
import utils from '../../../../utils/utils';
import { TUseModal, TUseInput } from '../../../../actions/hook';
import JDdayPicker from '../../../../components/dayPicker/DayPicker';

interface IProps {
  modalHook: TUseModal;
  seasonNameHook: TUseInput;
}

const RoomTypeModal: React.SFC<IProps> = ({ modalHook, seasonNameHook }) => {
  const validater = (): boolean => false;

  const onDeleteTable = (): void => {
    deleteRoomMutation();
    modalHook.closeModal();
  };

  const onCreateTable = async (): Promise<void> => {
    if (await validater()) {
      modalHook.closeModal();
      createRoomMutation();
    }
  };

  const onUpdateTable = async (): Promise<void> => {
    if (await validater()) {
      updateRoomMutation();
      modalHook.closeModal();
    }
  };

  return (
    <Modal onRequestClose={modalHook.closeModal} isOpen={modalHook.isOpen}>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <InputText label="시즌명" {...seasonNameHook} validation={utils.isMaxOver} max={10} />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <DayPicker input label="input" isRange />
        </div>
      </div>
      <div className="ReactModal__EndSection">
        <Button label="생성하기" mode="flat" onClick={onCreateTable} />
        <Button label="수정하기" mode="flat" onClick={onUpdateTable} />
        <Button label="삭제하기" mode="flat" onClick={onDeleteTable} />
        <Button label="닫기" mode="flat" onClick={modalHook.closeModal} />
      </div>
    </Modal>
  );
};
export default RoomTypeModal;
