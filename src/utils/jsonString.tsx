const jsonString = (value: any) => {
  return JSON.stringify(Array.from(value.entries()));
};

export default jsonString;
