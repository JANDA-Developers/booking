function sam<T extends undefined | null, K, D>(Q: T, T: K, F: D): D;
function sam<T extends any, K extends keyof T, D>(Q: T, T: K, F: D): T[K] | D {
  return Q ? Q[T] : F;
}

export default sam;
