import React from 'react';
import PropTypes from 'prop-types';
import './Ready.scss';

const Ready = ({ currentProduct, selectedHouse }) => {
  console.log(selectedHouse);

  return (
    <div id="Ready">
      {/* PC용 */}
      <div className="container container--centerlize">
        <div className="Ready__pc">
          <h1>상품 구매 접수가 완료되었습니다.</h1>
          <h3>
            <span aria-label="handPhone" role="img">
              {'📞'}
            </span>
            {'빠른시간내에 연락 드리겠습니다.'}
          </h3>
          <h5>{`적용 숙소: ${selectedHouse.name}`}</h5>
          <h5>{`요청 상품: ${currentProduct.name}`}</h5>

          <div>
            <h5>⏲ 영업시간 11:00 ~ 17: 30</h5>
          </div>
        </div>
      </div>
      {/* 모바일용 */}
      <div className="container container--centerlize">
        <div className="Ready__mobile">
          <h4>상품 구매 접수가 완료되었습니다.</h4>
          <h5>
            <span aria-label="handPhone" role="img">
              {'📞'}
            </span>
            {'빠른시간내에 연락 드리겠습니다.'}
          </h5>
          <h6>{`적용 숙소: ${selectedHouse.name}`}</h6>
          <h6>{`요청 상품: ${currentProduct.name}`}</h6>

          <div>
            <h6>⏲ 영업시간 11:00 ~ 17: 30</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

Ready.propTypes = {
  product: PropTypes.string,
  title: PropTypes.string,
};

Ready.defaultProps = {
  product: 'Default',
  title: 'Default',
};

export default Ready;
