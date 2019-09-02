import React, {useMemo, Fragment} from "react";
import {showError} from "../../utils/utils";
import DailyAssig from "./DailyAssig";
import {Query} from "react-apollo";
import {
  getAllRoomTypeWithGuestVariables,
  getAllRoomTypeWithGuest
} from "../../types/api";
import {GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM} from "../../queries";
import {IHouse} from "../../types/interface";
import {BookingStatus} from "../../types/enum";
import {queryDataFormater} from "../../utils/utils";
import moment from "moment";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {useDayPicker} from "../../actions/hook";
import JDIcon from "../../atoms/icons/Icons";
import Preloader from "../../atoms/preloader/Preloader";
import {IContext} from "../../pages/MiddleServerRouter";
import DailyAssigNew from "./DailyAssigNew";

class GetAllRoomTypeWithGuestQuery extends Query<
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables
> {}

interface IProps {
  context: IContext;
  date: Date;
  isInModal?: boolean;
}

const DailyAssigWrap: React.FC<IProps> = ({date, context, isInModal}) => {
  const {house} = context;
  const dayPickerHook = useDayPicker(date, date);
  const {houseConfig, _id: houseId} = house;
  const updateVariables = {
    houseId: houseId,
    start: dayPickerHook.from || new Date(),
    end: dayPickerHook.from || new Date()
  };

  const Result = useMemo(() => {
    return (
      <GetAllRoomTypeWithGuestQuery
        skip={!date}
        pollInterval={
          houseConfig.pollingPeriod
            ? houseConfig.pollingPeriod.period
            : undefined
        }
        query={GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM}
        variables={{
          ...updateVariables,
          bookingStatus: BookingStatus.COMPLETE
        }}
      >
        {({data, loading, error}) => {
          const roomTypesData = queryDataFormater(
            data,
            "GetAllRoomType",
            "roomTypes",
            undefined
          ); // 원본데이터
          const guestsData = queryDataFormater(
            data,
            "GetGuests",
            "guests",
            undefined
          ); // 원본데이터
          const blocks = queryDataFormater(
            data,
            "GetBlocks",
            "blocks",
            undefined
          ); // 원본데이터

          return (
            <Fragment>
              <DailyAssig
                loading={loading}
                context={context}
                blocksData={blocks || []}
                guestsData={guestsData || []}
                dayPickerHook={dayPickerHook}
                roomTypesData={roomTypesData || []}
              />
              <DailyAssigNew
                loading={loading}
                context={context}
                blocksData={blocks || []}
                guestsData={guestsData || []}
                dayPickerHook={dayPickerHook}
                roomTypesData={roomTypesData || []}
              />
            </Fragment>
          );
        }}
      </GetAllRoomTypeWithGuestQuery>
    );
  }, [dayPickerHook.from]);

  return Result;
};

export default DailyAssigWrap;
