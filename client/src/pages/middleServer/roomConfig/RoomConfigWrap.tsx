/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from "react";
import {Query} from "react-apollo";
import {getAllRoomType} from "../../../types/api";
import {useToggle, useModal, useDayPicker} from "../../../actions/hook";
import RoomConfigTimeline from "./RoomConfig";
import roomTimelineDefaultProps from "./timelineConfig";
import {GET_ALL_ROOMTYPES} from "../../../queries";
import {
  ErrProtecter,
  isEmpty,
  queryDataFormater,
  showError
} from "../../../utils/utils";
import RoomTypeModal from "./components/RoomTypeModalWrap";
import RoomModal from "./components/RoomModalWrap";
import {IRoomType} from "../../../types/interface";
import {roomDataManufacture} from "../assig/components/groupDataMenufacture";

export enum ADD_ROOM {
  "ADDROOM" = -1,
  "ADDROOM_TYPE" = -1
}

interface IProps {
  houseId: string;
}

class GetAllRoomTypeQuery extends Query<getAllRoomType> {}

const RoomConfigTimelineWrap: React.SFC<IProps> = ({houseId}) => {
  const dayPickerHook = useDayPicker(null, null);
  const roomTypeModalHook = useModal(false);
  const roomModalHook = useModal(false);
  const [_, setConfigMode] = useToggle(false);
  console.log(_);
  return (
    // 모든 방 가져오기
    <GetAllRoomTypeQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES}
      variables={{houseId}}
    >
      {({data: roomData, loading, error}) => {
        showError(error);
        const roomTypesData = queryDataFormater(
          roomData,
          "GetAllRoomType",
          "roomTypes",
          undefined
        ); // 원본데이터
        const formatedRoomData = roomDataManufacture(roomTypesData, true); // 타임라인을 위해 가공된 데이터


        return (
          // 방생성 뮤테이션
          <Fragment>
            <RoomConfigTimeline
              loading={loading}
              setConfigMode={setConfigMode}
              defaultProps={roomTimelineDefaultProps}
              roomTypeModal={roomTypeModalHook}
              roomModal={roomModalHook}
              roomData={formatedRoomData}
              roomTypesData={roomTypesData}
              dayPickerHook={dayPickerHook}
            />
            <RoomTypeModal
              houseId={houseId}
              modalHook={roomTypeModalHook}
              key={roomTypeModalHook.info.roomTypeId}
            />
            <RoomModal
              roomData={roomTypesData}
              modalHook={roomModalHook}
              houseId={houseId}
            />
          </Fragment>
        );
      }}
    </GetAllRoomTypeQuery>
  );
};

export default ErrProtecter(RoomConfigTimelineWrap);
