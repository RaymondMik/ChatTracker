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
        const {userName, roomName} = params;
   
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

        // Add new user to server and store it in constant
        const newUser = users.addUser(socket.id, userName, roomName)

        // add userData to connected client
        socket.emit('setUserData', newUser);
        
        // add user data to all other connected users
        //socket.broadcast.to(roomName).emit('addActiveUser', newUser);
    
        // update list for users in that room
        io.to(roomName).emit('setActiveUsers', users.getUserList(roomName));

        // broadcast user has joined message
        socket.broadcast.to(roomName).emit('addMessageToClient', generateMessage({sender: 'Admin', receiver: '', body: `${userName} has joined the conversation`}));
    
        // emit message sent by user
        socket.emit('addMessageToClient', generateMessage({sender: 'Admin', receiver: '', body: `Welcome ${userName}`}));
        
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

