import React, { Fragment } from "react";
import { IContext } from "../../BookingHostRouter";
import {
  getUsers_GetUsers_result_users,
  getUsers_GetUsers_result_users_houses
} from "../../../../types/api";
import Card from "../../../../atoms/cards/Card";
import JDbox from "../../../../atoms/box/JDbox";
import { IUseModal } from "../../../../hooks/hook";

interface Iprops {
  context: IContext;
  data: getUsers_GetUsers_result_users;
  houseModalHook: IUseModal;
}

const UserCard: React.FC<Iprops> = ({ context, data, houseModalHook }) => {
  const HouseBox = ({
    house
  }: {
    house: getUsers_GetUsers_result_users_houses;
  }) => {
    return (
      <JDbox
        onClick={() => {
          houseModalHook.openModal(house._id);
        }}
      >
        {house.name}
      </JDbox>
    );
  };

  return (
    <Card>
      <Fragment>
        <h6>{data.name}</h6>
        {data.houses.map(house => (
          <HouseBox house={house} />
        ))}
      </Fragment>
    </Card>
  );
};

export default UserCard;
