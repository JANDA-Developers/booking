import React, { Fragment, useState } from "react";
import { getHousesForSU_GetHousesForSU_houses as Ihouse } from "../../../../types/api";
import { IUseModal, useModal, LANG } from "../../../../hooks/hook";
import Preloader from "../../../../atoms/preloader/Preloader";
import "./HostHouses.scss";
import JDPagination from "../../../../atoms/pagination/Pagination";
import HouseCard from "../components/houseCard";
import { IPageInfo } from "../../../../types/interface";
import UserModal from "../components/userModalWrap";
import Button from "../../../../atoms/button/Button";
import CreateNotiModalWrap, {
  ICreateNotiModalParam
} from "../components/createNotiModalWrap";
import { IContext } from "../../BookingHostRouter";
import { isEmpty } from "../../../../utils/utils";
import { NotiType } from "../../../../types/enum";
interface Iprops {
  context: IContext;
  page: number;
  setPage: any;
  houseData: any;
  loading: boolean;
  userModal: IUseModal;
  pageData: IPageInfo;
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
      <div className="container container--full">
        <div className="docs-section">
          <Fragment>
            <div className="docs-section__box">
              <div>
                <Button thema="white" label={LANG("pay_history")} />
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
                  context={context}
                  key={`houseCard${house._id}`}
                  houseData={house}
                  NotiModalHook={NotiModalHook}
                  userModal={userModal}
                />
              ))}
            </div>
            <JDPagination setPage={setPage} pageInfo={pageData} />
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
