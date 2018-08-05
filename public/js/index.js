const socket = io('http://localhost:5000');

window.setInterval(() => {navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    // emit event to socket, then in server if position is changed broadcast event
})}, 3000);

socket.on('connect', function() {
    //alert('Connected to server!');
});

socket.on('disconnect', function() {
    //alert('Disconnected to server!');
});

const messageBoard = document.querySelector('ul.message-board');
const userInteraction = document.querySelector('div.user-interaction-message');
const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');

function scrollToBotton(messageBoard) {
    const messages = document.getElementsByClassName('message');
    const lastMessageClientHeight = messages[messages.length - 1].clientHeight;
    let prevMessageClientHeight = 0;
    if (messages.length > 1) prevMessageClientHeight = messages[messages.length - 2].clientHeight;

    if (messageBoard.clientHeight + messageBoard.scrollTop + lastMessageClientHeight + prevMessageClientHeight >= messageBoard.scrollHeight) {
        messageBoard.scrollTo(0, messageBoard.scrollHeight);
    }
}

socket.on('newMessage', function(message) {
    const messageContainerHtml = document.createElement('li');
    messageContainerHtml.className = 'message-container';
    const messageHtml = document.createElement('div');
    messageHtml.innerText = `${message.sender} on ${moment(message.createdAt).format('h:mm a')} wrote: ${message.body}`;
    messageHtml.className = 'message';
    messageContainerHtml.appendChild(messageHtml);
    messageBoard.appendChild(messageContainerHtml);

    scrollToBotton(messageBoard)
});

socket.on('broadcastUserIsTyping', function(message) {
    userInteraction.innerText = message;
});

const userIsTypingString = 'user is typing...';

function userIsTyping(e) {
    if (!e.target.value.length) {
        socket.emit('sendUserIsTyping', {
            text: null
        });
    } else {
        socket.emit('sendUserIsTyping', {
            text: userIsTypingString
        });
    }
}

function submitMessageSocketEvent(e) {
    e.preventDefault();
    const inputValue = input.value;
    socket.emit('createMessage', {
        sender: 'romualdo@bigul.com',
        receiver: 'jillie@poo.com',
        body: inputValue
    }, function (data) {
        console.log(`Client got: ${data}`);
    });
    e.target.reset();
    socket.emit('sendUserIsTyping', {
        text: null
    });
}

input.addEventListener('input', userIsTyping);
form.addEventListener('submit', submitMessageSocketEvent);