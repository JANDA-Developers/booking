/* eslint-disable no-shadow */
import React, { useEffect, Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// @ts-ignore
import Favicon from "react-favicon";
import client from "./apollo/apolloClient";
import DocumentRouter from "./pages/documents/DocumentRouter";
import OutPageRouter from "./pages/outPages/OutPageRouter";
import NoMatch from "./pages/noMatch/NoMatch";
import BookingHostRouter from "./pages/bookingHost/BookingHostRouter";
import JDtoast from "./atoms/toast/Toast";
import "./lib/wave/wave"; // 웨이브 이펙트
import "./lib/wave/wave.scss";
import { useLang, LANG } from "./hooks/hook";
import { globalLanguageSetting } from "./utils/globalLagnSet";
import $ from "jquery";
import { toast } from "react-toastify";
import { FAVI_URL } from "./types/const";
import LoadBalancer from "./pages/loadBalancer/LoadBalancer";
import { getFromUrl } from "./utils/utils";
import userTacking from "./utils/userTracking";
import Tracker from "./Tracker";

function App() {
  const ln = getFromUrl("ln");
  const langHook = useLang(
    ln || (localStorage.getItem("LastLang") as any) || "kr"
  );

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
                  // @ts-ignore
                  render={() => <BookingHostRouter langHook={langHook} />}
                />
              ))}
              <Route component={NoMatch} />
            </Switch>
          </Fragment>
        </Router>
        <JDtoast />
        <div
          style={{
            display: "none",
            position: "fixed",
            right: "2%",
            bottom: "1%"
          }}
          id="JDversion"
          className="JDtextColor--placeHolder"
        >
          1.1.2 Last Update 2019.11.22.
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
