import { 
    SET_INPUT_VALUE,
    SET_USER_NAME,
    SET_ROOM_NAME,
    ADD_MESSAGE,
    SET_USER_IS_TYPING } from '../actions/chatStateActions';

const initialState = {
    userName: '',
    roomName: '',
    inputValue: '',
    messages: [],
    userIsTyping: false
};

/**
 * Set chat state.
 * 
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
const chat = (state = initialState, action) => {
    switch (action.type) {
        case SET_INPUT_VALUE:
            return {
                ...state,
                inputValue: action.value
            };
        case SET_USER_NAME:
        return {
            ...state,
            userName: action.userName
        };
        case SET_ROOM_NAME:
        return {
            ...state,
            roomName: action.roomName
        };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        case SET_USER_IS_TYPING:
            return {
                ...state,
                userIsTyping: action.userIsTyping
            };
        default:
            return state;
    }
};

export default chat;