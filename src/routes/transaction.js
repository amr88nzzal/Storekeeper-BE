'use strict';
const express = require('express');
const trx = express.Router();
const { transactionCollection } = require('../models/index');
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl.js')

trx.get(('/trx'), bearerAuth, permissions('read'), handlerGetAll)
trx.get(('/trxByDate'), bearerAuth, permissions('read'), handlerGetAllByDate)
trx.get(('/trxBy/:column'), bearerAuth, permissions('read'), handlerGetAllByParam)
trx.post('/trx', bearerAuth, permissions('create'), handlerCreateTrx)
trx.put('/trx/:id', bearerAuth, permissions('update'), handlerUpdate)
trx.delete('/trx/:id', bearerAuth, permissions('delete'),handelDelete)


async function handlerCreateTrx(req, res) {
  try {
    let trxObj = req.body
    let newTrx = await transactionCollection.create(trxObj);
    res.status(200).json(newTrx);
  } catch (error) {
    res.status(406).json('something was wrong ', error);
  }
}
async function handlerGetAll(req, res) {
  try {
    const transaction = await transactionCollection.readTransaction();
    const list = !transaction ? "No Records" : transaction.map(trx => {
      let trxRecord = {
        trxId: trx.id,
        trxCustomerCategory: trx.customer.category.categoryName,
        trxCustomerCity: trx.customer.location.cite.cityName,
        trxCustomerLocation: trx.customer.location.locationName,
        trxCustomerName: trx.customer.customerName,
        trxCustomerAgent: trx.customer.user.userName,
        trxAgentName: trx.user.userName,
        trxGPS: trx.trxGPS,
        trxStartDate: trx.trxStartDate.toUTCString(),
        trxEndDate: trx.trxEndDate.toUTCString(),
        trxVisitDuration: new Date(trx.trxEndDate - trx.trxStartDate).toUTCString().slice(-12, -4),
        trxDetails: {
          trxRemark: trx.trxRemark,
          trxHasSales: trx.trxHasSales,
          trxSalesNum: trx.trxSalesNum,
          trxHasReturn: trx.trxHasReturn,
          trxReturnNum: trx.trxReturnNum,
          trxHasReceipts: trx.trxHasReceipts,
          trxReceiptsNum: trx.trxReceiptsNum,
          trxIsVisit: trx.trxIsVisit,
          trxIsExchange: trx.trxIsExchange
        }


      }
      return trxRecord
    });
    res.status(200).json(list);
  }
  catch (error) {
    res.status(406).json('something was wrong ', error);

  }
}
async function handlerGetAllByDate(req, res) {
  try {
    // console.log(req);
    const transaction = await transactionCollection.readTransactionByDate(req.query.from,req.query.to);
    const list = !transaction ? "No Records" : transaction.map(trx => {
      let trxRecord = {
        trxId: trx.id,
        trxCustomerCategory: trx.customer.category.categoryName,
        trxCustomerCity: trx.customer.location.cite.cityName,
        trxCustomerLocation: trx.customer.location.locationName,
        trxCustomerName: trx.customer.customerName,
        trxCustomerAgent: trx.customer.user.userName,
        trxAgentName: trx.user.userName,
        trxGPS: trx.trxGPS,
        trxStartDate: trx.trxStartDate.toUTCString(),
        trxEndDate: trx.trxEndDate.toUTCString(),
        trxVisitDuration: new Date(trx.trxEndDate - trx.trxStartDate).toUTCString().slice(-12, -4),
        trxDetails: {
          trxRemark: trx.trxRemark,
          trxHasSales: trx.trxHasSales,
          trxSalesNum: trx.trxSalesNum,
          trxHasReturn: trx.trxHasReturn,
          trxReturnNum: trx.trxReturnNum,
          trxHasReceipts: trx.trxHasReceipts,
          trxReceiptsNum: trx.trxReceiptsNum,
          trxIsVisit: trx.trxIsVisit,
          trxIsExchange: trx.trxIsExchange
        }


      }
      return trxRecord
    });
    res.status(200).json([list]);
  }
  catch (error) {
    res.status(406).json('something was wrong ', error);

  }
}
async function handlerGetAllByParam(req, res) {
  try {
    // console.log(req);
    const transaction = await transactionCollection.readTransactionByParam(req.params.column,req.query.value,req.query.options);
    const list = !transaction ? "No Records" : transaction.map(trx => {
      let trxRecord = {
        Id: trx.id,
        trxCustomerCategory: trx.customer.category.categoryName,
        trxCustomerCity: trx.customer.location.cite.cityName,
        trxCustomerLocation: trx.customer.location.locationName,
        trxCustomerName: trx.customer.customerName,
        trxCustomerAgent: trx.customer.user.userName,
        trxAgentName: trx.user.userName,
        trxGPS: trx.trxGPS,
        trxStartDate: trx.trxStartDate.toUTCString(),
        trxEndDate: trx.trxEndDate.toUTCString(),
        trxVisitDuration: new Date(trx.trxEndDate - trx.trxStartDate).toUTCString().slice(-12, -7),
        trxDetails: {
          trxRemark: trx.trxRemark,
          trxHasSales: trx.trxHasSales,
          trxSalesNum: trx.trxSalesNum,
          trxHasReturn: trx.trxHasReturn,
          trxReturnNum: trx.trxReturnNum,
          trxHasReceipts: trx.trxHasReceipts,
          trxReceiptsNum: trx.trxReceiptsNum,
          trxIsVisit: trx.trxIsVisit,
          trxIsExchange: trx.trxIsExchange
        }


      }
      return trxRecord
    });
    res.status(200).json([list]);
  }
  catch (error) {
    res.status(406).json('something was wrong ', error);

  }
}
async function handelDelete (req, res) {
  let deletedItem = await transactionCollection.delete(req.params.id);
  res.status(200).json(deletedItem);
};
async function handlerUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await transactionCollection.update(id, obj);
    if(updatedRecord&&updatedRecord.id){
    res.status(200).json(updatedRecord);
    }else
    {res.status(406).json('There was an error with updating ')}
  } catch (err) {
    throw new Error(err.message);
  }
}


module.exports = trx;
          