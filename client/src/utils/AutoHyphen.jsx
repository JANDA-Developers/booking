const autoHypenPhone = (str) => {
  const inStr = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (inStr.length < 4) {
    return inStr;
  }
  if (inStr.length < 7) {
    tmp += inStr.substr(0, 3);
    tmp += '-';
    tmp += inStr.substr(3);
    return tmp;
  }
  if (inStr.length < 11) {
    tmp += inStr.substr(0, 3);
    tmp += '-';
    tmp += inStr.substr(3, 3);
    tmp += '-';
    tmp += inStr.substr(6);
    return tmp;
  }
  if (inStr.length >= 11) {
    tmp += inStr.substr(0, 3);
    tmp += '-';
    tmp += inStr.substr(3, 4);
    tmp += '-';
    tmp += inStr.substr(7);
    return tmp;
  }

  return inStr;
};

export default autoHypenPhone;
