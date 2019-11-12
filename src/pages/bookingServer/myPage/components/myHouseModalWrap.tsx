import React from "react";
import {Mutation, Query} from "react-apollo";
import {DELETE_HOUSE, GET_USER_INFO, GET_HOUSE} from "../../../../apollo/queries";
import MyHouseModal from "./myHouseModal";
import {IUseModal, LANG} from "../../../../hooks/hook";
import {
  onCompletedMessage,
  queryDataFormater,
  isEmpty
} from "../../../../utils/utils";
import {SELECT_HOUSE, SELECTED_HOUSE} from "../../../../apollo/clientQueries";
import {
  getHouse,
  getHouseVariables,
  deleteHouse,
  deleteHouseVariables
} from "../../../../types/api";
import {IContext} from "../../MiddleServerRouter";

interface IProps {
  MyHouseModalHook: IUseModal;
  context: IContext;
}
class GetHouseQuery extends Query<getHouse, getHouseVariables> {}
class DeleteHouseMutation extends Mutation<deleteHouse, deleteHouseVariables> {}

const MyHouseModalWrap: React.SFC<IProps> = ({
  MyHouseModalHook: modalHook,
  context
}) => (
  <DeleteHouseMutation
    mutation={DELETE_HOUSE}
    refetchQueries={[{query: GET_USER_INFO}, {query: SELECTED_HOUSE}]}
    variables={{
      id: modalHook.info.houseId
    }}
    onCompleted={({DeleteHouse}) => {
      onCompletedMessage(
        DeleteHouse,
        LANG("house_delete_completed"),
        LANG("house_delete_failed")
      );
      return false;
    }}
  >
    {deleteMutation => (
      <Mutation
        mutation={SELECT_HOUSE}
        onCompleted={({selectHouse}: any) => {
          onCompletedMessage(
            selectHouse,
            LANG("changed_current_house"),
            LANG("failt_to_change_house")
          );
        }}
      >
        {(houseChangeMutation: any) => (
          <GetHouseQuery
            fetchPolicy="network-only"
            query={GET_HOUSE}
            skip={isEmpty(modalHook.info.houseId)}
            variables={{houseId: modalHook.info.houseId}}
          >
            {({data: houseData, loading, error}) => {
              const house = queryDataFormater(
                houseData,
                "GetHouse",
                "house",
                undefined
              );
              return (
                <MyHouseModal
                  context={context}
                  loading={loading}
                  modalHook={modalHook}
                  deleteMu={deleteMutation}
                  houseChangeMu={houseChangeMutation}
                  house={house}
                />
              );
            }}
          </GetHouseQuery>
        )}
      </Mutation>
    )}
  </DeleteHouseMutation>
);

export default MyHouseModalWrap;
