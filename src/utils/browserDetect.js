import { toast } from "react-toastify";
import JDoutdatedBrowserRework from "./oldBrowser";

const browerDetect = () => {
  (!!window.opr && !!opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0;

  var isIE = /*@cc_on!@*/ false || !!document.documentMode;

  if (isIE) {
    toast.warn(
      "현 브라우저 에서는 서비스가 동작하지 않을 수 있습니다. 크롬 브라우저를 사용해주세요.",
      {
        autoClose: 1000000
      }
    );
    JDoutdatedBrowserRework();
    return;
  }

  // Opera 8.0+
  var isOpera =
    (!!window.opr && !!opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== "undefined";
  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && safari.pushNotification)
    );
  // Internet Explorer 6-11
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  // Chrome 1 - 71
  var isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;
};
export default browerDetect;
