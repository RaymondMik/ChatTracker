export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_ROOM_NAME = 'SET_ROOM_NAME';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_USER_IS_TYPING = 'SET_USER_IS_TYPING';

/**
 * Set value of input field.
 * 
 * @argument {String} value.
 * @returns {Object} action.
 */
export const setInputValue = (value) => {
    return {
        type: SET_INPUT_VALUE,
        value
    };
};

/**
 * Set user name.
 * 
 * @argument {String} userName.
 * @returns {Object} action.
 */
export const setUserName = (userName) => {
    return {
        type: SET_USER_NAME,
        userName
    };
};

/**
 * Set room name.
 * 
 * @argument {String} roomName.
 * @returns {Object} action.
 */
export const setRoomName = (roomName) => {
    return {
        type: SET_ROOM_NAME,
        roomName
    };
};

/**
 * Add message object.
 * 
 * @argument {Object} message.
 * @returns {Object} action.
 */
export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    };
};

/**
 * Set user is typing status.
 * 
 * @argument {boolean} setUserIsTyping.
 * @returns {Object} action.
 */
export const setUserIsTyping = (userIsTyping) => {
    return {
        type: SET_USER_IS_TYPING,
        userIsTyping
    };
};