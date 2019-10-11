const insideRedirect = (lastDestination: string) => {
  const locationHerfTo =
    process.env.NODE_ENV === "development"
      ? `http://${process.env.REACT_APP_API_HOST_PORT}/#/${lastDestination}`
      : `http://${process.env.REACT_APP_API_HOST_PRODUCT}/#/${lastDestination}`;

  return locationHerfTo;
};

export default insideRedirect;
