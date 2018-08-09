import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUserName: '',
            selectedRoom: 'Ljubljana'
        };
    }

    handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value
        });
    }

    submitForm(e) {
        e.preventDefault();
        const trimmedUserName = this.state.selectedUserName.trim();

        this.props.history.push(
            `/chat/${this.state.selectedRoom}`, 
            {userName: trimmedUserName, roomName: this.state.selectedRoom}
        );
    }

    render() {
        return (
            <div className="login-form">
                <div className="container">
                    <form onSubmit={this.submitForm.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="username">User name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username"
                                name="selectedUserName"
                                placeholder="Enter user name"
                                value={this.state.selectedUserName}
                                onChange={this.handleOnChange.bind(this)}
                                minLength={4}
                                maxLength={20}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roomname">Choose a Room</label>
                            <select 
                                className="form-control" 
                                id="roomname" 
                                name="selectedRoom" 
                                onChange={this.handleOnChange.bind(this)} 
                                value={this.state.selectedRoom}
                            >
                                {['Gorizia', 'Ljubljana', 'Grado'].map(room => <option key={`key-${room}`} value={room}>{room}</option>)}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Enter Room</button>
                    </form>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    history: PropTypes.object
};

export default LoginForm;