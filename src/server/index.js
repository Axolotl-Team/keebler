const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const databaseController = require('./databaseController');

const app = express();
const publicPath = path.resolve(__dirname, '../../public');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(publicPath));

app.get('/api/signup', databaseController.createUser);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(8080, () => {
  console.log('listening 8080');
});
