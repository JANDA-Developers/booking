import React, { Fragment, useMemo } from "react";
import NotiWrap from "../../noti/NotiWrap";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import TooltipList, {
  ReactTooltip,
  TooltipButtons,
  TButtonProp,
} from "../../../atoms/tooltipList/TooltipList";
import { useModal, LANG } from "../../../hooks/hook";
import { insideRedirect, isEmpty } from "../../../utils/utils";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import MemoIcon from "../../Memo/component/MemoIcon";
import NotiIcon from "../../noti/component/NotiIcon";
import LangSelectModal from "../../../atoms/dayPicker/component/langSelectModal";

interface IProps {
  context: IContext;
  logOutMutation: any;
}

const SharedHeaderComponent: React.FC<IProps> = ({
  context,
  logOutMutation,
}) => {
  const { user, applyedProduct } = context;
  const { isPhoneVerified } = user;
  const langSelectModal = useModal();

  // 로그 여부와 상관없이 공유된
  const sharedOverLogin: TButtonProp = {
    label: LANG("language_setting"),
    icon: "langugae",
    onClick: () => {
      langSelectModal.openModal();
      ReactTooltip.hide();
    },
  };

  // 툴팁내용
  // 모바일
  // 로그인후 헤더우측 상단 메뉴
  const LoginIconMenu = () => (
    <TooltipButtons
      Buttons={[
        {
          onClick: () => {
            logOutMutation();
          },
          icon: "logout",
          label: LANG("logOut"),
        },
        {
          redirect: insideRedirect(`superAdmin`),
          label: LANG("admin_screen"),
          icon: "admin",
        },
        {
          redirect: insideRedirect(`myPage`),
          icon: "person",
          label: "MYpage",
        },
        sharedOverLogin,
      ]}
    />
  );

  // 툴팁내용
  // 모바일
  // 로그인 안된 헤더우측 상단 메뉴
  const UnLoginIconMenu = () => (
    <TooltipButtons
      Buttons={[
        {
          redirect: insideRedirect(`login`),
          onClick: () => {
            ReactTooltip.hide();
          },
          label: LANG("login"),
        },
        {
          redirect: insideRedirect(`signUp`),
          label: LANG("login"),
        },
        {
          redirect: insideRedirect(`signUp`),
          label: LANG("signUp"),
        },
        sharedOverLogin,
      ]}
    />
  );

  const { isLogIn } = context;
  let isPriceAble = applyedProduct ? applyedProduct.price : false;
  if (isPriceAble === 0) isPriceAble = false;

  return (
    <Fragment>
      {/* 알람 */}
      <span>
        {isEmpty(context.house) || (
          <NotiWrap
            icon={
              <CircleIcon size={"normal"}>
                <NotiIcon context={context} color="white" size={"normal"} />
              </CircleIcon>
            }
            context={context}
          />
        )}
      </span>
      {/* 메모 */}
      <span className="JDstandard-space">
        {isEmpty(context.house) || (
          <CircleIcon size={"normal"}>
            <MemoIcon context={context} color="white" size={"normal"} />
          </CircleIcon>
        )}
      </span>
      {/* 툴팁만 존재 버튼은 각 PC와 모바일 파일에 있음 */}
      <TooltipList id="tooltip_user">
        {isLogIn ? <LoginIconMenu /> : <UnLoginIconMenu />}
      </TooltipList>
      <LangSelectModal modalHook={langSelectModal} context={context} />
    </Fragment>
  );
};

export default SharedHeaderComponent;
