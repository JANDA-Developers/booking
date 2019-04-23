import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import ErrProtecter from '../../utils/ErrProtecter';
import './CircleIcon.scss';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  thema?: string;
  onClick?: any;
  darkWave?: boolean;
  wave?: boolean;
  hover?: boolean;
  large?: boolean;
}

const CircleIcon: React.FunctionComponent<IProps> = ({
  children, thema, darkWave, wave, onClick, hover, large,
}) => {
  const handleOnclick = () => {
    onClick && onClick();
  };

  const classes = classNames({
    circleIcon: true,
    'circleIcon--large': large,
    'circleIcon--noHover': !hover,
    'circleIcon--white': thema === 'white',
    'circleIcon--greybg': thema === 'greybg',
    'JDwaves-effect': wave || darkWave,
    'JDwaves-effect-dark': darkWave,
  });

  return (
    <button type="button" onClick={handleOnclick} className={classes}>
      {children}
    </button>
  );
};

CircleIcon.defaultProps = {
  thema: '',
  darkWave: false,
  hover: true,
  wave: false,
  onClick: () => {},
};

export default ErrProtecter(CircleIcon);
