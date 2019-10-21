import React, {useState} from "react";
import CheckTable from "./CheckTable";
import {toast} from "react-toastify";
import {
  getBookingForPublic_GetBookingForPublic_booking,
  getBookingForPublicVariables,
  getBookingForPublic
} from "../../../types/api";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import {ApolloQueryResult} from "apollo-boost";

interface Iprops {
  data: getBookingForPublic_GetBookingForPublic_booking | null | undefined;
  refetch: (
    variables?: getBookingForPublicVariables | undefined
  ) => Promise<ApolloQueryResult<getBookingForPublic>>;
}

const CheckView: React.FC<Iprops> = ({data, refetch}) => {
  const [searchInfo, setSearchInfo] = useState({
    name: data ? data.name : "",
    password: data ? data.password || "" : "",
    phoneNumber: data ? data.phoneNumber : ""
  });

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
          value={searchInfo.name}
          label="이름"
        />
        <InputText
          onChange={value => setSearchInfo({...searchInfo, phoneNumber: value})}
          hyphen
          value={searchInfo.phoneNumber}
          label={LANG("contact")}
        />
        <InputText
          onChange={value => setSearchInfo({...searchInfo, password: value})}
          label={LANG("password")}
          value={searchInfo.password}
          type="password"
        />
      </div>
      <div className="JDtext-align-center">
        <Button
          onClick={() => {
            if (validater()) {
              refetch({
                getBookingParam: {
                  ...searchInfo
                }
              });
            }
          }}
          label="예약조회"
        />
      </div>
      <h6>예약확인</h6>
      <CheckTable tableData={data ? [data] : undefined} />
    </div>
  );
};

export default CheckView;
