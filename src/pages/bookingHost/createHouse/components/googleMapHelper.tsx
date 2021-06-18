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
    if (!firstPlace) return "";
    const address = firstPlace.formatted_address;
    return address;
  }
  return "";
};

// Map Config 그리고 생성
export const loadMap = (lat: number, lng: number, mapRef: any, google: any) => {
  const { maps } = google;
  const mapNode = mapRef.current;
  const mapConfig = {
    center: {
      lat,
      lng
    },
    disableDefaultUI: true,
    minZoom: 8,
    zoom: 15,
    zoomControl: true
  };
  return new maps.Map(mapNode, mapConfig);
};

export const getLocationFromMap = async (map: any) => {
  const newCenter = map.getCenter();
  const lat = newCenter.lat();
  const lng = newCenter.lng();
  const reversedAddress = await reverseGeoCode(lat, lng);
  return {
    lat,
    lng,
    reversedAddress
  };
};

export type TLocation = {
  addressDetail: string | null;
  address: string;
  lat: number;
  lng: number;
};

// 인풋서치 이후에 구글맵 위치를 변환
export const changeMapBySearch = async (
  value: string | null,
  map: any | null,
  location: TLocation,
  callBack: (location: TLocation) => void
) => {
  if (!value || !map) return;
  const result = await geoCode(value);
  if (result === false) return;
  const { lat, lng } = result;

  callBack({
    ...location,
    address: value,
    lat,
    lng
  });

  map.panTo({ lat, lng });
};

// function JDgoogleMapWraper<T>(
//   Component: React.FC<T & IProvidedProps>
// ): React.ComponentType<any> {

//   return GoogleApiWrapper({
//     apiKey: process.env.REACT_APP_API_MAP_KEY || "",
//     LoadingContainer: () => (
//       <div style={{ height: "85vh" }}>
//         <Preloader floating loading={true} />
//       </div>
//     )
//   })(Component);
// }
// export { JDgoogleMapWraper };
