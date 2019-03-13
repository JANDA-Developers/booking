import React from 'react';
import './myProductAdd.scss';
import Card from '../../../../atoms/cards/Card';
import Icon from '../../../../atoms/icons/Icons';

const MyProductAdd = () => (
  <Card hoverDark>
    <h6 className="myProductAdd">
      <Icon icon="addCircle" />
    </h6>
  </Card>
);

export default MyProductAdd;
