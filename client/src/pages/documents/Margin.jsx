/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import './Margin.scss';

const Margin = () => (
  <Fragment>
    <div id="MarginDOC">
      {/* container */}
      <div className="flex-grid">
        <div className="container_ml" />
        <h1>CONTAINER</h1>
        <div className="container_mr" />
      </div>
      {/* docs-section */}
      <div className="container">
        <h1>docs-section</h1>
        <div className="docs-section_pb" />
        <h3>docs-section__box</h3>
        <div className="docs-section__box_pb" />
      </div>
    </div>
  </Fragment>
);

export default Margin;
