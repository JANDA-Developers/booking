import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../../atoms/button/Button';
import './Home.scss';
import { ErrProtecter, isEmpty } from '../../utils/utils';

// eslint-disable-next-line react/prop-types
const Home = ({
  isLoggedIn, applyedProduct, selectedHouse, houses,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/makeHouse');

  const startService = () => {
    // 로그인 상태인가?
    if (!isLoggedIn) {
      toast.success('로그인후 시작해주세요.');
      setRedirectUrl('/login');
      setRedirect(true);
      return;
    }

    // 만들어둔 숙소가 있는가?
    if (houses.length === 0) {
      toast('숙소 생성을 시작합니다.');
      setRedirectUrl('/makeHouse');
      setRedirect(true);
      return;
    }

    // 선택된 숙소가 있는가?
    if (isEmpty(selectedHouse)) {
      toast.warn('현재 적용된 서비스가 없습니다.');
      return;
    }

    // 상품을 구매했는가?
    if (isEmpty(applyedProduct)) {
      toast('적용된 서비스가 없습니다. 상품을 선택해 주세요.');
      setRedirectUrl('/products');
      setRedirect(true);
      return;
    }

    setRedirectUrl('/ready');
    setRedirect(true);
  };
  return (
    <div id="HomePage" className="container container--centerlize">
      {redirect ? <Redirect push to={redirectUrl} /> : null}
      <div className="docs-section">
        <div className="HomePage__title">
          <h1 className="HomePage__title-main">JANDA</h1>
          <h6 className="HomePage__title-sub">숙박산업 온 · 오프라인 솔루션 (잔다)</h6>
        </div>
        <Button
          className="HomePage__button"
          pulse
          label="시작하기"
          onClick={startService}
          mode="large"
          thema="point"
          type="button"
        />
      </div>
    </div>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  applyedProduct: PropTypes.object,
  selectedHouse: PropTypes.object,
  houses: PropTypes.array,
  isPhoneVerified: PropTypes.bool,
};

Home.defaultProps = {
  applyedProduct: {},
  selectedHouse: {},
  houses: [],
  isPhoneVerified: false,
};

export default ErrProtecter(Home);
