import React, { useState } from "react";
import { IContext } from "../../../BookingHostRouter";
import { useQuery } from "@apollo/react-hooks";
import client from "../../../../../apollo/apolloClient";
import { GET_PAY_HISTORY } from "../../../../../apollo/queries";
import {
  getPayHistory,
  getPayHistoryVariables
} from "../../../../../types/api";
import { queryDataFormater } from "../../../../../utils/utils";
import PeriodicalPayTable from "./PeriodicalPayTable";
import { getFromResult } from "../../../../../utils/queryFormater";
import { PayTarget } from "../../../../../types/enum";

interface Iprops {
  context: IContext;
}

const PeriodicalTableWrap: React.FC<Iprops> = ({ context }) => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<getPayHistory, getPayHistoryVariables>(
    GET_PAY_HISTORY,
    {
      client,
      variables: {
        param: {
          filter: {
            period:  {
              end: new Date(),
              start: new Date(),
            },
            targets: [PayTarget.USAGE_PLAN as any]
          },
          paging: {
            selectedPage: page,
            count: 20
          }
        }
      }
    }
  );

  const queryResult = queryDataFormater(
    data,
    "GetPayHistory",
    "result",
    undefined
  );
  const { data: historyData, pageInfo } = getFromResult(
    queryResult,
    "payHistories",
    []
  );

  return (
    <PeriodicalPayTable
      pageInfo={pageInfo}
      setPage={setPage}
      historyData={historyData || []}
      context={context}
      loading={loading}
    />
  );
};

export default PeriodicalTableWrap;
