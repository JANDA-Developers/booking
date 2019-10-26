import React from "react";
import "./NoMatch.scss";
import Button from "../../atoms/button/Button";
import {NavLink} from "react-router-dom";
import {IContext} from "../MiddleServerRouter";
import {LANG} from "../../hooks/hook";

interface Iprops {
  context: IContext;
}

const NoMatch: React.FC<Iprops> = ({context}) => (
  <div id="NoMatch">
    <div className="container container--centerlize">
      <div>
        <h1>
          <div className="NoMatch__text">{LANG("page_does_not_exist")}</div>
          <b className="NoMatch__heart">
            💔
            <br />
            <span className="NoMatch__heart404">{" 404 "}</span>
          </b>
        </h1>
        <NavLink to="/dashboard">
          <Button
            size="large"
            mode="border"
            thema="point"
            label={LANG("go_back_to_home")}
          />
        </NavLink>
      </div>
    </div>
  </div>
);

export default NoMatch;
