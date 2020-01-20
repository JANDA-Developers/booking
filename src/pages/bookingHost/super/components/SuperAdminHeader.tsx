import React from "react";
import { IContext } from "../../BookingHostRouter";
import { Link } from "react-router-dom";
import Button from "../../../../atoms/button/Button";
interface Iprops {
  context: IContext;
}

const SuperAdminHeader: React.FC<Iprops> = ({ context }) => {
  return (
    <div>
      <Link to="/superAdmin/users">
        <Button label={"users"} />
      </Link>
      <Link to="/superAdmin/hostHouses">
        <Button label={"host houses"} />
      </Link>
    </div>
  );
};

export default SuperAdminHeader;
