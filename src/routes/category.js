'use strict'

const express = require("express")
const { categoryCollection } = require('../models/index')
const router = express.Router()
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");


router.get('/category', bearerAuth, permissions("read"), handlerGet)
router.get('/category/:id', bearerAuth, permissions("read"), handlerGetId)
router.post('/category', bearerAuth, permissions("create"), handlerPost)
router.put('/category/:id', bearerAuth, permissions("update"), handlerUpdate)

router.delete('/category/:id', bearerAuth, permissions("delete"), handlerDelete)

async function handlerGet(req, res) {
  try {
    let allRecords = await categoryCollection.read();
    res.status(200).json(allRecords);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function handlerGetId(req, res) {
  try {
    let id = req.params.id;
    let restInfo = await categoryCollection.read(id)
    if (restInfo) {
      res.status(200).json(restInfo)
    }
    else {
      res.status(406).json('Sorry ,,, The ID Should be Integer')
    }

  }
  catch (err) {
    throw new Error(err.message);
  }
}


async function handlerPost(req, res) {
  try {
    let obj = req.body;
    let newRecord = await categoryCollection.create(obj);
    res.status(201).json(newRecord);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function handlerUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await categoryCollection.update(id, obj);
    if (updatedRecord) {
      res.status(200).json(updatedRecord);
    }
    else {
      res.status(406).json('Invalid ID for updating or the category name is already exists');
    }

  } catch (err) {
    throw new Error(err.message);
  }
}

async function handlerDelete(req, res) {
  try {
    let id = req.params.id;
    let deletedRecord = await categoryCollection.delete(id);
    res.status(200).json(deletedRecord);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = router;