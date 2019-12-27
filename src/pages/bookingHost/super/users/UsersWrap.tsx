import React, { useState } from "react";
import { IContext } from "../../BookingHostRouter";
import client from "../../../../apollo/apolloClient";
import { GET_USERS_FOR_SU } from "../../../../apollo/queries";
import { useQuery } from "@apollo/react-hooks";
import { getUsers, getUsersVariables } from "../../../../types/api";
import { queryDataFormater, getFromResult } from "../../../../utils/utils";
import Users from "./Users";

interface Iprops {
  context: IContext;
}

const UsersWrap: React.FC<Iprops> = ({ context }) => {
  const [page, setPage] = useState(1);

  const { data, loading: usersLoading } = useQuery<getUsers, getUsersVariables>(
    GET_USERS_FOR_SU,
    {
      client,
      variables: {
        param: {
          paging: {
            count: 20,
            selectedPage: page
          }
        }
      }
    }
  );
  const result = queryDataFormater(data, "GetUsers", "result", null);
  const { data: usersData, pageInfo } = getFromResult(result, "users", []);

  return (
    <Users
      context={context}
      setPage={setPage}
      pageInfo={pageInfo}
      usersLoading={usersLoading}
      data={usersData || []}
    />
  );
};

export default UsersWrap;
