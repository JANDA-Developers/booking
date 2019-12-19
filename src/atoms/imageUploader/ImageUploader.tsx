/* eslint-disable prop-types */
import React, { useRef, useEffect, Fragment } from "react";
import "./ImageUploader.scss";
import classnames from "classnames";
import Preloader from "../preloader/Preloader";
import { IuseImageUploader } from "../../hooks/hook";
import JDVideo from "../video/Video";
import $ from "jquery";
import { s4 } from "../../utils/utils";
import { DEFAULT_FILE } from "../../types/defaults";
import InputText from "../forms/inputText/InputText";
import Button from "../button/Button";
import JDLabel from "../label/JDLabel";
import { IDiv } from "../../types/interface";

export interface ImageUploaderIProps extends IuseImageUploader {
  minHeight?: string;
  height?: string;
  mode?: "noEffect" | "noBg" | "input";
  className?: any;
  coverImg?: boolean;
  canUploadImg?: boolean;
  autoHeight?: boolean;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderIProps & IDiv> = ({
  uploading,
  file,
  isError,
  mode,
  coverImg,
  canUploadImg = true,
  onChangeFile,
  autoHeight,
  label,
  minHeight = "200px",
  height = "200px",
  // 옵션은 HOOK에 지정된 것들
  option,
  id,
  ...props
}) => {
  const { url, mimeType, filename } = file || DEFAULT_FILE;
  const isVideo = mimeType.includes("video");
  const isImg = mimeType.includes("image");
  const imageUploaderRef = useRef<HTMLDivElement>(null);
  const imageUploaderRefInput = useRef<HTMLInputElement>(null);
  // 이미지 Hook으로 부터 스타일을 추출해낸다.

  const classes = classnames("imageUploader", props && props.className, {
    "imageUploader--error": isError,
    "imageUploader--loading": uploading,
    "imageUploader--coverImg": coverImg,
    "imageUploader--noBg": mode === "noBg",
    "imageUploader--noEffect": mode === "noEffect",
    "imageUploader--input": mode === "input"
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

  // input shape
  if (mode === "input")
    return (
      <div id={id} className={`imageUploader ${classes}`}>
        {label && (
          <JDLabel className="imageUploader--input__label" txt={label} />
        )}
        <div className="imageUploader--input__wrap">
          <InputText
            wrapClassName="imageUploader--input__viewInput"
            mb="no"
            mr="tiny"
            value={filename}
            readOnly
          />
          <div className="imageUploader--input__buttonWrap">
            <Button
              onClick={function() {
                if (imageUploaderRefInput.current) {
                  $(imageUploaderRefInput.current).click();
                }
              }}
              mr="no"
              size="small"
              mode="border"
              mb="no"
              label="FILE"
            />
            <input
              ref={imageUploaderRefInput}
              className="imageUploader__input"
              onChange={onChangeFile}
              type="file"
            />
          </div>
        </div>
      </div>
    );

  return (
    <Fragment>
      {label && <JDLabel txt={label} />}
      <div
        id={id}
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
        <div className="imageUploader__image-wrap">
          {isImg && (
            <div className="imageUploader__image" style={imageStyle}></div>
          )}
          {isVideo && <JDVideo className="imageUploader__video" url={url} />}
        </div>
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
    </Fragment>
  );
};

export default ImageUploader;
