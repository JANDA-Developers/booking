import React from 'react';
import PropTypes from 'prop-types';
import './Ready.scss';

const Ready = ({ currentProduct, selectedHouse }) => (
  <div id="Ready">
    {/* PC용 */}
    <div className="container container--centerlize">
      <div className="Ready__pc">
        <div className="docs-section__box">
          <h3>서비스 적용 신청이 완료되었습니다.</h3>
        </div>
        <h5>빠른시간내에 연락 드리겠습니다.</h5>
        <h5>{`적용 숙소: ${selectedHouse.name}`}</h5>
        <h5>{`요청 상품: ${currentProduct.name}`}</h5>

        <div>
          <h5>⏲ 영업시간 11:00 ~ 17: 30</h5>
        </div>
      </div>
    </div>
    {/* 모바일용 */}
    <div className="Ready__mobile container container--centerlize">
      <div className="Ready__mobile">
        <div className="docs-section__box">
          <h4>서비스 신청이 완료되었습니다.</h4>
        </div>
        <p>빠른시간내에 연락 드리겠습니다.</p>
        <p>{`적용 숙소: ${selectedHouse.name}`}</p>
        <p>{`요청 상품: ${currentProduct.name}`}</p>

        <div>
          <p>⏲ 영업시간 11:00 ~ 17: 30</p>
        </div>
      </div>
    </div>
  </div>
);

Ready.propTypes = {
  product: PropTypes.string,
  title: PropTypes.string,
};

Ready.defaultProps = {
  product: 'Default',
  title: 'Default',
};

export default Ready;
