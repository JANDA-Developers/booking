import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../../atoms/button/Buttons';
import './Home.scss';
import utils, { toast } from '../../utils/utils';

// eslint-disable-next-line react/prop-types
const Home = ({ isLoggedIn }) => {
  const [redirect, setRedirect] = useState(false);

  const startService = () => {
    if (!isLoggedIn) toast.warn('로그인후 시작해주세요.');
    else setRedirect(true);
  };

  return (
    <div id="HomePage" className="container container--centerlize">
      {redirect ? <Redirect push to="/middleServer/makeHouse" /> : null}
      <div className="docs-section">
        <h1>JANDA</h1>
        <Button label="시작하기" onClick={startService} mode="large" thema="secondary" type="button" />
      </div>
    </div>
  );
};

export default utils.ErrProtecter(Home);
