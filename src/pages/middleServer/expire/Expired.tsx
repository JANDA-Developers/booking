import React from "react";
import "./Expired.scss";
import Button from "../../../atoms/button/Button";
import {NavLink} from "react-router-dom";
import {IContext} from "../../MiddleServerRouter";
import {LANG} from "../../../hooks/hook";

interface Iprops {
  context: IContext;
}

const Expired: React.FC<Iprops> = ({context}) => (
  <div id="Expired">
    <div className="container container--centerlize">
      <div>
        <h1>
          <div className="Expired__text">{LANG("product_has_expired")}</div>
          <b className="Expired__heart">
            ⛔️
            <br />
            <span className="Expired__heart404">{"만료"}</span>
          </b>
        </h1>
        <NavLink to="/dashboard">
          <Button
            size="large"
            mode="border"
            thema="point"
            label={LANG("choose_product")}
          />
        </NavLink>
      </div>
    </div>
  </div>
);

export default Expired;
