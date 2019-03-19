/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Header from '../components/headers/Header';
import SideNav from '../components/sideNav/SideNav';
import DynamicImport from '../utils/DynamicImport';
import NoMatch from './NoMatch';
import { IS_LOGGED_IN, GET_USER_INFO, SELECTED_HOUSE } from '../queries';
import { useToggle } from '../actions/hook';
import Preloader from '../atoms/preloader/Preloader';
import { isEmpty } from '../utils/utils';

const Products = props => (
  <DynamicImport load={() => import('./middleServer/product/Products')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const Home = props => (
  <DynamicImport load={() => import('./middleServer/Home')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const MakeHouse = props => (
  <DynamicImport load={() => import('./middleServer/product/makeHouse/MakeHouse')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const PhoneVerification = props => (
  <DynamicImport load={() => import('./middleServer/PhoneVerification')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const MyPage = props => (
  <DynamicImport load={() => import('./middleServer/myPage/MyPage')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const SignUp = props => (
  <DynamicImport load={() => import('./middleServer/SignUp')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const Login = props => (
  <DynamicImport load={() => import('./middleServer/Login')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const Ready = props => (
  <DynamicImport load={() => import('./middleServer/Ready')}>
    {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

// lastSelectedHouse : 마지막으로 선택된 하우스 객체 정보값
function JDmiddleServer({
  IsLoggedIn: { auth: { isLoggedIn } = {}, loading } = {},
  GetUserInfo: { GetMyProfile: { user = {} } = {}, loading: loading2 } = {},
  lastSelectedHouse: { auth: { lastSelectedHouse = {} } = {}, loading: loading3 } = {},
}) {
  const [SideNavIsOpen, setSideNavIsOpen] = useToggle(false);
  const isloading = loading || loading2 || loading3;
  const houses = user.houses || [];
  const selectedHouse = houses.filter(house => house._id === lastSelectedHouse.value)[0] || {};
  const selectedProduct = selectedHouse.product || {};
  const verifiedPhone = user && user.verifiedPhone;


  return isloading ? (
    <Preloader page />
  ) : (
    <Fragment>
      {/* 헤더에 정보전달 */}
      <Route
        render={() => (
          <Header
            sideNavOpener={setSideNavIsOpen}
            userInformation={user}
            verifiedPhone={verifiedPhone}
            lastSelectedHouse={lastSelectedHouse}
            isLoggedIn={isLoggedIn}
          />
        )}
      />
      {/* 사이드 네비게이션 */}
      <SideNav
        isOpen={SideNavIsOpen}
        selectedHouse={selectedHouse}
        selectedProduct={selectedProduct}
        userInformation={user}
        setIsOpen={setSideNavIsOpen}
      />
      <Switch>
        <Route exact path="/">
          <Home
            selectedHouse={selectedHouse}
            houses={houses}
            selectedProduct={selectedProduct}
            isLoggedIn={isLoggedIn}
          />
        </Route>
        <Route exact path="/middleServer">
          <Home isLoggedIn={isLoggedIn} />
        </Route>
        <Route
          exact
          path="/middleServer/myPage"
          render={() => (isLoggedIn ? <MyPage userInformation={user} houses={houses} /> : Login)}
        />
        <Route exact path="/middleServer/makeHouse" component={isLoggedIn ? MakeHouse : Login} />
        <Route
          exact
          path="/middleServer/products"
          render={() => (isLoggedIn ? <Products selectedHouse={selectedHouse} currentProduct={selectedProduct} /> : Login)
          }
        />
        <Route exact path="/middleServer/phoneVerification" component={isLoggedIn ? PhoneVerification : undefined} />
        <Route exact path="/middleServer/signUp" component={isLoggedIn ? undefined : SignUp} />
        <Route exact path="/middleServer/login" component={isLoggedIn ? undefined : Login} />
        {isEmpty(selectedProduct) ? <Route component={NoMatch} /> : (
          <Route
            exact
            path="/middleServer/ready"
            render={() => (isLoggedIn ? <Ready currentProduct={selectedProduct} selectedHouse={selectedHouse} /> : Login)}
          />
        )}
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  );
}

//  how to branch query
// https://stackoverflow.com/questions/48880071/use-result-for-first-query-in-second-query-with-apollo-client
export default compose(
  graphql(SELECTED_HOUSE, { name: 'lastSelectedHouse' }),
  graphql(IS_LOGGED_IN, { name: 'IsLoggedIn' }),
  graphql(GET_USER_INFO, {
    name: 'GetUserInfo',
    skip: ({ IsLoggedIn }) => {
      if (IsLoggedIn && IsLoggedIn.auth) {
        return !IsLoggedIn.auth.isLoggedIn;
      }
      return true;
    },
  }),
)(JDmiddleServer);
