import React, {Fragment, useState} from "react";
import {getHousesForSU_GetHousesForSU_houses as Ihouse} from "../../../types/api";
import {IUseModal, useModal, LANG} from "../../../hooks/hook";
import Preloader from "../../../atoms/preloader/Preloader";
import "./SuperMain.scss";
import JDPagination from "../../../atoms/pagination/Pagination";
import HouseCard from "./components/houseCard";
import {IPageInfo} from "../../../types/interface";
import UserModal from "./components/userModalWrap";
import Button from "../../../atoms/button/Button";
import CreateNotiModalWrap, {
  ICreateNotiModalParam
} from "./components/createNotiModalWrap";
import {IContext} from "../../MiddleServerRouter";
import {isEmpty} from "../../../utils/utils";
import {NotiType} from "../../../types/enum";
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
  const NotiModalHook = useModal<ICreateNotiModalParam>(false);
  return (
    <div id="superMain">
      <div className="container container--sm">
        <div className="docs-section">
          <Fragment>
            <div className="docs-section__box">
              <div>
                <Button
                  onClick={() => {
                    NotiModalHook.openModal({
                      target: NotiType.TO_ALL
                    });
                  }}
                  thema="white"
                  label={LANG("group_notification")}
                  icon="notify"
                />
              </div>
              <Preloader size="large" noAnimation loading={loading} />
              {houseData.map((house: Ihouse) => (
                <HouseCard
                  key={`houseCard${house._id}`}
                  houseData={house}
                  NotiModalHook={NotiModalHook}
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
            {userModal.isOpen && (
              <UserModal context={context} modalHook={userModal} />
            )}
          </Fragment>
          {!isEmpty(context.house) && (
            <CreateNotiModalWrap context={context} modalHook={NotiModalHook} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperMain;
