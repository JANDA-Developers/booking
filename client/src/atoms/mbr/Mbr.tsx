import React from "react";
import {isMobile} from "is-mobile";

const Mbr = () => {
  return isMobile() ? <br /> : <span />;
};

export default Mbr;
