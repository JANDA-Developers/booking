import React, {useState} from "react";
import {Query, Mutation} from "react-apollo";
import {getSpecification, getSpecificationVariables} from "../../types/api";
import {GET_HOUSE_SPECIFICATION} from "../../queries";
import {queryDataFormater, showError} from "../../utils/utils";
import SpecificAtion from "./Specification";

interface IProps {
  houseId: string;
}

class GetSpecification extends Query<
  getSpecification,
  getSpecificationVariables
> {}

const SpecificAtionWrap: React.FC<IProps> = ({houseId}) => {
  return (
    <GetSpecification
      fetchPolicy="network-only"
      query={GET_HOUSE_SPECIFICATION}
      variables={{houseId}}
    >
      {({data: specificData, loading, error}) => {
        showError(error);
        const specification = queryDataFormater(
          specificData,
          "GetHouse",
          "house",
          undefined
        );

        return <SpecificAtion specification={specification || undefined} />;
      }}
    </GetSpecification>
  );
};

export default SpecificAtionWrap;
