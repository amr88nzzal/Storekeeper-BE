'use strict'

const express = require("express")
const {locationCollection} = require('../models/index')
const router = express.Router()
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");


router.get('/location',bearerAuth,permissions('read'),handlerGetAll)
router.get('/location/:id',bearerAuth,permissions('read'),handlerGetOne)

router.put('/location/:id',bearerAuth,permissions('admin'),handlerUpdate)
router.post('/location',bearerAuth,permissions('admin'),handlerCreate)
router.delete('/location/:id',bearerAuth,permissions('admin'),handlerDelete)


async function handlerGetAll(req, res) {
    try {
      let allRecords = await locationCollection.readWith1Relation();
      res.status(200).json(allRecords);
    } catch (err) {
      throw new Error(err.message);
    }
  }


  async function handlerGetOne(req, res) {
    try {
      let record = await locationCollection.readWith1Relation(req.params.id);
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
      let updatedRecord = await locationCollection.update(id, obj);
      if(updatedRecord&&updatedRecord.id){
      res.status(200).json(updatedRecord);
      }else
      {res.status(406).json('There was an error with updating ')}
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function handlerCreate(req, res) {
    try {
      let obj = req.body;
      let newRecord = await locationCollection.create(obj);
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
    let deletedItem = await locationCollection.delete(req.params.id);
    res.status(200).json(deletedItem);
    }catch (err) {
      throw new Error(err.message);
    }
  }
  
  module.exports=router;