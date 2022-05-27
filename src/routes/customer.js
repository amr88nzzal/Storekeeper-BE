'use strict';
const express = require('express');
const customer = express.Router();
const { customerCollection } = require('../models/index');
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl.js')

customer.get('/customer', bearerAuth, permissions('read'), handlerGetAll)
customer.get('/customer/:id', bearerAuth, permissions('read'), handlerGetOne)
customer.post('/customer', bearerAuth, permissions('create'), handlerCreate)




async function handlerGetOne(req, res) {
  console.log(req.params);
  try {
    let customer = await customerCollection.readCustomer(req.params.id);
    console.log(customer);
    let customerInfo = {}
    if (customer!== undefined && customer!==null){
      customerInfo={id: customer.id,
        customerName: customer.customerName,
        customerGPS: customer.customerGPS,
        customerPhone: customer.customerPhone,
        customerPerson: customer.customerPerson,
        customerRemark: customer.customerRemark,
        customerIsActive: customer.customerIsActive,
        customerAgent: customer.user.userName,
        customerCategory: customer.category.categoryName,
        customerCity: customer.location.cite.cityName,
        customerLocation: customer.location.locationName,
      }
    res.status(200).json(customerInfo);}
    else 
    res.status(405).json("No record with this Id  ");
  }
  catch (err) {
    throw new Error(err.message);
  }
}
async function handlerGetAll(req, res) {
  try {
    let customerInfo = await customerCollection.readCustomer();
    const list = customerInfo.map(customer => {
      customer = {
        id: customer.id,
        customerName: customer.customerName,
        customerGPS: customer.customerGPS,
        customerPhone: customer.customerPhone,
        customerPerson: customer.customerPerson,
        customerRemark: customer.customerRemark,
        customerIsActive: customer.customerIsActive,
        customerAgent: customer.user.userName,
        customerCategory: customer.category.categoryName,
        customerCity: customer.location.cite.cityName,
        customerLocation: customer.location.locationName,
      }
      return customer
    });
    res.status(200).json(list);
  }
  catch (err) {
    throw new Error(err.message);
  }
}
async function handlerCreate(req, res) {

  try {
    let obj = req.body;
    let newRecord = await customerCollection.create(obj);
    if (newRecord && newRecord.id) {
      res.status(201).json(newRecord);
    } else {
      res.status(406).json('There was an error with creating ')
    }

  } catch (err) {
    throw new Error(err.message);
  }
}


// customer.put('/profile', bearerAuth, permissions('update-profile'), async (req, res, next) => {
//   let userData = {}
//   req.body.userEmail && (userData.userEmail = req.body.userEmail);
//   req.body.userAddress && (userData.userAddress = req.body.userAddress);
//   req.body.userPhone && (userData.userPhone = req.body.userPhone);
//   req.body.userimg && (userData.userimg = req.body.userimg);


//   console.log(userData);
//   let userRecords = await customerCollection.update(req.user.id, userData);
//   console.log(userRecords);
//   res.status(200).json(userRecords);
// });
module.exports = customer;
