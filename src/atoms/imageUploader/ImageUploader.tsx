/* eslint-disable prop-types */
import React, {useRef, useEffect} from "react";
import "./ImageUploader.scss";
import classnames from "classnames";
import Preloader from "../preloader/Preloader";
import {IuseImageUploader} from "../../hooks/hook";
import JDVideo from "../video/Video";
import $ from "jquery";
import {s4} from "../../utils/utils";
import {DEFAULT_FILE} from "../../types/defaults";

export interface ImageUploaderIProps extends IuseImageUploader {
  minHeight: string;
  height?: string;
  mode?: "noEffect" | "noBg";
  className?: any;
  coverImg?: boolean;
  canUploadImg?: boolean;
  autoHeight?: boolean;
}

const ImageUploader: React.SFC<ImageUploaderIProps> = ({
  uploading,
  file,
  isError,
  mode,
  coverImg,
  canUploadImg = true,
  onChangeFile,
  autoHeight,
  minHeight,
  height = "200px",
  // 옵션은 HOOK에 지정된 것들
  option,
  ...props
}) => {
  const {url, mimeType} = file || DEFAULT_FILE;
  const isVideo = mimeType.includes("video");
  const isImg = mimeType.includes("image");
  const imageUploaderRef = useRef<HTMLDivElement>(null);
  // 이미지 Hook으로 부터 스타일을 추출해낸다.

  const classes = classnames("imageUploader", props && props.className, {
    "imageUploader--error": isError,
    "imageUploader--loading": uploading,
    "imageUploader--coverImg": coverImg,
    "imageUploader--noBg": mode === "noBg",
    "imageUploader--noEffect": mode === "noEffect"
  });

  const imageUploaderStyle = {
    height,
    minHeight
  };

  const imageUploader_loading_style = {
    backgroundImage: "none",
    minHeight
  };

  const imageStyle = {
    minHeight,
    backgroundImage: `url(${url})`
  };

  const randomKey = s4();

  useEffect(() => {
    if (autoHeight) {
      setTimeout(() => {
        const target = document.getElementById(`file${randomKey}`);
        if (!target) return;
        const toHeight = target.clientHeight;
        if (imageUploaderRef.current && url && toHeight)
          $(imageUploaderRef.current).height(toHeight);
      }, 200);
    }
  });

  return (
    <div
      ref={imageUploaderRef}
      className={`imageUploader ${classes}`}
      style={
        !uploading && !url ? imageUploaderStyle : imageUploader_loading_style
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
      {isImg && <div className="imageUploader__image" style={imageStyle}></div>}
      {isVideo && <JDVideo className="imageUploader__video" url={url} />}
      {/* 이 이미지는 이미지 크기를 재는 용도로만 사용됨 */}
      <img
        style={{
          visibility: "hidden",
          opacity: 0,
          position: "absolute"
        }}
        id={`file${randomKey}`}
        src={url}
      />
      <Preloader size="large" noAnimation loading={uploading} />
    </div>
  );
};

export default ImageUploader;
