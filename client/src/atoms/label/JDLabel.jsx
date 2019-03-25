import PropTypes from 'prop-types';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './JDLabel.scss';

const JDLabel = ({ txt }) => <span className="JDlabel">{txt}</span>;

JDLabel.propTypes = {
  txt: PropTypes.string.isRequired,
};

export default ErrProtecter(JDLabel);
