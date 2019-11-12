/* eslint-disable react/forbid-prop-types */
import React, { Fragment, Component } from "react";
import { Route, Switch } from "react-router-dom";
import Helmet from "react-helmet";
import Header from "../../components/documentHeader/DocumentHeader";
import NoMatch from "../noMatch/NoMatch";
import { DocumentHome, ShowComponents, Grid, ColorPage, Brand } from "./pages";

class DocumentRouter extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <Helmet>
          <title> Janda | Document </title>
          <meta HTTP-EQUIV="Imagetoolbar" content="no" />
          <meta name="Publisher" content="잔다/JANDA" />
          <meta property="og:url" content="http://localhost:3000/#/" />
          <meta property="og:title" content="잔다 숙박전문 솔루션" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/stayjanda-com/image/upload/v1560133492/jdlogo_masterV2.png"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="JANDA" />
          <meta name="twitter:description" content="숙박전문 솔루션 잔다" />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/stayjanda-com/image/upload/v1560133492/jdlogo_masterV2.png"
          />

          <meta itemprop="name" content="JANDA" />
          <meta itemprop="description" content="잔다 숙박전문 솔루션" />
          <meta
            itemprop="image"
            content="https://res.cloudinary.com/stayjanda-com/image/upload/v1560133492/jdlogo_masterV2.png"
          />
        </Helmet>
        <Route path="/documents" component={Header} />
        <Switch>
          <Route exact path="/documents" component={DocumentHome} />
          <Route
            exact
            path="/documents/ShowComponents"
            component={ShowComponents}
          />
          <Route exact path="/documents/grid" component={Grid} />
          <Route exact path="/documents/color" component={ColorPage} />
          <Route exact path="/documents/brand" component={Brand} />
          <Route path="/documents/" component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

export default DocumentRouter;
