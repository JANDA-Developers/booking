import React from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';
import classNames from 'classnames';

interface IProps {
  center?: boolean;
  className?: string;
  isOpen: boolean;
  props?: any;
  isAlert?: boolean;
  children?: any;
  info?: any;
  [key: string]: any;
}

const JDmodal: React.SFC<IProps> = ({
  info, center, className, isOpen, closeModal, isAlert, children, ...props
}) => {
  // ⚠️ JDmodal 로 수정할수없음
  const classes = classNames('Modal JDmodal', className, {
    'JDmodal--center': center,
    'JDmodal--alert': isAlert,
    'JDmodal--alertWaring': info && info.thema === 'warn',
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
    >
      {children}
      {typeof info === 'string' && info}
      {info && typeof info.txt === 'string' && info.txt}
    </ReactModal>
  );
};

JDmodal.defaultProps = {
  center: false,
  props: {},
};

export default JDmodal;

const JDtoastModal = JDmodal;
export { JDtoastModal };
