import React from "react";
import HouseConfig from "./HouseConfig";
import { IContext } from "../BookingHostRouter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import client from "../../../apollo/apolloClient";
import { UPDATE_HOUSE } from "../../../apollo/queries";
import {
  updateHouseVariables,
  updateHouse,
  UpdateHouseInput
} from "../../../types/api";
import { onCompletedMessage } from "../../../utils/utils";
import { LANG } from "../../../hooks/hook";

interface IProps {
  context: IContext;
}

const HouseConfigWrap: React.FC<IProps> = ({ context }) => {
  const [updateHouseMu, { loading }] = useMutation<
    updateHouse,
    updateHouseVariables
  >(UPDATE_HOUSE, {
    client,
    onCompleted: ({ UpdateHouse }) => {
      onCompletedMessage(
        UpdateHouse,
        LANG("update_house_completed"),
        LANG("update_house_failed")
      );
    }
  });

  const updateHouseFn = (updateHouseInput: UpdateHouseInput) => {
    updateHouseMu({
      variables: {
        param: updateHouseInput
      }
    });
  };

  return <HouseConfig updateHouseFn={updateHouseFn} context={context} />;
};

export default HouseConfigWrap;
