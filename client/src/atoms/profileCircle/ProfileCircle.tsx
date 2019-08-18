import classNames from "classnames";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import "./ProfileCircle.scss";
import defaultImg from "../../img/profile/default_profile.jpg";
import {IuseProfileUploader} from "../../actions/hook";
import {IDiv} from "../../types/interface";

type ProfileCircleSize = "small" | "tiny" | "normal" | "large";

interface Iprops extends IDiv, IuseProfileUploader {
  profileImg?: string;
  isBordered?: boolean;
  size?: ProfileCircleSize;
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
    "profileCircle--large": size === "large",
    "profileCircle--small": size === "small",
    "profileCircle--tiny": size === "tiny",
    "profileCircle--whiteBorder": whiteBorder
  });

  const profileStyle = {
    backgroundImage: `url("${fileUrl || profileImg || defaultImg}")`
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
