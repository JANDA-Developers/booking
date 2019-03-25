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
  specifications,
  setRadio,
  slider,
  isSelected,
  isCurrent,
  disabled,
}) => {
  let modifer = '';
  if (slider) modifer = '--slider';

  return (
    <div
      data-tip={isCurrent}
      data-tip-disable={!disabled && !isSelected}
      data-for="tooltip__disabled"
      data-type={isCurrent ? 'success' : 'dark'}
      className={`JDproduct ${isSelected ? 'JDproduct--selected' : null}`}
      key={`product--${value}${modifer}`}
    >
      {/* 인덱스 */}
      <span className="JDproduct__index">
        <span className="JDproduct__index-inner">{productIndex}</span>
        {isCurrent ? <span className="JDproduct__index-use">(사용중)</span> : null}
      </span>
      {/* 기타특성 */}
      <h6 className="JDproduct__name">{productName}</h6>
      <span className="JDproduct__roomLimit">{roomLimit}</span>
      <span className="JDproduct__roomCondition">{roomCondition}</span>
      {/* 상품명세 */}
      <ul className="JDproduct__specifications-ul">
        {specifications.map(specification => (
          <li key={`${modifer}${specification}`} className="JDproduct__specifications-li">
            {specification}
          </li>
        ))}
      </ul>
      {/* 가격선택 */}
      <div className="JDproduct__priceBox">
        <span className="JDproduct__inner">
          {price}
          <span className="JDproduct__select">
            <Radio
              onChange={setRadio}
              value={value}
              checked={isSelected}
              id={`RD--${value}${modifer}`}
              groupName={`RD-product${modifer}`}
              disabled={disabled}
            />
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
  specifications: PT.array,
  setRadio: PT.func,
  slider: PT.bool,
  isSelected: PT.bool,
  isCurrent: PT.bool,
  disabled: PT.bool,
};

product.defaultProps = {
  productIndex: '',
  productName: '',
  value: '',
  roomLimit: '',
  roomCondition: '',
  price: '',
  specifications: ['lorem 1', 'lorem 2', 'lorem 3', 'lorem 4'],
  setRadio: () => {},
  slider: false,
  isSelected: false,
  isCurrent: false,
  disabled: false,
};
export default product;
