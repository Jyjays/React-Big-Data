import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import { Iconstyle } from './assets/icon/iconfont';
import { Globalstyle } from './style/global.js';

function RouterConfig({ history }) {
  const route = () => {
    return (
      <Fragment>
        <Iconstyle></Iconstyle>
        <Globalstyle></Globalstyle>
        <Switch>
          <Route path='/' exact component={IndexPage} />
        </Switch>
      </Fragment>
    );
  };

  return <Router history={history}>{route()}</Router>;
}

export default RouterConfig;
