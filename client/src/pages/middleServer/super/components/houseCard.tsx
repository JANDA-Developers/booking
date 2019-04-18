import React from 'react';
import { IUseModal } from '../../../../actions/hook';
import Card from '../../../../atoms/cards/Card';
import ProfileCircle from '../../../../atoms/profileCircle/ProfileCircle';
import Button from '../../../../atoms/button/Button';
import Badge, { BADGE_THEMA } from '../../../../atoms/badge/Badge';

interface IProps {
  userModal: IUseModal;
  houseData: any;
}

const HouseCard: React.SFC<IProps> = ({ userModal, houseData }) => (
  <Card className="houseCard">
    <ProfileCircle onClick={userModal.openModal} small className="houseCard__profile" />
    <div className="houseCard__gird flex-grid">
      <div className="flex-grid__col col--full-9">
        <span className="JDlarge-text">{houseData.name}</span>
        <Badge thema={BADGE_THEMA.NEW}>new</Badge>
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

export default HouseCard;
