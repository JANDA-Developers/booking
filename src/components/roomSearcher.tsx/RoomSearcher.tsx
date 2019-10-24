import React from "react";
import {IContext} from "../../pages/MiddleServerRouter";
import Button from "../../atoms/button/Button";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {useDayPicker, LANG} from "../../hooks/hook";
import moment from "moment";
import DoubleInputRange from "../../atoms/dayPicker/component/inputComponent/DoubleInputRange";
import {validate} from "graphql";
import {toast} from "react-toastify";
import "./RoomSearcher.scss";
import Card from "../../atoms/cards/Card";
export interface IRetrunRoomSearcher {
  checkIn: Date;
  checkOut: Date;
}

interface Iprops {
  callBackOnSearch: (prop: IRetrunRoomSearcher) => void;
}

const RoomSearcher: React.FC<Iprops> = ({callBackOnSearch}) => {
  const dayPickerHook = useDayPicker(
    new Date(),
    moment(new Date())
      .add("day", 1)
      .toDate()
  );

  const validate = () => {
    if (!dayPickerHook.from) {
      toast.warn(LANG("choseCheckInDate"));
      return false;
    }

    if (!dayPickerHook.to) {
      toast.warn(LANG("choseCheckOutDate"));
      return false;
    }

    return true;
  };

  return (
    <div className="RoomSearcher">
      <Card align="center">
        <h3 className="RoomSearcher__title JDnoWrap JDtext-align-center">
          {LANG("search_reservation")}
        </h3>
        <JDdayPicker
          calenaderPosition="center"
          {...dayPickerHook}
          input
          className="RoomSearcher__dayPicker"
          inputComponent={(prop: any) => (
            <DoubleInputRange {...prop} dayPickerHook={dayPickerHook} />
          )}
        />
        <Button
          onClick={() => {
            if (!validate()) return;
            callBackOnSearch({
              checkIn: dayPickerHook.from!,
              checkOut: dayPickerHook.to!
            });
          }}
          thema="primary"
          size="longLarge"
          label={LANG("search")}
        />
      </Card>
    </div>
  );
};

export default RoomSearcher;
