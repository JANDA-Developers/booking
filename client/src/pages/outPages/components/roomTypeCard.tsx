import classNames from 'classnames';
import React from 'react';
import JDselect, { IselectedOption } from '../../../atoms/forms/SelectBox';
import defaultRoomImg from '../../../img/default_room.png';
import { GuestPartInput } from '../../../types/api';

interface IProps {
  className?: string;
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
}

const RoomTypeCard: React.SFC<IProps> = ({ className, setResvRooms, resvRooms }) => {
  const classes = classNames('RoomTypeCard', className, {});

  // 방배경사진
  const roomStyle = {
    backgroundImage: defaultRoomImg,
  };

  const handleChange = (gender: IselectedOption) => {};
  return (
    <div className={classes}>
      <div style={roomStyle} className="RoomTypeCard__img" />
      <div className="RoomTypeCard__info">
        {/* 여기서나온 값을 state 에 저장하는거임 */}
        <JDselect onChange={handleChange} />
        <JDselect onChange={handleChange} />
      </div>
    </div>
  );
};

export default RoomTypeCard;
