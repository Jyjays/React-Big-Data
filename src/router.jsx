import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Home from './routes/index.jsx'; // Updated to Home component
import RegisterPage from './components/LoginPage/RegisterPage'; // Ensure correct path
import { Iconstyle } from './assets/icon/iconfont';
import { Globalstyle } from './style/global.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Fragment>
        <Iconstyle />
        <Globalstyle />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/index" exact component={IndexPage} />
          <Route path="/register" exact component={RegisterPage} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default RouterConfig;
