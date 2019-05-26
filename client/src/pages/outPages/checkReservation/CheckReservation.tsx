import React, {useState} from "react";
import {WindowSizeProps} from "react-window-size";
import {ReactTableDefaults} from "react-table";
import {MutationFn} from "react-apollo";
import ErrProtecter from "../../../utils/errProtect";
import "./CheckReservation.scss";
import {
  GuestPartInput,
  BookerInput,
  createBooker,
  createBookerVariables,
  findBookerVariables,
  findBooker_FindBooker_bookers
} from "../../../types/api";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import {onCompletedMessage} from "../../../utils/utils";
import CheckTable from "./CheckTable";
import {toast} from "react-toastify";
export interface ISetBookerInfo
  extends React.Dispatch<React.SetStateAction<BookerInput>> {}

interface IProps {
  defaultBookerInfo: {
    name: string | undefined;
    password: string | undefined;
    phoneNumber: string | undefined;
  };
  findBookerQr(bookerInfo: findBookerVariables): Promise<any>;
}

const SetPrice: React.SFC<IProps> = ({defaultBookerInfo, findBookerQr}) => {
  const [searchInfo, setSearchInfo] = useState(defaultBookerInfo);
  const [queryResult, setQueryResult] = useState<
    findBooker_FindBooker_bookers[] | undefined
  >();

  console.log("queryResult");
  console.log(queryResult);
  console.log(queryResult);
  const validater = () => {
    if (!searchInfo.name) {
      toast.warn("이름을 입력해주세요.");
      return false;
    }
    if (!searchInfo.phoneNumber) {
      toast.warn("전화번호를 입력해주세요.");
      return false;
    }
    if (!searchInfo.password) {
      toast.warn("패스워드를 입력해주세요.");
      return false;
    }
    return true;
  };

  return (
    <div id="JDreservation" className="JDreservation">
      <h6>예약정보</h6>
      <div className="flex-grid-grow">
        <InputText
          onChange={value => setSearchInfo({...searchInfo, name: value})}
          label="이름"
        />
        <InputText
          onChange={value => setSearchInfo({...searchInfo, phoneNumber: value})}
          hyphen
          label="연락처"
        />
        <InputText
          onChange={value => setSearchInfo({...searchInfo, password: value})}
          label="비밀번호"
          type="password"
        />
      </div>
      <div className="JDtext-align-center">
        <Button
          onClick={async () => {
            if (searchInfo.password && validater()) {
              const bookers = await findBookerQr({
                name: searchInfo.name,
                password: searchInfo.password,
                phoneNumber: searchInfo.phoneNumber,
                houseId: "5cb1a8abcc8ef91ca45ab02b"
              });

              if (bookers) {
                setQueryResult(bookers);
              }
            }
          }}
          label="예약조회"
        />
      </div>
      <h6>예약확인</h6>
      <CheckTable tableData={queryResult || []} />
    </div>
  );
};

export default ErrProtecter(SetPrice);
