import React from "react";
import "./myHouseAdd.scss";
import {Link} from "react-router-dom";
import Card from "../../../../atoms/cards/Card";
import Icon from "../../../../atoms/icons/Icons";

const MyProductAdd = () => (
  <Link to="/createHouse">
    <Card className="myHouseCard" hover>
      <h6 className="myProductAdd">
        <Icon icon="addCircle" />
      </h6>
    </Card>
  </Link>
);

export default MyProductAdd;