import React, {Fragment} from "react";
import {Mutation, Query} from "react-apollo";
import {
  createRoomType,
  createRoomTypeVariables,
  deleteRoomType,
  deleteRoomTypeVariables,
  updateRoomType,
  updateRoomTypeVariables,
  getRoomTypeById,
  getRoomTypeByIdVariables
} from "../../../../types/api";
import RoomTypeModal from "./RoomTypeModal";
import {
  CREATE_ROOMTYPE,
  DELETE_ROOMTYPE,
  UPDATE_ROOMTYPE,
  GET_ROOMTYPE_BY_ID,
  GET_ALL_ROOMTYPES
} from "../../../../queries";
import {IUseModal} from "../../../../hooks/hook";
import {
  ErrProtecter,
  onCompletedMessage,
  queryDataFormater
} from "../../../../utils/utils";
import {
  PricingType,
  RoomGender,
  FLOATING_PRElOADER_SIZE
} from "../../../../types/enum";
import {IContext} from "../../../MiddleServerRouter";
import {getOperationName} from "apollo-link";
import {createPortal} from "react-dom";
import portalTo, {PortalPreloader} from "../../../../utils/portalTo";
import Preloader from "../../../../atoms/preloader/Preloader";

class GetRoomTypeById extends Query<
  getRoomTypeById,
  getRoomTypeByIdVariables
> {}
class CreateRoomTypeMutation extends Mutation<
  createRoomType,
  createRoomTypeVariables
> {}
class DeleteRoomTypeMutation extends Mutation<
  deleteRoomType,
  deleteRoomTypeVariables
> {}
class UpdateRoomTypeMutation extends Mutation<
  updateRoomType,
  updateRoomTypeVariables
> {}

export interface IRoomTypeModalInfo {
  roomTypeId?: string;
  isAddMode?: boolean;
}

export interface IDefaultRoomType {
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  roomGender: RoomGender;
  img?: string;
  description: string;
  defaultPrice: number;
}

interface IProps {
  context: IContext;
  modalHook: IUseModal<IRoomTypeModalInfo>;
}

const UpdateTimelineWrap: React.SFC<IProps> = ({context, modalHook}) => {
  const {house} = context;
  const {roomTypeId, isAddMode} = modalHook.info;
  const refetchQueries = [
    {query: GET_ALL_ROOMTYPES, variables: {houseId: house._id}}
  ];
  const updateRefetchQueries = [
    getOperationName(GET_ALL_ROOMTYPES)!,
    getOperationName(GET_ROOMTYPE_BY_ID)!
  ];

  if (!roomTypeId && !isAddMode) return <div />;

  return (
    <GetRoomTypeById
      fetchPolicy="network-only"
      query={GET_ROOMTYPE_BY_ID}
      skip={isAddMode || !roomTypeId}
      variables={{roomTypeId: roomTypeId || ""}}
    >
      {({data: queryRoomTypeData, loading, error}) => {
        const roomType = queryDataFormater(
          queryRoomTypeData,
          "GetRoomTypeById",
          "roomType",
          undefined
        );
        const defaultRoomType: IDefaultRoomType = {
          name: "",
          pricingType: PricingType.DOMITORY,
          peopleCount: 0,
          peopleCountMax: 0,
          roomGender: RoomGender.SEPARATELY,
          img: undefined,
          description: "",
          defaultPrice: 0
        };

        return (
          <CreateRoomTypeMutation
            mutation={CREATE_ROOMTYPE}
            refetchQueries={refetchQueries}
            onCompleted={({CreateRoomType}: any) => {
              onCompletedMessage(
                CreateRoomType,
                "방타입 생성완료",
                "방타입 생성실패"
              );
            }}
            awaitRefetchQueries
          >
            {(createRoomTypeMutation, {loading: createRoomTypeLoading}) => (
              <DeleteRoomTypeMutation
                refetchQueries={refetchQueries}
                variables={{
                  houseId: house._id,
                  roomTypeId: roomTypeId || ""
                }}
                mutation={DELETE_ROOMTYPE}
                onCompleted={({DeleteRoomType}: any) => {
                  onCompletedMessage(
                    DeleteRoomType,
                    "방타입 제거완료",
                    "방타입 제거실패"
                  );
                }}
                awaitRefetchQueries
              >
                {(deleteRoomTypeMutation, {loading: deleteRoomTypeLoading}) => (
                  <UpdateRoomTypeMutation
                    onCompleted={({UpdateRoomType}: any) => {
                      onCompletedMessage(
                        UpdateRoomType,
                        "방타입 업데이트 완료",
                        "방타입 업데이트 실패"
                      );
                    }}
                    mutation={UPDATE_ROOMTYPE}
                    refetchQueries={updateRefetchQueries}
                  >
                    {(
                      updateRoomTypeMutation,
                      {loading: updateRoomTypeLoading}
                    ) => {
                      const muLoadings =
                        updateRoomTypeLoading ||
                        createRoomTypeLoading ||
                        deleteRoomTypeLoading;
                      return (
                        <Fragment>
                          <PortalPreloader loading={muLoadings} />
                          <RoomTypeModal
                            context={context}
                            roomTypeData={roomType || defaultRoomType}
                            modalHook={modalHook}
                            loading={loading}
                            mutationLoading={muLoadings}
                            createRoomTypeMutation={createRoomTypeMutation}
                            deleteRoomTypeMutation={deleteRoomTypeMutation}
                            updateRoomTypeMutation={updateRoomTypeMutation}
                            isAddMode={isAddMode}
                            key={`roomTypeModal__modal${
                              roomType ? roomType._id : ""
                            }`}
                          />
                        </Fragment>
                      );
                    }}
                  </UpdateRoomTypeMutation>
                )}
              </DeleteRoomTypeMutation>
            )}
          </CreateRoomTypeMutation>
        );
      }}
    </GetRoomTypeById>
  );
};

export default ErrProtecter(UpdateTimelineWrap);
