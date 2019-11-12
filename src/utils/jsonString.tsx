// 객체를 DEEP 스트링으로 변환
const jsonString = (value: any) => {
  return JSON.stringify(Array.from(value.entries()));
};

export default jsonString;
