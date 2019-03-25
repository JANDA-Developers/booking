/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import './Margin.scss';

const Margin = () => (
  <Fragment>
    <div id="MarginDOC">
      {/* container */}
      <div className="containers">
        <div className="container_ml" />
        <div className="container_pl" />
        <h1>CONTAINER</h1>
        <div className="container_mr" />
        <div className="container_pr" />
      </div>
      {/* container --sm */}
      <div className="containers">
        <div className="container-sm_ml" />
        <div className="container_pl" />
        <h1>CONTAINER--sm</h1>
        <div className="container-sm_mr" />
        <div className="container_pr" />
      </div>
      {/* docs-section */}
      <div className="containers">
        <h1>docs-section</h1>
        <div className="docs-section_pb" />
        <h3>docs-section__box</h3>
        <div className="docs-section__box_pb" />
      </div>
    </div>
  </Fragment>
);

export default Margin;
