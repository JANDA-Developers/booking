import React, {Fragment, useState} from "react";
import {toast} from "react-toastify";
import {MutationFn} from "react-apollo";
import Modal from "../../../../atoms/modal/Modal";
import Button from "../../../../atoms/button/Button";
import {IUseModal, useDrawer, LANG} from "../../../../hooks/hook";
import {IHouse} from "../../../../types/interface";
import Preloader from "../../../../atoms/preloader/Preloader";
import {getHouse_GetHouse_house} from "../../../../types/api";
import {
  PricingType,
  DateFormat,
  MODAL_PRELOADER_SIZE
} from "../../../../types/enum";
import JDIcon, {IIcons, IconSize} from "../../../../atoms/icons/Icons";
import moment from "moment";
import {isEmpty, insideRedirect} from "../../../../utils/utils";
import copytoClipboard from "../../../../utils/copyToClipboard";
import Drawer from "../../../../atoms/drawer/Drawer";
import SpecificAtionWrap from "../../../../components/specification/SpecificationWrap";
import {IContext} from "../../../bookingHost/BookingHostRouter";
import {Redirect} from "react-router";
import {JDlang} from "../../../../langs/JDlang";

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

  return (
    <Modal {...modalHook}>
      {loading ? (
        <Preloader size={MODAL_PRELOADER_SIZE} loading={loading} />
      ) : (
        <Fragment>
          {house && (
            <Fragment>
              <h6>
                <span className="JDstandard-small-space">
                  {LANG("house_info")}
                </span>
                <Drawer {...drawerHook} />
              </h6>
              {drawerHook.open && (
                <div>
                  <SpecificAtionWrap houseId={house._id} />
                </div>
              )}
              <p>
                {LANG("houseName")}: {house.name}
              </p>
              <p>
                {LANG("date_of_creation")}:{" "}
                {moment(house!.createdAt).format(DateFormat.WITH_TIME)}
              </p>
              <p>
                {LANG("domitory")}: {roomCountDomitory}
              </p>
              <p>
                {LANG("room")}: {roomCountRoom}
              </p>
              {house.product !== null && (
                <Fragment>
                  <p>
                    <span className="JDstandard-small-space">
                      {LANG("reservation_page_URL")}
                    </span>
                    {/* 예약 페이지 URL 복사 */}
                    <JDIcon
                      onClick={e => {
                        copytoClipboard(
                          insideRedirect(
                            `outpage/reservation/${house.publicKey}`
                          )
                        );
                      }}
                      tooltip={LANG("copy_reservation_page_URL")}
                      size={IconSize.MEDEIUM_SMALL}
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
                      size={IconSize.MEDEIUM_SMALL}
                      icon={"arrowTo"}
                      hover={true}
                    />
                  </p>
                  {house.HM && (
                    <p>
                      <span className="JDstandard-small-space">
                        {LANG("hm_page_URL")}
                      </span>
                      {/* 하우스 메뉴얼 URL 복사*/}
                      <JDIcon
                        onClick={e => {
                          copytoClipboard(
                            insideRedirect(`outpage/HM/${house.HM!.publicKey}`)
                          );
                        }}
                        tooltip={LANG("copy_hm_page_URL")}
                        size={IconSize.MEDEIUM_SMALL}
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
                        size={IconSize.MEDEIUM_SMALL}
                        icon={"arrowTo"}
                        hover={true}
                      />
                    </p>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
          <div className="JDmodal__endSection">
            <Button onClick={onDelete} thema="error" label={LANG("delete")} />
          </div>
        </Fragment>
      )}
    </Modal>
  );
};

export default MyHouseModal;