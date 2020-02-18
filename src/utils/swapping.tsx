const Swapping = (arr: any[], indexA: number, indexB: number) => {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

export default Swapping;
