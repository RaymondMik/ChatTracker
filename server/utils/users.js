/**
 * Users helper
 */
class Users {
    constructor () {
        this.users = [];
    }

    addUser (socketId, userName, roomName, coordinates, userIsTyping) {
        const user = {socketId, userName, roomName, coordinates, userIsTyping};
        this.users.push(user);
        
        return user;
    }

    // Return removed user
    removeUser (socketId) {
        const user = this.getUser(socketId);
        if (user) this.users = this.users.filter((user) => user.socketId !== socketId);

        return user;
    }

    getUser (socketId) {
        return this.users.filter((user) => user.socketId === socketId)[0]
    }

    getUserList (roomName) {
        const users = this.users.filter((user) => user.roomName === roomName);

        return users;
    }
};
  
module.exports = {Users};
  

  