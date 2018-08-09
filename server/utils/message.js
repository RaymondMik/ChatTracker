const moment = require('moment');

// TODO see what to do with receiver
const generateMessage = ({sender, body} = message) => {
    return {
        sender: sender,
        body: body,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage};