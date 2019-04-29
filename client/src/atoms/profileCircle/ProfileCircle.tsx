import classNames from 'classnames';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './ProfileCircle.scss';
import defaultImg from '../../img/profile/default_profile.jpg';
import { IuseProfileUploader } from '../../actions/hook';
import { IDiv } from '../../types/interface';

interface Iprops extends IDiv, IuseProfileUploader {
  profileImg?: string;
  isBordered?: boolean;
  small?: boolean;
  tiny?: boolean;
  whiteBorder?: boolean;
  config?: boolean;
  className?: string;
  onClick?(): void;
}

const ProfileCircle: React.SFC<Iprops> = ({
  profileImg,
  isBordered,
  whiteBorder,
  tiny,
  small,
  className,
  onClick,
  config,
  onChangeFile,
  fileUrl,
  uploading,
  isError,
  ...props
}) => {
  const classes = classNames('profileCircle JDwaves-effect', className, {
    'profileCircle--bordered': isBordered,
    'profileCircle--small': small,
    'profileCircle--tiny': tiny,
    'profileCircle--whiteBorder': whiteBorder,
  });

  const profileStyle = {
    backgroundImage: `url("${fileUrl || profileImg || defaultImg}")`,
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={onClick}
      onClick={onClick}
      className={classes}
      {...props}
      style={profileStyle}
    >
      {config && (
        <input className="profileCircle__input" onChange={onChangeFile} id="photo" type="file" accept="image/*" />
      )}
    </div>
  );
};

ProfileCircle.defaultProps = {
  profileImg: defaultImg,
  isBordered: false,
  small: false,
  whiteBorder: false,
  onClick: () => {},
};

export default ErrProtecter(ProfileCircle);
