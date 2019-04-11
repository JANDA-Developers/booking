/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { SketchPicker } from 'react-color';
import Modal from '../../../../atoms/modal/Modal';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Button';
import utils from '../../../../utils/utils';
import { IUseModal, TUseInput } from '../../../../actions/hook';
import JDdayPicker from '../../../../components/dayPicker/DayPicker';
import { ISeasonValue } from './seasonModalWrap';

interface IsetModalValue extends React.Dispatch<React.SetStateAction<ISeasonValue>> {}

interface IProps {
  modalValue: ISeasonValue;
  modalHook: IUseModal;
  setModalValue: IsetModalValue;
  updateSeasonMutation(): any;
  deleteSeasonMutation(): any;
  createSeasonMutation(): any;
}

const SeasonModal: React.SFC<IProps> = ({
  createSeasonMutation,
  deleteSeasonMutation,
  updateSeasonMutation,
  setModalValue,
  modalHook,
}) => {
  const validater = (): boolean => false;

  const onDeleteTable = (): void => {
    deleteSeasonMutation();
    modalHook.closeModal();
  };

  const onCreateTable = async (): Promise<void> => {
    if (await validater()) {
      modalHook.closeModal();
      createSeasonMutation();
    }
  };

  const onUpdateTable = async (): Promise<void> => {
    if (await validater()) {
      updateSeasonMutation();
      modalHook.closeModal();
    }
  };

  return (
    <Modal onRequestClose={modalHook.closeModal} isOpen={modalHook.isOpen}>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <InputText label="시즌명" validation={utils.isMaxOver} max={10} />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <JDdayPicker input label="input" isRange />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <JDdayPicker input label="input" isRange />
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
export default SeasonModal;
