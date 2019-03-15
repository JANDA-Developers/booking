import React from 'react';
import PropTypes from 'prop-types';

const Ready = ({ product, title }) => (
  <div id="Ready" className="container container--centerlize">
    <div>
      <h1>상품 구매 접수가 완료되었습니다.</h1>
      <h3>
        <span aria-label="handPhone" role="img">
          {'📞'}
        </span>
        {'빠르시간내에 연락 드리겠습니다.'}
      </h3>
      <h5>{`적용 숙소: ${title}`}</h5>
      <h5>{`요청 상품: ${product}`}</h5>

      <div>
        <h5>⏲ 영업시간 11:00 ~ 17: 30</h5>
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
