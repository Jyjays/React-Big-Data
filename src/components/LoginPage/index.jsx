import React, { Component } from 'react';
import { LoginPageStyle, ButtonStyle } from './style';
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    try {
      const response = await fetch('http://120.46.31.49:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 200) {
        alert('Login successful!');
        this.props.history.push('/index');
      } else {
        alert('Login failed: ' + response.status);
      }
    } catch (error) {
      alert(error);
    }
  };


  render() {
    const { username, password } = this.state;
    return (
      <LoginPageStyle>
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
        <div className="button-group">
          <ButtonStyle onClick={this.handleLogin}>Login</ButtonStyle>
          <ButtonStyle onClick={() => this.props.history.push('/register')}>Register</ButtonStyle>
        </div>
      </LoginPageStyle>
    );
  }
}

// Wrap connect with withRouter
export default withRouter(connect()(LoginPage));
