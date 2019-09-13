import React, {Fragment} from "react";
import NotificationWrap from "../../Notification/NotificationWrap";
import {IHouse} from "../../../types/interface";
import {IContext} from "../../../pages/MiddleServerRouter";
import TooltipList, {
  ReactTooltip
} from "../../../atoms/tooltipList/TooltipList";
import {NavLink} from "react-router-dom";
import Button from "../../../atoms/button/Button";
import {IUseModal, useModal} from "../../../actions/hook";
import {insideRedirect, isEmpty} from "../../../utils/utils";
import {UserRole, MemoType} from "../../../types/enum";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import MemoModal from "../../Memo/MemoModal";
import HouseCard from "../../../pages/middleServer/super/components/houseCard";
interface Iprops {
  context: IContext;
  logOutMutation: any;
  phoneVerificationModalHook: IUseModal;
}

const SharedHeaderComponent: React.FC<Iprops> = ({
  context,
  logOutMutation,
  phoneVerificationModalHook
}) => {
  const {user} = context;
  const {isPhoneVerified} = user;
  const memoModalHook = useModal();
  // 툴팁내용
  // 모바일
  // 로그인후 헤더우측 상단 메뉴
  const LoginIconMenu = () => (
    <Fragment>
      <li>
        <Button
          onClick={() => {
            logOutMutation();
            ReactTooltip.hide();
          }}
          label="로그아웃"
          mode="flat"
        />
      </li>
      {user.userRole === UserRole.ADMIN && (
        <li>
          <Button
            className="hader__btn"
            label="관리자화면"
            redirect={insideRedirect(`superAdmin`)}
            mode="flat"
            thema="point"
          />
        </li>
      )}
      {user && !isPhoneVerified && (
        <li>
          <Button
            onClick={() => {
              phoneVerificationModalHook.openModal({
                phoneNumber: user.phoneNumber
              });
              ReactTooltip.hide();
            }}
            blink
            label="인증하기"
            mode="flat"
            id="HeaderPhoneVerificationBtn"
          />
        </li>
      )}
      <li>
        <NavLink to="/myPage">
          <Button label="MYpage" mode="flat" />
        </NavLink>
      </li>
    </Fragment>
  );

  // 툴팁내용
  // 모바일
  // 로그인 안된 헤더우측 상단 메뉴
  const UnLoginIconMenu = () => (
    <Fragment>
      <li>
        <NavLink to="/login">
          <Button
            onClick={() => {
              ReactTooltip.hide();
            }}
            label="로그인"
            mode="flat"
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/signUp">
          <Button
            onClick={() => {
              ReactTooltip.hide();
            }}
            label="회원가입"
            mode="flat"
          />
        </NavLink>
      </li>
    </Fragment>
  );

  const {isLogIn} = context;
  return (
    <Fragment>
      <span>
        {isEmpty(context.house) || (
          <NotificationWrap
            icon={
              <CircleIcon size={IconSize.MEDIUM}>
                <JDIcon color="white" size={IconSize.MEDIUM} icon="notify" />
              </CircleIcon>
            }
            context={context}
          />
        )}
      </span>
      <span className="JDstandard-space">
        {isEmpty(context.house) || (
          <CircleIcon
            onClick={() => {
              memoModalHook.openModal();
            }}
            size={IconSize.MEDIUM}
          >
            <JDIcon color="white" size={IconSize.MEDIUM} icon="memo" />
          </CircleIcon>
        )}
      </span>
      <TooltipList id="tooltip_user">
        <ul>{isLogIn ? <LoginIconMenu /> : <UnLoginIconMenu />}</ul>
      </TooltipList>
      <MemoModal
        memoType={MemoType.HOST}
        context={context}
        modalHook={memoModalHook}
      />
    </Fragment>
  );
};

export default SharedHeaderComponent;
