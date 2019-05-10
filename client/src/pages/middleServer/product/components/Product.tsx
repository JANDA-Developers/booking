import React from 'react';
import Radio from '../../../../atoms/forms/Radio';
import './Product.scss';
import { Product } from '../../../../types/enum';

//  👿 방관련된 정보들을 정리해서 interfcae로 만드는편이 낳음
interface IProps {
  productIndex: string | JSX.Element | JSX.Element[];
  productName: string | JSX.Element | JSX.Element[];
  value: string;
  roomLimit: string | JSX.Element | JSX.Element[];
  roomCondition: string | JSX.Element | JSX.Element[];
  price: string | JSX.Element | JSX.Element[];
  specifications: Array<any>;
  setRadio: any;
  slider: boolean;
  isPhoneVerified: boolean;
  isSelected: boolean;
  isCurrent: boolean;
  disabled: boolean;
}

const JDproduct: React.FC<IProps> = ({
  productIndex,
  productName,
  value,
  roomLimit,
  roomCondition,
  price,
  specifications,
  setRadio,
  isPhoneVerified,
  slider = false,
  isSelected = false,
  isCurrent = false,
  disabled = false,
}) => {
  let modifer = '';
  if (slider) modifer = '--slider';

  const tooltipTargetFind = () => {
    if (isCurrent) return 'tooltip__currentProduct';
    if (productIndex === Product.TEST) return undefined;
    if (!isPhoneVerified) return 'tooltip__productDisable';
    return undefined;
  };

  const tooltipTarget = tooltipTargetFind();

  return (
    <div
      data-tip="foo"
      data-tip-disable={!disabled && !isSelected}
      data-for={tooltipTarget}
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

export default JDproduct;
