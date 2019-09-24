import React from "react";
import {IContext} from "../../pages/MiddleServerRouter";
import Button from "../../atoms/button/Button";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {useDayPicker} from "../../actions/hook";
import moment from "moment";
import DoubleInputRange from "../../atoms/dayPicker/component/inputComponent/doubleInputRange";
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
      toast.warn("체크인 날자를 선택해주세요.");
      return false;
    }

    if (!dayPickerHook.to) {
      toast.warn("체크아웃 날자를 선택해주세요.");
      return false;
    }

    return true;
  };

  return (
    <div className="RoomSearcher">
      <Card align="center">
        <h3 className="RoomSearcher__title JDnoWrap JDtext-align-center">
          예약 검색하기
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
          label="검색"
        />
      </Card>
    </div>
  );
};

export default RoomSearcher;
