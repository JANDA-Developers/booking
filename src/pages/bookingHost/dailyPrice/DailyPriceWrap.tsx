/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import dayjs from "dayjs";
import {
  getAllRoomTypePrice_GetAllRoomType_roomTypes as IRoomType,
  getAllRoomType_GetAllRoomType_roomTypes_rooms as IRoom,
  getAllRoomTypePrice_GetAllDailyPrice_dailyPrices as dailyPrices,
  createDailyPrice,
  createDailyPriceVariables,
  deleteDailyPrice,
  deleteDailyPriceVariables,
  dailyPriceGetPriceVariables,
  dailyPriceGetPrice,
  dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices
} from "../../../types/api";
import DailyPrice from "./DailyPrice";
import { DailyPriceDefaultProps } from "./timelineConfig";
import {
  GET_ALL_ROOMTYPES_PRICE,
  PRICE_TIMELINE_GET_PRICE,
  CREATE_DAILY_PRICE,
  DELETE_DAILY_PRICE
} from "../../../apollo/queries";
import {
  ErrProtecter,
  queryDataFormater,
  setMidNight,
  onCompletedMessage
} from "../../../utils/utils";
import { TimePerMs } from "../../../types/enum";
import { useDayPicker, LANG } from "../../../hooks/hook";
import { IContext } from "../../bookingHost/BookingHostRouter";

// dayjs.tz.setDefault("Asia/Seoul");

class GetAllRoomTypePriceQuery extends Query<
  dailyPriceGetPrice,
  dailyPriceGetPriceVariables
> {}
class CreateDailyPriceMu extends Mutation<
  createDailyPrice,
  createDailyPriceVariables
> {}
class DeleteDailyPriceMu extends Mutation<
  deleteDailyPrice,
  deleteDailyPriceVariables
> {}

export interface IItem {
  id: string;
  group: string;
  name: string;
  // ms
  price: number;
  start: number;
  end: number;
}
// 날자와 방타입 2중 순환 시켜서 모든 블럭에 맞는 item 을 생성
// price 부분은 Map 에서호출

interface IPropItemCreater {
  startDate: number;
  endDate: number;
  priceMap: Map<any, any>;
  roomTypes: IRoomType[];
}

const itemCreater = ({
  startDate,
  endDate,
  priceMap,
  roomTypes
}: IPropItemCreater): IItem[] => {
  let items: IItem[] = [];
  let now = startDate;

  const roomTpyesMapFn = (roomType: IRoomType) => ({
    id: roomType._id + now,
    group: roomType._id,
    start: now,
    end: now + TimePerMs.DAY,
    price: priceMap.get(roomType._id + now),
    name: "any",
    style: {
      backgroundColor: "fuchsia"
    },
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      "data-custom-attribute": "Random content",
      "aria-hidden": true
    }
  });

  while (now <= endDate) {
    items = items.concat(roomTypes.map(roomTpyesMapFn));
    now = dayjs(now)
      .add(1, "days")
      .valueOf();
  }
  return items;
};

interface IProps {
  context: IContext;
}

const DailyPriceWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  //  Default 값
  const dayPickerHook = useDayPicker(null, null);
  const defaultTime = {
    start: setMidNight(dayjs(dayPickerHook.from || new Date()).valueOf()),
    end: setMidNight(
      dayjs(dayPickerHook.to || new Date())
        .add(7, "days")
        .valueOf()
    )
  };
  const [dataTime, setDataTime] = useState({
    start: setMidNight(
      dayjs()
        .subtract(30, "days")
        .valueOf()
    ),
    end: setMidNight(
      dayjs()
        .add(60, "days")
        .valueOf()
    )
  });

  // 방타입과 날자 조합의 키를 가지고 value로 pirce를 가지는 Map 생성
  const priceMapCreater = (priceData: dailyPrices[]): Map<string, number> => {
    const priceMap = new Map();
    priceData.map(price => {
      priceMap.set(
        price.roomType._id + setMidNight(dayjs(price.date).valueOf()),
        price.price
      );
    });
    return priceMap;
  };

  // 방타입과 날자 조합의 키를 가지고 value로 pirce를 가지는 Map 생성
  const placeHolderMapCreater = (
    priceData: dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices[]
  ): Map<string, number> => {
    const placeHolderMap = new Map();
    priceData.map(price => {
      if (!price.datePrices) return;
      price.datePrices.map(datePrice => {
        placeHolderMap.set(
          price.roomType._id + setMidNight(dayjs(datePrice.date).valueOf()),
          datePrice.price
        );
      });
    });
    return placeHolderMap;
  };

  const queryVarialbes = {
    houseId: house._id,
    checkIn: dayjs(dataTime.start)
      .toISOString()
      .split("T")[0],
    checkOut: dayjs(dataTime.end)
      .toISOString()
      .split("T")[0]
  };

  return (
    <GetAllRoomTypePriceQuery
      fetchPolicy="network-only"
      query={PRICE_TIMELINE_GET_PRICE}
      variables={{
        houseId: house._id,
        checkIn: queryVarialbes.checkIn,
        checkOut: queryVarialbes.checkOut,
        param: queryVarialbes
      }}
    >
      {({ data, loading, error, networkStatus }) => {
        const roomTypesData = queryDataFormater(
          data,
          "GetAllRoomType",
          "roomTypes",
          undefined
        );
        // 원본데이터
        const dailyPriceData = queryDataFormater(
          data,
          "GetAllDailyPrice",
          "dailyPrices",
          []
        );

        const turePriceData = queryDataFormater(
          data,
          "GetRoomTypeDatePrices",
          "roomTypeDatePrices",
          []
        );

        const priceMap = priceMapCreater(dailyPriceData || []);

        const placeHolderMap = placeHolderMapCreater(turePriceData || []);

        const items =
          roomTypesData &&
          itemCreater({
            startDate: dataTime.start,
            endDate: dataTime.end,
            priceMap,
            roomTypes: roomTypesData
          });
        return (
          // 방생성 뮤테이션
          <CreateDailyPriceMu
            onCompleted={({ CreateDailyPrice }) => {
              onCompletedMessage(
                CreateDailyPrice,
                LANG("price_setting_complited"),
                LANG("price_setting_failed")
              );
            }}
            refetchQueries={[
              { query: GET_ALL_ROOMTYPES_PRICE, variables: queryVarialbes }
            ]}
            mutation={CREATE_DAILY_PRICE}
          >
            {createDailyPriceMu => (
              // 방생성 뮤테이션
              <DeleteDailyPriceMu
                onCompleted={({ DeleteDailyPrice }) => {
                  onCompletedMessage(
                    DeleteDailyPrice,
                    LANG("price_setting_delete"),
                    LANG("price_setting_delete_fail")
                  );
                }}
                refetchQueries={[
                  { query: GET_ALL_ROOMTYPES_PRICE, variables: queryVarialbes }
                ]}
                mutation={DELETE_DAILY_PRICE}
              >
                {deleteDailyPriceMu => (
                  <DailyPrice
                    context={context}
                    items={items || undefined}
                    loading={loading}
                    defaultProps={DailyPriceDefaultProps}
                    priceMap={priceMap}
                    roomTypesData={roomTypesData || undefined}
                    placeHolderMap={placeHolderMap}
                    createDailyPriceMu={createDailyPriceMu}
                    dataTime={dataTime}
                    setDataTime={setDataTime}
                    defaultTime={defaultTime}
                    key={`defaultTime${defaultTime.start}${defaultTime.end}`}
                    delteDailyPriceMu={deleteDailyPriceMu}
                    dayPickerHook={dayPickerHook}
                    networkStatus={networkStatus}
                  />
                )}
              </DeleteDailyPriceMu>
            )}
          </CreateDailyPriceMu>
        );
      }}
    </GetAllRoomTypePriceQuery>
  );
};

export default ErrProtecter(DailyPriceWrap);
