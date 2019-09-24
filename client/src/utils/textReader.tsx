const textReader = (txt: string): string => {
  if (typeof txt !== "string") return txt;
  const rex = "/(?=#).[a-z0-9]+(?=s)/g";
  const ex = txt.split(rex);
  return txt;
};

export default textReader;
