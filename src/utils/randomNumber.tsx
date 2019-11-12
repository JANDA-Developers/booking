// min 부터 max 까지 랜덤넘버 생성
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default randomIntFromInterval;
