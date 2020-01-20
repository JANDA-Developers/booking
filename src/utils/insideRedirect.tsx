const insideRedirect = (lastDestination: string) => {
  const locationHerfTo = `${process.env.REACT_APP_API_CLIENT_URL}/#/${lastDestination}`;
  return locationHerfTo;
};

export default insideRedirect;
