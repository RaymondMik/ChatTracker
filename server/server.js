const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.static(publicPath));

// Web Socket
io.on('connection', (socket) => {
    console.log(`user: ${socket.id} just connected`);
    socket.on('disconnect', () => {
        console.log(`user: ${socket.id} was disconnected`);
    });

    socket.on('join', (params, callback) => {
        const {userName, roomName} = params;
        if (!isRealString(userName) || !isRealString(roomName)) callback('Name and room are required');
    
        socket.join(roomName);
        socket.emit('addMessageToClient', generateMessage({sender: 'Admin', receiver: '', body: `Welcome ${userName}`}));
        socket.broadcast.to(roomName).emit('addMessageToClient', generateMessage({sender: 'Admin', receiver: '', body: `${userName} has joined the conversation`}))

        callback();
    });

    socket.on('userIsTyping', (userIsTyping) => {
        console.log('server - userIsTyping: ' + userIsTyping);
        socket.broadcast.emit('broadcastUserIsTyping', userIsTyping);
    }); 

    socket.on('createMessage', (message, callback) => {
        // emit event to all connections
        console.log(message + ' has been created');
        io.emit('addMessageToClient', generateMessage(message));
        callback('server acknolwedged message creation');
    });
});

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

