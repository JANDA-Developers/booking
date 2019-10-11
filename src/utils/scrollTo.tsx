import $ from "jquery";

function JDscrollTo(
  targetDom: JQuery<HTMLElement>,
  scrollDom?: JQuery<HTMLElement>
) {
  setTimeout(() => {
    window.scrollTo({top: targetDom.get(0).offsetTop});

    if (!scrollDom) return;

    const targetWidth = scrollDom.width() || 0;
    scrollDom
      .get(0)
      .scrollTo({left: targetDom.get(0).offsetLeft - targetWidth / 2});
  }, 500);
}

export default JDscrollTo;
