const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');

const databaseController = require('./databaseController');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const publicPath = path.resolve(__dirname, '../../public');

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    const {
      message, userId, username, roomId,
    } = msg;
    databaseController.createMessage({ message, userId, roomId });
    const time = moment().format('h:mm a');
    io.emit('message', { message, username, time });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.post('/api/signup', databaseController.createUser);

app.post('/api/login', databaseController.login);

app.get('/api/users', databaseController.getAllUsers);
app.get('/api/users/:userId/rooms', databaseController.getRooms);

app.post('/api/rooms', databaseController.createRoom);
app.post('/api/rooms/:roomId/invite', databaseController.inviteUsers);
app.get('/api/rooms/:roomId/users', databaseController.getRoomUsers);
app.get('/api/rooms/:roomId/messages', databaseController.getMessages);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(8080, () => {
  console.log('listening 8080');
});
