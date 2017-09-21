const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  models.Sessions.create();
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

