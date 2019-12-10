/* eslint-disable react/prop-types */
import { MutationFn } from "react-apollo";
import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";
import Modal from "../../../../atoms/modal/Modal";
import SelectBox, {
  IselectedOption
} from "../../../../atoms/forms/selectBox/SelectBox";
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
import {
  createRoomType,
  createRoomTypeVariables,
  deleteRoomType,
  deleteRoomTypeVariables,
  updateRoomType,
  updateRoomTypeVariables,
  getRoomTypeById_GetRoomTypeById_roomType as IRoomType
} from "../../../../types/api";
import { IDefaultRoomType, IRoomTypeModalInfo } from "./RoomTypeModalWrap";
import Preloader from "../../../../atoms/preloader/Preloader";
import { IContext } from "../../../bookingHost/BookingHostRouter";
import PriceWarnModal from "../../../../components/priceWarnModal.tsx/PriceWarnModal";

interface IProps {
  context: IContext;
  createRoomTypeMutation: MutationFn<createRoomType, createRoomTypeVariables>;
  deleteRoomTypeMutation: MutationFn<deleteRoomType, deleteRoomTypeVariables>;
  updateRoomTypeMutation: MutationFn<updateRoomType, updateRoomTypeVariables>;
  onCreateFn?: any;
  onUpdateFn?: any;
  onDelteFn?: any;
  loading: boolean;
  mode: "Create" | "Modify";
  mutationLoading: boolean;
  modalHook: IUseModal<IRoomTypeModalInfo>;
  roomTypeData: IRoomType | IDefaultRoomType;
}

const RoomTypeModal: React.SFC<IProps> = ({
  modalHook,
  context,
  loading,
  mode,
  mutationLoading,
  onCreateFn,
  onUpdateFn,
  onDelteFn,
  createRoomTypeMutation,
  deleteRoomTypeMutation,
  updateRoomTypeMutation,
  roomTypeData
}) => {
  const { house } = context;
  const isCreate = mode === "Create";
  const priceWarnModal = useModal(false);
  const roomImageHook = useImageUploader(roomTypeData.img);
  // 룸타입 벨류
  const [value, setValue] = useState({
    name: roomTypeData.name,
    description: roomTypeData.description,
    pricingType: {
      label: LANG(roomTypeData.pricingType),
      value: roomTypeData.pricingType
    },
    peopleCount: {
      label: `${roomTypeData.peopleCount}${LANG("person_unit")}`,
      value: roomTypeData.peopleCount
    },
    roomGender: {
      label: LANG("RoomGender", roomTypeData.roomGender),
      value: roomTypeData.roomGender
    },
    peopleCountMax: {
      label: `${roomTypeData.peopleCountMax}${LANG("person_unit")}`,
      value: roomTypeData.peopleCountMax
    },
    defaultPrice: roomTypeData.defaultPrice || 0
  });

  const updateRoomTypeValue = {
    houseId: house._id,
    name: value.name,
    img: roomImageHook.file || undefined,
    pricingType: value.pricingType.value,
    roomGender: value.roomGender.value,
    peopleCount: value.peopleCountMax.value,
    peopleCountMax: value.peopleCountMax.value,
    description: value.description,
    defaultPrice: value.defaultPrice
  };

  const validater = (fn: any) => {
    if (value)
      if (value.name === "") {
        toast.warn(LANG("enter_room_type_name"));
        return false;
      }
    if (value.peopleCountMax.value < 1) {
      toast.warn(LANG("capacity_must_be_at_least_1_person"));
      return false;
    }

    if (!value.defaultPrice) {
      toast.warn(LANG("please_enter_a_base_price"));
      return false;
    }
    if (value.defaultPrice < 1000) {
      const callBackFn = (flag: boolean) => {
        if (flag) {
          fn();
        }
      };
      priceWarnModal.openModal({
        confirmCallBackFn: callBackFn
      });
      return false;
    }
    fn();
    return true;
  };

  const onCreateRoomType = async () => {
    validater(createRoomType);
  };

  const createRoomType = () => {
    onCreateFn && onCreateFn();
    createRoomTypeMutation({
      variables: {
        params: updateRoomTypeValue
      }
    });
    modalHook.closeModal();
  };

  const onDeleteRoomType = async () => {
    deleteRoomTypeMutation();
    modalHook.closeModal();
  };

  const onUpdateRoomType = async () => {
    const updateFn = () => {
      updateRoomTypeMutation({
        variables: {
          params: {
            defaultPrice: updateRoomTypeValue.defaultPrice,
            description: updateRoomTypeValue.description,
            img: updateRoomTypeValue.img,
            name: updateRoomTypeValue.name,
            peopleCount: updateRoomTypeValue.peopleCountMax,
            peopleCountMax: updateRoomTypeValue.peopleCountMax
          },
          roomTypeId: modalHook.info.roomTypeId || ""
        }
      });
      modalHook.closeModal();
    };

    validater(updateFn);
  };

  const onChangePeople = (inValue: any) => {
    setValue({ ...value, peopleCountMax: inValue });
  };

  const maxPeopleCountOption = MAX_PEOPLE_COUNT_OP_FN();

  return (
    <Modal
      overlayClassName="Overlay"
      center={false} // 이거 제거 필요
      className="Modal"
      {...modalHook}
      style={{
        content: {
          maxWidth: "600px"
        }
      }}
    >
      {loading || mutationLoading ? (
        <Preloader loading={loading || mutationLoading} size="large" />
      ) : (
        <Fragment>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
              <InputText
                label={LANG("room_type_name")}
                value={value.name}
                onChange={(inValue: any) => {
                  setValue({ ...value, name: inValue });
                }}
              />
            </div>
            <div className="JDz-index-3 flex-grid__col JDz-index-4 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                label={LANG("capacity")}
                disabled={false}
                onChange={onChangePeople}
                options={maxPeopleCountOption}
                selectedOption={value.peopleCountMax}
              />
            </div>
            <div className="flex-grid__col JDz-index-3 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                label={LANG("select_roomType")}
                disabled={mode === "Modify"}
                onChange={(inValue: any) => {
                  setValue({ ...value, pricingType: inValue });
                }}
                options={PRICING_TYPE_OP}
                selectedOption={value.pricingType}
              />
            </div>
            <div className="flex-grid__col JDz-index-2 col--full-6 col--lg-6 col--md-12">
              <SelectBox
                label={LANG("select_roomGender")}
                disabled={!isCreate}
                onChange={(inValue: any) => {
                  setValue({ ...value, roomGender: inValue });
                }}
                options={ROOM_GENDER_OP}
                selectedOption={value.roomGender}
              />
            </div>
            <div className="flex-grid__col flex-grid__col--vertical col--full-12 col--lg-12 col--md-12">
              <JDLabel txt={LANG("roomPic")} />
              <ImageUploader {...roomImageHook} minHeight="200px" />
            </div>
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
              <InputText
                onChange={(inValue: any) => {
                  setValue({ ...value, description: inValue });
                }}
                value={value.description}
                textarea
                label={LANG("room_type_desc")}
              />
            </div>
            <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
              <InputText
                onChange={(inValue: any) => {
                  setValue({ ...value, defaultPrice: inValue });
                }}
                comma
                value={value.defaultPrice}
                label={LANG("basic_room_price")}
              />
              <p className="JDsmall-text">
                * {LANG("appliedby_default_in_periods_with_no_price_set")}
              </p>
            </div>
          </div>
          <div className="JDmodal__endSection">
            <Button
              mode="flat"
              thema="primary"
              label={isCreate ? LANG("do_create") : LANG("do_copy")}
              size="small"
              onClick={onCreateRoomType}
            />
            <Button
              mode="flat"
              thema="primary"
              label={LANG("do_modify")}
              size="small"
              disabled={isCreate}
              onClick={onUpdateRoomType}
            />
            <Button
              mode="flat"
              thema="error"
              label={LANG("do_delete")}
              size="small"
              disabled={isCreate}
              onClick={onDeleteRoomType}
            />
          </div>
          <PriceWarnModal modalHook={priceWarnModal} />
        </Fragment>
      )}
    </Modal>
  );
};

export default RoomTypeModal;
