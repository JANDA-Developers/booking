export const assigSharedDleteGuestConfirmMessage = {
  children: (
    <span>
      해당 게스트를 삭제하시겠습니까? <br />
      (해당 예약자가 예약한 다른 인원들은 지워지지 않습니다.)
    </span>
  ),
  trueBtns: [
    {msg: "알겠습니다.", callBackKey: "deleteOne"},
    {msg: "관련된 모든 인원을 제거하세요.", callBackKey: "deleteAll"}
  ]
};
