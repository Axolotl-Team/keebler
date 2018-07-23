import React from 'react';
import ReactDOM from 'react-dom';
import socketIO from 'socket.io-client';

import App from './components/App';

const socket = socketIO.connect('http://localhost:8080');

ReactDOM.render(<App socket={socket} />, document.getElementById('root'));
