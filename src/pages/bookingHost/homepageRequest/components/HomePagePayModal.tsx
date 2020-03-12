import React from "react";
import { DoBillPayInput } from "../../../../types/api";
import { IContext } from "../../BookingHostRouter";

interface IProps {
  onSubmit: (payInfo: DoBillPayInput) => {};
  context: IContext;
}

const HomePagePayModal: React.FC<IProps> = ({ context, onSubmit }) => {
  const { user } = context;
  const { paymentInfos } = user;
  return <div />;
};

export default HomePagePayModal;
