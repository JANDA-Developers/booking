import React, { Fragment, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_MEMO } from "../../../apollo/queries";
import { getMemos, getMemosVariables } from "../../../types/api";
import { queryDataFormater, s4 } from "../../../utils/utils";
import JDIcon, { IconConifgProps } from "../../../atoms/icons/Icons";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import { MemoType } from "../../../types/enum";
import client from "../../../apollo/apolloClient";
import JDbadge from "../../../atoms/badge/Badge";
import MemoAlertModal from "./MemoAlertModal";
import { useModal, LANG } from "../../../hooks/hook";
import { alertMemo } from "../../../pages/bookingHost/helper";
import FloatBox from "../../../atoms/floatBox/FloatBox";
import JDbox from "../../../atoms/box/JDbox";
import MemoWrap from "../MemoWrap";

interface Iprops extends IconConifgProps {
  context: IContext;
}

const MemoIcon: React.FC<Iprops> = ({ context, ...props }) => {
  const { house } = context;
  const memoModalHook = useModal(false);
  const memoAlertModalHook = useModal(false);
  const { data, loading } = useQuery<getMemos, getMemosVariables>(GET_MEMO, {
    client,
    variables: {
      houseId: house._id,
      memoType: MemoType.HOST
    }
  });

  const memos = queryDataFormater(data, "GetMemos", "memos", []) || [];

  const haveEnableAlert = memos.find(memo => memo.enableAlert);

  const dots = haveEnableAlert
    ? [
        <JDbadge
          key={s4()}
          tooltip={LANG("there_is_an_alarm_set_note")}
          thema="point"
        />
      ]
    : undefined;

  useEffect(() => {
    alertMemo(memoAlertModalHook, memos);
  }, [loading]);

  return (
    <Fragment>
      <MemoAlertModal context={context} modalHook={memoAlertModalHook} />
      <JDIcon
        icon="memo"
        {...props}
        onClick={() => {
          memoModalHook.openModal();
        }}
        dots={dots}
      />
      <span className="JDz-index-1">
        <FloatBox
          modalHook={memoModalHook}
          direction={{ vertical: "bottom", horizen: "left" }}
        >
          <MemoWrap memoType={MemoType.HOST} context={context} />
        </FloatBox>
      </span>
    </Fragment>
  );
};

export default MemoIcon;
