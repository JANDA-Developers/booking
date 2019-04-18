import React from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';
import classNames from 'classnames';

interface IProps {
  center?: boolean;
  className?: string;
  isOpen: boolean;
  props?: any;
  [key: string]: any;
}

const JDmodal: React.SFC<IProps> = ({
  center, className, isOpen, ...props
}) => {
  const classes = classNames('Modal', className, {
    'ReactModal--center': center,
  });
  const defualtJDmodalProps = {
    className: `Modal ${classes}`,
    overlayClassName: 'Overlay',
  };

  return (
    <ReactModal
      isOpen={isOpen}
      appElement={document.getElementById('root') || undefined}
      {...props}
      {...defualtJDmodalProps}
    />
  );
};

JDmodal.defaultProps = {
  center: false,
  props: {},
};

export default JDmodal;
