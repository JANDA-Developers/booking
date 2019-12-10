import React from "react";
import { IContext } from "../../../BookingHostRouter";
import Card from "../../../../../atoms/cards/Card";
import PeriodicalSignCard from "./component/PeriodicalSignCard";
import PeriodicalTableWrap from "../periodicalPayTableWrap/PeriodicalPayTableWrap";
import { useModal } from "../../../../../hooks/hook";
import CardModal from "../cardModal.tsx/CardModal";

interface Iprops {
  context: IContext;
}

const PeriodicalPay: React.FC<Iprops> = ({ context }) => {
  const cardModalHook = useModal(true);

  return (
    <div>
      <div>
        <Card>
          <PeriodicalSignCard context={context} />
        </Card>
      </div>
      <div>
        <Card>
          <PeriodicalTableWrap context={context} />
        </Card>
      </div>
      <CardModal modalHook={cardModalHook} context={context} />
    </div>
  );
};

export default PeriodicalPay;
