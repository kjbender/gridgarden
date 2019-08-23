const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);
const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server listening on port ', port)
});
