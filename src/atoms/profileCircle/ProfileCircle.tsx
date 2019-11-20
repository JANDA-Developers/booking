import classNames from "classnames";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import "./ProfileCircle.scss";
import defaultImg from "../../img/profile/default_profile.jpg";
import {IDiv} from "../../types/interface";
import {IconSize} from "../icons/Icons";
import {IuseImageUploaderOP} from "../../hooks/hook";
import {DEFAULT_FILE} from "../../types/defaults";

interface Iprops extends IDiv, IuseImageUploaderOP {
  isBordered?: boolean;
  size?: IconSize;
  whiteBorder?: boolean;
  config?: boolean;
  className?: string;
  onClick?(): void;
}

const ProfileCircle: React.FC<Iprops> = ({
  isBordered,
  whiteBorder,
  className,
  onClick,
  config,
  size,
  file,
  onChangeFile,
  uploading,
  ...props
}) => {
  const {url} = file || DEFAULT_FILE;

  const classes = classNames("profileCircle JDwaves-effect", className, {
    "profileCircle--bordered": isBordered,
    "profileCircle--whiteBorder": whiteBorder
  });

  const circleSize = parseFloat(size || "1em") * 2 + "em";

  const profileStyle = {
    backgroundImage: `url("${url || defaultImg}")`,
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
