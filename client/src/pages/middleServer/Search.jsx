import React from 'react';
import PropTypes from 'prop-types';

const search = ({ location }) => (
  <div>
    {new URLSearchParams(location.search).get('keyword')}
    {'검색'}
  </div>
);

search.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default search;
