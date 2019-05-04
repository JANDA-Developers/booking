import React, { Fragment } from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';
import classNames from 'classnames';
import Button from '../button/Button';

interface IProps {
  center?: boolean;
  className?: string;
  isOpen: boolean;
  props?: any;
  isAlert?: boolean;
  confirm?: boolean;
  children?: any;
  info?: any;
  confirmCallBackFn?(foo: boolean): any;
  [key: string]: any;
}

const JDmodal: React.SFC<IProps> = ({
  info,
  center,
  className,
  isOpen,
  closeModal,
  isAlert,
  children,
  confirm,
  confirmCallBackFn,
  ...props
}) => {
  // ⚠️ JDmodal 로 수정할수없음
  const classes = classNames('Modal JDmodal', className, {
    'JDmodal--center': center,
    'JDmodal--alert': isAlert || confirm,
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

      {confirm && (
        <Fragment>
          <div className="JDmodal__endSection JDmodal__endSection--confirm">
            <Button
              thema="primary"
              mode="flat"
              label="확인"
              onClick={() => {
                confirmCallBackFn && confirmCallBackFn(true);
                closeModal();
              }}
            />
            <Button
              mode="flat"
              thema="warn"
              label="취소"
              onClick={() => {
                confirmCallBackFn && confirmCallBackFn(false);
                closeModal();
              }}
            />
          </div>
        </Fragment>
      )}
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
