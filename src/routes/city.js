'use strict'

const express = require("express")
const {cityCollection} = require('../models/index')
const router = express.Router()
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");


router.get('/city',bearerAuth,permissions('read'),handlerGetAll)
router.get('/city/:id',bearerAuth,permissions('read'),handlerGetOne)

router.put('/city/:id',bearerAuth,permissions('admin'),handlerUpdate)
router.post('/city',bearerAuth,permissions('admin'),handlerCreate)
router.delete('/city/:id',bearerAuth,permissions('admin'),handlerDelete)


async function handlerGetAll(req, res) {
    try {
      let allRecords = await cityCollection.read();
      res.status(200).json(allRecords);
    } catch (err) {
      throw new Error(err.message);
    }
  }


  async function handlerGetOne(req, res) {
    try {
      let record = await cityCollection.read(req.params.id);
      if(record && record[0].id){
      res.status(200).json(record);
    }
      else
      {
          res.status(406).json('There is no record with this id')
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function handlerUpdate(req, res) {
    try {
      const id = req.params.id;
      const obj = req.body;
      let updatedRecord = await cityCollection.update(id, obj);
      if(updatedRecord&&updatedRecord.id){
      res.status(200).json(updatedRecord);
      }else
      {
          res.status(406).json('There was an error with updating ')
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function handlerCreate(req, res) {
    try {
      let obj = req.body;
      let newRecord = await cityCollection.create(obj);
      if (newRecord&&newRecord.id){
        res.status(201).json(newRecord);
      }else{
        res.status(406).json('There was an error with creating ')
      }
      
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async function handlerDelete(req, res) {
    try{
    let deletedItem = await cityCollection.delete(req.params.id);
    console.log(deletedItem);
    res.status(200).json(deletedItem);
    }catch (err) {
      throw new Error(err.message);
    }
  }
  
  module.exports=router;