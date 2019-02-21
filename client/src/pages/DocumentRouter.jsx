/* eslint-disable react/forbid-prop-types */
import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import DynamicImport from '../utils/DynamicImport';
import Header from '../components/Headers/DocumentHeader';
import NoMatch from './NoMatch';

class DocumentRouter extends Component {
  state = {};

  render() {
    const Margin = props => (
      <DynamicImport load={() => import('./documents/Margin')}>
        {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
      </DynamicImport>
    );

    const ColorPage = props => (
      <DynamicImport load={() => import('./documents/color/ColorPage')}>
        {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
      </DynamicImport>
    );

    const Grid = props => (
      <DynamicImport load={() => import('./documents/Grid')}>
        {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
      </DynamicImport>
    );

    const Brand = props => (
      <DynamicImport load={() => import('./documents/Brand')}>
        {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
      </DynamicImport>
    );

    const ShowComponents = props => (
      <DynamicImport load={() => import('./documents/ShowComponents')}>
        {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
      </DynamicImport>
    );

    const DocumentsMain = props => (
      <DynamicImport load={() => import('./documents/Main')}>
        {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
      </DynamicImport>
    );

    return (
      <Fragment>
        <Helmet>
          <title> Janda | Document </title>
        </Helmet>
        <Route path="/documents" component={Header} />
        <Switch>
          <Route exact path="/documents" component={DocumentsMain} />
          <Route exact path="/documents/ShowComponents" component={ShowComponents} />
          <Route exact path="/documents/grid" component={Grid} />
          <Route exact path="/documents/color" component={ColorPage} />
          <Route exact path="/documents/margin" component={Margin} />
          <Route exact path="/documents/brand" component={Brand} />
          <Route path="/documents/" component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

export default DocumentRouter;
