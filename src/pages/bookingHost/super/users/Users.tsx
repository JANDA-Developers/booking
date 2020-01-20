import React from "react";
import { getUsers_GetUsers_result_users } from "../../../../types/api";
import { JDpageInfo } from "../../../../types/interface";
import { IContext } from "../../BookingHostRouter";
import JDPagination from "../../../../atoms/pagination/Pagination";
import Preloader from "../../../../atoms/preloader/Preloader";
import UserCard from "../users/userCard";
import { useModal } from "../../../../hooks/hook";
interface Iprops {
  context: IContext;
  data: getUsers_GetUsers_result_users[];
  pageInfo: JDpageInfo;
  usersLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Users: React.FC<Iprops> = ({
  data,
  context,
  pageInfo,
  usersLoading,
  setPage
}) => {
  const tempHook = useModal();

  return (
    <div>
      {data.map(d => (
        <UserCard houseModalHook={tempHook} context={context} data={d} />
      ))}
      <Preloader loading={usersLoading} floating />
      <JDPagination pageInfo={pageInfo} setPage={setPage} />
    </div>
  );
};

export default Users;
