import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { RegisterPageStyle,ButtonStyle } from './style';
import { connect } from 'dva';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = async () => {
    const { username, password } = this.state;
    const response = await fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (result.success) {
      alert('Registration successful!');
      this.props.history.push('/login');
    } else {
      alert('Registration failed: ' + result.message);
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <RegisterPageStyle>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleInputChange}
        />
        <ButtonStyle onClick={this.handleRegister}>Register</ButtonStyle>
      </RegisterPageStyle>
    );
  }
}

export default withRouter(connect()(RegisterPage));
