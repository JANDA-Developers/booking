import React from 'react';
import './ImageUploader.scss';
import classnames from 'classnames';
import Preloader from '../../atoms/preloader/Preloader';

interface IProps {
  uploading: boolean;
  isError: boolean;
  fileUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: any;
}

const ImageUploader: React.SFC<IProps> = ({ uploading, fileUrl, isError, onChange, ...props }) => {

  const classes = classnames('imageUploader', props && props.className, {
    'imageUploader--error': isError,
    'imageUploader--loading': uploading,
  });

  return (
  <div className="imageUploader">
    <input className="imageUploader__input" onChange={onChange} id="photo" type="file" accept="image/*" />
    <div className="imageUploader__image">
      {uploading && <Preloader />}
      {(!uploading && fileUrl) && <img src={fileUrl} alt="temp" />}
    </div>
  </div>
);
  }

ImageUploader.defaultProps = {
  uploading: false,
  isError: false,
  fileUrl: '',
  onChange: () => {},
};

export default ImageUploader;
