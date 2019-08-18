import React from "react";
import moment from "moment";
import {IUseModal, useModal} from "../../../../actions/hook";
import Card from "../../../../atoms/cards/Card";
import ProfileCircle from "../../../../atoms/profileCircle/ProfileCircle";
import Button from "../../../../atoms/button/Button";
import Badge, {BADGE_THEMA} from "../../../../atoms/badge/Badge";
import {autoHypen} from "../../../../utils/utils";
import SpecificAtion from "../../../../components/specification/Specification";
import JDmodal from "../../../../atoms/modal/Modal";
import SpecificAtionWrap from "../../../../components/specification/SpecificationWrap";
import {getHousesForSU_GetHousesForSU_houses} from "../../../../types/api";

interface IProps {
  userModal: IUseModal;
  houseData: getHousesForSU_GetHousesForSU_houses;
}

const HouseCard: React.SFC<IProps> = ({userModal, houseData}) => {
  const specificationModalHook = useModal(false);
  const getBadgeInfo = () => {
    const badgeInfoes = [];

    const {createdAt, updatedAt} = houseData;

    if (moment(createdAt).isAfter(moment().subtract(1, "days"))) {
      badgeInfoes.push({thema: BADGE_THEMA.NEW, label: "new"});
    }
    if (
      moment(updatedAt).isAfter(moment().subtract(1, "days")) &&
      !moment(createdAt).isSame(updatedAt, "day")
    ) {
      badgeInfoes.push({thema: BADGE_THEMA.PRIMARY, label: "update"});
    }
    return badgeInfoes;
  };
  const badgeInfoes = getBadgeInfo();

  return (
    <Card className="houseCard">
      <ProfileCircle
        profileImg={houseData.user.profileImg}
        onClick={() => {
          userModal.openModal({userId: houseData.user._id});
        }}
        size="small"
        className="houseCard__profile"
      />
      <div className="houseCard__gird flex-grid">
        <div className="flex-grid__col col--full-9">
          <span className="JDlarge-text">{houseData.name}</span>
          {badgeInfoes.map(badgeInfo => (
            <Badge thema={badgeInfo.thema}>{badgeInfo.label}</Badge>
          ))}
          <div className="houseCard__phoneNumber">
            {autoHypen(houseData.user.phoneNumber)}
          </div>
        </div>
        <div className="flex-grid__col col--full-3">
          <div className="houseCard__product">
            {houseData.product ? (
              <Button
                
                thema="grey"
                onClick={() => {
                  specificationModalHook.openModal();
                }}
                label={houseData.product.name}
              />
            ) : (
              <Button  thema="grey" label="상품없음" />
            )}
          </div>
        </div>
      </div>
      <JDmodal {...specificationModalHook}>
        <SpecificAtionWrap houseId={houseData._id} isAdmin={true} />
      </JDmodal>
    </Card>
  );
};

export default HouseCard;
