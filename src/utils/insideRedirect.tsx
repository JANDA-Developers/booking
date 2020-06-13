const insideRedirect = (lastDestination: string) => {
  const locationHerfTo = `${window.location.protocol +
    "//" +
    window.location.host}/#/${lastDestination}`;
  return locationHerfTo;
};

export default insideRedirect;
