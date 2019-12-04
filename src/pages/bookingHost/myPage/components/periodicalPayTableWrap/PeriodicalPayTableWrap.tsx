import React from "react";
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
import { PayTarget } from "../../../../../types/enum";

interface Iprops {
  context: IContext;
}

const PeriodicalTableWrap: React.FC<Iprops> = ({ context }) => {
  const { data, loading } = useQuery<getPayHistory, getPayHistoryVariables>(
    GET_PAY_HISTORY,
    {
      client,
      variables: {
        param: {
          target: PayTarget.USAGE_PLAN
        }
      }
    }
  );

  const payHistory =
    queryDataFormater(data, "GetPayHistory", "payHistories", []) || [];

  return (
    <PeriodicalPayTable
      historyData={payHistory}
      context={context}
      loading={loading}
    />
  );
};

export default PeriodicalTableWrap;
