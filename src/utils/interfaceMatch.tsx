function instanceOfA<T>(object: any, key: string, nullCheck?: boolean): object is T {
  if(!nullCheck) {
  return key in object;
} else {
    if(object[key]){
      return true
    }else {
      return false
    }
  }
}

export default instanceOfA;
