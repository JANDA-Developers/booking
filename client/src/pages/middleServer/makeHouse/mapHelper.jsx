import axios from 'axios';
import { toast } from '../../../utils/utils';
import { MAPS_KEY } from '../../../keys';

export const geoCode = async (address) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    if (!firstPlace) return false;
    const {
      formatted_address: formatedAddress,
      geometry: {
        location: { lat, lng },
      },
    } = firstPlace;
    return { formatedAddress, lat, lng };
  }
  toast.error(data.error_message);
  return false;
};

export const reverseGeoCode = async (lat, lng) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;
    return address;
  }
  toast.warn(data.error_message);
  return false;
};
