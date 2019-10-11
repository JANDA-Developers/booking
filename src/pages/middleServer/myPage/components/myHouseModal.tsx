import React, {Fragment} from "react";
import {toast} from "react-toastify";
import {MutationFn} from "react-apollo";
import Modal from "../../../../atoms/modal/Modal";
import Button from "../../../../atoms/button/Button";
import {IUseModal, useDrawer} from "../../../../hooks/hook";
import {IHouse} from "../../../../types/interface";
import Preloader from "../../../../atoms/preloader/Preloader";
import {getHouse_GetHouse_house} from "../../../../types/api";
import {PricingType, DateFormat} from "../../../../types/enum";
import JDIcon, {IIcons, IconSize} from "../../../../atoms/icons/Icons";
import moment from "moment";
import {isEmpty} from "../../../../utils/utils";
import copytoClipboard from "../../../../utils/copyToClipboard";
import Drawer from "../../../../atoms/drawer/Drawer";
import SpecificAtionWrap from "../../../../components/specification/SpecificationWrap";

interface IProps {
  modalHook: IUseModal;
  deleteMu: MutationFn<any, any>;
  houseChangeMu: MutationFn<any, any>;
  house: getHouse_GetHouse_house | undefined | null;
  loading: boolean;
}

const MyHouseModal: React.SFC<IProps> = ({
  houseChangeMu,
  deleteMu,
  modalHook,
  house,
  loading
}) => {
  const drawerHook = useDrawer(false);

  const onDelete = () => {
    if (house && house.product) {
      toast("상품을 먼저 해지 해주세요.");
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
        <Preloader size="large" loading={loading} />
      ) : (
        <Fragment>
          {house && (
            <Fragment>
              <h6>
                <span className="JDstandard-small-space">숙소정보</span>
                <Drawer {...drawerHook} />
              </h6>
              {drawerHook.open && (
                <div>
                  <SpecificAtionWrap houseId={house._id} />
                </div>
              )}
              <p>숙소명: {house.name}</p>
              <p>
                생성일시:{" "}
                {moment(house!.createdAt).format(DateFormat.WITH_TIME)}
              </p>
              <p>도미토리: {roomCountDomitory}</p>
              <p>방: {roomCountRoom}</p>
              {house.product !== null && (
                <p>
                  <span className="JDstandard-small-space">
                    예약페이지 URL 복사
                  </span>
                  <JDIcon
                    onClick={e =>
                      copytoClipboard(
                        `https://app.stayjanda.com/#/outpage/reservation/${house.publicKey}`
                      )
                    }
                    size={IconSize.MEDEIUM_SMALL}
                    icon={"copyFile"}
                    hover={true}
                  />
                </p>
              )}
            </Fragment>
          )}
          <div className="JDmodal__endSection">
            <Button onClick={onDelete} thema="error" label="삭제" />
          </div>
        </Fragment>
      )}
    </Modal>
  );
};

export default MyHouseModal;
