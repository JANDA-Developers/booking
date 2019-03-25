import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import './myHouse.scss';
import Card from '../../../../atoms/cards/Card';
import Icon from '../../../../atoms/icons/Icons';

const MyHouse = ({
  title, purchaseProduct, dateCreated, location, productName, openMyHouse, id,
}) => (
  <Fragment>
    <Card hoverDark role="button" tabIndex="0" onClick={() => openMyHouse(id)} onKeyPress={openMyHouse}>
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
            {productName || '없음'}
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

MyHouse.propTypes = {
  title: PT.oneOfType([PT.string, PT.node]),
  purchaseProduct: PT.oneOfType([PT.string, PT.node]),
  dateCreated: PT.oneOfType([PT.string, PT.node]),
  location: PT.oneOfType([PT.string, PT.node]),
  productName: PT.oneOfType([PT.string, PT.node]),
  openMyHouse: PT.func,
  id: PT.string.isRequired,
};

MyHouse.defaultProps = {
  title: '',
  purchaseProduct: '',
  dateCreated: '',
  location: '',
  productName: '',
  openMyHouse: () => {},
};

export default MyHouse;
