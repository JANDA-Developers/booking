import React, { useState } from "react";
import InputText from "../../atoms/forms/inputText/InputText";
import { LANG, IUseModal } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import ModalEndSection from "../../atoms/modal/components/ModalEndSection";
import Button from "../../atoms/button/Button";
import { JDalign } from "@janda-com/front";
import { autoComma } from "../../utils/utils";
import JDtypho from "../../atoms/typho/Typho";

type TRefundInfo = {
  id: string,
  amt: number
}

type TRefundTarget = {
  name: string
  id: string
  max: number
}

interface IProps {
  modalHook: IUseModal;
  refundTargets: TRefundTarget[];
  isMulti?: boolean;
  onRefunds?: (refundInfo: TRefundInfo[]) => void;
  onRefund?: (amt: number) => void;
}

const RefundModal: React.FC<IProps> = ({
  modalHook,
  onRefund,
  onRefunds,
  isMulti,
  refundTargets
}) => {
  const [refundInfos, setRefundInfos] = useState<TRefundInfo[]>(refundTargets.map((t) => ({
    amt: t.max,
    id: t.id
  })));

  return (
    <JDmodal
      foot={
        <Button
          label={LANG("refund")}
          onClick={() => {
            if (!isMulti)
              onRefund && onRefund(refundInfos[0].amt);
            else
              onRefunds && onRefunds(refundInfos);
          }}
        />
      }
      head={{
        title: ""
      }} {...modalHook}>
      {refundInfos.map((target) => {
        const { id, amt } = target;
        return <JDalign flex key={id}>
          <JDtypho>{name}</JDtypho>
          <InputText
            placeholder={LANG("max_refund")(autoComma(amt))}
            value={amt}
            onChange={v => {
              target.amt = v;
              setRefundInfos([...refundInfos]);
            }}
            label={LANG("refund_price")}
          />
        </JDalign>
      }
      )}
    </JDmodal>
  );
};

export default RefundModal;
