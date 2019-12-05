import React, { Fragment } from "react";
import "./MyHouse.scss";
import Card from "../../../../../atoms/cards/Card";
import Icon from "../../../../../atoms/icons/Icons";
import { IUseModal, LANG } from "../../../../../hooks/hook";
import JDlist from "../../../../../atoms/list/List";
import JDbox from "../../../../../atoms/box/JDbox";

interface IProps {
  houseModal: IUseModal;
  [foo: string]: any;
}

const MyHouse: React.SFC<IProps> = ({
  title,
  purchaseProduct,
  dateCreated,
  location,
  productName,
  houseModal,
  id
}) => (
  <Fragment>
    <JDbox
      clickable
      className="myHouseCard"
      onClick={() => houseModal.openModal({ houseId: id, productId: id })}
    >
      <div className="myHouse">
        <span className="myHouse__title">
          <h6 className="JDstandard-margin-bottom">{title}</h6>
          <span className="myHouse__purchaseProduct">{purchaseProduct}</span>
        </span>
        <JDlist
          marginBottom="short"
          contents={[
            <span className="myHouse__productName">
              <Icon icon="product" />
              {productName || LANG("none")}
            </span>,
            <span className="myHouse__dateCreated">
              <Icon icon="calendar" />
              {dateCreated}
            </span>,
            <span className="myHouse__location">
              <Icon icon="location" />
              {location}
            </span>
          ]}
        />
      </div>
    </JDbox>
  </Fragment>
);

MyHouse.defaultProps = {
  title: "",
  purchaseProduct: "",
  dateCreated: "",
  location: "",
  productName: "",
  openMyHouse: () => {}
};

export default MyHouse;
