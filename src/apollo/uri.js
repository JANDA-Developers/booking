export default process.env.NODE_ENV === "development"
  ? `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_SERVER_PORT}/${process.env.REACT_APP_API_ENDPOINT}`
  : `https://${process.env.REACT_APP_API_HOST_PRODUCT}${process.env.REACT_APP_API_ENDPOINT}`;