import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Mutation } from 'react-apollo';
import Icon from '../../../../atoms/icons/Icons';
import Modal from '../../../../atoms/modal/Modal';
import Button from '../../../../atoms/button/Buttons';
import { DELETE_HOUSE, GET_USER_INFO, UPDATE_HOUSE } from '../../../../queries';
import { toast } from '../../../../utils/utils';

const MyHouseModal = ({ isOpen, onRequestClose, houseData }) => {
  const verifyDeleteMutation = (mutation) => {
    if (houseData.product && houseData.product._id) {
      toast('상품을 먼저 해지 해주세요.');
      return false;
    }
    mutation();
    return false;
  };

  return (
    // {/* POP: 마이 하우스 */}
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="ReactModal__EndSection">
        {/* Mutation : 숙소삭제 */}
        <Mutation
          mutation={DELETE_HOUSE}
          refetchQueries={[{ query: GET_USER_INFO }]}
          variables={{
            id: houseData._id,
          }}
          onError={(error) => {
            console.error(error);
            toast.warn(error);
          }}
          onCompleted={({ DeleteHouse }) => {
            if (DeleteHouse.ok) toast.success('삭제완료');
            else toast.warn(DeleteHouse.error);
            return false;
          }}
        >
          {deleteMutation => (
            <Button
              onClick={() => {
                verifyDeleteMutation(deleteMutation);
              }}
              thema="warn"
              mode="flat"
              label="삭제"
            />
          )}
        </Mutation>
        {/* Mutation : 숙소수정 */}
        {/* <Mutation
            mutation={UPDATE_HOUSE}
            refetchQueries={[{ query: GET_USER_INFO }]}
            variables={{
              houseId,
              name,
              houseType,
              location,
              refundPolicy,
            }}
          >
            <InputText {...passwordHook} validation={utils.isPassword} label="숙소명" />
            <InputText {...passwordHook} validation={utils.isPassword} label="비밀번호" />
          </Mutation> */}
        <Button mode="flat" label="닫기" onClick={onRequestClose} />
      </div>
    </Modal>
  );
};

export default MyHouseModal;

MyHouseModal.propTypes = {
  isOpen: PT.bool,
  onRequestClose: PT.func,
  houseData: PT.object,
};

MyHouseModal.defaultProps = {
  isOpen: false,
  onRequestClose: () => {},
  houseData: () => {},
};
