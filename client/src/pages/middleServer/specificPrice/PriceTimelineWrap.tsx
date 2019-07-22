/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from "react";
import {Mutation, Query} from "react-apollo";
import moment from "moment-timezone";
import {
  getAllRoomType,
  getAllRoomTypePrice_GetAllRoomType_roomTypes as IRoomType,
  getAllRoomType_GetAllRoomType_roomTypes_rooms as IRoom,
  getAllRoomTypePrice,
  getAllRoomTypePriceVariables,
  getAllRoomTypePrice_GetAllRoomPrice_roomPrices as roomPrices,
  createRoomPrice,
  createRoomPriceVariables,
  deleteRoomPrice,
  deleteRoomPriceVariables,
  priceTimelineGetPrice,
  priceTimelineGetPriceVariables,
  priceTimelineGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices
} from "../../../types/api";
import PriceTimeline from "./PriceTimeline";
import {PriceTimelineDefaultProps} from "./timelineConfig";
import {
  CREATE_ROOM_PRICE,
  GET_ALL_ROOMTYPES_PRICE,
  DELETE_ROOM_PRICE,
  PRICE_TIMELINE_GET_PRICE
} from "../../../queries";
import {
  ErrProtecter,
  queryDataFormater,
  showError,
  setMidNight,
  onCompletedMessage
} from "../../../utils/utils";
import {TimePerMs} from "../../../types/enum";
import {useDayPicker} from "../../../actions/hook";

class GetAllRoomTypePriceQuery extends Query<
  priceTimelineGetPrice,
  priceTimelineGetPriceVariables
> {}
class CreateRoomPriceMu extends Mutation<
  createRoomPrice,
  createRoomPriceVariables
> {}
class DeleteRoomPriceMu extends Mutation<
  deleteRoomPrice,
  deleteRoomPriceVariables
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

interface IPropItemMaker {
  startDate: number;
  endDate: number;
  priceMap: Map<any, any>;
  roomTypes: IRoomType[];
}

const itemMaker = ({
  startDate,
  endDate,
  priceMap,
  roomTypes
}: IPropItemMaker): IItem[] => {
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
    now = moment(now)
      .add(1, "days")
      .valueOf();
  }
  return items;
};

interface IProps {
  houseId: string;
}

// 👼 앞으로 무조건 milisecond를 사용하는 편이 편할듯하다.
const PriceTimelineWrap: React.SFC<IProps> = ({houseId}) => {
  //  Default 값
  const dayPickerHook = useDayPicker(null, null);
  const defaultTime = {
    start: dayPickerHook.from
      ? setMidNight(moment(dayPickerHook.from).valueOf())
      : setMidNight(moment().valueOf()),
    end: dayPickerHook.to
      ? setMidNight(
          moment(dayPickerHook.to)
            .add(7, "days")
            .valueOf()
        )
      : setMidNight(
          moment()
            .add(7, "days")
            .valueOf()
        )
  };
  const [dataTime, setDataTime] = useState({
    start: setMidNight(
      moment()
        .subtract(30, "days")
        .valueOf()
    ),
    end: setMidNight(
      moment()
        .add(60, "days")
        .valueOf()
    )
  });

  // 방타입과 날자 조합의 키를 가지고 value로 pirce를 가지는 Map 생성
  const priceMapMaker = (priceData: roomPrices[]): Map<string, number> => {
    const priceMap = new Map();
    priceData.map(price => {
      priceMap.set(
        price.roomType._id + setMidNight(moment(price.date).valueOf()),
        price.price
      );
    });
    return priceMap;
  };

  // 방타입과 날자 조합의 키를 가지고 value로 pirce를 가지는 Map 생성
  const placeHolderMapMaker = (
    priceData: priceTimelineGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices[]
  ): Map<string, number> => {
    const placeHolderMap = new Map();
    priceData.map(price => {
      if (!price.datePrices) return;
      price.datePrices.map(datePrice => {
        placeHolderMap.set(
          price.roomType._id + setMidNight(moment(datePrice.date).valueOf()),
          datePrice.price
        );
      });
    });
    return placeHolderMap;
  };

  const queryVarialbes = {
    houseId,
    start: moment(dataTime.start)
      .toISOString()
      .split("T")[0],
    end: moment(dataTime.end)
      .toISOString()
      .split("T")[0]
  };

  // 👿 도대체왜!!!!!!
  moment.tz.setDefault("Asia/Seoul");

  return (
    <GetAllRoomTypePriceQuery
      fetchPolicy="network-only"
      query={PRICE_TIMELINE_GET_PRICE}
      variables={queryVarialbes}
    >
      {({data, loading, error}) => {
        showError(error);
        const roomTypesData = queryDataFormater(
          data,
          "GetAllRoomType",
          "roomTypes",
          undefined
        );
        // 원본데이터
        const roomPriceData = queryDataFormater(
          data,
          "GetAllRoomPrice",
          "roomPrices",
          []
        );

        const turePriceData = queryDataFormater(
          data,
          "GetRoomTypeDatePrices",
          "roomTypeDatePrices",
          []
        );

        const priceMap = priceMapMaker(roomPriceData || []);

        const placeHolderMap = placeHolderMapMaker(turePriceData || []);

        const items =
          roomTypesData &&
          itemMaker({
            startDate: dataTime.start,
            endDate: dataTime.end,
            priceMap,
            roomTypes: roomTypesData
          });
        return (
          // 방생성 뮤테이션
          <CreateRoomPriceMu
            onCompleted={({CreateRoomPrice}) => {
              onCompletedMessage(
                CreateRoomPrice,
                "가격설정완료",
                "가격설정 실패"
              );
            }}
            refetchQueries={[
              {query: GET_ALL_ROOMTYPES_PRICE, variables: queryVarialbes}
            ]}
            onError={showError}
            mutation={CREATE_ROOM_PRICE}
          >
            {createRoomPriceMu => (
              // 방생성 뮤테이션
              <DeleteRoomPriceMu
                onCompleted={({DeleteRoomPrice}) => {
                  onCompletedMessage(
                    DeleteRoomPrice,
                    "가격설정삭제",
                    "가격설정삭제 실패"
                  );
                }}
                refetchQueries={[
                  {query: GET_ALL_ROOMTYPES_PRICE, variables: queryVarialbes}
                ]}
                onError={showError}
                mutation={DELETE_ROOM_PRICE}
              >
                {deleteRoomPriceMu => (
                  <PriceTimeline
                    houseId={houseId}
                    items={items || undefined}
                    loading={loading}
                    defaultProps={PriceTimelineDefaultProps}
                    priceMap={priceMap}
                    roomTypesData={roomTypesData || undefined}
                    placeHolderMap={placeHolderMap}
                    createRoomPriceMu={createRoomPriceMu}
                    dataTime={dataTime}
                    setDataTime={setDataTime}
                    defaultTime={defaultTime}
                    key={`defaultTime${defaultTime.start}${defaultTime.end}`}
                    delteRoomPriceMu={deleteRoomPriceMu}
                    dayPickerHook={dayPickerHook}
                  />
                )}
              </DeleteRoomPriceMu>
            )}
          </CreateRoomPriceMu>
        );
      }}
    </GetAllRoomTypePriceQuery>
  );
};

export default ErrProtecter(PriceTimelineWrap);

// 왜 item 이 안나올까?
// 1.ID 문제다?
// 2.TimeStamp 문제다?
// 3. 필요한 인자가 빠졌다?
