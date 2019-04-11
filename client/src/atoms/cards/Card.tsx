import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { Node } from 'unist';
import ErrProtecter from '../../utils/ErrProtecter';
import './Card.scss';

interface IProps {
  children: Node;
  hoverDark: boolean;
  className?: string;
  props: React.HTMLAttributes<HTMLDivElement>;
}

const JDcard: React.SFC<IProps> = ({
  children, hoverDark, className, ...props
}) => {
  const classes = classNames('JDcard', className, {
    JDcard: true,
    'JDcard--hoverDark': hoverDark,
  });

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

JDcard.defaultProps = {
  hoverDark: false,
};

export default ErrProtecter(JDcard);
