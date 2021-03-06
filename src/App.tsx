/* eslint-disable no-shadow */
import React, { useEffect, Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// @ts-ignore
import Favicon from "react-favicon";
import client from "./apollo/apolloClient";
import OutPageRouter from "./pages/outPages/OutPageRouter";
import NoMatch from "./pages/noMatch/NoMatch";
import BookingHostRouter from "./pages/bookingHost/BookingHostRouter";
import JDtoast from "./atoms/toast/Toast";
import { LANG } from "./hooks/hook";
import { globalLanguageSetting } from "./utils/globalLagnSet";
import $ from "jquery";
import { toast } from "react-toastify";
import { FAVI_URL } from "./types/const";
import LoadBalancer from "./pages/loadBalancer/LoadBalancer";
import Tracker from "./Tracker";
import JDtypho from "./atoms/typho/Typho";
import { useLang } from "@janda-com/lang";
import "./lib/wave/wave"; // [TODO 점검] 웨이브 이펙트
import "./lib/wave/wave.scss";
import "./App.scss";
import { BookingLang } from "./langs/JDlang";
// import PriceTable from "./components/priceTable/PriceTable";

import DashBoardInformation from "./pages/bookingHost/dashboard/components/DashBoardInformation";

const { version } = require("../package.json");

sessionStorage.setItem("app-version", version || "");

function App() {
  const lang = useLang(BookingLang);

  // TODO 이제 이건 필요 없을듯 ?
  globalLanguageSetting();

  useEffect(() => {
    const versionToggle = (e: any) => {
      if (e.altKey && e.ctrlKey && e.key === "v") {
        $("#JDversion").toggle();
      }
    };

    window.addEventListener("online", () => {
      toast.success(LANG("network_connected"));
    });
    window.addEventListener("offline", () => {
      toast.warn(LANG("check_net_status"));
    });
    document.addEventListener("keydown", versionToggle);
    return () => {
      document.removeEventListener("keydown", versionToggle);
    };
  });

  return (
    // <PriceTable />
    <div id="JDoutWrapper">
      <ApolloProvider client={client}>
        <Favicon url={FAVI_URL} />
        <Router>
          <Fragment>
            <Route render={prop => <Tracker foo={prop} />} />
            <Switch>
              {/* 상위 컴포넌트 영향에벋어날수 없다. */}
              <Route
                path="/LMeD6p5J3kn4D4Gu"
                render={prop => <LoadBalancer />}
              />
              <Route
                path="/outpage/:token"
                render={prop => <OutPageRouter {...prop} />}
              />
              {["/"].map(path => (
                <Route
                  key={`router${path}`}
                  path={path}
                  // @ts-ignore
                  render={() => <BookingHostRouter />}
                />
              ))}
              <Route component={NoMatch} />
            </Switch>
          </Fragment>
        </Router>
        <JDtoast />
        <div
          style={{
            display: "block",
            position: "fixed",
            left: "0%",
            bottom: "0%",
            zIndex: 999999
          }}
          id="JDversion"
          className="JDtextColor--placeHolder"
        >
          <JDtypho size="superTiny">{version} - </JDtypho>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 999999
          }}
          id="JDpreloaderPortal"
        />
        <div
          style={{
            position: "fixed",
            zIndex: 999999 + 1
          }}
          id="JDpriorityPortal"
        />
        {/* for old borwser */}
        <div id="outdated" />
      </ApolloProvider>
    </div>
  );
}

export default App;
