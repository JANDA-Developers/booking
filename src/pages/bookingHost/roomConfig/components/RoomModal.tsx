/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "../../../../atoms/modal/Modal";
import InputText from "../../../../atoms/forms/inputText/InputText";
import utils, { toNumber, s4 } from "../../../../utils/utils";
import { IUseModal, LANG, useSelect } from "../../../../hooks/hook";
import { IContext } from "../../BookingHostRouter";
import { IRoom } from "../../../../types/interface";
import Button from "../../../../atoms/button/Button";
import { IRoomModalInfo, TRoomModalSubmit, TMode } from "../declation";
import { isNumber } from "../../../../utils/inputValidations";
import { DEFAULT_ROOMTYPE_ROOM } from "../../../../types/defaults";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import selectOpCreater from "../../../../utils/selectOptionCreater";
import ModalEndSection from "../../../../atoms/modal/components/ModalEndSection";

interface IProps {
  modalHook: IUseModal<IRoomModalInfo>;
  context: IContext;
  onSubmit: TRoomModalSubmit;
}

const RoomModal: React.FC<IProps> = ({ modalHook, onSubmit }) => {
  const { info } = modalHook;
  const { mode, room, roomType } = info;
  const isCreateMode = mode === "create";
  const [data, setData] = useState<IRoom[]>([room || DEFAULT_ROOMTYPE_ROOM]);
  const countOp = selectOpCreater({
    count: 100,
    labelAdd: LANG("unit"),
    start: 1
  });
  const createCountHook = useSelect(countOp[0]);
  const [createStartNumber, setCreateStartNumber] = useState<number>();

  const handleSubmit = (mode: TMode) => {
    let datas;
    if (mode === "create") {
      datas = roomDatasGet();
      onSubmit(datas, roomType, mode);
    } else {
      onSubmit(data, roomType, mode);
    }
  };

  // Make Multiple Room Data
  function roomDatasGet() {
    const tempDatas = [];
    for (let i = 0; i < (createCountHook.selectedOption?.value || 0); i++) {
      const data = Object.assign({}, DEFAULT_ROOMTYPE_ROOM);
      data._id = s4();
      data.name = (toNumber(createStartNumber || 0) + i).toString();
      tempDatas.push(data);
    }
    return tempDatas;
  }

  function set<T extends keyof IRoom>(key: T, value: IRoom[T]) {
    const target = data[0];
    target[key] = value;
    setData([target]);
  }

  return (
    <Modal
      visibleOverflow
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
          {mode === "update" && (
            <InputText
              onChange={v => {
                set("name", v);
              }}
              value={data[0].name}
              id="RoomName"
              label={"RoomNumber"}
              validation={utils.isMaxOver}
              max={10}
            />
          )}
          {mode === "create" && (
            <div className="JDflex JDz-index-2">
              <InputText
                id="RoomNameInput"
                onChange={v => {
                  setCreateStartNumber(v);
                }}
                value={createStartNumber}
                label={LANG("room_start_number")}
                validation={isNumber}
                max={10}
              />
              <JDselect
                id="RoomCountSelect"
                label={LANG("room_count")}
                options={countOp}
                {...createCountHook}
              />
            </div>
          )}
        </div>
      </div>
      <ModalEndSection>
        <Button
          disabled={!isCreateMode}
          id="RoomCreateBtn"
          mode="flat"
          thema="primary"
          label={LANG("do_create")}
          size="small"
          onClick={async () => {
            handleSubmit("create");
          }}
        />
        <Button
          id="DoUpdateBtn"
          mode="flat"
          thema="primary"
          label={LANG("do_modify")}
          size="small"
          disabled={isCreateMode}
          onClick={() => {
            handleSubmit("update");
          }}
        />
        <Button
          id="RoomDeleteBtn"
          mode="flat"
          thema="primary"
          label={LANG("do_delete")}
          size="small"
          disabled={isCreateMode}
          onClick={() => {
            handleSubmit("delete");
          }}
        />
      </ModalEndSection>
    </Modal>
  );
};
export default RoomModal;
