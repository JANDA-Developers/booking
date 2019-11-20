import React, { Fragment } from "react";
import "./myHouse.scss";
import Card from "../../../../atoms/cards/Card";
import Icon from "../../../../atoms/icons/Icons";
import { IUseModal, LANG } from "../../../../hooks/hook";

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
      <Card
        hover
        className="myHouseCard"
        role="button"
        tabIndex={0}
        onClick={() => houseModal.openModal({ houseId: id, productId: id })}
      >
        <div className="myHouse">
          <span className="myHouse__title">
            <h6>
              {title}
              <span className="myHouse__purchaseProduct">{purchaseProduct}</span>
            </h6>
          </span>
          <ul className="myHouse__infoList">
            <li className="myHouse__productName">
              <Icon icon="product" />
              {productName || LANG("none")}
            </li>
            <li className="myHouse__dateCreated">
              <Icon icon="calendar" />
              {dateCreated}
            </li>
            <li className="myHouse__location">
              <Icon icon="location" />
              {location}
            </li>
          </ul>
        </div>
      </Card>
    </Fragment>
  );

MyHouse.defaultProps = {
  title: "",
  purchaseProduct: "",
  dateCreated: "",
  location: "",
  productName: "",
  openMyHouse: () => { }
};

export default MyHouse;
