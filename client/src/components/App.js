import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import ChattieContainer from './ChattieContainer';
import '../assets/styles/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Application component
 */
const App = (props) => {
    return (
        <Switch>
            <Route path='/' exact render={data => (
                <LoginForm {...data} 
                    setUserName={props.setUserName}
                    setRoomName={props.setRoomName}
                />
            )}/>
            <Route path='/chat' render={(data) => (
                <ChattieContainer {...data} 
                    chatData={props.chat} 
                    addMessage={props.addMessage}
                    setInputValue={props.setInputValue}
                    setUserIsTyping={props.setUserIsTyping}
                />
            )}/>
        </ Switch>
    );
};

App.propTypes = {
    chat: PropTypes.object,
    addMessage: PropTypes.func,
    setInputValue: PropTypes.func,
    setUserIsTyping: PropTypes.func,
    setUserName: PropTypes.func,
    setRoomName: PropTypes.func
};

export default hot(module)(App);

