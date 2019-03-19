import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../../atoms/button/Buttons';
import './Home.scss';
import utils, { toast, isEmpty } from '../../utils/utils';

// eslint-disable-next-line react/prop-types
const Home = ({
  isLoggedIn, selectedProduct, selectedHouse, houses = [],
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
        <h1>JANDA</h1>
        <Button label="시작하기" onClick={startService} mode="large" thema="secondary" type="button" />
      </div>
    </div>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
export default utils.ErrProtecter(Home);
