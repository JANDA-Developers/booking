const getFromUrl = (get: string): string | null => {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const param = url.searchParams.get(get)?.replace("/", "") || null;
  return param;
};

export { getFromUrl };
