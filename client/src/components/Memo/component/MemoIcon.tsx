import React, {Fragment, useEffect} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_MEMO} from "../../../queries";
import {getMemos, getMemosVariables} from "../../../types/api";
import {queryDataFormater} from "../../../utils/utils";
import JDIcon, {IconConifgProps, IconSize} from "../../../atoms/icons/Icons";
import JDdot from "../../../atoms/dot/dot";
import {IContext} from "../../../pages/MiddleServerRouter";
import {MemoType} from "../../../types/enum";
import client from "../../../apolloClient";
import JDbadge from "../../../atoms/badge/Badge";
import alertMemo from "../../../utils/alertMemo";
import MemoAlertModal from "./MemoAlertModal";
import {useModal} from "../../../actions/hook";

interface Iprops extends IconConifgProps {
  context: IContext;
  onClick: any;
}

const MemoIcon: React.FC<Iprops> = ({context, ...props}) => {
  const {house} = context;
  const memoAlertModalHook = useModal(false);
  const {data, loading} = useQuery<getMemos, getMemosVariables>(GET_MEMO, {
    client,
    variables: {
      houseId: house._id,
      memoType: MemoType.HOST
    }
  });

  const memos = queryDataFormater(data, "GetMemos", "memos", []) || [];

  const haveEnableAlert = memos.find(memo => memo.enableAlert);

  useEffect(() => {
    alertMemo(memoAlertModalHook, memos);
  }, [loading]);

  return (
    <Fragment>
      <MemoAlertModal context={context} modalHook={memoAlertModalHook} />
      <JDIcon
        icon="memo"
        {...props}
        dots={
          haveEnableAlert
            ? [<JDbadge tooltip="알람 설정된 메모가 있습니다." thema="point" />]
            : undefined
        }
      />
    </Fragment>
  );
};

export default MemoIcon;
