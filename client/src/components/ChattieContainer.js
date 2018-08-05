import React from 'react';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import moment from 'moment';

let socket; 

class ChattieContainer extends React.Component {
    constructor(props) {
        super(props);
        socket = openSocket('http://localhost:5000');
        const {addMessage, setUserIsTyping, chatData: {userName, roomName}} = props;

        socket.on('connect', () => {
            const params = {
                userName,
                roomName
            };

            socket.emit('join', params, (err) => {
                if (err) {
                    alert('User name must not be empty');
                    this.props.history.push('/');
                }
            });
        });

        socket.on('addMessageToClient', (message) => {
            addMessage(message);      
            this.scrollToBottom();
        });
    
        socket.on('broadcastUserIsTyping', (userIsTyping) => {
            setUserIsTyping(userIsTyping);
        });
    }

    componentWillUnmount() {
        socket.disconnect();
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
        const {setInputValue, chatData: {userName, inputValue, messages, userIsTyping}} = this.props;
        /*window.setInterval(() => {navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            // emit event to socket, then in server if position is changed broadcast event
        });}, 3000);*/
    
        const inputOnChange = (e) => {
            setInputValue(e.target.value);
            if (!e.target.value.length) {
                socket.emit('userIsTyping', false);
            } else {
                console.log('emitting event');
                socket.emit('userIsTyping', true);
            }
        };
    
        const submitMessageSocketEvent = (e) => {
            e.preventDefault();
       
            socket.emit('createMessage', {
                sender: userName,
                receiver: 'jillie@poo.com',
                body: inputValue
            }, function (data) {
                console.log(`Client got: ${data}`);
            });

            socket.emit('userIsTyping', false);
            setInputValue('');
        };
    
        const userIsTypingText = userIsTyping ? 'User is writing something...' : '';
        
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
                    
                </div>
            </div>
        );


    }   
}

ChattieContainer.propTypes = {
    history: PropTypes.object,
    chatData: PropTypes.object,
    addMessage: PropTypes.func,
    setInputValue: PropTypes.func,
    setUserIsTyping: PropTypes.func
};

export default ChattieContainer;