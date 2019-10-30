/* eslint-disable prop-types */
import React from "react";
import "./ImageUploader.scss";
import classnames from "classnames";
import Preloader from "../preloader/Preloader";
import {IuseImageUploader} from "../../hooks/hook";

export interface ImageUploaderIProps extends IuseImageUploader {
  minHeight: string;
  height?: string;
  mode?: "noEffect";
  className?: any;
  coverImg?: boolean;
  canUploadImg?: boolean;
}

const ImageUploader: React.SFC<ImageUploaderIProps> = ({
  uploading,
  fileUrl,
  isError,
  mode,
  coverImg,
  canUploadImg = true,
  onChangeFile,
  minHeight,
  height = "200px",
  ...props
}) => {
  const classes = classnames("imageUploader", props && props.className, {
    "imageUploader--error": isError,
    "imageUploader--loading": uploading,
    "imageUploader--coverImg": coverImg,
    "imageUploader--noEffect": mode === "noEffect"
  });

  const imageUploaderStyle = {
    minHeight
  };

  const imageUploader_loading_style = {
    backgroundImage: "none",
    minHeight
  };

  const imageStyle = {
    minHeight,
    height,
    backgroundImage: `url(${fileUrl})`
  };

  return (
    <div
      className={`imageUploader ${classes}`}
      style={
        !uploading && !fileUrl
          ? imageUploaderStyle
          : imageUploader_loading_style
      }
    >
      {canUploadImg && (
        <input
          className="imageUploader__input"
          onChange={onChangeFile}
          id="photo"
          type="file"
          accept="image/*"
        />
      )}
      <div className="imageUploader__image" style={imageStyle}></div>
      <Preloader size="large" noAnimation loading={uploading} />
    </div>
  );
};

export default ImageUploader;
