import React, { useEffect, Fragment } from "react";
import {
  createMemo,
  createMemoVariables,
  deleteMemo,
  deleteMemoVariables,
  updateMemo,
  updateMemoVariables,
  getMemos_GetMemos_memos,
  getBookingMemos_GetBookings_result_bookings
} from "../../types/api";
import { MutationFn } from "react-apollo";
import { MemoType } from "../../types/enum";
import MemoBox from "./component/MemoBox";
import { isEmpty, s4 } from "../../utils/utils";
import "./Memo.scss";
import Preloader from "../../atoms/preloader/Preloader";
import isLast from "../../utils/isLast";
import JDToolTip, { ReactTooltip } from "../../atoms/tooltip/Tooltip";
import { LANG, useModal } from "../../hooks/hook";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import Button from "../../atoms/button/Button";
import { TabList, Tab, TabPanel } from "react-tabs";
import { JDtabs } from "../../atoms/tabs/Tabs_";
import GuestMemoBox from "./component/GuestMemoBox";
import EditMemoModal from "./component/EditMemoModal";
import MemoTooltip from "./component/MemoTooltip";

export interface IConfigMemo {
  showOnlyAlert?: boolean;
}

interface Iprops {
  bookingData: getBookingMemos_GetBookings_result_bookings[];
  createMemoMu: MutationFn<createMemo, createMemoVariables>;
  deleteMemoMu: MutationFn<deleteMemo, deleteMemoVariables>;
  updateMemoMu: MutationFn<updateMemo, updateMemoVariables>;
  mutationLoading: boolean;
  memos: getMemos_GetMemos_memos[];
  houseId: string;
  memoType: MemoType;
  context: IContext;
}

const Memo: React.FC<Iprops & IConfigMemo> = ({
  memos,
  deleteMemoMu,
  createMemoMu,
  updateMemoMu,
  mutationLoading,
  showOnlyAlert,
  bookingData,
  context
}) => {
  const editMemoModalHook = useModal(false);

  const filteredMemos = (() => {
    if (showOnlyAlert) return memos.filter(memo => memo.enableAlert);
    return memos;
  })();
  const filteredBookings = (() => {
    return bookingData.filter(booking => booking.memo);
  })();

  const handleDeleteBtn = (id: string) => {
    // 호스트메모일경우
    if (filteredMemos.find(memo => memo._id === id)) {
      deleteMemoMu({
        variables: {
          memoId: id
        }
      });
    } else {
    }
  };

  const handleEditBtn = (id: string) => {
    editMemoModalHook.openModal();
  };

  return (
    <div className="memo">
      <MemoTooltip
        handleEditBtn={handleEditBtn}
        handleDeleteBtn={handleDeleteBtn}
      />
      <JDtabs>
        <TabList>
          <Tab>{LANG("host_memo")}</Tab>
          <Tab>{LANG("guest_memo")}</Tab>
        </TabList>
        <TabPanel>
          <Fragment>
            <div className="JDtext-align-left">
              <Button
                onClick={() => {
                  editMemoModalHook.openModal();
                }}
                icon="edit"
                thema="primary"
                size="small"
                mode="flat"
                label={LANG("create_memo")}
              />
            </div>
            {!isEmpty(filteredMemos) || (
              <span className="JDtextColor--placeHolder">
                {LANG("no_notes_are_currently_created")}
              </span>
            )}
            {!isEmpty(filteredMemos) &&
              filteredMemos.map((memo, index) => (
                <MemoBox
                  className={
                    isLast(index, memos) ? "JDmargin-bottom0" : undefined
                  }
                  key={s4()}
                  memo={memo}
                />
              ))}
          </Fragment>
        </TabPanel>
        <TabPanel>
          <Fragment>
            {!isEmpty(filteredBookings) &&
              filteredBookings.map((booking, index) => (
                <GuestMemoBox
                  className={
                    isLast(index, memos) ? "JDmargin-bottom0" : undefined
                  }
                  key={s4()}
                  booking={booking}
                />
              ))}
            {!isEmpty(filteredBookings) || (
              <span className="JDtextColor--placeHolder">
                {LANG("no_guest_notes_after_today")}
              </span>
            )}
          </Fragment>
        </TabPanel>
      </JDtabs>
      <EditMemoModal
        createMu={createMemoMu}
        updateMu={updateMemoMu}
        context={context}
        modalHook={editMemoModalHook}
      />
      <JDToolTip type="dark" effect="solid" id="siginificantExplicateTooltip">
        {LANG("the_memo_gives_an_alarm_on_the_next_connection")}
      </JDToolTip>
      <Preloader floating size={"tiny"} loading={mutationLoading} />
    </div>
  );
};

export default Memo;
