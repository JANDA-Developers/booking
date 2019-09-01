import classNames from "classnames";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import "./ProfileCircle.scss";
import defaultImg from "../../img/profile/default_profile.jpg";
import {IuseProfileUploader} from "../../actions/hook";
import {IDiv} from "../../types/interface";
import {IconSize} from "../icons/Icons";

interface Iprops extends IDiv, IuseProfileUploader {
  profileImg?: string;
  isBordered?: boolean;
  size?: IconSize;
  whiteBorder?: boolean;
  config?: boolean;
  className?: string;
  onClick?(): void;
}

const ProfileCircle: React.SFC<Iprops> = ({
  profileImg,
  isBordered,
  whiteBorder,
  className,
  onClick,
  config,
  onChangeFile,
  setFileUrl,
  fileUrl,
  uploading,
  isError,
  size,
  ...props
}) => {
  const classes = classNames("profileCircle JDwaves-effect", className, {
    "profileCircle--bordered": isBordered,
    "profileCircle--whiteBorder": whiteBorder
  });

  const circleSize = parseFloat(size || "1em") * 2 + "em";

  const profileStyle = {
    backgroundImage: `url("${fileUrl || profileImg || defaultImg}")`,
    width: circleSize,
    height: circleSize
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
        <input
          className="profileCircle__input"
          onChange={onChangeFile}
          id="photo"
          type="file"
          accept="image/*"
        />
      )}
    </div>
  );
};

export default ErrProtecter(ProfileCircle);
