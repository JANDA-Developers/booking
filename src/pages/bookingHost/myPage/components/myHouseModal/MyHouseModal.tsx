import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { MutationFn } from "react-apollo";
import Modal from "../../../../../atoms/modal/Modal";
import Button from "../../../../../atoms/button/Button";
import {
  IUseModal,
  useDrawer,
  LANG,
  useInput
} from "../../../../../hooks/hook";
import Preloader from "../../../../../atoms/preloader/Preloader";
import { getHouse_GetHouse_house } from "../../../../../types/api";
import { PricingType, DateFormat } from "../../../../../types/enum";
import { MODAL_PRELOADER_SIZE } from "../../../../../types/const";
import JDIcon from "../../../../../atoms/icons/Icons";
import moment from "moment";
import { insideRedirect } from "../../../../../utils/utils";
import copytoClipboard from "../../../../../utils/copyToClipboard";
import { IContext } from "../../../BookingHostRouter";
import "./MyHouseModal.scss";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import Drawer from "../../../../../atoms/drawer/Drawer";
import Vtable, {
  VtableColumn,
  VtableCell
} from "../../../../../atoms/vtable/Vtable";
import { Redirect } from "react-router-dom";

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
  deleteMu,
  modalHook,
  house,
  loading
}) => {
  if (!house) return <div />;
  const [redirect, setRedirect] = useState("");
  const houseNameHook = useInput(house.name);
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

  // const columns = [
  //   {
  //     label: LANG("hm_page_URL"),
  //     content: (
  //       <span>
  //         <JDIcon
  //           onClick={e => {
  //             copytoClipboard(
  //               insideRedirect(`outpage/HM/${house.HM!.publicKey}`)
  //             );
  //           }}
  //           tooltip={LANG("copy_hm_page_URL")}
  //           size={"small"}
  //           icon={"copyFile"}
  //           hover={true}
  //         />
  //         {/* 하우스 메뉴얼 페이지로 이동 */}
  //         <JDIcon
  //           onClick={e => {
  //             location.href = insideRedirect(
  //               `outpage/HM/${house.HM!.publicKey}`
  //             );
  //           }}
  //           tooltip={LANG("move_hm_page")}
  //           size={"small"}
  //           icon={"arrowTo"}
  //           hover={true}
  //         />
  //       </span>
  //     )
  //   }
  // ];

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Modal
      visibleOverflow
      loading={loading}
      className="myHouseModal"
      {...modalHook}
    >
      {loading ? (
        <Preloader size={MODAL_PRELOADER_SIZE} loading={loading} />
      ) : (
        <Fragment>
          {house && (
            <Fragment>
              <div>
                <Vtable
                  headerMode="bottomBorder"
                  mode="unStyle"
                  headerRgiht={
                    <Drawer
                      buttonModeProps={{ mb: "no" }}
                      mode="button"
                      {...drawerHook}
                    />
                  }
                  header={{
                    title: LANG("house_info")
                  }}
                >
                  <VtableColumn>
                    <VtableCell label={LANG("houseName")}>
                      <InputText mb="no" {...houseNameHook} />
                    </VtableCell>
                  </VtableColumn>
                  <VtableColumn>
                    <VtableCell label={LANG("date_of_creation")}>
                      {moment(house!.createdAt).format(DateFormat.WITH_TIME)}
                    </VtableCell>
                  </VtableColumn>
                  <VtableColumn>
                    <VtableCell label={LANG("domitory")}>
                      {roomCountDomitory}
                    </VtableCell>
                  </VtableColumn>
                  <VtableColumn>
                    <VtableCell label={LANG("room")}>
                      {roomCountRoom}
                    </VtableCell>
                  </VtableColumn>
                  <VtableColumn>
                    <VtableCell label={LANG("reservation_page_URL")}>
                      <span>
                        <JDIcon
                          onClick={e => {
                            copytoClipboard(
                              insideRedirect(
                                `outpage/reservation/${house.publicKey}`
                              )
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
                            setRedirect(
                              `outpage/reservation/${house.publicKey}`
                            );
                          }}
                          tooltip={LANG("move_reservation_page")}
                          size={"small"}
                          icon={"arrowTo"}
                          hover={true}
                        />
                      </span>
                    </VtableCell>
                  </VtableColumn>
                </Vtable>
              </div>
            </Fragment>
          )}
          {/* <div className="JDmodal__endSection">
            <Button
              mode="flat"
              onClick={onDelete}
              thema="error"
              label={LANG("delete")}
            />
          </div> */}
        </Fragment>
      )}
    </Modal>
  );
};

export default MyHouseModal;
