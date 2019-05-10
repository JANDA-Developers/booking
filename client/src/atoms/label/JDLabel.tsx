import PropTypes from 'prop-types';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './JDLabel.scss';

interface IProp {
  txt: string;
}

const JDLabel = ({ txt }: IProp) => <span className="JDlabel">{txt}</span>;

JDLabel.propTypes = {
  txt: PropTypes.string.isRequired,
};

export default ErrProtecter(JDLabel);
