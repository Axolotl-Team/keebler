const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const path = require('path');

const databaseController = require('./databaseController');

const app = express();
const server = http.Server(app);
const io = socket(server);
const publicPath = path.resolve(__dirname, '../../public');

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    const { message, userId, roomId } = msg;
    databaseController.createMessage(msg);
    socket.emit('message', { message, username, time });
    console.log(`message: ${msg}`);
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

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(8080, () => {
  console.log('listening 8080');
});
