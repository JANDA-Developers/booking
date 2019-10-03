import React, {useState} from "react";
import {Query} from "react-apollo";
import {
  getAllReadMe,
  getFileTxt,
  getFileTxtVariables
} from "../../../types/api";
import {
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import {
  GET_BOOKINGS,
  DELETE_BOOKING,
  UPDATE_BOOKING,
  GET_ALL_README,
  GET_FILE_TXT
} from "../../../queries";
import {getOperationName} from "apollo-link";
import {usePagiNation} from "../../../hooks/hook";
import DocumentHome from "./DocumentHome";

interface IProps {
  houseId: string;
}

class GetAllReadMe extends Query<getAllReadMe> {}
class GetFileTxt extends Query<getFileTxt, getFileTxtVariables> {}

const DocumentHomeWrap: React.FC<IProps> = () => {
  const [readMePath, setReadMePath] = useState("");

  return (
    <GetAllReadMe query={GET_ALL_README}>
      {({data: readMeData, loading, error}) => {
        const allReadMe = queryDataFormater(
          readMeData,
          "GetAllReadMe",
          "paths",
          undefined
        );
        return (
          <GetFileTxt
            skip={readMePath === ""}
            variables={{path: readMePath}}
            query={GET_FILE_TXT}
          >
            {({data: markDownTxtData, loading, error}) => {
              const markDownTxt = queryDataFormater(
                markDownTxtData,
                "GetFileTxt",
                "fileTxt",
                undefined
              );
              return (
                <DocumentHome
                  markDownTxt={markDownTxt || ""}
                  setReadMePath={setReadMePath}
                  loading={loading}
                  allReadMe={allReadMe || []}
                />
              );
            }}
          </GetFileTxt>
        );
      }}
    </GetAllReadMe>
  );
};

export default DocumentHomeWrap;
