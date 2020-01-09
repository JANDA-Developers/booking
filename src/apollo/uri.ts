const DEV = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_SERVER_PORT}/${process.env.REACT_APP_API_ENDPOINT}`;
const PROD = `https://${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_ENDPOINT}`;

export default (() => {
  const env = process.env.NODE_ENV;

  console.log("env");
  console.log(env);
  console.log(DEV);

  if (env === "development") return DEV;
  else return PROD
})();
