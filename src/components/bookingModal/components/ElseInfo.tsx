import React from "react";
import { IBookingModalContext } from "../declaration";
import Align from "../../../atoms/align/Align";
import JDtypho from "../../../atoms/typho/Typho";
import InputText from "../../../atoms/forms/inputText/InputText";
import { LANG } from "../../../hooks/hook";
import JDselect, {
  SelectBoxSize
} from "../../../atoms/forms/selectBox/SelectBox";
import {
  PAYMETHOD_FOR_HOST_OP,
  PAYMENT_STATUS_OP,
  CHECK_IN_OUT_OP
} from "../../../types/const";
import { autoComma, toNumber } from "../../../utils/utils";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";

interface IProps {
  responseStyle: any;
  bookingModalContext: IBookingModalContext;
}

const ElseInfo: React.FC<IProps> = ({ bookingModalContext, responseStyle }) => {
  const {
    memoHook,
    checkInOutHook,
    breakfast,
    setBreakfast,
    isDesktopUp
  } = bookingModalContext;
  return (
    <Align {...responseStyle} mr={undefined}>
      {isDesktopUp && <JDtypho mb="normal">{LANG("else")}</JDtypho>}
      <div>
        <InputText {...memoHook} halfHeight textarea label={LANG("memo")} />
      </div>
      <div>
        <JDselect
          menuPlacement="top"
          options={CHECK_IN_OUT_OP}
          label={LANG("check_in_slash_check_out")}
          {...checkInOutHook}
        />
      </div>
      <div>
        <CheckBox
          label={LANG("breakfast")}
          checked={breakfast}
          onChange={v => {
            setBreakfast(v);
          }}
        />
      </div>
    </Align>
  );
};

export default ElseInfo;
