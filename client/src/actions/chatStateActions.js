export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const SET_USER_DATA = 'SET_USER_DATA';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_ANOTHER_USER_IS_TYPING = 'SET_ANOTHER_USER_IS_TYPING';
export const SET_ACTIVE_USERS = 'SET_ACTIVE_USERS';
// export const ADD_ACTIVE_USERS = 'ADD_ACTIVE_USERS';
// export const REMOVE_ACTIVE_USER = 'REMOVE_ACTIVE_USER';
// export const REMOVE_ACTIVE_USERS = 'REMOVE_ACTIVE_USERS';

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
 * @argument {Object} userData.
 * @returns {Object} action.
 */
export const setUserData = (userData) => {
    return {
        type: SET_USER_DATA,
        userData
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
 * @argument {String} socketId
 * @argument {boolean} isTyping
 * @returns {Object} action.
 */
export const setAnotherUserIsTyping = (socketId, isTyping) => {
    return {
        type: SET_ANOTHER_USER_IS_TYPING,
        socketId,
        isTyping
    };
};

/** 
* Set active users.
* 
* @argument {array} active users.
* @returns {Object} action.
*/
export const setActiveUsers = (activeUsers) => {
    return {
        type: SET_ACTIVE_USERS,
        activeUsers
    };
 };

// /** 
// * Add active users.
// * 
// * @argument {array} active users.
// * @returns {Object} action.
// */
// export const addActiveUsers = (newActiveUsers) => {
//    return {
//        type: ADD_ACTIVE_USERS,
//        newActiveUsers
//    };
// };

// /** 
// * Remove active user.
// * 
// * @argument {string} userName.
// * @returns {Object} action.
// */
// export const removeActiveUsers = () => {
//     return {
//         type: REMOVE_ACTIVE_USERS
//     };
//  };

//  /** 
// * Update active user position.
// * 
// * @argument {string} userId.
// * @returns {Object} action.
// */
// export const removeActiveUser = (userId) => {
//     return {
//         type: REMOVE_ACTIVE_USER,
//         userId
//     };
//  };