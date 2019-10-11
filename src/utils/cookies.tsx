export function setCookie(cookie_name: string, value: string, days: number) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value =
    escape(value) +
    (days == null ? "" : ";    expires=" + exdate.toUTCString());
  document.cookie = cookie_name + "=" + cookie_value;
}

export function getCookie(cookieName: string) {
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");

  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));

    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);

    x = x.replace(/^\s+|\s+$/g, "");

    if (x == cookieName) {
      return unescape(y);
    }
  }
}
