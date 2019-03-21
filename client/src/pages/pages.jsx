import React from 'react';
import DynamicImport from '../utils/DynamicImport';
import Preloader from '../atoms/preloader/Preloader';

export const Products = props => (
  <DynamicImport load={() => import('./middleServer/product/Products')}>
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
  <DynamicImport load={() => import('./middleServer/myPage/MyPage')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const SignUp = props => (
  <DynamicImport load={() => import('./middleServer/SignUp')}>
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
