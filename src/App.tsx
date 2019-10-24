/* eslint-disable no-shadow */
import React from "react";
import {ApolloProvider} from "react-apollo";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
// @ts-ignore
import Favicon from "react-favicon";
import client from "./apolloClient";
import DocumentRouter from "./pages/DocumentRouter";
import OutPageRouter from "./pages/OutPageRouter";
import NoMatch from "./pages/noMatch/NoMatch";
import MiddleServerRouter from "./pages/MiddleServerRouter";
import JDtoast from "./atoms/toast/Toast";
import "./lib/wave/wave"; // 웨이브 이펙트
import "./lib/wave/wave.scss";
import {useLang, LANG} from "./hooks/hook";
import {
  BOOKING_STATUS_OP,
  KR_SMS_PARSER,
  PAYMENT_STATUS_OP,
  STATISTICS_TYPE_OP,
  SMS_TARGET_OP,
  PRODUCT_STATUS_OP,
  PAYMETHOD_FOR_BOOKER_OP,
  GET_SMS_TARGET_OP,
  PAYMETHOD_FOR_HOST_OP,
  ROOM_GENDER_OP,
  PRICING_TYPE_OP,
  PRICING_TYPE_OP_EXPEND,
  GENDER_OP,
  AUTO_SEND_OP
} from "./types/enum";
import {isArray} from "util";

const globalLanguageSetting = () => {
  const settings = [
    BOOKING_STATUS_OP,
    KR_SMS_PARSER,
    PAYMENT_STATUS_OP,
    STATISTICS_TYPE_OP,
    SMS_TARGET_OP,
    PRODUCT_STATUS_OP,
    PAYMETHOD_FOR_BOOKER_OP,
    PAYMETHOD_FOR_HOST_OP,
    GET_SMS_TARGET_OP,
    ROOM_GENDER_OP,
    PRICING_TYPE_OP,
    PRICING_TYPE_OP_EXPEND,
    GENDER_OP,
    AUTO_SEND_OP
  ];
  settings.forEach(set => {
    if (!isArray(set)) {
      for (const key in set) {
        console.log("aaaakey");
        // @ts-ignore
        set[key] = LANG(key);
      }
    } else {
      set.forEach((setIn: any) => {
        setIn.label = LANG(setIn.value);
      });
    }
  });
};

function App() {
  const langHook = useLang("kr");
  globalLanguageSetting();
  return (
    <ApolloProvider client={client}>
      <Favicon url="https://res.cloudinary.com/stayjanda-com/image/upload/v1554092565/favicon.ico" />
      <Router>
        <Switch>
          {/* 상위 컴포넌트 영향에벋어날수 없다. */}
          <Route
            path="/documents"
            render={prop => <DocumentRouter {...prop} />}
          />
          <Route
            path="/outpage/:token"
            render={prop => <OutPageRouter {...prop} />}
          />
          {["/"].map(path => (
            <Route
              key={`router${path}`}
              path={path}
              render={() => <MiddleServerRouter langHook={langHook} />}
            />
          ))}
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <JDtoast />
      <div id="JDpreloaderPortal" />
      {/* for old borwser */}
      <div id="outdated" />
    </ApolloProvider>
  );
}
export default App;
