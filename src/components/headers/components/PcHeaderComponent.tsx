import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../atoms/button/Button";
import ProfileCircle from "../../../atoms/profileCircle/ProfileCircle";
import SelectHouseWrap from "../../selectHouse/SelectHouseWrap";
import SharedHeaderComponent from "./SharedHeaderComponent";
import { IContext } from "../../../pages/MiddleServerRouter";
import { IUseModal, LANG } from "../../../hooks/hook";
import { IconSize } from "../../../atoms/icons/Icons";
interface Iprops {
  context: IContext;
  phoneVerificationModalHook: IUseModal;
}

const PcHeaderComponent: React.FC<Iprops> = ({
  context,
  phoneVerificationModalHook
}) => {
  const { user, houses, house, isLogIn } = context;
  const { profileImg, isPhoneVerified } = user;
  // PC
  // 버튼이 밖으로 노출되있음
  // 로그인 피씨 헤더 메뉴
  const UnLoginPcHeaderRight = () => (
    <div className="header__pcRight--unlogin JDdisplay-none--wmd">
      <NavLink className="header__btns header__btns--transparent" to="/login">
        <Button className="hader__btn" label={LANG("login")} mode="flat" />
      </NavLink>
      <NavLink className="header__btns header__btns--transparent" to="/signUp">
        <Button className="hader__btn" label={LANG("signUp")} mode="flat" />
      </NavLink>
    </div>
  );

  // PC
  // 버튼이 툴팁 안쪽에 있음 + 숙소선택랩
  // 로그인된 헤더 메뉴
  const LoginPcHeaderRight = () => (
    <div className="header__pcRight JDdisplay-none--wmd">
      {/* 프로필 아이콘 */}
      <span
        data-tip
        data-delay-hide={0}
        data-for="tooltip_user"
        data-event="click"
        className="header__profile"
      >
        <ProfileCircle
          className="JDmargin-bottom0"
          profileImg={profileImg}
          isBordered
          whiteBorder
          size={IconSize.DEFAULT}
        />
      </span>
      <SelectHouseWrap className="header__selectHouse" context={context} />
      {user && !isPhoneVerified && (
        <span className="header__btns">
          <Button
            className="JDmargin-bottom0"
            onClick={() => {
              phoneVerificationModalHook.openModal({
                phoneNumber: user.phoneNumber
              });
            }}
            transparent
            label={LANG("authenticate")}
            blink
            color="white"
            mode="flat"
          />
        </span>
      )}
    </div>
  );

  return isLogIn ? <LoginPcHeaderRight /> : <UnLoginPcHeaderRight />;
};

export default PcHeaderComponent;
