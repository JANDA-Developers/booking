import React, {useState, useEffect} from "react";
import {Mutation, Query} from "react-apollo";
import {any} from "prop-types";
import {
  createRoomType,
  createRoomTypeVariables,
  deleteRoomType,
  deleteRoomTypeVariables,
  updateMyProfileVariables,
  updateRoomType,
  updateRoomTypeVariables,
  getRoomTypeById,
  getRoomTypeByIdVariables
} from "../../../../types/api";
import RoomTypeModal from "./RoomTypeModal";
import {
  CREATE_ROOMTYPE,
  DELETE_ROOMTYPE,
  UPDATE_ROOM,
  UPDATE_ROOMTYPE,
  GET_ROOMTYPE_BY_ID,
  GET_ALL_ROOMTYPES,
  GET_USER_INFO
} from "../../../../queries";
import {IUseModal} from "../../../../actions/hook";
import {
  ErrProtecter,
  showError,
  isEmpty,
  onCompletedMessage,
  queryDataFormater
} from "../../../../utils/utils";
import {PricingType, RoomGender} from "../../../../types/enum";
import {IContext} from "../../../MiddleServerRouter";
import {getOperationName} from "apollo-link";

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

const ModifyTimelineWrap: React.SFC<IProps> = ({context, modalHook}) => {
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
                    ) => (
                      <RoomTypeModal
                        context={context}
                        roomTypeData={roomType || defaultRoomType}
                        modalHook={modalHook}
                        loading={loading}
                        mutationLoading={
                          updateRoomTypeLoading ||
                          createRoomTypeLoading ||
                          deleteRoomTypeLoading
                        }
                        createRoomTypeMutation={createRoomTypeMutation}
                        deleteRoomTypeMutation={deleteRoomTypeMutation}
                        updateRoomTypeMutation={updateRoomTypeMutation}
                        isAddMode={isAddMode}
                        key={`roomTypeModal__modal${
                          roomType ? roomType._id : ""
                        }`}
                      />
                    )}
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

export default ErrProtecter(ModifyTimelineWrap);
