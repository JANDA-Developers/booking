// 타멧 돔이 있는 위치까지 스크롤돔 을 이동시킴니다.
function JDscrollTo(
  targetDom: JQuery<HTMLElement>,
  // default === window
  scrollDom?: JQuery<HTMLElement>
) {
  setTimeout(() => {
    window.scrollTo({ top: targetDom.get(0).offsetTop });

    if (!scrollDom) return;

    const targetWidth = scrollDom.width() || 0;
    scrollDom
      .get(0)
      .scrollTo({ left: targetDom.get(0).offsetLeft - targetWidth / 2 });
  }, 500);
}

export default JDscrollTo;
