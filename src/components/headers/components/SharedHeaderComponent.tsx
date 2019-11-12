import React, { Fragment } from "react";
import NotiWrap from "../../noti/NotiWrap";
import { IContext } from "../../../pages/bookingServer/MiddleServerRouter";
import TooltipList, {
  ReactTooltip
} from "../../../atoms/tooltipList/TooltipList";
import { NavLink } from "react-router-dom";
import Button from "../../../atoms/button/Button";
import { IUseModal, useModal, LANG } from "../../../hooks/hook";
import { insideRedirect, isEmpty } from "../../../utils/utils";
import { UserRole, MemoType } from "../../../types/enum";
import { IconSize } from "../../../atoms/icons/Icons";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import MemoModal from "../../Memo/component/MemoModal";
import MemoIcon from "../../Memo/component/MemoIcon";
import NotiIcon from "../../noti/component/NotiIcon";
import LangSelectModal from "../../langList/langSelectModal";
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
  const { user } = context;
  const { isPhoneVerified } = user;
  const memoModalHook = useModal();
  const langSelectModal = useModal();

  // 로그 여부와 상관없이 공유된
  const sharedOverLogin = (
    <li>
      <Button
        icon="langugae"
        onClick={() => {
          langSelectModal.openModal();
          ReactTooltip.hide();
        }}
        label={LANG("language_setting")}
        mode="flat"
      />
    </li>
  );

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
          icon="logout"
          label={LANG("logOut")}
          mode="flat"
        />
      </li>
      {user.userRole === UserRole.ADMIN && (
        <li>
          <Button
            className="hader__btn"
            label={LANG("admin_screen")}
            icon="admin"
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
            icon="call"
            label={LANG("authenticate")}
            mode="flat"
            id="HeaderPhoneVerificationBtn"
          />
        </li>
      )}
      <li>
        <NavLink to="/myPage">
          <Button icon="person" label="MYpage" mode="flat" />
        </NavLink>
      </li>
      {sharedOverLogin}
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
            label={LANG("login")}
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
            label={LANG("signUp")}
            mode="flat"
          />
        </NavLink>
      </li>
      {sharedOverLogin}
    </Fragment>
  );

  const { isLogIn } = context;
  return (
    <Fragment>
      {/* 알람 */}
      <span>
        {isEmpty(context.house) || (
          <NotiWrap
            icon={
              <CircleIcon size={IconSize.MEDIUM}>
                <NotiIcon
                  context={context}
                  color="white"
                  size={IconSize.MEDIUM}
                />
              </CircleIcon>
            }
            context={context}
          />
        )}
      </span>
      {/* 메모 */}
      <span className="JDstandard-space">
        {isEmpty(context.house) || (
          <CircleIcon size={IconSize.MEDIUM}>
            <MemoIcon
              onClick={() => {
                memoModalHook.openModal();
              }}
              context={context}
              color="white"
              size={IconSize.MEDIUM}
            />
          </CircleIcon>
        )}
      </span>
      {/* 툴팁만 존재 버튼은 각 PC와 모바일 파일에 있음 */}
      <TooltipList id="tooltip_user">
        <ul>{isLogIn ? <LoginIconMenu /> : <UnLoginIconMenu />}</ul>
      </TooltipList>
      <MemoModal
        memoType={MemoType.HOST}
        context={context}
        modalHook={memoModalHook}
      />
      <LangSelectModal modalHook={langSelectModal} context={context} />
    </Fragment>
  );
};

export default SharedHeaderComponent;
