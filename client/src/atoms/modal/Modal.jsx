import React from 'react';
import ReactModal from 'react-modal';
import { PropTypes as PT } from 'prop-types';
import './Modal.scss';

const JDmodal = ({ center, ...props }) => {
  const defualtJDmodalProps = {
    className: `Modal ${center ? 'ReactModal--center' : null}`,
    overlayClassName: 'Overlay',
  };

  return <ReactModal appElement={document.getElementById('root')} {...props} {...defualtJDmodalProps} />;
};

JDmodal.propTypes = {
  center: PT.bool,
  props: PT.any,
};

JDmodal.defaultProps = {
  center: false,
  props: {},
};

export default JDmodal;
