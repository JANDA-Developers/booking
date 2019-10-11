function instanceOfA<T>(object: any, key: string): object is T {
  return key in object;
}

export default instanceOfA;
