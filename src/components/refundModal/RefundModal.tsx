import React from "react";
import InputText from "../../atoms/forms/inputText/InputText";
import { LANG, IUseModal } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import ModalEndSection from "../../atoms/modal/components/ModalEndSection";
import Button from "../../atoms/button/Button";

interface IProps {
  refundAmt: number;
  setRefundAmt: React.Dispatch<React.SetStateAction<number>>;
  modalHook: IUseModal;
  onRefundClick: () => void;
}

const RefundModal: React.FC<IProps> = ({
  modalHook,
  refundAmt,
  setRefundAmt,
  onRefundClick
}) => {
  return (
    <JDmodal {...modalHook}>
      <InputText
        value={refundAmt}
        onChange={v => {
          setRefundAmt(v);
        }}
        label={LANG("refund_price")}
      />
      <ModalEndSection>
        <Button
          label={LANG("refund")}
          onClick={() => {
            onRefundClick();
          }}
        />
      </ModalEndSection>
    </JDmodal>
  );
};

export default RefundModal;
