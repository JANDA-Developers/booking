import $ from "jquery";

let JD_BLINK_STACK = 0;

function targetBlink(targetDoms: JQuery<HTMLElement>, infi?: boolean) {
  // 무한반복방지
  if (JD_BLINK_STACK > 20) {
    JD_BLINK_STACK = 0;
    return;
  }
  setTimeout(() => {
    JD_BLINK_STACK++;
    targetDoms.addClass(`JDtext-blink`);
    1;
    if (infi) {
      targetDoms.addClass(`JDtext-blink--infinity`);
    }
  }, 300);
}

function targetBlinkFuture(selecter: string, infi?: boolean) {
  const targetDom = $(selecter);

  // 무한반복방지
  if (JD_BLINK_STACK > 20) {
    JD_BLINK_STACK = 0;
    return;
  }

  if (!targetDom || targetDom.length === 0) {
    setTimeout(() => {
      JD_BLINK_STACK++;
      targetBlinkFuture(selecter);
    }, 300);
    return;
  }

  targetBlink(targetDom, infi);
}

export default targetBlink;
export {targetBlinkFuture};
