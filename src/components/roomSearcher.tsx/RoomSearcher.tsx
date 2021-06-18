import React from "react";
import Button from "../../atoms/button/Button";
import { useDayPicker, LANG, useModal } from "../../hooks/hook";
import dayjs from "dayjs";
import DoubleInputRange from "../../atoms/dayPicker/component/inputComponent/DoubleInputRange";
import { toast } from "react-toastify";
import "./RoomSearcher.scss";
import Card from "../../atoms/cards/Card";
import { JDdayPickerModal } from "@janda-com/front";
export interface IRetrunRoomSearcher {
  checkIn: Date;
  checkOut: Date;
}

interface Iprops {
  callBackOnSearch: (prop: IRetrunRoomSearcher) => void;
}

const RoomSearcher: React.FC<Iprops> = ({ callBackOnSearch }) => {
  const dayPickerModal = useModal(false);
  const dayPickerHook = useDayPicker(
    new Date(),
    dayjs(new Date())
      .add(1, "day")
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
        <DoubleInputRange
          onClick={() => {
            dayPickerModal.openModal();
          }}
          dayPickerHook={dayPickerHook}
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
      <JDdayPickerModal
        displayCaption
        autoClose
        modalHook={dayPickerModal}
        {...dayPickerHook}
      />
    </div>
  );
};

export default RoomSearcher;
