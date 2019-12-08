const express = require('express');
const app = express();

const router = require('../routes/user-info');

module.exports = (app) => {

	app.use(express.json());

	app.use('/api/userInfo', router);

}