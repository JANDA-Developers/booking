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
  deleteBlock,
  deleteBlockVariables,
  createBlock,
  createBlockVariables
} from "../../../types/api";
import {useToggle, useDayPicker} from "../../../actions/hook";
import {IRoomType, IGuests, IBlock} from "../../../types/interface";
import {
  isEmpty,
  setMidNight,
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import EerrorProtect from "../../../utils/errProtect";
import {
  Gender,
  BookingStatus,
  GuestType,
  RoomGender,
  PricingType
} from "../../../types/enum";
import {
  ALLOCATE_GUEST_TO_ROOM,
  UPDATE_BOOKER,
  DELETE_GUEST,
  DELETE_BLOCK,
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  CREATE_BLOCK
} from "../../../queries";
import AssigTimeline from "./AssigTimeline";
import {setYYYYMMDD, parallax} from "../../../utils/setMidNight";
import {roomDataManufacture} from "./components/groupDataMenufacture";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import {DEFAULT_ASSIG_ITEM} from "../../../types/defaults";
import {IAssigMutationes, IAssigItem, IAssigItemCrush} from "./components/assigIntrerface";

moment.tz.setDefault("UTC");

class UpdateBookerMu extends Mutation<updateBooker, updateBookerVariables> {}
class CreateBlockMu extends Mutation<createBlock, createBlockVariables> {}

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
class DeleteBlockMu extends Mutation<deleteBlock, deleteBlockVariables> {}

const AssigTimelineWrap: React.FC<IProps & WindowSizeProps> = ({
  houseId,
  windowHeight,
  windowWidth
}) => {
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

  const blockDataManufacture = (blocksData: IBlock[] | null | undefined) => {
    const alloCateItems: IAssigItem[] = [];

    if (!blocksData) return alloCateItems;
    blocksData.forEach((blockData, index) => {
      if (blockData) {
        alloCateItems.push({
          ...DEFAULT_ASSIG_ITEM,
          id: blockData._id,
          bookerId: blockData._id,
          roomId: blockData.allocatedRoom._id,
          group: blockData.allocatedRoom._id + blockData.bedIndex,
          start: moment(blockData.start).valueOf(),
          end: moment(blockData.end).valueOf(),
          canMove: false,
          // @ts-ignore
          type: blockData.guestType,
          bedIndex: blockData.bedIndex
        });
      }
    });

    return alloCateItems;
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
          canMove: true,
          // @ts-ignore
          type: guestData.guestType || "GUEST",
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
      query={GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM}
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

        const blocks = queryDataFormater(
          data,
          "GetBlocks",
          "blocks",
          undefined
        );

        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터
        const formatedGuestsData = guestsDataManufacture(guestsData); // 타임라인을 위해 가공된 데이터
        const formatedBlockData = blockDataManufacture(blocks); // 타임라인을 위해 가공된 데이터

        const formatedItemData = formatedGuestsData.concat(formatedBlockData);

        return (
          <AllocateGuestToRoomMu
            onCompleted={({AllocateGuestToRoom}) => {
              onCompletedMessage(AllocateGuestToRoom, "배정완료", "배정실패");
            }}
            update={(cache, {data: inData}) => {
              const cacheData: getAllRoomTypeWithGuest | null = cache.readQuery(
                {
                  query: GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
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
                  query: GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
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
            //   query: GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM ,
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
                      <CreateBlockMu
                        onError={showError}
                        onCompleted={({CreateBlock}) => {
                          onCompletedMessage(
                            CreateBlock,
                            "방막기 완료",
                            "방막기 실패"
                          );
                        }}
                        mutation={CREATE_BLOCK}
                      >
                        {createBlockMu => (
                          <DeleteBlockMu
                            onError={showError}
                            onCompleted={({DeleteBlock}) => {
                              onCompletedMessage(
                                DeleteBlock,
                                "방막기 해제",
                                "방막기 해제 실패"
                              );
                            }}
                            mutation={DELETE_BLOCK}
                          >
                            {deleteBlockMu => {
                              const assigMutationes: IAssigMutationes = {
                                updateBookerMu,
                                deleteGuestsMu: deleteGuestMu,
                                createBlockMu,
                                deleteBlockMu,
                                allocateMu
                              };

                              return (
                                <AssigTimeline
                                  houseId={houseId}
                                  loading={loading}
                                  groupData={formatedRoomData}
                                  deafultGuestsData={formatedItemData || []}
                                  dayPickerHook={dayPickerHook}
                                  defaultProps={assigDefaultProps}
                                  roomTypesData={roomTypesData || []}
                                  defaultTimeStart={defaultStartDate}
                                  assigMutationes={assigMutationes}
                                  defaultTimeEnd={defaultEndDate}
                                  setDataTime={setDataTime}
                                  windowHeight={windowHeight}
                                  windowWidth={windowWidth}
                                  dataTime={dataTime}
                                  key={`timeline${defaultStartDate}${defaultEndDate}${guestsData &&
                                    guestsData.length}`}
                                />
                              );
                            }}
                          </DeleteBlockMu>
                        )}
                      </CreateBlockMu>
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

export default reactWindowSize<IProps>(EerrorProtect(AssigTimelineWrap));
