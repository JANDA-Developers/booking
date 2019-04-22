import React from 'react';
import moment from 'moment';
import { IUseModal } from '../../../../actions/hook';
import Card from '../../../../atoms/cards/Card';
import ProfileCircle from '../../../../atoms/profileCircle/ProfileCircle';
import Button from '../../../../atoms/button/Button';
import Badge, { BADGE_THEMA } from '../../../../atoms/badge/Badge';

interface IProps {
  userModal: IUseModal;
  houseData: any;
}

const HouseCard: React.SFC<IProps> = ({ userModal, houseData }) => {
  const getBadgeInfo = () => {
    const badgeInfoes = [];

    const { createdAt, updatedAt } = houseData;

    if (moment(createdAt).isAfter(moment().subtract(1, 'days'))) {
      badgeInfoes.push({ thema: BADGE_THEMA.NEW, label: 'new' });
    }
    if (moment(updatedAt).isAfter(moment().subtract(1, 'days')) && !moment(createdAt).isSame(updatedAt, 'day')) {
      badgeInfoes.push({ thema: BADGE_THEMA.PRIMARY, label: 'update' });
    }
    return badgeInfoes;
  };
  const badgeInfoes = getBadgeInfo();

  return (
    <Card className="houseCard">
      <ProfileCircle
        onClick={() => {
          userModal.openModal({ userId: houseData.user._id });
        }}
        small
        className="houseCard__profile"
      />
      <div className="houseCard__gird flex-grid">
        <div className="flex-grid__col col--full-9">
          <span className="JDlarge-text">{houseData.name}</span>
          {badgeInfoes.map(badgeInfo => (
            <Badge thema={badgeInfo.thema}>{badgeInfo.label}</Badge>
          ))}
          <div className="houseCard__phoneNumber">{houseData.user.phoneNumber}</div>
        </div>
        <div className="flex-grid__col col--full-3">
          <div className="houseCard__product">
            {houseData.product ? (
              <Button mode="flat" thema="grey" label={houseData.product.name} />
            ) : (
              <Button mode="flat" thema="grey" label="상품없음" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HouseCard;
