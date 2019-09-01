import React from "react";
import moment from "moment";
import {IUseModal, useModal} from "../../../../actions/hook";
import Card from "../../../../atoms/cards/Card";
import ProfileCircle from "../../../../atoms/profileCircle/ProfileCircle";
import Button from "../../../../atoms/button/Button";
import Badge from "../../../../atoms/badge/Badge";
import {autoHypen} from "../../../../utils/utils";
import SpecificAtion from "../../../../components/specification/Specification";
import JDmodal from "../../../../atoms/modal/Modal";
import SpecificAtionWrap from "../../../../components/specification/SpecificationWrap";
import {getHousesForSU_GetHousesForSU_houses} from "../../../../types/api";
import JDIcon, {IconSize} from "../../../../atoms/icons/Icons";
import {ICreateNotiModalParam} from "./createNotificationModalWrap";
import CircleIcon from "../../../../atoms/circleIcon/CircleIcon";

interface IProps {
  userModal: IUseModal;
  houseData: getHousesForSU_GetHousesForSU_houses;
  notificationModalHook: IUseModal<ICreateNotiModalParam>;
}

const HouseCard: React.SFC<IProps> = ({
  userModal,
  houseData,
  notificationModalHook
}) => {
  const specificationModalHook = useModal(false);
  const getBadgeInfo = () => {
    const badgeInfoes = [];

    const {createdAt, updatedAt} = houseData;

    if (moment(createdAt).isAfter(moment().subtract(1, "days"))) {
      badgeInfoes.push({thema: "new", label: "new"});
    }
    if (
      moment(updatedAt).isAfter(moment().subtract(1, "days")) &&
      !moment(createdAt).isSame(updatedAt, "day")
    ) {
      badgeInfoes.push({thema: "primary", label: "update"});
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
        size={IconSize.LARGE}
        className="houseCard__profile JDmargin-bottom0"
      />
      <div className="houseCard__contentsWrap">
        <div>
          <span className="JDlarge-text houseCard__houseName">
            {houseData.name}
          </span>
          <JDIcon
            onClick={() => {
              notificationModalHook.openModal({target: houseData.name});
            }}
            hover
            size={IconSize.MEDEIUM_SMALL}
            icon="notify"
          />
          {badgeInfoes.map(badgeInfo => (
            <Badge thema={badgeInfo.thema as any}>{badgeInfo.label}</Badge>
          ))}
          <div className="houseCard__phoneNumber">
            {autoHypen(houseData.user.phoneNumber)}
          </div>
        </div>
        <div className="houseCard__product">
          {houseData.product ? (
            <Button
              mode="border"
              size="small"
              thema="grey"
              onClick={() => {
                specificationModalHook.openModal();
              }}
              label={houseData.product.name}
            />
          ) : (
            <Button mode="border" size="small" thema="grey" label="상품없음" />
          )}
        </div>
      </div>
      <JDmodal {...specificationModalHook}>
        <SpecificAtionWrap houseId={houseData._id} isAdmin={true} />
      </JDmodal>
    </Card>
  );
};

export default HouseCard;
