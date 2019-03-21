import React from 'react';
import { PropTypes as PT } from 'prop-types';
import './googleMap.scss';

const GoogleMap = ({ mapRef }) => (
  <div className="JDgoogleMaps-wrapper">
    <div ref={mapRef} className="JDgoogleMaps" />
    <span role="img" aria-label="center" className="JDgoogleMaps__Center">
      {'📍'}
    </span>
  </div>
);

GoogleMap.propTypes = {
  mapRef: PT.object.isRequired,
};

export default GoogleMap;
