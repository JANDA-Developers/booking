import React, { useEffect } from 'react';
import { PropTypes as PT } from 'prop-types';
import Radio from '../../../../atoms/forms/Radio';
import './Product.scss';
import Tooltip, { ReactTooltip } from '../../../../atoms/tooltip/Tooltip';
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

  useEffect(()=>{
    ReactTooltip.rebuild();
  });

  return (
    <div
      data-tip={disabled || isSelected}
      data-for={isSelected ? 'tooltip__selected' : 'tooltip__disabled'}
      className={`JDproduct ${isSelected ? 'JDproduct--selected' : null}`}
      key={`product--${value}${modifer}`}
    >
      <span className="JDproduct__index">
        <span className="JDproduct__index-inner">{productIndex}</span>
        {isCurrent ? <span className="JDproduct__index-use">(사용중)</span> : null}
      </span>
      <h6 className="JDproduct__name">{productName}</h6>
      <span className="JDproduct__roomLimit">{roomLimit}</span>
      <span className="JDproduct__roomCondition">{roomCondition}</span>
      <ul className="JDproduct__specifications-ul">
        {specifications.map(specification => (
          <li key={`${modifer}${specification}`} className="JDproduct__specifications-li">
            {specification}
          </li>
        ))}
      </ul>
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
            {/* 툴팁  : disabled */}
      <Tooltip class="JDtooltip" id="tooltip__disabled" type="dark" effect="solid">
        <span>핸드폰 인증후 사용가능</span>
      </Tooltip>
      {/* 툴팁  : seleceted */}
      <Tooltip id="tooltip__selected" type="success" effect="solid">
        <span>현재 적용된 서비스</span>
      </Tooltip>
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
