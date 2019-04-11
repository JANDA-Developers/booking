import classNames from 'classnames';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './ProfileCircle.scss';
import defaultImg from '../../img/profile/default_profile.jpg';

interface Iprops {
  profileImage: string;
  isBordered: boolean;
  small: boolean;
  tiny: boolean;
  whiteBorder: boolean;
  className?: string;
  onClick(): void;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

const ProfileCircle: React.SFC<Iprops> = ({
  profileImage,
  isBordered,
  whiteBorder,
  tiny,
  small,
  className,
  onClick,
  ...props
}) => {
  const classes = classNames('profileCircle JDwaves-effect', className, {
    'profileCircle--bordered': isBordered,
    'profileCircle--small': small,
    'profileCircle--tiny': tiny,
    'profileCircle--whiteBorder': whiteBorder,
  });

  const profileStyle = {
    backgroundImage: `url("${profileImage}")`,
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={onClick}
      onClick={onClick}
      {...props}
      style={profileStyle}
      className={classes}
    />
  );
};

ProfileCircle.defaultProps = {
  profileImage: defaultImg,
  isBordered: false,
  small: false,
  whiteBorder: false,
  onClick: () => {},
};

export default ErrProtecter(ProfileCircle);
