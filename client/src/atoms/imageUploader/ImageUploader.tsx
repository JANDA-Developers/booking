/* eslint-disable prop-types */
import React from 'react';
import './ImageUploader.scss';
import classnames from 'classnames';
import Preloader from '../preloader/Preloader';
import { IuseImageUploader } from '../../actions/hook';

interface IProps extends IuseImageUploader {
  minHeight: string;
  height?: string;
  className?: any;
}

const ImageUploader: React.SFC<IProps> = ({
  uploading,
  fileUrl,
  isError,
  onChangeFile,
  minHeight,
  height = '200px',
  ...props
}) => {
  const classes = classnames('imageUploader', props && props.className, {
    'imageUploader--error': isError,
    'imageUploader--loading': uploading,
  });

  const imageUploaderStyle = {
    backgroundImage: 'none',
  };

  const imageStyle = {
    minHeight,
    height,
    backgroundImage: `url(${fileUrl})`,
  };

  return (
    <div className="imageUploader" style={!uploading && !fileUrl ? undefined : imageUploaderStyle}>
      <input className="imageUploader__input" onChange={onChangeFile} id="photo" type="file" accept="image/*" />
      <div className="imageUploader__image" style={imageStyle} />
      {uploading && <Preloader />}
    </div>
  );
};

ImageUploader.defaultProps = {
  uploading: false,
  isError: false,
  fileUrl: '',
  onChangeFile: () => {},
};

export default ImageUploader;
