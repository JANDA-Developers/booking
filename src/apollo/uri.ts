export const SERVER_URI =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_SERVER_URI_DEV
    : process.env.REACT_APP_API_SERVER_URI;

export default (() => {
  return SERVER_URI;
})();
