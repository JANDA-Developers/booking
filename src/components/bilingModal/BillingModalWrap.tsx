import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import BillingModal from "./BillingModal";
import { IUseModal } from "../../hooks/hook";

export interface IChainProp {
  modalHook: IUseModal;
  context: IContext;
}

interface IProps extends IChainProp {}

const BillingModalWrap: React.FC<IProps> = ({ modalHook, context }) => {
  return <BillingModal modalHook={modalHook} context={context} />;
};

export default BillingModalWrap;
