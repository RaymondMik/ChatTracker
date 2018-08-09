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
                <LoginForm {...data} />
            )}/>
            <Route path='/chat' render={(data) => (
                <ChattieContainer {...data} 
                    chatData={props.chat} 
                    setActiveUsers={props.setActiveUsers}
                    addMessage={props.addMessage}
                    setInputValue={props.setInputValue}
                    setAnotherUserIsTyping={props.setAnotherUserIsTyping}
                    setUserData={props.setUserData}
                />
            )}/>
        </ Switch>
    );
};

App.propTypes = {
    chat: PropTypes.object,
    setActiveUsers: PropTypes.func,
    addMessage: PropTypes.func,
    setInputValue: PropTypes.func,
    setAnotherUserIsTyping: PropTypes.func,
    setUserData: PropTypes.func
};

export default hot(module)(App);

