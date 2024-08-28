import { createSelector, createSignal, Show, Switch, type Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import Login from './pages/Login'
import _404 from './pages/_404';
import RouteGuard from './components/RouteGuard';
import Dashboard from './pages/Dashboard';

const Root: Component = () => {

  return (
    <div>
      <Router>
          <Route path={"/"} component={Login}/>
          <Route path={"*404"} component={_404}/>
          <Route path={"/"} component={RouteGuard}>
              <Route path={"/dashboard"} component={Dashboard}/>
          </Route>
      </Router>
    </div>
  );
};

export default Root;
