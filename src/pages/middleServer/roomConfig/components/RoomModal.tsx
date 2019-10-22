/* eslint-disable react/prop-types */
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import Modal from "../../../../atoms/modal/Modal";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Button from "../../../../atoms/button/Button";
import utils from "../../../../utils/utils";
import {LANG} from "../../../../hooks/hook";

interface IProps {
  modalHook: any;
  roomNameHook: any;
  createRoomMutation: any;
  updateRoomMutation: any;
  deleteRoomMutation: any;
  isAddMode?: boolean;
}

const RoomTypeModal: React.FC<IProps> = ({
  modalHook,
  roomNameHook,
  createRoomMutation,
  updateRoomMutation,
  deleteRoomMutation,
  isAddMode
}) => {
  const validater = (): boolean => {
    if (!roomNameHook.isValid) {
      toast.warn("방이름은 10자 이하여야합니다.");
      return false;
    }
    return true;
  };

  const onDeleteRoom = (): void => {
    deleteRoomMutation();
    modalHook.closeModal();
  };

  const onCreateRoom = async (): Promise<void> => {
    if (await validater()) {
      modalHook.closeModal();
      createRoomMutation();
    }
  };

  const onUpdateRoom = async (): Promise<void> => {
    if (await validater()) {
      updateRoomMutation();
      modalHook.closeModal();
    }
  };

  return (
    <Modal
      {...modalHook}
      overlayClassName="Overlay"
      center={false} // 이거 제거 필요
      className="Modal"
      style={{
        content: {
          maxWidth: "800px"
        }
      }}
    >
      <div className="flex-grid">
        <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
          <InputText
            label={LANG("room_name")}
            {...roomNameHook}
            validation={utils.isMaxOver}
            max={10}
          />
        </div>
      </div>
      <div className="JDmodal__endSection">
        <Button
          label={LANG("do_create")}
          thema="primary"
          size="small"
          onClick={onCreateRoom}
        />
        <Button
          label={LANG("do_modify")}
          thema="primary"
          size="small"
          disabled={isAddMode}
          onClick={onUpdateRoom}
        />
        <Button
          label={LANG("do_delete")}
          size="small"
          thema="error"
          disabled={isAddMode}
          onClick={onDeleteRoom}
        />
      </div>
    </Modal>
  );
};
export default RoomTypeModal;
