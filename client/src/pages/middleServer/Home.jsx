import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../../atoms/button/Buttons';
import './Home.scss';
import { ErrProtecter, toast, isEmpty } from '../../utils/utils';

// eslint-disable-next-line react/prop-types
const Home = ({
  isLoggedIn, selectedProduct, selectedHouse, houses,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/middleServer/makeHouse');

  const startService = () => {
    // 로그인 상태인가?
    if (!isLoggedIn) {
      toast.warn('로그인후 시작해주세요.');
      return;
    }

    // 만들어둔 숙소가 있는가?
    if (houses.length === 0) {
      toast('숙소 생성을 시작합니다.');
      setRedirectUrl('/middleServer/makeHouse');
      setRedirect(true);
      return;
    }

    // 선택된 숙소가 있는가?
    if (isEmpty(selectedHouse)) {
      toast.warn('현재 적용된 서비스가 없습니다.');
      return;
    }

    // 상품을 구매했는가?
    if (isEmpty(selectedProduct)) {
      toast('선택된 상품이 없습니다. 상품을 선택해 주세요.');
      setRedirectUrl('/middleServer/products');
      setRedirect(true);
      return;
    }

    toast('현 숙소는 연락대기중 입니다.');
    setRedirectUrl('/middleServer/ready');
    setRedirect(true);
  };
  return (
    <div id="HomePage" className="container container--centerlize">
      {redirect ? <Redirect push to={redirectUrl} /> : null}
      <div className="docs-section">
        <h1 className="HomePage__title">
          <span className="HomePage__title-main">JANDA</span>
          <h6>숙박산업 온 · 오프라인 솔루션 (잔다)</h6>
        </h1>
        <Button className="HomePage__button" pulse label="시작하기" onClick={startService} mode="large" thema="secondary" type="button" />
      </div>
    </div>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  selectedProduct: PropTypes.object,
  selectedHouse: PropTypes.object,
  houses: PropTypes.array,
  isPhoneVerified: PropTypes.bool,
};

Home.defaultProps = {
  selectedProduct: {},
  selectedHouse: {},
  houses: [],
  isPhoneVerified: false,
};

export default ErrProtecter(Home);
