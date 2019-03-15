import React from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';

const JDmodal = ({ center, ...props }) => {
  const defualtJDmodalProps = {
    className: `Modal ${center ? 'ReactModal--center' : null}`,
    overlayClassName: 'Overlay',
  };

  return <ReactModal {...props} {...defualtJDmodalProps} />;
};

export default JDmodal;
