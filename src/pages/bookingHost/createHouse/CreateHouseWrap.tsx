import React, { useState } from "react";
import { IContext } from "../BookingHostRouter";
import { INIT_HOUSE, GET_USER_INFO } from "../../../apollo/queries";
import { toast } from "react-toastify";
import { LANG } from "../../../hooks/hook";
import { useMutation } from "@apollo/react-hooks";
import { SELECT_HOUSE } from "../../../apollo/clientQueries";
import client from "../../../apollo/apolloClient";
import { getOperationName } from "apollo-utilities";
import { initHouse, initHouseVariables } from "../../../types/api";
import { Redirect } from "react-router-dom";
import StarterModal from "../starterModal/StarterModal";
import { onCompletedMessage } from "../../../utils/utils";
import CreateHouse from "./CreateHouse";

interface IProps {
  context: IContext;
}

const CreateHouseWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  const [redirect, setRedirect] = useState("");
  const [selectHouseMu, { loading: createHouseMuLoading }] = useMutation(
    SELECT_HOUSE,
    {
      client,
      refetchQueries: [getOperationName(GET_USER_INFO)!],
      awaitRefetchQueries: true,
      onCompleted: () => {
        setRedirect("dashboard");
      }
    }
  );

  const [initHouseMu, { loading }] = useMutation<initHouse, initHouseVariables>(
    INIT_HOUSE,
    {
      client,
      refetchQueries: [{ query: GET_USER_INFO }],
      awaitRefetchQueries: true,
      onCompleted: ({ InitHouse }) => {
        onCompletedMessage(InitHouse, "House init done", "House Init fail");
        if (InitHouse.ok && InitHouse.result?.house) {
          const { house } = InitHouse.result;
          toast.success(LANG("create_house_completed"));
          const variables = {
            value: house._id,
            label: house.name
          };
          selectHouseMu({
            variables: { selectedHouse: variables }
          });
        }
      }
    }
  );

  const handleSubmit = (variables: initHouseVariables) => {
    initHouseMu({
      variables
    });
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (!house)
    return (
      <StarterModal
        muLoading={loading}
        context={context}
        onSubmit={handleSubmit}
      />
    );
  return <CreateHouse context={context} onSubmit={handleSubmit} />;
};

export default CreateHouseWrap;
