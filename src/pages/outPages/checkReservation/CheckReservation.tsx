import React, {useState, useEffect} from "react";
import CheckTable from "./CheckTable";
import {toast} from "react-toastify";
import {
  getBookingForPublic_GetBookingForPublic_booking,
  getBookingForPublicVariables,
  getBookingForPublic
} from "../../../types/api";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import {ApolloQueryResult} from "apollo-client";
import {LANG} from "../../../hooks/hook";

interface Iprops {
  loading: boolean;
  data: getBookingForPublic_GetBookingForPublic_booking | null | undefined;
  refetch: (
    variables?: getBookingForPublicVariables | undefined
  ) => Promise<ApolloQueryResult<getBookingForPublic>>;
}

const CheckReservation: React.FC<Iprops> = ({data, refetch, loading}) => {
  const {name, password, phoneNumber} = data || {
    name: "",
    password: "",
    phoneNumber: ""
  };

  const updateInput = {
    name,
    password: password || "",
    phoneNumber
  };

  const [searchInfo, setSearchInfo] = useState(updateInput);

  useEffect(() => {
    setSearchInfo(updateInput);
  }, []);

  const validater = () => {
    if (!searchInfo.name) {
      toast.warn(LANG("input_your_name_please"));
      return false;
    }
    if (!searchInfo.phoneNumber) {
      toast.warn(LANG("please_enter_your_phone_number"));
      return false;
    }
    if (!searchInfo.password) {
      toast.warn("input_your_password_please");
      return false;
    }
    return true;
  };

  return (
    <div id="JDreservation" className="JDreservation">
      <h6>{LANG("reservation_information")}</h6>
      <div className="flex-grid-grow">
        <InputText
          onChange={value => setSearchInfo({...searchInfo, name: value})}
          value={searchInfo.name}
          label={LANG("name")}
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
                getBookingParam: searchInfo,
                // @ts-ignore
                skip: loading
              });
            }
          }}
          label={LANG("reservation_lookup")}
        />
      </div>
      <h6>{LANG("reservation_confirm")}</h6>
      <CheckTable tableData={data ? [data] : undefined} />
    </div>
  );
};

export default CheckReservation;
