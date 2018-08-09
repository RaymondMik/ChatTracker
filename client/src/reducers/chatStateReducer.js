import { 
    SET_INPUT_VALUE,
    SET_USER_DATA,
    ADD_MESSAGE,
    SET_ANOTHER_USER_IS_TYPING,
    SET_ACTIVE_USERS } from '../actions/chatStateActions';

const initialState = {
    socketId: null,
    userName: '',
    roomName: '',
    coordinates: '',
    inputValue: '',
    anotherUserIsTyping: false,
    messages: [],
    activeUsers: []
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
        case SET_INPUT_VALUE: {
            return {
                ...state,
                inputValue: action.value
            };
        }
        case SET_USER_DATA: {
            const {socketId, userName, roomName} = action.userData;
            return {
                ...state,
                socketId,
                userName,
                roomName
            };
        }
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        }
        case SET_ANOTHER_USER_IS_TYPING: {
            const activeUsersCopy = [...state.activeUsers];
            const user = activeUsersCopy.find(({socketId}) => socketId === action.socketId);
            user.isTyping = action.isTyping;
            
            return {
                ...state,
                activeUsers: activeUsersCopy
            };
        }
        case SET_ACTIVE_USERS: {
            return {
                ...state,
                activeUsers: action.activeUsers
            };
        }
        // TODO Unused reducers, consider if delete them or not
        // case ADD_ACTIVE_USERS: {
        //     return {
        //         ...state,
        //         activeUsers: [...state.activeUsers, ...action.newActiveUsers]
        //     };
        // }
        // case REMOVE_ACTIVE_USER: {
        //     const userIndex = state.users.indexOf(action.userName);
        //     return {
        //         ...state,
        //         activeUsers: [...state.activeUsers.slice(0, userIndex), ...state.activeUsers.slice(userIndex + 1)]
        //     };
        // }
        // case REMOVE_ACTIVE_USERS: {
        //     return {
        //         ...state,
        //         activeUsers: []
        //     };
        // }
        default: {
            return state;
        }
    }
};

export default chat;