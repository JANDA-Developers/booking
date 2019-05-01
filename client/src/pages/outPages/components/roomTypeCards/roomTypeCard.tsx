import classNames from 'classnames';
import React, { Fragment, useState, useEffect } from 'react';
import JDselect, { IselectedOption, SelectBoxSize } from '../../../../atoms/forms/SelectBox';
import { GuestPartInput } from '../../../../types/api';
import Button from '../../../../atoms/button/Button';
import { IRoomType } from '../../../../types/interface';
import Preloader from '../../../../atoms/preloader/Preloader';
import { isEmpty } from '../../../../utils/utils';
import { useSelect, IUseModal } from '../../../../actions/hook';
import { SELECT_COUNT_DUMMY_OP, WindowSize } from '../../../../types/apiEnum';

interface IProps {
  className?: string;
  roomLoading: boolean;
  roomTypeData: IRoomType;
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
  roomInfoHook: any;
  windowWidth: any;
  toastModalHook: IUseModal;
}

const RoomTypeCard: React.SFC<IProps> = ({
  className,
  roomLoading,
  roomTypeData,
  setResvRooms,
  resvRooms,
  roomInfoHook,
  windowWidth,
  toastModalHook,
}) => {
  // ❕ 아직 쿼리에서 예약가능인원 조회하는게 안되니까 인원쪽은 비워놓자
  const selectManHook = useSelect<number>(SELECT_COUNT_DUMMY_OP[0]);
  const selectWomanHook = useSelect<number>(SELECT_COUNT_DUMMY_OP[0]);

  const classes = classNames('roomTypeCard', className, {});

  const isSelectedRoomFn = (): boolean => {
    const temp = resvRooms.filter(resvRoom => resvRoom.roomTypeId === roomTypeData._id);
    if (isEmpty(temp)) return false;
    return true;
  };
  const isSelectedRoom = isSelectedRoomFn();
  const roomTypeIndex = resvRooms.findIndex(resvRoom => resvRoom.roomTypeId === roomTypeData._id);

  // 방배경사진
  const roomStyle = {
    // TODO :사진정보 여기에
    backgroundImage: `url(${roomTypeData.img})`,
  };

  const handleRoomSelectClick = () => {
    const resvRoomsCopy = resvRooms.slice();
    // 이미 선택된방 제거
    if (isSelectedRoom) {
      resvRoomsCopy.splice(roomTypeIndex, 1);
      setResvRooms(resvRoomsCopy);
      return;
    }

    const totalCount = selectManHook.selectedOption.value + selectWomanHook.selectedOption.value;

    if (totalCount === 0) {
      toastModalHook.openModal('인원수를 선택해주세요.');
      return;
    }

    const addData = {
      roomTypeId: roomTypeData._id,
      pricingType: roomTypeData.pricingType,
      price: 0,
      count: totalCount,
    };

    resvRoomsCopy.push(addData);

    if (!isSelectedRoom) setResvRooms(resvRoomsCopy);

    // 👿
    roomInfoHook[1]([...roomInfoHook[0], roomTypeData]);
  };

  return (
    <Fragment>
      {roomLoading && <Preloader />}
      <div className={`flex-grid-grow flex-grid-grow--margin0 ${classes}`}>
        <div className="flex-grid__col col--grow-2 roomTypeCard__imgSection">
          <div style={roomStyle} className="roomTypeCard__img" />
        </div>
        <div className="flex-grid__col col--grow-2 roomTypeCard__middleSection">
          <div className="roomTypeCard__middleTopSection">
            <div className="JDlarge-text">{roomTypeData.name}</div>
          </div>
          <div className="roomTypeCard__middleBottomSection">
            {/* 여기서나온 값을 state 에 저장하는거임 */}
            <JDselect
              options={SELECT_COUNT_DUMMY_OP}
              size={SelectBoxSize.TWO}
              rightLabel="남"
              mode="small"
              {...selectManHook}
              isOpen
              default
            />
            <JDselect
              options={SELECT_COUNT_DUMMY_OP}
              size={SelectBoxSize.TWO}
              rightLabel="여"
              {...selectWomanHook}
              mode="small"
            />
          </div>
        </div>
        <div className="flex-grid__col col--grow-1 roomTypeCard__lastSection">
          <div className="roomTypeCard__lastTopSection">
            {' '}
            <span className="roomTypeCard__price">30,000 </span>
          </div>
          <Button
            toggle={isSelectedRoom}
            onClick={handleRoomSelectClick}
            className="roomTypeCard__selectButton"
            mode="flat"
            size={windowWidth < WindowSize.MOBILE ? 'small' : undefined}
            thema="grey"
            label={isSelectedRoom ? '선택취소' : '선택하기'}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default RoomTypeCard;
