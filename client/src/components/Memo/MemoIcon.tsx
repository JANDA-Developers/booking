import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_MEMO} from "../../queries";
import {getMemos, getMemosVariables} from "../../types/api";
import {queryDataFormater} from "../../utils/utils";
import JDIcon, {IconConifgProps} from "../../atoms/icons/Icons";
import JDdot from "../../atoms/dot/dot";
import {IContext} from "../../pages/MiddleServerRouter";
import {MemoType} from "../../types/enum";
import client from "../../apolloClient";

interface Iprops extends IconConifgProps {
  context: IContext;
}

const MemoIcon: React.FC<Iprops> = ({context, ...props}) => {
  const {house} = context;
  const {data} = useQuery<getMemos, getMemosVariables>(GET_MEMO, {
    client,
    variables: {
      houseId: house._id,
      memoType: MemoType.HOST
    }
  });

  const memos = queryDataFormater(data, "GetMemos", "memos", []) || [];

  const haveImportant = memos.filter(memo => memo.important);

  console.log(memos);
  console.log(memos);
  console.log(memos);
  return (
    <JDIcon
      icon="memo"
      {...props}
      dots={haveImportant ? [<JDdot color="point" />] : undefined}
    />
  );
};

export default MemoIcon;
