import React from "react";
import {Query} from "react-apollo";
import {
  getHM,
  getHMVariables,
  updateHM,
  updateHMVariables
} from "../../../types/api";
import {SalesStatisticsUnit} from "../../../types/enum";
import HMconfig from "./HMconfig";
import {GET_HOUSE_MENUAL, UPDATE_HM} from "../../../queries";
import {queryDataFormater, s4, onCompletedMessage} from "../../../utils/utils";
import {IContext} from "../../MiddleServerRouter";
import {useMutation} from "@apollo/react-hooks";
import {getOperationName} from "apollo-link";
import client from "../../../apolloClient";

interface IProps {
  context: IContext;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

export interface IQueryOp {
  selectStatic: string;
  unit: SalesStatisticsUnit;
}

class GetHouseMenuaQu extends Query<getHM, getHMVariables> {}

const HMwrap: React.FC<IProps> = ({context}) => {
  const {house} = context;
  const [updateHMmu, {loading: updateHMloading}] = useMutation<
    updateHM,
    updateHMVariables
  >(UPDATE_HM, {
    onCompleted: ({UpdateHM}) => {
      onCompletedMessage(UpdateHM, "예약 생성 완료", "예약 생성 실패");
    },
    refetchQueries: [getOperationName(GET_HOUSE_MENUAL)!],
    client: client as any
  });

  return (
    <div>
      <GetHouseMenuaQu
        query={GET_HOUSE_MENUAL}
        variables={{
          houseId: house._id
        }}
      >
        {({data: HMData, loading}) => {
          const HM = queryDataFormater(HMData, "GetHM", "HM", undefined);

          return (
            <HMconfig
              HM={HM || undefined}
              updateHMmu={updateHMmu}
              loading={loading}
              mutationLoading={updateHMloading}
              context={context}
              key={s4()}
            />
          );
        }}
      </GetHouseMenuaQu>
    </div>
  );
};

export default HMwrap;
