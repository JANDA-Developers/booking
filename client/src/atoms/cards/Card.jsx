import PropTypes from 'prop-types';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './Card.scss';

const JDcard = ({ children }) => <div className="JDcard">{children}</div>;

JDcard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrProtecter(JDcard);
