import React from 'react';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import moment from 'moment';

let socket; 

class ChattieContainer extends React.Component {
    constructor(props) {
        super(props);

        // if user tries to access page directly, redirect him/her to login page
        if (!props.location.state) this.props.history.push('/');

        socket = openSocket('http://localhost:5000');
        const {
            setActiveUsers, 
            addMessage, 
            location: {state: {userName, roomName}},
            setAnotherUserIsTyping, 
            setUserData } = props;

        socket.on('connect', () => {
            const params = {
                userName,
                roomName
            };
            // send userName and roomName received via React Router
            socket.emit('join', params, (err) => {
                if (err) {
                    alert(err);
                    this.props.history.push('/');
                }
            });
        });

        // Set data of current user
        socket.on('setUserData', (userData) => setUserData(userData));

        // Add active user to list
        socket.on('setActiveUsers', (users) => setActiveUsers(users));
        
        // Add message to client
        socket.on('addMessageToClient', (message) => {
            addMessage(message);      
            this.scrollToBottom();
        });
    
        // Set another user is typing state
        socket.on('broadcastUserIsTyping', (data) => setAnotherUserIsTyping(data));
    }

    componentWillUnmount() {
        socket.disconnect();
        // reset data for connected user
        this.props.setUserData({socketId: null, userName: '', roomName: ''});
    }

    scrollToBottom() {
        const messageBoard = document.querySelector('ul.message-board');
        const messages = document.getElementsByClassName('message');
        const lastMessageClientHeight = messages[messages.length - 1].clientHeight;
        let prevMessageClientHeight = 0;
        if (messages.length > 1) prevMessageClientHeight = messages[messages.length - 2].clientHeight;
    
        if (messageBoard.clientHeight + messageBoard.scrollTop + lastMessageClientHeight + prevMessageClientHeight >= messageBoard.scrollHeight) {
            messageBoard.scrollTo(0, messageBoard.scrollHeight);
        }
    }

    render() {
        const {setInputValue, chatData: {userName, inputValue, messages, anotherUserIsTyping, activeUsers}} = this.props;
        
        /*window.setInterval(() => {navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            // emit event to socket, then in server if position is changed broadcast event
        });}, 3000);*/
    
        const inputOnChange = (e) => {
            setInputValue(e.target.value);
            if (!e.target.value.length) {
                socket.emit('userIsTyping', false);
            } else {
                socket.emit('userIsTyping', true);
            }
        };
    
        const submitMessageSocketEvent = (e) => {
            e.preventDefault();
       
            socket.emit('createMessage', {
                sender: userName,
                body: inputValue
            }, function (data) {
                console.log(`Client got: ${data}`);
            });

            socket.emit('userIsTyping', false);
            setInputValue('');
        };
    
        const userIsTypingText = anotherUserIsTyping ? 'A user is writing something...' : '';
        
        return (
            <div className="container">
                <div className="map-locator">
                </div>
                <div className="chattie-wrapper">
                    <h2>Messages</h2>
                    <ul className="message-board">
                        {messages.length && messages.map((message, i) => {
                            return (
                            <li className="message" key={`message-${i}`}>
                                <div className="message-container">
                                    <div>{message.sender}</div>
                                    <small>Sent at: {moment(message.createdAt).format('h:mm a')}</small>
                                    <p>{message.body}</p>
                                </div>
                            </li>);
                        })}
                    </ul>
                    <div className="user-interaction-message">{userIsTypingText}</div>
                    <footer className="chattie-footer">
                        <form onSubmit={submitMessageSocketEvent}>
                            <input type="text" onChange={inputOnChange} value={inputValue} autoFocus autoComplete="off"/>
                            <button type="submit">Submit</button>
                        </form>
                    </footer>
                    <ul>
                        {activeUsers.length && activeUsers.map((user) => <li key={user.socketId}>{user.userName}</li>)}
                    </ul>
                </div>
            </div>
        );


    }   
}

ChattieContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    chatData: PropTypes.object,
    activeUsers: PropTypes.array,
    setUserData: PropTypes.func,
    setActiveUsers: PropTypes.func,
    addMessage: PropTypes.func,
    setInputValue: PropTypes.func,
    setAnotherUserIsTyping: PropTypes.func
};

export default ChattieContainer;