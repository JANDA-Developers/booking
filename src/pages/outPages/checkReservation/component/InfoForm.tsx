import React, { useState } from "react";
import { InputText } from "@janda-com/front";
import { LANG } from "@janda-com/lang";
import Button from "../../../../atoms/button/Button";
import { toast } from "react-toastify";

interface IProp {
  onSearch: (prop: TSearchInput) => void;
}

export type TSearchInput = {
  name: any;
  password: string;
  phoneNumber: any;
};

const DefaultSearch: TSearchInput = {
  name: "",
  password: "",
  phoneNumber: ""
};

// 디프리 예정 입니다.
export const InfoForm: React.FC<IProp> = ({ onSearch }) => {
  const [searchInfo, setSearchInfo] = useState<TSearchInput>(DefaultSearch);

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
    <div>
      <div className="flex-grid-grow">
        <InputText
          onChange={(value: any) =>
            setSearchInfo({ ...searchInfo, name: value })
          }
          value={searchInfo.name}
          label={LANG("name")}
        />
        <InputText
          onChange={(value: any) =>
            setSearchInfo({ ...searchInfo, phoneNumber: value })
          }
          hyphen
          value={searchInfo.phoneNumber}
          label={LANG("contact")}
        />
        <InputText
          onChange={(value: any) =>
            setSearchInfo({ ...searchInfo, password: value })
          }
          label={LANG("password")}
          value={searchInfo.password}
          type="password"
        />
      </div>
      <div className="JDtext-align-center">
        <Button
          onClick={() => {
            if (validater()) onSearch(searchInfo);
          }}
          label={LANG("reservation_lookup")}
        />
      </div>
    </div>
  );
};
