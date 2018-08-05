const moment = require('moment');

// TODO see what to do with receiver
const generateMessage = ({sender, receiver = '', body} = message) => {
    return {
        sender: sender,
        receiver: receiver,
        body: body,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage};