const express = require('express');

const loketla = express();
// add JSON Payloads to the 'request.body' @ Content-Type: application/json
loketla.use(express.json());
// add submitted form data to the 'request.body' @ Content-Type: application/x-www-form-urlencoded
loketla.use(express.urlencoded({ extended: false }));

loketla.use('/api', require('./apis/router'));

module.exports = loketla;
