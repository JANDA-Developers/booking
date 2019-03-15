import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Radio from '../../../../atoms/forms/Radio';
import './Product.scss';

const product = ({
  productIndex,
  productName,
  value,
  roomLimit,
  roomCondition,
  price,
  specification,
  setRadio,
  slider,
}) => {
  let modifer = '';
  if (slider) modifer = '--slider';

  return (
    <div className="JDproduct" key={`product--${value}${modifer}`}>
      <span className="JDproduct__index">
        <span className="JDproduct__index-inner">{productIndex}</span>
      </span>
      <h6 className="JDproduct__name">{productName}</h6>
      <span className="JDproduct__roomLimit">{roomLimit}</span>
      <span className="JDproduct__roomCondition">{roomCondition}</span>
      <ul className="JDproduct__specification-ul">
        {specification.map(value => (
          <li key={`${modifer}${value}`} className="JDproduct__specification-li">
            {value}
          </li>
        ))}
      </ul>
      <div className="JDproduct__priceBox">
        <span className="JDproduct__inner">
          {price}
          <span className="JDproduct__select">
            <Radio onChange={setRadio} value={value} id={`RD--${value}${modifer}`} groupName={`RD-product${modifer}`} />
          </span>
        </span>
      </div>
    </div>
  );
};

product.propTypes = {
  productIndex: PT.oneOfType([PT.string, PT.node]),
  productName: PT.oneOfType([PT.string, PT.node]),
  value: PT.oneOfType([PT.string, PT.node]),
  roomLimit: PT.oneOfType([PT.string, PT.node]),
  roomCondition: PT.oneOfType([PT.string, PT.node]),
  price: PT.oneOfType([PT.string, PT.node]),
  specification: PT.array,
  setRadio: PT.func,
  slider: PT.bool,
};

product.defaultProps = {
  productIndex: '',
  productName: '',
  value: '',
  roomLimit: '',
  roomCondition: '',
  price: '',
  specification: ['lorem 1', 'lorem 2', 'lorem 3', 'lorem 4'],
  setRadio: () => {},
  slider: false,
};
export default product;
