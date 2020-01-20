import PropTypes from "prop-types";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import "./JDLabel.scss";

interface IProp {
  txt: string | JSX.Element;
  className?: string;
}

const JDLabel = ({ txt, className }: IProp) => (
  <span className={`JDlabel ${className}`}>{txt}</span>
);

JDLabel.propTypes = {
  txt: PropTypes.string.isRequired
};

export default ErrProtecter(JDLabel);
