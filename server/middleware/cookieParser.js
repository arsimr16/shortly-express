const parseCookies = (req, res, next) => {
  console.log(req.headers.cookie);
};

module.exports = parseCookies;