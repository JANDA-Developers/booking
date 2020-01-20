import React from "react";
import "./NoMatch.scss";
import Button from "../../atoms/button/Button";
import { NavLink } from "react-router-dom";
import { IContext } from "../bookingHost/BookingHostRouter";
import { LANG } from "../../hooks/hook";
import PhotoFrame from "../../atoms/photoFrame/PhotoFrame";
import { IMG_REPO } from "../../types/const";

interface Iprops {
  context: IContext;
}

const NoMatch: React.FC<Iprops> = ({ context }) => (
  <div id="NoMatch">
    <div className="container container--centerlize">
      <div className="JDflex--column">
        <PhotoFrame unStyle type=".png" src={`${IMG_REPO}infographic/nopage`} />
        <h3>{LANG("un_exsist_page")}</h3>
        <h6>{LANG("un_exsist_page_decs")}</h6>
      </div>
    </div>
  </div>
);

export default NoMatch;
