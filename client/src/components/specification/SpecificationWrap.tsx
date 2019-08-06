import React, {useState, Fragment} from "react";
import {Query, Mutation} from "react-apollo";
import {
  getSpecification,
  getSpecificationVariables,
  updateProductForSU,
  updateProductForSUVariables
} from "../../types/api";
import {GET_HOUSE_SPECIFICATION, UPDATE_PRODUCT_FOR_SU} from "../../queries";
import {
  queryDataFormater,
  showError,
  onCompletedMessage
} from "../../utils/utils";
import SpecificAtion from "./Specification";
import Preloader from "../../atoms/preloader/Preloader";

interface IProps {
  houseId: string;
  isAdmin?: boolean;
}

class UpdateProductForSU extends Mutation<
  updateProductForSU,
  updateProductForSUVariables
> {}

class GetSpecification extends Query<
  getSpecification,
  getSpecificationVariables
> {}

const SpecificAtionWrap: React.FC<IProps> = ({houseId, isAdmin}) => {
  return (
    <GetSpecification
      fetchPolicy="network-only"
      query={GET_HOUSE_SPECIFICATION}
      variables={{houseId}}
    >
      {({data: specificData, loading, error}) => {
        const specification = queryDataFormater(
          specificData,
          "GetHouse",
          "house",
          undefined
        );

        return (
          <UpdateProductForSU
            onCompleted={({UpdateProductForSU}) => {
              onCompletedMessage(UpdateProductForSU, "변경 완료", "변경 실패");
            }}
            
            mutation={UPDATE_PRODUCT_FOR_SU}
          >
            {updateProductForSU => (
              <Fragment>
                <Preloader noAnimation size="large" loading={loading} />
                {loading || (
                  <SpecificAtion
                    isAdmin={isAdmin}
                    loading={loading}
                    specification={specification || undefined}
                    updateProductForSU={updateProductForSU}
                  />
                )}
              </Fragment>
            )}
          </UpdateProductForSU>
        );
      }}
    </GetSpecification>
  );
};

export default SpecificAtionWrap;
