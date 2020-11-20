function saveAuthToCookie(value) {
  document.cookie = `amyutok_auth=${value}`;
}

function saveUserToCookie(value) {
  document.cookie = `amyutok_user=${value}`;
}

function saveUniqIdToCookie(value) {
  document.cookie = `amyutok_uniqId=${value}`;
}

function getUniqIdFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)amyutok_uniqId\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)amyutok_auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)amyutok_user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function setIsLoginCookie(value) {
  document.cookie = `amyutok_isLogin=${value}`;
}

function getIsLoginCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)amyutok_isLogin\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie,
  setIsLoginCookie,
  getIsLoginCookie,
  saveUniqIdToCookie,
  getUniqIdFromCookie,
};
