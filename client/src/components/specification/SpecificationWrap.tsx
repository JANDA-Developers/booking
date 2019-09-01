import React, {useState, Fragment} from "react";
import {Query, Mutation} from "react-apollo";
import {
  getSpecification,
  getSpecificationVariables,
  updateUserForSU,
  updateUserForSUVariables
} from "../../types/api";
import {GET_HOUSE_SPECIFICATION, UPDATE_USER_FOR_SU} from "../../queries";
import {
  queryDataFormater,
  showError,
  onCompletedMessage
} from "../../utils/utils";
import SpecificAtion from "./Specification";
import Preloader from "../../atoms/preloader/Preloader";
import {getOperationName} from "apollo-link";

interface IProps {
  houseId: string;
  isAdmin?: boolean;
}

class UpdateUserForSU extends Mutation<
  updateUserForSU,
  updateUserForSUVariables
> {}

class GetSpecification extends Query<
  getSpecification,
  getSpecificationVariables
> {}

const SpecificAtionWrap: React.FC<IProps> = ({houseId, isAdmin}) => {
  return (
    <GetSpecification query={GET_HOUSE_SPECIFICATION} variables={{houseId}}>
      {({data: specificData, loading, error}) => {
        const specification = queryDataFormater(
          specificData,
          "GetHouse",
          "house",
          undefined
        );

        return (
          <UpdateUserForSU
            refetchQueries={[getOperationName(GET_HOUSE_SPECIFICATION)!]}
            onCompleted={({UpdateProductForSU, UpdateHouse}) => {
              onCompletedMessage(UpdateProductForSU, "변경 완료", "변경 실패");
            }}
            mutation={UPDATE_USER_FOR_SU}
          >
            {updateUserForSu => (
              <Fragment>
                {loading ? (
                  <Preloader size="large" loading={loading} />
                ) : (
                  <SpecificAtion
                    isAdmin={isAdmin}
                    loading={loading}
                    specification={specification!}
                    updateUserForSu={updateUserForSu}
                  />
                )}
              </Fragment>
            )}
          </UpdateUserForSU>
        );
      }}
    </GetSpecification>
  );
};

export default SpecificAtionWrap;
