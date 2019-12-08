const express = require('express');
const app = express();
app.use(express.json());
const logger = require('morgan');

app.use(logger("dev"));

require('./startup/db');
require('./startup/routes')(app);

port = process.env.port || 4000;
app.listen(port, () => console.log(`listening on port ${port}....`));
