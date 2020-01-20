import React from "react";
import { IContext } from "../../BookingHostRouter";
import Vtable from "../../../../atoms/vtable/Vtable";

interface Iprops {
  context: IContext;
}

const MemberVtable: React.FC<Iprops> = ({ context }) => {
  const { applyedProduct } = context;
  if (!applyedProduct) return <div />;
  const { expireDate } = applyedProduct;

  // return <Vtable />;
  return <div />;
};

export default MemberVtable;
