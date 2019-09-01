import React, {Fragment, useState} from "react";
import {getHousesForSU_GetHousesForSU_houses as Ihouse} from "../../../types/api";
import {IUseModal, useModal} from "../../../actions/hook";
import Preloader from "../../../atoms/preloader/Preloader";
import "./SuperMain.scss";
import JDPagination from "../../../atoms/pagination/Pagination";
import HouseCard from "./components/houseCard";
import {IPageInfo} from "../../../types/interface";
import UserModal from "./components/userModalWrap";
import Button from "../../../atoms/button/Button";
import SendSMSmodalWrap, {
  IModalSMSinfo
} from "../../../components/smsModal/SendSmsModalWrap";
import CreateNotificationModalWrap, {
  ICreateNotiModalParam
} from "./components/createNotificationModalWrap";
import {IContext} from "../../MiddleServerRouter";
import {isEmpty} from "../../../utils/utils";
import {NotificationType} from "../../../types/enum";
interface Iprops {
  context: IContext;
  page: number;
  setPage: any;
  houseData: any;
  loading: boolean;
  userModal: IUseModal;
  pageData: IPageInfo | undefined | null;
}

const SuperMain: React.SFC<Iprops> = ({
  context,
  userModal,
  houseData,
  loading,
  pageData,
  page,
  setPage
}) => {
  const notificationModalHook = useModal<ICreateNotiModalParam>(false);
  return (
    <div id="superMain">
      <div className="container container--sm">
        <div className="docs-section">
          <Fragment>
            <Preloader size="large" noAnimation loading={loading} />
            <div className="docs-section__box">
              <Button
                onClick={() => {
                  notificationModalHook.openModal({
                    target: NotificationType.TO_ALL
                  });
                }}
                thema="white"
                label="단체알림"
                icon="notify"
              />
              {houseData.map((house: Ihouse) => (
                <HouseCard
                  key={`houseCard${house._id}`}
                  houseData={house}
                  notificationModalHook={notificationModalHook}
                  userModal={userModal}
                />
              ))}
            </div>
            <JDPagination
              onPageChange={selectedItem => {
                setPage(selectedItem.selected + 1);
              }}
              pageCount={pageData ? pageData.totalPage : 1}
              pageRangeDisplayed={1}
              marginPagesDisplayed={4}
            />
            {userModal.isOpen && <UserModal modalHook={userModal} />}
          </Fragment>
          {!isEmpty(context.house) && (
            <CreateNotificationModalWrap
              context={context}
              modalHook={notificationModalHook}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperMain;
