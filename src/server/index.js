const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const databaseController = require('./controller.js');

const app = express();
const server = http.createServer(app);

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/');

server.listen(8080, () => {
  console.log('listening 8080');
});

module.exports = server;
