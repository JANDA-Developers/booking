/* eslint-disable prop-types */
import React from 'react';
import './ImageUploader.scss';
import classnames from 'classnames';
import Preloader from '../../atoms/preloader/Preloader';

interface IProps {
  uploading: boolean;
  isError: boolean;
  fileUrl: string;
  minHeight: string;
  height: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: any;
}

const ImageUploader: React.SFC<IProps> = ({
  uploading, fileUrl, isError, onChange, minHeight, height, ...props
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
      <input className="imageUploader__input" onChange={onChange} id="photo" type="file" accept="image/*" />
      <div className="imageUploader__image" style={imageStyle} />
      { uploading && <Preloader /> }
    </div>
  );
};

ImageUploader.defaultProps = {
  uploading: false,
  isError: false,
  fileUrl: '',
  onChange: () => {},
};

export default ImageUploader;
