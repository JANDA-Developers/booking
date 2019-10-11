import React from "react";
import "./NoMatch.scss";
import Button from "../../atoms/button/Button";
import {NavLink} from "react-router-dom";

const NoMatch = () => (
  <div id="NoMatch">
    <div className="container container--centerlize">
      <div>
        <h1>
          <div className="NoMatch__text">{"페이지가 존재하지 않습니다."}</div>
          <b className="NoMatch__heart">
            💔
            <br />
            <span className="NoMatch__heart404">{" 404 "}</span>
          </b>
        </h1>
        <NavLink to="/">
          <Button
            size="large"
            mode="border"
            thema="point"
            label="홈으로 돌아가기"
          />
        </NavLink>
      </div>
    </div>
  </div>
);

export default NoMatch;
