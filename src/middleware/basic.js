'use strict'

const base64 = require('base-64');
const { userCollection } = require('../models/index');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }
console.log(req.headers.authorization);
let basic = req.headers.authorization.split(' ').pop();
console.log(basic);
let [user, pass] = base64.decode(basic).split(':');
console.log(user, pass);

  try {
    req.user = await userCollection.model.authenticateBasic(user, pass)
    next();
  } catch (e) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login --- basic');
  }

}