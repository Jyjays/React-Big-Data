import React, { Component } from 'react';
import { connect } from 'dva';
import { IndexPageStyle, IndexPageContent } from './style';
import TopPage from '../components/topPage';
import LeftPage from '../components/leftPage';
import CenterPage from '../components/centerPage';
import RightPage from '../components/rightPage';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <IndexPageStyle>
        <TopPage />
        <IndexPageContent>

          <LeftPage />


          <RightPage />
        </IndexPageContent>
      </IndexPageStyle>
    );
  }
}

export default connect()(IndexPage);
