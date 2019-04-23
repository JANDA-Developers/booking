import React, { Fragment } from 'react';
import { MutationFn } from 'react-apollo';
import Modal from '../../../../atoms/modal/Modal';
import Button from '../../../../atoms/button/Button';
import { toast } from '../../../../utils/utils';
import { IUseModal } from '../../../../actions/hook';
import { IHouse } from '../../../../types/interface';
import Preloader from '../../../../atoms/preloader/Preloader';

interface IProps {
  modalHook: IUseModal;
  deleteMu: MutationFn<any, any>;
  houseChangeMu: MutationFn<any, any>;
  house: IHouse | undefined | null;
  loading: boolean;
}

const MyHouseModal: React.SFC<IProps> = ({
  houseChangeMu, deleteMu, modalHook, house, loading,
}) => {
  const onDelete = () => {
    if (modalHook.info.productId) {
      toast('상품을 먼저 해지 해주세요.');
      return false;
    }
    deleteMu();
    modalHook.closeModal();
    return false;
  };

  // const onHouseChange = () => {
  //   houseChangeMu();
  // };

  return (
    // {/* POP: 마이 하우스 */}
    loading ? (
      <Preloader />
    ) : (
      <Modal isOpen={modalHook.isOpen} onRequestClose={modalHook.closeModal}>
        {house && (
          <Fragment>
            <p>{house && house.name}</p>
            <p>{house && house.createdAt}</p>
          </Fragment>
        )}
        <div className="JDmodal__EndSection">
          <Button onClick={onDelete} thema="warn" mode="flat" label="삭제" />
          <Button mode="flat" label="닫기" onClick={modalHook.closeModal} />
        </div>
      </Modal>
    )
  );
};

export default MyHouseModal;
