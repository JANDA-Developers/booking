const insideRedirect = (lastDestination: string) => {
  const locationHerfTo = `http://${process.env.REACT_APP_API_HOST_URL}/#/${lastDestination}`;
  return locationHerfTo;
};

export default insideRedirect;
