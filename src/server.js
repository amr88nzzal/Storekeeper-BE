'use strict';

const cors = require('cors')
const express = require('express');
const app = express();
const server = require('http').createServer(app);

require('dotenv').config()

const authRoutes = require('./routes/users');
const city = require('./routes/city')
const location = require('./routes/location')
const categoryRoutes = require('./routes/category');
const customer = require('./routes/customer');
const trx = require('./routes/transaction');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(authRoutes);
app.use(city)
app.use(location)
app.use(categoryRoutes)
app.use(customer)
app.use(trx)

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: server,
  start: (port) => {
    if (!port) { throw new Error('Missing Port'); }
    server.listen(port, () =>console.log('\x1b[41m%s\x1b[0m', `Listening on ${port}`))  
  },
};