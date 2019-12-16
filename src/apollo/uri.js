const DEV = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_SERVER_PORT}/${process.env.REACT_APP_API_ENDPOINT}`;
const PROD = `https://${process.env.REACT_APP_API_HOST_PRODUCT}${process.env.REACT_APP_API_ENDPOINT}`;

// export default process.env.NODE_ENV === "development" ? DEV : PROD;
export default DEV;
