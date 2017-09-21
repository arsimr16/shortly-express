const parseCookies = (req, res, next) => {
  var cookies = req.headers.cookie;
  var cookieObj = {};
  if (cookies !== undefined) {
    cookies = cookies.split('; ');
    cookies.forEach((cookie) => {
      var cookieKeyVal = cookie.split('=');
      cookieObj[cookieKeyVal[0]] = cookieKeyVal[1];
    });
  }
  req.cookies = cookieObj;
  next();
};

module.exports = parseCookies;