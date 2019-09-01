import React, {Fragment} from "react";
import {JDtoastModal} from "../../atoms/modal/Modal";
import {IUseModal} from "../../actions/hook";

interface IPriceWarnModalParam {
  confirmCallBackFn: (flag: boolean) => void;
}

interface IProps {
  modalHook: IUseModal<IPriceWarnModalParam>;
}

const PriceWarnModal: React.FC<IProps> = ({modalHook}) => (
  <JDtoastModal
    confirmCallBackFn={modalHook.info.confirmCallBackFn}
    falseMessage="아니요"
    trueMessage="예"
    {...modalHook}
    confirm
  >
    가격이 1000원 이하입니다. <br />
    정말설정하실려는 가격이 맞나요?
  </JDtoastModal>
);

export default PriceWarnModal;
