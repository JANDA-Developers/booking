import React, {Fragment, useState} from "react";
import {Query} from "react-apollo";
import {getSmsHistory, getSmsHistoryVariables} from "../../../types/api";
import {queryDataFormater, showError} from "../../../utils/utils";
import {GET_SMS_HISTORY} from "../../../queries";
import SmsHistory from "./SmsHistory";

class GetAllSmsHistory extends Query<getSmsHistory, getSmsHistoryVariables> {}

interface Iprops {
  smsInfoId: string;
}

const SmsHistoryWrap: React.SFC<Iprops> = ({smsInfoId}) => {
  const [page, setPage] = useState(1);

  return (
    <GetAllSmsHistory
      query={GET_SMS_HISTORY}
      variables={{
        smsInfoId: smsInfoId,
        page,
        count: 20
      }}
    >
      {({data: smsHistory, loading, error}) => {
        const smsHistoryData = queryDataFormater(
          smsHistory,
          "GetSmsHistory",
          "smsHistories",
          undefined
        );
        const pageInfo = queryDataFormater(
          smsHistory,
          "GetSmsHistory",
          "pageInfo",
          undefined
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
