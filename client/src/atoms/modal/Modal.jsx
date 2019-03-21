import React from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';

const JDmodal = ({ center, ...props }) => {
  const defualtJDmodalProps = {
    className: `Modal ${center ? 'ReactModal--center' : null}`,
    overlayClassName: 'Overlay',
  };

  return <ReactModal appElement={document.getElementById('root')} {...props} {...defualtJDmodalProps} />;
};

export default JDmodal;
