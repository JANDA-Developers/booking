import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { MutationFn } from "react-apollo";
import Modal from "../../../../../atoms/modal/Modal";
import Button from "../../../../../atoms/button/Button";
import { IUseModal, useDrawer, LANG } from "../../../../../hooks/hook";
import Preloader from "../../../../../atoms/preloader/Preloader";
import { getHouse_GetHouse_house } from "../../../../../types/api";
import {
  PricingType,
  DateFormat,
  MODAL_PRELOADER_SIZE
} from "../../../../../types/enum";
import JDIcon from "../../../../../atoms/icons/Icons";
import moment from "moment";
import { insideRedirect } from "../../../../../utils/utils";
import copytoClipboard from "../../../../../utils/copyToClipboard";
import Vtable, { TVtableColumns } from "../../../../../atoms/vtable/Vtable";
import { IContext } from "../../../BookingHostRouter";
import "./MyHouseModal.scss";

interface IProps {
  modalHook: IUseModal;
  deleteMu: MutationFn<any, any>;
  houseChangeMu: MutationFn<any, any>;
  house: getHouse_GetHouse_house | undefined | null;
  loading: boolean;
  context: IContext;
}

// 여기서 <Redicet/> 를 쓸수없는 이유가뭔지 모르겠음
const MyHouseModal: React.FC<IProps> = ({
  houseChangeMu,
  deleteMu,
  modalHook,
  house,
  loading,
  context
}) => {
  if (!house) return <div />;

  const drawerHook = useDrawer(false);

  const onDelete = () => {
    if (house && house.product) {
      toast(LANG("please_cancel_the_product_first"));
      return false;
    }
    deleteMu();
    modalHook.closeModal();
    return false;
  };

  let roomCountDomitory = 0;
  let roomCountRoom = 0;
  house &&
    house.roomTypes &&
    house.roomTypes.forEach(roomType => {
      if (roomType.pricingType === PricingType.DOMITORY) {
        roomCountDomitory += roomType.roomCount;
      } else {
        roomCountRoom += roomType.roomCount;
      }
    });

  const columns: TVtableColumns[] = [
    {
      label: LANG("houseName"),
      content: house.name
    },
    {
      label: LANG("date_of_creation"),
      content: moment(house!.createdAt).format(DateFormat.WITH_TIME)
    },
    { label: LANG("domitory"), content: roomCountDomitory },
    { label: LANG("room"), content: roomCountRoom },
    {
      label: LANG("reservation_page_URL"),
      content: (
        <span>
          <JDIcon
            onClick={e => {
              copytoClipboard(
                insideRedirect(`outpage/reservation/${house.publicKey}`)
              );
            }}
            tooltip={LANG("copy_reservation_page_URL")}
            size={"small"}
            icon={"copyFile"}
            hover={true}
          />
          {/* 예약 페이지로 이동 */}
          <JDIcon
            onClick={e => {
              location.href = insideRedirect(
                `outpage/reservation/${house.publicKey}`
              );
            }}
            tooltip={LANG("move_reservation_page")}
            size={"small"}
            icon={"arrowTo"}
            hover={true}
          />
        </span>
      )
    },
    {
      label: LANG("reservation_page_URL"),
      content: (
        <span>
          <JDIcon
            onClick={e => {
              copytoClipboard(
                insideRedirect(`outpage/reservation/${house.publicKey}`)
              );
            }}
            tooltip={LANG("copy_reservation_page_URL")}
            size={"small"}
            icon={"copyFile"}
            hover={true}
          />
          {/* 예약 페이지로 이동 */}
          <JDIcon
            onClick={e => {
              location.href = insideRedirect(
                `outpage/reservation/${house.publicKey}`
              );
            }}
            tooltip={LANG("move_reservation_page")}
            size={"small"}
            icon={"arrowTo"}
            hover={true}
          />
        </span>
      )
    },
    {
      label: LANG("hm_page_URL"),
      content: (
        <span>
          <JDIcon
            onClick={e => {
              copytoClipboard(
                insideRedirect(`outpage/HM/${house.HM!.publicKey}`)
              );
            }}
            tooltip={LANG("copy_hm_page_URL")}
            size={"small"}
            icon={"copyFile"}
            hover={true}
          />
          {/* 하우스 메뉴얼 페이지로 이동 */}
          <JDIcon
            onClick={e => {
              location.href = insideRedirect(
                `outpage/HM/${house.HM!.publicKey}`
              );
            }}
            tooltip={LANG("move_hm_page")}
            size={"small"}
            icon={"arrowTo"}
            hover={true}
          />
        </span>
      )
    }
  ];

  return (
    <Modal className="myHouseModal" {...modalHook}>
      {loading ? (
        <Preloader size={MODAL_PRELOADER_SIZE} loading={loading} />
      ) : (
        <Fragment>
          {house && (
            <Fragment>
              <div>
                <Vtable
                  header={{
                    title: LANG("house_info")
                  }}
                  columns={columns}
                />
              </div>
            </Fragment>
          )}
          <div className="JDmodal__endSection">
            <Button
              mode="flat"
              onClick={onDelete}
              thema="error"
              label={LANG("delete")}
            />
          </div>
        </Fragment>
      )}
    </Modal>
  );
};

export default MyHouseModal;
