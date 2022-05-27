'use strict';

const { db } = require('./src/models/index');
const server = require('./src/server.js');
require('dotenv').config()
const PORT = process.env.PORT || 3030;

db.sync()
  .then(() => {
    server.start(PORT);
  })
  .catch(err =>{
    console.log('\x1b[45m%s\x1b[0m',err);
  })