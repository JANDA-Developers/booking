import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './ProfileCircle.scss';
import profileImg from '../../img/profile/default_profile.jpg';

const ProfileCircle = ({
  profileBGIS, isBordered, whiteBorder, small,
}) => {
  const classes = classNames({
    'profileCircle--bordered': isBordered,
    'profileCircle--small': small,
    'profileCircle--whiteBorder': whiteBorder,
  });

  return <div style={profileBGIS} className={`profileCircle ${classes} JDwaves-effect`} />;
};

ProfileCircle.propTypes = {
  profileBGIS: PropTypes.object,
  isBordered: PropTypes.bool,
  small: PropTypes.bool,
  whiteBorder: PropTypes.bool,
};

ProfileCircle.defaultProps = {
  profileBGIS: {
    backgroundImage: `url(${profileImg})`,
  },
  isBordered: false,
  small: false,
  whiteBorder: false,
};

export default ErrProtecter(ProfileCircle);
