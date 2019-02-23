import React from 'react';
import Button from '../../atoms/Buttons';
// eslint-disable-next-line react/prop-types
const Home = ({ history, ...pros }) => {
  const startService = () => {
    console.log(history);
    console.log(pros);
    if (pros) {
      history.push('./middleServer/makeHouse');
    } else {
      history.push('./');
    }
  };
  return (
    <div id="homePage" className="container">
      <div className="docs-section">
        <h1>JANDA</h1>
        <Button
          label="시작하기"
          onClick={startService}
          mode="large"
          thema="secondary"
          type="button"
        />
      </div>
    </div>
  );
};

export default Home;
