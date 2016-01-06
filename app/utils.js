let __cookies = () => {
  let cookies = {};
  document.cookie.split(';').map(pair => {
    pair = pair.trim();
    if (pair.length === 1) {
      return;
    }
    let k_v = pair.split('=');
    if (k_v.length === 1) {
      return;
    }
    return cookies[k_v[0]] = k_v[1];
  });
  return cookies;
};

let cookie = (key, value) => {
  let cookies = __cookies();
  if (key && !value) {
    // get cookie
    return cookies[key] || null;
  }
  if (key && value) {
    // set cookie
    document.cookie = `${key}=${value}`;
    return;
  }
};

let removeCookie = (key, value) => {
  let cookies = __cookies();
  if (!cookies[key]) {
    return false;
  }
  document.cookie = `${key}=`;
  return true;
};

let dateFormat = ISOFormat => {
  let _datetime = ISOFormat.split('T');
  let date = _datetime[0].replace(/-/g, '/');
  let time = _datetime[1].replace(/\..+/, '');
  return date + ' ' + time;
}

export {
  cookie,
  removeCookie,
  dateFormat
}
