import React, { useState } from "react";
import HomepageRequest from "./HomepageRequest";
import { IContext } from "../BookingHostRouter";
import {
  GET_ALL_HOMEPAGE_OPTIONS,
  CREATE_USER_REQUEST
} from "../../../apollo/queries";
import {
  getAllHomepageOptions,
  createUserRequest,
  createUserRequestVariables
} from "../../../types/api";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { onCompletedMessage, queryDataFormater } from "../../../utils/utils";
import { LANG } from "../../../hooks/hook";
import client from "../../../apollo/apolloClient";
import { DEFAULT_SELECTDS_HOMPAGE_OP } from "../../../types/const";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

interface IProps {
  context: IContext;
}

const HomepageRequestWrap: React.FC<IProps> = ({ context }) => {
  const [redirect, setRedirect] = useState("");
  const { data, loading } = useQuery<getAllHomepageOptions>(
    GET_ALL_HOMEPAGE_OPTIONS,
    {
      client
    }
  );

  const [createUserRequestMu, { loading: mutationLoading }] = useMutation<
    createUserRequest,
    createUserRequestVariables
  >(CREATE_USER_REQUEST, {
    client,
    onCompleted: ({ CreateUserRequest }) => {
      onCompletedMessage(
        CreateUserRequest,
        LANG("user_request_create"),
        LANG("user_request_failed")
      );
      if (CreateUserRequest.ok) {
      }
    }
  });

  const homepageOptions =
    queryDataFormater(data, "GetAllHomepageOptions", "homepageOptions", []) ||
    [];

  const forgedHomepageOps = homepageOptions.map(ho => ({
    selected: DEFAULT_SELECTDS_HOMPAGE_OP.includes(ho.key),
    ...ho
  }));

  if (loading) return <div />;

  return (
    <div>
      {redirect && <Redirect to={redirect} />}
      <HomepageRequest
        createUserRequestMu={createUserRequestMu}
        homepageOptions={forgedHomepageOps}
        context={context}
      />
    </div>
  );
};

export default HomepageRequestWrap;
