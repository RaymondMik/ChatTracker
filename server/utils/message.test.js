const {generateMessage} = require('./message');

describe('generateMessage test', () => {
    const message = {
        sender: 'ramon',
        receiver: 'danijela',
        body: 'hello!',
        createdAt: 178778178
    };

    const generatedMessage = generateMessage(message);

    test('message object should be generated with correct types', () => {
        expect(typeof generatedMessage.sender).toBe('string');
        expect(typeof generatedMessage.receiver).toBe('string');
        expect(typeof generatedMessage.body).toBe('string');
        expect(typeof generatedMessage.createdAt).toBe('number');
    });
});