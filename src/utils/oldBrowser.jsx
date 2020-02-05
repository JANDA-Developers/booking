// Old Browser Rework :: https://www.npmjs.com/package/outdated-browser-rework
// import 'outdated-browser-rework.scss';

// OLD borwser css는 main.scss 에있음
import outdatedBrowserRework from "outdated-browser-rework";
import { LANG } from "../hooks/hook";

const OLD_BROWSER_CONFIG = {
  browserSupport: {
    Chrome: 55, // Includes Chrome for mobile devices
    Edge: 39,
    Safari: 10,
    "Mobile Safari": 10,
    Firefox: 50,
    Opera: 50,
    Vivaldi: 1,
    Yandex: { major: 17, minor: 10 },
    IE: false,
    Kakao: false
  },
  requireChromeOnAndroid: false,
  isUnknownBrowserOK: true,
  messages: {
    en: {
      outOfDate: "오래된 브라우저를 사용중입니다.",
      unsupported:
        "원활한 서비스가 지원되지 않을수 있습니다. 크롬 브라우저를 권장합니다.",
      update: {
        web: "서비스 사용전에 브라우저 업데이트를 권장합니다. ",
        googlePlay: "크롬브라우저를 설치해주세요.",
        appStore: "Please update iOS from the Settings App"
      },
      // You can set the URL to null if you do not want a clickable link or provide
      // your own markup in the `update.web` message.
      url: "http://outdatedbrowser.com/",
      callToAction: "업데이트 하기",
      close: "Close"
    }
  },
  language: "en"
};

const JDoutdatedBrowserRework = () => {
  outdatedBrowserRework(OLD_BROWSER_CONFIG);
};

export default JDoutdatedBrowserRework;
