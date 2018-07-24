const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const databaseController = require('./databaseController');

const app = express();
const publicPath = path.resolve(__dirname, '../../public');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(publicPath));

app.post('/api/signup', databaseController.createUser);

app.post('/api/login', databaseController.login);

app.get('/api/users', databaseController.getAllUsers);
app.get('/api/users/:userId/rooms', databaseController.getRooms);

app.post('/api/rooms', databaseController.createRoom);
app.post('/api/rooms/:roomId/invite', databaseController.inviteUsers);
app.get('/api/rooms/:roomId/users', databaseController.getRoomUsers);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(8080, () => {
  console.log('listening 8080');
});
