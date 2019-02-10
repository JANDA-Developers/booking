/* eslint-disable react/forbid-prop-types */
import React from 'react';
import './Grid.scss';

const Grid = () => (
  <div className="container PageGrid">
    <div className="flex-grid">
      <div className="flex-grid__col" />
      <div className="flex-grid__col" />
      <div className="flex-grid__col" />
    </div>
  </div>
);

export default Grid;
