import React from 'react';
import DynamicImport from '../utils/dynamicComponent';
import Preloader from '../atoms/preloader/Preloader';

export const Sms = props => (
  <DynamicImport load={() => import('./middleServer/sms/SmsWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const ResvList = props => (
  <DynamicImport load={() => import('./middleServer/resvList/ResvListWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const Qna = props => (
  <DynamicImport load={() => import('./middleServer/qna/Qna')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const SetPrice = props => (
  <DynamicImport load={() => import('./middleServer/setPrice/SetPriceWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const Products = props => (
  <DynamicImport load={() => import('./middleServer/product/ProductsWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const SuperMain = props => (
  <DynamicImport load={() => import('./middleServer/super/SuperMainWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const Home = props => (
  <DynamicImport load={() => import('./middleServer/Home')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const MakeHouse = props => (
  <DynamicImport load={() => import('./middleServer/makeHouse/MakeHouse')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const PhoneVerification = props => (
  <DynamicImport load={() => import('./middleServer/PhoneVerification')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const MyPage = props => (
  <DynamicImport load={() => import('./middleServer/myPage/MyPageWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const SignUp = props => (
  <DynamicImport load={() => import('./middleServer/signUp/SignUp')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const Login = props => (
  <DynamicImport load={() => import('./middleServer/Login')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const Ready = props => (
  <DynamicImport load={() => import('./middleServer/Ready')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const AssigTimeline = props => (
  <DynamicImport load={() => import('./middleServer/assig/AssigTimelineWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const ModifyTimeline = props => (
  <DynamicImport load={() => import('./middleServer/roomConfig/RoomConifgWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const PriceTimeline = props => (
  <DynamicImport load={() => import('./middleServer/specificPrice/PriceTimelineWrap')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);
