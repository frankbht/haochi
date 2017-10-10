const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
//const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// db setup
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://root:118@ds113775.mlab.com:13775/chisha');

//app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on: ', port);
