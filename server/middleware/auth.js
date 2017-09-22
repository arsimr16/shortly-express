const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
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
    // req.session = {};
    //req.session.hash = req.cookies.shortlyid;
    models.Sessions.get({hash: req.cookies.shortlyid})
    .then((sessionsData) => {
      req.session = sessionsData;
      next();
    });
  }
};
    //console.log('session', req.session);
    //console.log('session hash', req.session.hash);
   
  
  // if (!req.cookies.keys) {
  //   //create new session
  //   models.Sessions.create();
  // }
  //models.Sessions.create();


/************************************************************/
// Add additional authentication middleware functions below
//************************************************************/