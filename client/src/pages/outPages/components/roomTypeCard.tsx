import classNames from 'classnames';
import React from 'react';
import JDselect, { IselectedOption } from '../../../atoms/forms/SelectBox';
import { GuestPartInput } from '../../../types/api';

interface IProps {
  className?: string;
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
}

const RoomTypeCard: React.SFC<IProps> = ({ className, setResvRooms, resvRooms }) => {
  const classes = classNames('roomTypeCard', className, {});

  // 방배경사진
  const roomStyle = {
    // TODO :사진정보 여기에
    // backgroundImage: `url(${})`,
  };

  const handleChange = (gender: IselectedOption) => {};
  return (
    <div className={`flex-grid-grow flex-grid-grow--margin0 ${classes}`}>
      <div className="flex-grid__col col--grow-2 roomTypeCard__imgSection">
        <div style={roomStyle} className="roomTypeCard__img" />
      </div>
      <div className="flex-grid__col col--grow-2 roomTypeCard__middleSection">
        <div className="RoomTypeCard__middleTopSection">
          <div className="JDlarge-text">타이틀</div>
        </div>
        <div className="RoomTypeCard__middleBottomSection">
          {/* 여기서나온 값을 state 에 저장하는거임 */}
          <JDselect onChange={handleChange} />
          <JDselect onChange={handleChange} />
        </div>
      </div>
      <div className="flex-grid__col col--grow-1 roomTypeCard__lastSection">
        <div className="roomTypeCard__lastTopSection">30,000</div>
      </div>
    </div>
  );
};

export default RoomTypeCard;
