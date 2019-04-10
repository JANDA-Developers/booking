import React from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';

interface IProps {
  center?: boolean;
  className?: string;
  isOpen: boolean;
  props?: any;
  [key: string]: any;
}

const JDmodal: React.SFC<IProps> = ({ center, isOpen, ...props }) => {
  const defualtJDmodalProps = {
    className: `Modal ${center ? 'ReactModal--center' : null}`,
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
