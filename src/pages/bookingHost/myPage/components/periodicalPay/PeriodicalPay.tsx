import React from "react";
import { IContext } from "../../../BookingHostRouter";
import Card from "../../../../../atoms/cards/Card";
import PeriodicalSignCard from "./component/PeriodicalSignCard";
import PeriodicalTableWrap from "../periodicalPayTableWrap/PeriodicalPayTableWrap";

interface Iprops {
  context: IContext;
}

const PeriodicalPay: React.FC<Iprops> = ({ context }) => {
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
    </div>
  );
};

export default PeriodicalPay;
