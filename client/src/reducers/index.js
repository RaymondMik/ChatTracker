import { combineReducers } from 'redux';
import chat from './chatStateReducer';

const reducers = combineReducers({
    chat
});

// selectors used in mapStateToProps()
export const getChatState = (state) => state.chat;

export default reducers;