const local = "http://localhost:4002/graphql";
export const SERVER_URI = false
  ? process.env.REACT_APP_API_SERVER_URI
  : process.env.REACT_APP_API_SERVER_URI;

export default (() => {
  return local;
})();
