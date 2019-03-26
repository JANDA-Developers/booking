import React from 'react';
import './NoMatch.scss';

const NoMatch = () => (
  <div id="HomePage" className="container container--centerlize">
    <h1>
      {'페이지가 존재하지 않습니다.'}
      <br />
      <b>💔</b>
      <br />
      {'! 404 !'}
    </h1>
  </div>
);

export default NoMatch;
