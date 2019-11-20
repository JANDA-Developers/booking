import PropTypes from "prop-types";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import "./JDLabel.scss";

interface IProp {
  txt: string | JSX.Element;
}

const JDLabel = ({txt}: IProp) => <span className="JDlabel">{txt}</span>;

JDLabel.propTypes = {
  txt: PropTypes.string.isRequired
};

export default ErrProtecter(JDLabel);
