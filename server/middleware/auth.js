const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies) {
    if (!req.cookies.shortlyid) {
      models.Sessions.create()
      .then((sessionId) => {
        var insertId = sessionId.insertId;
        models.Sessions.get({id: insertId})
        .then((userInfo) => {
          req.session = userInfo;
          res.cookies['shortlyid'] = {};
          res.cookies['shortlyid'].value = req.session.hash;
          next();
        });
      });
    } else {
      models.Sessions.get({hash: req.cookies.shortlyid})
      .then((sessionsData) => {
        req.session = sessionsData;
        next();
      })
      .catch((error) => {
        models.Sessions.create()
        .then((sessionId) => {
          var insertId = sessionId.insertId;
          models.Sessions.get({id: insertId})
          .then((userInfo) => {
            req.session = userInfo;
            res.cookies['shortlyid'] = {};
            res.cookies['shortlyid'].value = req.session.hash;
            next();
          });
        });
        throw error;
      });
    }
  }
};


/************************************************************/
// Add additional authentication middleware functions below
//************************************************************/