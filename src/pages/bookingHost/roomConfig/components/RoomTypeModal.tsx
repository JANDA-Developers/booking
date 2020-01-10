/* eslint-disable react/prop-types */
import React, { Fragment, useState } from "react";
import Modal from "../../../../atoms/modal/Modal";
import SelectBox from "../../../../atoms/forms/selectBox/SelectBox";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Button from "../../../../atoms/button/Button";
import JDLabel from "../../../../atoms/label/JDLabel";
import ImageUploader from "../../../../atoms/imageUploader/ImageUploader";
import {
  MAX_PEOPLE_COUNT_OP_FN,
  ROOM_GENDER_OP,
  PRICING_TYPE_OP
} from "../../../../types/const";
import {
  IUseModal,
  useImageUploader,
  useModal,
  LANG
} from "../../../../hooks/hook";
import Preloader from "../../../../atoms/preloader/Preloader";
import PriceWarnModal from "../../../../components/priceWarnModal.tsx/PriceWarnModal";
import { IContext } from "../../../bookingHost/BookingHostRouter";
import { IRoomType } from "../../../../types/interface";
import optionFineder from "../../../../utils/optionFinder";
import { IRoomTypeModalInfo, TMode } from "../declation";
import { DEFAULT_ROOMTYPE } from "../../../../types/defaults";
import { toast } from "react-toastify";

interface IProps {
  context: IContext;
  modalHook: IUseModal<IRoomTypeModalInfo>;
  loading?: boolean;
  onSubmit: (roomType: IRoomType, mode: TMode) => void;
}

const RoomTypeModal: React.FC<IProps> = ({ modalHook, loading, onSubmit }) => {
  const { info } = modalHook;
  const { roomType, mode } = info;
  const [data, setData] = useState(roomType || DEFAULT_ROOMTYPE);
  const {
    img,
    name,
    roomGender,
    defaultPrice,
    pricingType,
    peopleCountMax,
    description
  } = data;
  const isCreate = mode === "create";
  const priceWarnModal = useModal(false);
  const roomImageHook = useImageUploader(img, undefined, file => {
    set("img", file);
  });
  const maxPeopleCountOp = MAX_PEOPLE_COUNT_OP_FN();
  const peopleCountMaxOp = optionFineder(maxPeopleCountOp, peopleCountMax);
  const pricingTypeOp = optionFineder(PRICING_TYPE_OP, pricingType);
  const roomGenderOp = optionFineder(ROOM_GENDER_OP, roomGender);
  const modalStyle = {
    content: {
      maxWidth: "600px"
    }
  };

  const validation = () => {
    if (peopleCountMax < 1) {
      toast.warn("please_input_max_people_count");
      return false;
    }
    if (!roomGender) {
      toast.warn("please_select_room_gender");
      return false;
    }
    if (!defaultPrice) {
      toast.warn("please_enter_a_base_price");
      return false;
    }
    if (!pricingTypeOp.value) {
      toast.warn("please_select_room_type");
      return false;
    }
    if (!name) {
      toast.warn("enter_room_type_name");
      return false;
    }
    return true;
  };

  function set<T extends keyof IRoomType>(key: T, value: IRoomType[T]) {
    setData({ ...data, [key]: value });
  }

  return (
    <Modal
      overlayClassName="Overlay"
      center={false} // 이거 제거 필요
      id="RoomTypeModal"
      style={modalStyle}
      {...modalHook}
    >
      {loading && <Preloader loading={loading} size="large" />}
      {loading || (
        <Fragment>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
              <InputText
                id="RoomTypeName"
                placeholder={LANG("room_type_name")}
                label={LANG("room_type_name")}
                value={name}
                onChange={(inValue: any) => {
                  set("name", inValue);
                }}
              />
            </div>
            <div className="JDz-index-3 flex-grid__col JDz-index-4 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                id="CapacitySelecter"
                label={LANG("capacity")}
                disabled={false}
                onChange={op => {
                  set("peopleCount", op.value);
                  set("peopleCountMax", op.value);
                }}
                options={maxPeopleCountOp}
                selectedOption={peopleCountMaxOp}
              />
            </div>
            <div className="flex-grid__col JDz-index-3 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                id="RoomTypeTypeSelecter"
                label={LANG("select_roomType")}
                disabled={!isCreate}
                onChange={op => {
                  set("pricingType", op.value);
                }}
                options={PRICING_TYPE_OP}
                selectedOption={pricingTypeOp}
              />
            </div>
            <div className="flex-grid__col JDz-index-2 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                id="RoomTypeGenderSelecter"
                label={LANG("select_roomGender")}
                disabled={!isCreate}
                onChange={op => {
                  set("roomGender", op.value);
                }}
                options={ROOM_GENDER_OP}
                selectedOption={roomGenderOp}
              />
            </div>
            <div className="flex-grid__col flex-grid__col--vertical col--full-12 col--lg-12 col--md-12">
              <JDLabel txt={LANG("roomPic")} />
              <ImageUploader
                id="RoomTypeImgUploader"
                {...roomImageHook}
                minHeight="200px"
              />
            </div>
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
              <InputText
                id="RoomTypeDecs"
                onChange={val => {
                  set("description", val);
                }}
                value={description}
                textarea
                label={LANG("room_type_desc")}
              />
            </div>
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
              <InputText
                id="RoomTypeBasicPrice"
                onChange={(val: any) => {
                  set("defaultPrice", val);
                }}
                comma
                value={defaultPrice}
                label={LANG("basic_room_price")}
              />
              <p className="JDsmall-text">
                * {LANG("appliedby_default_in_periods_with_no_price_set")}
              </p>
            </div>
          </div>
          <div className="JDmodal__endSection">
            <Button
              disabled={!isCreate}
              id="DoCreateBtn"
              mode="flat"
              thema="primary"
              label={LANG("do_create")}
              size="small"
              onClick={() => {
                if (validation()) onSubmit(data, "create");
              }}
            />
            <Button
              id="DoUpdateBtn"
              mode="flat"
              thema="primary"
              label={LANG("do_modify")}
              size="small"
              disabled={isCreate}
              onClick={() => {
                if (validation()) onSubmit(data, "update");
              }}
            />
            <Button
              id="DoDeleteBtn"
              mode="flat"
              thema="error"
              label={LANG("do_delete")}
              size="small"
              disabled={isCreate}
              onClick={() => {
                onSubmit(data, "delete");
              }}
            />
          </div>
          <PriceWarnModal modalHook={priceWarnModal} />
        </Fragment>
      )}
    </Modal>
  );
};

export default RoomTypeModal;
