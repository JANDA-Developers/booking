// Old Browser Rework :: https://www.npmjs.com/package/outdated-browser-rework
// import 'outdated-browser-rework.scss';

// OLD borwser css는 main.scss 에있음
import outdatedBrowserRework from "outdated-browser-rework";

const OLD_BROWSER_CONFIG = {
  browserSupport: {
    Chrome: 55, // Includes Chrome for mobile devices
    Edge: 39,
    Safari: 10,
    "Mobile Safari": 10,
    Firefox: 50,
    Opera: 50,
    Vivaldi: 1,
    Yandex: {major: 17, minor: 10},
    IE: false,
    Kakao: false
  },
  requireChromeOnAndroid: false,
  isUnknownBrowserOK: true,
  messages: {
    en: {
      outOfDate: "앱사용 이전에 크롬 브라우저 사용을 권장합니다.",
      unsupported: "앱사용 이전에 크롬 브라우저 사용을 권장합니다.",
      update: {
        web:
          "오래된 브라우저 입니다. 서비스 이용중 문제가 발생할수 있습니다. </br> 브라우저를 업데이트 해주세요.",
        googlePlay: "googlePlay 에서 크롬을 업데이트 해주세요.",
        appStore: "appStore 에서 IOS 를 업데이트 해주세요."
      },
      url: "https://www.google.com/chrome/",
      callToAction: "권장 브라우저(Chrome)로 업데이트",
      close: "닫기"
    }
  },
  language: "en"
};

const JDoutdatedBrowserRework = () => {
  outdatedBrowserRework(OLD_BROWSER_CONFIG);
};

export default JDoutdatedBrowserRework;
