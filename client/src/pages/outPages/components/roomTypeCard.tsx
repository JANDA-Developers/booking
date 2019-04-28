import classNames from 'classnames';
import React from 'react';
import JDselect, { IselectedOption } from '../../../atoms/forms/SelectBox';
import { GuestPartInput } from '../../../types/api';
import Button from '../../../atoms/button/Button';

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
        <div className="roomTypeCard__middleTopSection">
          <div className="JDlarge-text">타이틀</div>
        </div>
        <div className="roomTypeCard__middleBottomSection">
          {/* 여기서나온 값을 state 에 저장하는거임 */}
          <JDselect size="3.8rem" rightLabel="남" mode="small" onChange={handleChange} />
          <JDselect size="3.8rem" rightLabel="여" mode="small" onChange={handleChange} />
        </div>
      </div>
      <div className="flex-grid__col col--grow-1 roomTypeCard__lastSection">
        <div className="roomTypeCard__lastTopSection">
          {' '}
          <span className="roomTypeCard__price">30,000 </span>
        </div>
        <Button className="roomTypeCard__selectButton" mode="flat" thema="grey" label="선택하기" />
      </div>
    </div>
  );
};

export default RoomTypeCard;
