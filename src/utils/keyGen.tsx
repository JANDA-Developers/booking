// 곂치지않는 스트링을 생산
const s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export default s4;
