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
  center, className, isOpen, closeModal, ...props
}) => {
  // ⚠️ JDmodal 로 수정할수없음
  const classes = classNames('Modal JDmodal', className, {
    'JDmodal--center': center,
  });
  const defualtJDmodalProps = {
    className: `Modal ${classes}`,
    overlayClassName: 'Overlay',
  };

  return (
    <ReactModal
      isOpen={isOpen}
      appElement={document.getElementById('root') || undefined}
      onRequestClose={closeModal}
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
