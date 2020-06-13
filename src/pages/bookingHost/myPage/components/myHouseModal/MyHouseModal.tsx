import React, { Fragment, useState } from "react";
import { MutationFn } from "react-apollo";
import Modal from "../../../../../atoms/modal/Modal";
import {
  IUseModal,
  useDrawer,
  LANG,
  useInput
} from "../../../../../hooks/hook";
import moment from "moment";
import Preloader from "../../../../../atoms/preloader/Preloader";
import { getHouse_GetHouse_house } from "../../../../../types/api";
import { PricingType, DateFormat } from "../../../../../types/enum";
import { MODAL_PRELOADER_SIZE } from "../../../../../types/const";
import JDIcon from "../../../../../atoms/icons/Icons";
import { insideRedirect } from "../../../../../utils/utils";
import copytoClipboard from "../../../../../utils/copyToClipboard";
import { IContext } from "../../../BookingHostRouter";
import "./MyHouseModal.scss";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import Drawer from "../../../../../atoms/drawer/Drawer";
import Vtable, { ColumnCells } from "../../../../../atoms/vtable/Vtable";
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
const MyHouseModal: React.FC<IProps> = ({ modalHook, house, loading }) => {
  if (!house) return <div />;
  const [redirect, setRedirect] = useState("");
  const houseNameHook = useInput(house.name);
  const drawerHook = useDrawer(false);

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

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const columns = [
    {
      label: LANG("houseName"),
      Component: () => <InputText mb="no" {...houseNameHook} />
    },
    {
      label: LANG("date_of_creation"),
      Component: () => (
        <div>{moment(house!.createdAt).format(DateFormat.WITH_TIME)}</div>
      )
    },
    {
      label: LANG("domitory"),
      Component: () => <div>{roomCountDomitory}</div>
    },
    {
      label: LANG("room"),
      Component: () => <div>{roomCountRoom}</div>
    },
    // {
    //   label: LANG("reservation_page_new"),
    //   Component: () => (
    //     <span>
    //       <JDIcon
    //         onClick={e => {
    //           copytoClipboard(
    //             insideRedirect(`outpage/reservation2/${house.houseNum}/host`)
    //           );
    //         }}
    //         tooltip={LANG("copy_reservation_page_URL")}
    //         size={"small"}
    //         icon={"copyFile"}
    //         hover={true}
    //       />
    //       {/* 예약 페이지로 이동 */}
    //       <JDIcon
    //         onClick={e => {
    //           setRedirect(`outpage/reservation2/${house.houseNum}/host`);
    //         }}
    //         tooltip={LANG("move_reservation_page")}
    //         size={"small"}
    //         icon={"arrowTo"}
    //         hover={true}
    //       />
    //     </span>
    //   )
    // },
    {
      label: LANG("reservation_page_URL"),
      Component: () => (
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
              setRedirect(`outpage/reservation/${house.publicKey}`);
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
      Component: () => (
        <span>
          <JDIcon
            onClick={e => {
              copytoClipboard(insideRedirect(`outpage/HM/${house.publicKey}`));
            }}
            tooltip={LANG("copy_hm_page_URL")}
            size={"small"}
            icon={"copyFile"}
            hover={true}
          />
          {/* 예약 페이지로 이동 */}
          <JDIcon
            onClick={e => {
              setRedirect(`outpage/HM/${house.publicKey}`);
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
                  <ColumnCells datas={columns} />
                </Vtable>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Modal>
  );
};

export default MyHouseModal;
