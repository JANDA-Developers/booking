import React, {Fragment} from "react";
import {JDtoastModal} from "../../atoms/modal/Modal";
import {IUseModal, LANG} from "../../hooks/hook";

interface IPriceWarnModalParam {
  confirmCallBackFn: (flag: boolean) => void;
}

interface IProps {
  modalHook: IUseModal<IPriceWarnModalParam>;
}

const PriceWarnModal: React.FC<IProps> = ({modalHook}) => (
  <JDtoastModal
    confirmCallBackFn={modalHook.info.confirmCallBackFn}
    falseMessage={LANG("no")}
    trueMessage={LANG("yes")}
    {...modalHook}
    confirm
  >
    {LANG("the_price_is_too_low_are_you_sure_to_set_this_price")}
  </JDtoastModal>
);

export default PriceWarnModal;
