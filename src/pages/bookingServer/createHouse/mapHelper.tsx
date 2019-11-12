import axios from "axios";

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_MAP_KEY}&language=ko&region=KO`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    if (!firstPlace) return false;
    const {
      formatted_address: formatedAddress,
      geometry: {
        location: { lat, lng }
      }
    } = firstPlace;
    return { formatedAddress, lat, lng };
  }
  return false;
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_API_MAP_KEY}&language=ko&region=KO`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;
    return address;
  }
  return false;
};
