import React from 'react';
import './googleMap.scss';

const GoogleMap = React.forwardRef<HTMLDivElement, any>((foo, ref) => (
	<div className="JDgoogleMaps-wrapper">
		<div ref={ref} className="JDgoogleMaps" />
		<span role="img" aria-label="center" className="JDgoogleMaps__Center">
			{'📍'}
		</span>
	</div>
));

export default GoogleMap;
