const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 5000;
const users = new Users();

// Middlewares
app.use(express.static(publicPath));

// Web Socket
io.on('connection', (socket) => {
    console.log(`user: ${socket.id} just connected`);
    console.log(Object.keys(io.sockets.sockets));

    socket.on('disconnect', () => {
        console.log(`user: ${socket.id} was disconnected`);
        // delete current user
        const user = users.removeUser(socket.id);
        // if a user has been removed
        if (user) {
            io.to(user.roomName).emit('setActiveUsers', users.getUserList(user.roomName));
            io.to(user.roomName).emit('addMessageToClient', generateMessage({sender: 'Admin', receiver: '', body: `${user.userName} has left`}));
        }
    });

    socket.on('join', (params, callback) => {
        const {userName, roomName, coordinates} = params;
   
        // validate user and room names
        if (!isRealString(userName) || !isRealString(roomName)) callback('Name and room are required');
        
        // check if current user name is already in that room
        const userList = users.getUserList(roomName);
        userList.forEach((user) => {
            if (user.userName === userName) {
                callback(`User name "${userName}" has already been taken, choose another one!`);
            }
        });

        // join selected room
        socket.join(roomName);

        // Add own user data to server and store it in constant
        const newUser = users.addUser(socket.id, userName, roomName, coordinates, false);

        // add own user data to current client
        socket.emit('setUserData', newUser);
    
        // update list for users in that room
        io.to(roomName).emit('setActiveUsers', users.getUserList(roomName));

        // broadcast user has joined message
        socket.broadcast.to(roomName).emit('addMessageToClient', generateMessage({sender: 'Admin', body: `${userName} has joined the conversation`}));
    
        // emit welcome message just to connected user
        socket.emit('addMessageToClient', generateMessage({sender: 'Admin', body: `Welcome ${userName}`}));
        
        callback();
    });

    socket.on('userIsTyping', (userIsTyping) => {
        const user = users.getUser(socket.id);
        socket.broadcast.to(user.roomName).emit('broadcastUserIsTyping', socket.id, userIsTyping);
    }); 

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);
        if (user && isRealString(message.body)) {
            // emit event to all connections in that room
            io.to(user.roomName).emit('addMessageToClient', generateMessage(message));
            callback('server acknolwedged message creation');
        } else {
            calback('There was an error while creating message')
        }
    });
});

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

