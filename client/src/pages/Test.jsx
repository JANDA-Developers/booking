/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const test = ({ match }) => (
  <div>
    {match.params.username}
    {'hellow'}
  </div>
);

test.propTypes = {
  match: PropTypes.object.isRequired,
};

export default test;
