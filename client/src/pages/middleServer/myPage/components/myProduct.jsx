import React from 'react';
import { PropTypes as PT } from 'prop-types';
import './myProduct.scss';
import Card from '../../../../atoms/cards/Card';
import Icon from '../../../../atoms/icons/Icons';

const MyProduct = ({
  title, purchaseProduct, dateCreated, location, productId, key,
}) => (
  <Card key={key} hoverDark>
    <div className="myProduct">
      <span className="myProduct__title">
        <h6>
          {title}
          <span className="myProduct__purchaseProduct">{purchaseProduct}</span>
        </h6>
      </span>
      <ul className="myProduct__infoList">
        <li className="myProduct__productId">
          <Icon icon="product" />
          {productId}
        </li>
        <li className="myProduct__dateCreated">
          <Icon icon="calendar" />
          {dateCreated}
        </li>
        <li className="myProduct__location">
          <Icon icon="location" />
          {location}
        </li>
      </ul>
    </div>
  </Card>
);

MyProduct.propTypes = {
  title: PT.oneOfType([PT.string, PT.node]),
  purchaseProduct: PT.oneOfType([PT.string, PT.node]),
  dateCreated: PT.oneOfType([PT.string, PT.node]),
  location: PT.oneOfType([PT.string, PT.node]),
  productId: PT.oneOfType([PT.string, PT.node]),
};

MyProduct.defaultProps = {
  title: '',
  purchaseProduct: '',
  dateCreated: '',
  location: '',
  productId: '',
};

export default MyProduct;
