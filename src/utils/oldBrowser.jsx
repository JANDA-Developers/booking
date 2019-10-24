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
      outOfDate: LANG("we_recommend_using_the_Chrome_browser_before_using_the_app"),
      unsupported: LANG("we_recommend_using_the_Chrome_browser_before_using_the_app"),
      update: {
        web:
          LANG("this_is_an_old_browser_Problems_may_occur_while_using_the_service_Please_update_your_browser"),
        googlePlay: LANG("please_update_Chrome_in_googlePlay"),
        appStore: LANG("please_update_Chrome_in_appStore")
      },
      url: "https://www.google.com/chrome/",
      callToAction: LANG("update_to_recommended_browser_chrome"),
      close: LANG("close")
    }
  },
  language: "en"
};

const JDoutdatedBrowserRework = () => {
  outdatedBrowserRework(OLD_BROWSER_CONFIG);
};

export default JDoutdatedBrowserRework;
