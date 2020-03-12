import React from "react";
import { LANG, IUseSelect } from "../../../../hooks/hook";
import JDselect, {
  JDselectProps
} from "../../../../atoms/forms/selectBox/SelectBox";
import { PAYMETHOD_FOR_JD_OP } from "../../../../types/const";
import { PayMethod } from "../../../../types/api";
import "./PayMethodSelecter.scss";

interface IProps extends JDselectProps {
  selectHook: IUseSelect<PayMethod>;
}

const PayMethodSelecter: React.FC<IProps> = ({ selectHook, ...props }) => {
  return (
    <div className="payMethodSelecter">
      <h6>{LANG("payment_info")}</h6>
      <JDselect {...selectHook} options={PAYMETHOD_FOR_JD_OP} {...props} />
    </div>
  );
};

export default PayMethodSelecter;
