import React, { Component } from 'react';
import { connect } from 'dva';
import { IndexPageStyle } from './style';
import TopPage from '../components/topPage';
import LoginPage from '../components/LoginPage'; // Correct path

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <IndexPageStyle>
        <TopPage />
        <LoginPage />
      </IndexPageStyle>
    );
  }
}

export default connect()(Home);
