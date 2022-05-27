'use strict';

const express = require('express');
const authRouter = express.Router();

const { userCollection } = require('../models/index');
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl.js')

authRouter.get(('/validToken'), bearerAuth,  async (req, res, next) => {
    let validData = {
      id: req.user.id,
      userCode:  req.user.userCode,
      userName:  req.user.userName,
      userRole:  req.user.userRole,
      actions :req.user.actions,
      token :req.user.token,
    }
  res.status(200).json(validData);
});


authRouter.post('/signUp', async (req, res, next) => {
  try {
    let userRecord = await userCollection.create(req.body);
    const output = { user: userRecord };
    res.status(201).json(output);
  } catch (e) {
    next('<<<<<<', e.message, '>>>>>>')
  }
});

authRouter.post('/signIn', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get(('/users'), bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await userCollection.read();
  const list = userRecords.map(user => {
    let userData = {
      Id: user.id,
      Code: user.userCode,
      Name: user.userName,
      Email: user.userEmail,
      Role: user.userRole,
      Address: user.userAddress,
      Active: user.userIsActive,
      Phone: user.userPhone,
      Remark: user.userRemark,
    }
    return userData
  });
  res.status(200).json(userRecords);
});
authRouter.get('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  let userRecords = await userCollection.read(req.params.id);
  if (userRecords) {
    const list = userRecords.map(user => {
      let userData = {
        Id: user.id,
        Code: user.userCode,
        Name: user.userName,
        Email: user.userEmail,
        Role: user.userRole,
        Address: user.userAddress,
        Active: user.userIsActive,
        Phone: user.userPhone,
        Remark: user.userRemark,
      }
      return userData
    });
    if (list[0].Id > 0) {
      res.status(200).json(list);
    } else {
      res.status(406).json(userRecords)
    }
  }
  else {
    res.status(406).json('Sorry ,,, The ID Should be Integer');
  }
});
authRouter.put('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {

    let userData = {}
    req.body.Code && (userData.userCode = req.body.Code);
    req.body.Name && (userData.userName = req.body.Name);
    req.body.Email && (userData.userEmail = req.body.Email);
    req.body.Address && (userData.userAddress = req.body.Address);
    req.body.Phone && (userData.userPhone = req.body.Phone);
    req.body.Role && (userData.userRole = req.body.Role);
    req.body.Remark && (userData.userRemark = req.body.Remark);
    (req.body.Active !== undefined) && (userData.userIsActive = req.body.Active);

    let userRecords = await userCollection.update(req.params.id, userData);
    if (userRecords && userRecords.id) {
      res.status(200).json(userRecords);
    } else {
      res.status(406).json('Sorry ,,, there was an error with updating record');
    }
  }
  catch (error) {
    res.status(406).json('Sorry ,,, there was an error with updating record\n', error);
  }

});
module.exports = authRouter;