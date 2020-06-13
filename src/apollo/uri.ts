export const SERVER_URI =
  process.env.NODE_ENV === "development"
    ? "https://temp-booking.stayjanda.cloud/graphql"
    : `${window.location.protocol + "//" + window.location.host}/graphql`;

export default (() => {
  return SERVER_URI;
})();
