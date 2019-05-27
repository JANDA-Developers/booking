/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from "react";
import {Query, Mutation} from "react-apollo";
import moment from "moment-timezone";
import _ from "lodash";
import assigDefaultProps from "./timelineConfig";
import {
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables,
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  updateBooker,
  updateBookerVariables,
  deleteBooker,
  deleteBookerVariables,
  deleteGuests,
  deleteGuestsVariables,
  blockingBed,
  blockingBedVariables
} from "../../../types/api";
import {useToggle, useDayPicker} from "../../../actions/hook";
import {IRoomType, IGuests} from "../../../types/interface";
import {
  isEmpty,
  setMidNight,
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import EerrorProtect from "../../../utils/errProtect";
import {Gender, BookingStatus} from "../../../types/enum";
import {
  GET_ALL_ROOMTYPES_WITH_GUESTS,
  ALLOCATE_GUEST_TO_ROOM,
  UPDATE_BOOKER,
  DELETE_GUEST,
  BLOCKING_BED
} from "../../../queries";
import AssigTimeline from "./AssigTimeline";
import {setYYYYMMDD, parallax} from "../../../utils/setMidNight";
import {roomDataManufacture} from "./components/groupDataMenufacture";

moment.tz.setDefault("UTC");

class UpdateBookerMu extends Mutation<updateBooker, updateBookerVariables> {}
class BlockingBedMu extends Mutation<blockingBed, blockingBedVariables> {}

export interface IAssigGroup {
  id: string;
  title: string;
  roomTypeId: string;
  roomTypeIndex: number;
  roomIndex: number;
  roomType: IRoomType;
  roomId: string;
  placeIndex: number;
  isLastOfRoom: boolean;
  isLastOfRoomType: boolean;
  bedIndex: number;
  type: "add" | "normal" | "addRoomType";
}

export interface IAssigItem {
  id: string;
  guestIndex: number;
  name: string;
  group: string;
  bookerId: string;
  isCheckin: boolean;
  roomTypeId: string;
  roomId: string;
  bedIndex: number;
  start: number;
  end: number;
  gender: Gender | null;
  isUnsettled: boolean;
  validate: IAssigItemCrush[];
  type: "normal" | "mark" | "make" | "block";
}

export const defaultItemProps = {
  guestIndex: -1,
  name: "",
  group: "",
  bookerId: "",
  isCheckin: false,
  roomTypeId: "",
  roomId: "",
  start: 0,
  end: 0,
  gender: null,
  bedIndex: -1,
  isUnsettled: false,
  validate: []
};

export interface IAssigItemCrush {
  guestIndex: number;
  reason: string;
  start: number | null;
  end: number | null;
}

interface IProps {
  houseId: string;
}

class GetAllRoomTypeWithGuestQuery extends Query<
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables
> {}
class AllocateGuestToRoomMu extends Mutation<
  allocateGuestToRoom,
  allocateGuestToRoomVariables
> {}
class DeleteGuestMu extends Mutation<deleteGuests, deleteGuestsVariables> {}

const AssigTimelineWrap: React.SFC<IProps> = ({houseId}) => {
  const dayPickerHook = useDayPicker(null, null);
  const defaultStartDate = dayPickerHook.from
    ? moment(dayPickerHook.from).valueOf()
    : moment().valueOf();
  const defaultEndDate = setMidNight(
    dayPickerHook.from
      ? setMidNight(
          moment(dayPickerHook.from)
            .add(10, "days")
            .valueOf()
        )
      : setMidNight(
          moment()
            .add(10, "days")
            .valueOf()
        )
  );
  const [dataTime, setDataTime] = useState({
    start: setMidNight(
      moment()
        .subtract(5, "days")
        .valueOf()
    ),
    end: setMidNight(
      moment()
        .add(14, "days")
        .valueOf()
    )
  });

  const crushTimeMake = (
    guestData: IGuests,
    index: number
  ): IAssigItemCrush[] => {
    if (guestData.isSettleable && guestData.isSettleable.duplicateDates) {
      return guestData.isSettleable.duplicateDates.map(date => ({
        start: moment(date.start).valueOf(),
        end: moment(date.end).valueOf(),
        guestIndex: index,
        reason: ""
      }));
    }
    return [];
  };
  //  TODO: 메모를 사용해서 데이터를 아끼자
  // 게스트 데이터를 달력에서 쓸수있는 Item 데이터로 변경 절차
  const guestsDataManufacture = (
    allGuestsData: IGuests[] | null | undefined = []
  ) => {
    const alloCateItems: IAssigItem[] = [];
    if (!allGuestsData) return alloCateItems;

    const guestsData = allGuestsData.filter(
      guest => guest.booker.bookingStatus !== BookingStatus.CANCEL
    );
    guestsData.forEach((guestData, index) => {
      const isDomitory = guestData.pricingType === "DOMITORY";

      if (
        guestData &&
        guestData.booker &&
        guestData.roomType &&
        guestData.allocatedRoom
      ) {
        alloCateItems.push({
          id: guestData._id,
          guestIndex: index,
          name: guestData.name,
          bookerId: guestData.booker._id,
          isCheckin: guestData.booker.checkIn.isIn,
          gender: guestData.gender,
          roomTypeId: guestData.roomType._id,
          roomId: guestData.allocatedRoom._id,
          isUnsettled: guestData.isUnsettled,
          group: guestData.allocatedRoom._id + guestData.bedIndex,
          start: moment(guestData.start).valueOf(),
          end: moment(guestData.end).valueOf(),
          validate: crushTimeMake(guestData, index),
          type: "normal",
          bedIndex: guestData.bedIndex
        });
      }
    });

    return alloCateItems;
  };

  const updateVariables = {
    houseId,
    start: setYYYYMMDD(moment(dataTime.start)),
    end: setYYYYMMDD(moment(dataTime.end))
  };

  moment.tz.setDefault("UTC");

  return (
    <GetAllRoomTypeWithGuestQuery
      fetchPolicy="network-only"
      notifyOnNetworkStatusChange={true}
      query={GET_ALL_ROOMTYPES_WITH_GUESTS}
      variables={updateVariables}
    >
      {({data, loading, error}) => {
        showError(error);
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

        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터
        const formatedGuestsData = guestsDataManufacture(guestsData); // 타임라인을 위해 가공된 데이터

        return (
          <AllocateGuestToRoomMu
            onCompleted={({AllocateGuestToRoom}) => {
              onCompletedMessage(AllocateGuestToRoom, "배정완료", "배정실패");
            }}
            update={(cache, {data: inData}) => {
              const cacheData: getAllRoomTypeWithGuest | null = cache.readQuery(
                {
                  query: GET_ALL_ROOMTYPES_WITH_GUESTS,
                  variables: updateVariables
                }
              );
              if (cacheData && inData) {
                const result = _.unionBy(
                  [inData.AllocateGuestToRoom.guest],
                  cacheData.GetGuests.guests,
                  "_id"
                );

                cache.writeQuery({
                  query: GET_ALL_ROOMTYPES_WITH_GUESTS,
                  data: {
                    GetAllRoomType: cacheData.GetAllRoomType,
                    GetGuests: {
                      ...cacheData.GetGuests,
                      guests: result
                    }
                  }
                });
              }
            }}
            // refetchQueries={[{
            //   query: GET_ALL_ROOMTYPES_WITH_GUESTS ,
            //   variables: {
            //     houseId,
            //     start: setYYYYMMDD(moment(dataTime.start)),
            //     end: setYYYYMMDD(moment(dataTime.end)),
            // }}]}
            mutation={ALLOCATE_GUEST_TO_ROOM}
          >
            {allocateMu => (
              <UpdateBookerMu mutation={UPDATE_BOOKER} onError={showError}>
                {updateBookerMu => (
                  <DeleteGuestMu
                    onCompleted={({DeleteGuests}) => {
                      onCompletedMessage(DeleteGuests, "삭제완료", "삭제실패");
                    }}
                    mutation={DELETE_GUEST}
                    onError={showError}
                  >
                    {deleteGuestMu => (
                      <BlockingBedMu
                        onCompleted={({BlockingBed}) => {
                          onCompletedMessage(
                            BlockingBed,
                            "방막기 완료",
                            "방막기 실패"
                          );
                        }}
                        mutation={BLOCKING_BED}
                      >
                        {blockingBedMu => (
                          <AssigTimeline
                            houseId={houseId}
                            loading={loading}
                            groupData={formatedRoomData}
                            deafultGuestsData={formatedGuestsData || []}
                            dayPickerHook={dayPickerHook}
                            defaultProps={assigDefaultProps}
                            allocateMu={allocateMu}
                            roomTypesData={roomTypesData || []}
                            defaultTimeStart={defaultStartDate}
                            updateBookerMu={updateBookerMu}
                            deleteGuestsMu={deleteGuestMu}
                            blockingBedMu={blockingBedMu}
                            defaultTimeEnd={defaultEndDate}
                            setDataTime={setDataTime}
                            dataTime={dataTime}
                            key={`timeline${defaultStartDate}${defaultEndDate}${guestsData &&
                              guestsData.length}`}
                          />
                        )}
                      </BlockingBedMu>
                    )}
                  </DeleteGuestMu>
                )}
              </UpdateBookerMu>
            )}
          </AllocateGuestToRoomMu>
        );
      }}
    </GetAllRoomTypeWithGuestQuery>
  );
};

export default EerrorProtect(AssigTimelineWrap);
