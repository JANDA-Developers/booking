import React from 'react';
import './googleMap.scss';
import { IDiv } from '../../../../types/interface';
import GoogleMapReact from 'google-map-react';

interface Iprops extends IDiv {
}

const GoogleMap: React.FC<Iprops> = (() => (
	<GoogleMapReact
		bootstrapURLKeys={{ key: process.env.REACT_APP_API_MAP_KEY! }}
		defaultCenter={{ lat: 37, lng: 38 }}
		defaultZoom={14}
	>
	</GoogleMapReact>
));




export default GoogleMap;
