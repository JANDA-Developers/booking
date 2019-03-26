import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './Card.scss';

const JDcard = ({ children, hoverDark, ...props }) => {
  const classes = classNames({
    JDcard: true,
    'JDcard--hoverDark': hoverDark,
  });

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

JDcard.propTypes = {
  children: PropTypes.node.isRequired,
  hoverDark: PropTypes.bool,
};

JDcard.defaultProps = {
  hoverDark: false,
};

export default ErrProtecter(JDcard);
