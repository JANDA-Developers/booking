import classNames from "classnames";
import React, { Fragment, useRef } from "react";
import ErrProtecter from "../../utils/errProtect";
import "./ProfileCircle.scss";
import { IDiv } from "../../types/interface";
import { IuseImageUploaderOP } from "../../hooks/hook";
import { DEFAULT_FILE } from "../../types/defaults";
import { IMG_REPO, IconSize } from "../../types/enum";
import { iconSizeClass } from "../../utils/autoClasses";
import JDIcon from "../icons/Icons";
import $ from "jquery";

interface Iprops extends IDiv, IuseImageUploaderOP {
  isBordered?: boolean;
  size?: IconSize;
  whiteBorder?: boolean;
  config?: boolean;
  className?: string;
  onClick?(): void;
  isError?: boolean;
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
  isError,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { url } = file || DEFAULT_FILE;

  const classes = classNames("profileCircle JDwaves-effect", className, {
    "profileCircle--bordered": isBordered,
    "profileCircle--error": isError,
    "profileCircle--whiteBorder": whiteBorder,
    "profileCircle--config": config,
    ...iconSizeClass("profileCircle", size)
  });

  const circleSize = parseFloat(size || "1em") * 2 + "em";

  const profileStyle = {
    backgroundImage: `url("${url ||
      IMG_REPO + "profile/default_profile.jpg"}")`,
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
        <Fragment>
          {/* 이부분을 컴포넌트로 */}
          <span className="profileCircle__addIcon">
            <span
              onClick={() => {
                if (inputRef.current) {
                  $(inputRef.current).click();
                }
              }}
              className="profileCircle__addIcon-inner"
            >
              <JDIcon size="tiny" icon="camera" />
            </span>
          </span>
          <input
            ref={inputRef}
            className="profileCircle__input"
            onChange={onChangeFile}
            id="photo"
            type="file"
            accept="image/*"
          />
        </Fragment>
      )}
    </div>
  );
};

export default ErrProtecter(ProfileCircle);
