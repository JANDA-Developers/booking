import React, { Fragment, useState } from "react";
import { Query } from "react-apollo";
import { getSmsHistory, getSmsHistoryVariables } from "../../../types/api";
import { queryDataFormater, showError } from "../../../utils/utils";
import { GET_SMS_HISTORY } from "../../../apollo/queries";
import SmsHistory from "./SmsHistory";
import { getFromResult } from "../../../utils/queryFormater";
import { usePageNation } from "../../../hooks/hook";

class GetAllSmsHistory extends Query<getSmsHistory, getSmsHistoryVariables> {}

interface Iprops {
  smsInfoId: string;
}

const SmsHistoryWrap: React.SFC<Iprops> = ({ smsInfoId }) => {
  const { page, setPage } = usePageNation(1);

  return (
    <GetAllSmsHistory
      query={GET_SMS_HISTORY}
      variables={{
        param: {
          filter: {
            smsInfoId
          },
          paging: {
            count: 20,
            selectedPage: page
          }
        }
      }}
    >
      {({ data: smsHistory, loading, error }) => {
        const queryResult = queryDataFormater(
          smsHistory,
          "GetSmsHistory",
          "result",
          undefined
        );
        const { data: smsHistoryData, pageInfo } = getFromResult(
          queryResult,
          "smsHistories",
          []
        );

        return (
          <Fragment>
            <SmsHistory
              setPage={setPage}
              pageData={pageInfo}
              smsData={smsHistoryData || []}
              loading={loading}
            />
          </Fragment>
        );
      }}
    </GetAllSmsHistory>
  );
};

export default SmsHistoryWrap;
