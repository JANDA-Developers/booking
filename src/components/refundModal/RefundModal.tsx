import React, { useState } from "react";
import InputText from "../../atoms/forms/inputText/InputText";
import { LANG, IUseModal } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import ModalEndSection from "../../atoms/modal/components/ModalEndSection";
import Button from "../../atoms/button/Button";
import { JDalign, JDbutton, toast } from "@janda-com/front";
import { autoComma } from "../../utils/utils";
import JDtypho from "../../atoms/typho/Typho";
import { validate } from "graphql";

type TRefundInfo = {
  id: string,
  amt: number,
  max: number
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
    max: t.max,
    amt: t.max,
    id: t.id
  })));

  const validate = () => {
    let result = true;

    refundInfos.forEach(info => {
      if (info.max > info.amt) {
        toast.error(LANG("can_not_refund_that_much"));
        result = false;
      }
    })

    return result;
  }

  return (
    <JDmodal
      head={{
        title: <div>
          <h6>{LANG("refund_modal_title")}</h6>
          <JDtypho size="small">
            {LANG("refund_modal_header_desc")}
          </JDtypho>
        </div>
      }} {...modalHook}>
      <div>
        {refundInfos.map((target) => {
          const { id, amt, max } = target;
          return <div>
            <JDtypho>{name}</JDtypho>
            <JDalign mb="normal" style={{
              justifyContent: "end",
              alignItems: "flex-end"
            }} flex key={id}>
              <InputText
                mb="no"
                comma
                placeholder={`최대 금액 ${autoComma(max)}원`}
                value={amt}
                onChange={v => {
                  target.amt = v;
                  setRefundInfos([...refundInfos]);
                }}
                label={LANG("refund_price")}
              />
              <JDbutton mb="no" onClick={() => {
                target.amt = max;
                setRefundInfos([...refundInfos]);
              }} mode="border" label={LANG("all_cost")} />
            </JDalign>
          </div>
        })}
        <ModalEndSection>
          <Button
            mode="flat"
            size="long"
            thema="primary"
            label={LANG("refund")}
            onClick={() => {
              if (validate()) {
                if (!isMulti)
                  onRefund && onRefund(refundInfos[0].amt);
                else
                  onRefunds && onRefunds(refundInfos);
              }
            }}
          />
        </ModalEndSection>
      </div>
    </JDmodal>
  );
};

export default RefundModal;
