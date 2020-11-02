export const SERVER_URI = false
  ? process.env.REACT_APP_API_SERVER_URI_DEV
  : process.env.REACT_APP_API_SERVER_URI;

export default (() => {
  return SERVER_URI;
})();
