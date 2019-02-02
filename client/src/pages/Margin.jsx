/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import './Margin.scss';

const Margin = () => (
  <Fragment>
    <div id="MarginDOC">
      {/* container */}
      <h1 className="contianer flex-grid">
        <div className="container_ml" />
        {'CONTAINER'}
        <div className="container_mr" />
      </h1>
      {/* docs_section */}
      <div />
      <h1>docs_section</h1>
      <div className="docs_section_pb" />
      <h3>docs_section__box</h3>
      <div className="docs_section__box_pb" />
    </div>
  </Fragment>
);

export default Margin;
